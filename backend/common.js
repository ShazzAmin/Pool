const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

const analyzeThoughtSentiment = async (text) => {
  const result = await lib.http.request['@1.1.5'].post({
    url: `https://pool-text-analysis.cognitiveservices.azure.com/text/analytics/v3.0/sentiment`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_TEXT_ANALYSIS_KEY,
    },
    params: {
      'documents': [
        { id: 1, 'text': text },
      ],
    },
  });
  
  if (result.statusCode != 200) {
    return null;
  }
  
  let sentiment = result.data.documents[0].sentiment;
  const sentimentConfidence = result.data.documents[0].confidenceScores[sentiment];
  switch (sentiment) {
    case 'positive':
      sentiment = 'POSITIVE';
      break;
    case 'negative':
      sentiment = 'NEGATIVE';
      break;
    default:
      sentiment = 'NEUTRAL';
      break;
  }
  return { sentiment, sentimentConfidence };
};

const extractKeyPhrases = async (text) => {
  const result = await lib.http.request['@1.1.5'].post({
    url: `https://pool-text-analysis.cognitiveservices.azure.com/text/analytics/v3.0/keyPhrases`,
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_TEXT_ANALYSIS_KEY,
    },
    params: {
      'documents': [
        { id: 1, 'text': text },
      ],
    },
  });
  
  if (result.statusCode != 200) {
    return null;
  }
  
  return result.data.documents[0].keyPhrases;
};

module.exports = {
  addOrUpdateThought: async (userUuid, text) => {
    const sentimentAnalysis = analyzeThoughtSentiment(text);
    const keyPhrasesExtraction = extractKeyPhrases(text);
    
    let thoughtId = null;
    if (userUuid) {
      const results = await lib.postgres.db['@0.0.2'].query({
        query: `SELECT id FROM thoughts WHERE user_uuid = $1 AND created_at::date = NOW()::date;`,
        parameters: [ userUuid ],
      });
      
      if (results.rows.length > 0) {
        thoughtId = results.rows[0].id;
      }
    }
    
    const { sentiment, sentimentConfidence } = await sentimentAnalysis;
    if (thoughtId) {
      const results = await lib.postgres.db['@0.0.2'].query({
        query: `UPDATE thoughts SET text = $1, sentiment = $2, sentiment_confidence = $3 WHERE id = $4 RETURNING *;`,
        parameters: [ text, sentiment, sentimentConfidence, thoughtId ],
      });
      await lib.postgres.db['@0.0.2'].query({
        query: `DELETE FROM key_phrases WHERE thought_id = $1;`,
        parameters: [ thoughtId ],
      });
      const keyPhrases = await keyPhrasesExtraction;
      if (keyPhrases) {
        for (const phrase of keyPhrases){
          await lib.postgres.db['@0.0.2'].query({
            query: `INSERT INTO key_phrases (phrase, thought_id) VALUES ($1, $2);`,
            parameters: [ phrase, thoughtId ],
          });
        }
      }
      return results.rows[0];
    }
    
    const query = userUuid ?
    {
      query: `INSERT INTO thoughts (user_uuid, text, sentiment, sentiment_confidence) VALUES ($1, $2, $3, $4) RETURNING *;`,
      parameters: [ userUuid, text, sentiment, sentimentConfidence ],
    } :
    {
      query: `INSERT INTO thoughts (text, sentiment, sentiment_confidence) VALUES ($1, $2, $3) RETURNING *;`,
      parameters: [ text, sentiment, sentimentConfidence ],
    };
    const results = await lib.postgres.db['@0.0.2'].query(query);
    const keyPhrases  = await keyPhrasesExtraction;
    if (keyPhrases) {
      for (const phrase of keyPhrases){
        await lib.postgres.db['@0.0.2'].query({
          query: `INSERT INTO key_phrases (phrase, thought_id) VALUES ($1, $2);`,
          parameters: [ phrase, results.rows[0].id ],
          
        });
      }
    }
    return results.rows[0];
  },
  
  getRecentThoughts: async (userUuid) => {
    const results = await lib.postgres.db['@0.0.2'].query({
      query: `SELECT * FROM thoughts WHERE user_uuid = $1 ORDER BY created_at DESC;`,
      parameters: [ userUuid ],
    });
    return results.rows;
  },
  
  getOnThisDayThoughts: async (userUuid, period) => {
    let query;
    switch (period) {
      case "year":
        query = `SELECT * FROM thoughts WHERE user_uuid = $1 AND EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM NOW()) AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM NOW()) ORDER BY created_at DESC;`;
        break;
      case "month":
        query = `SELECT * FROM thoughts WHERE user_uuid = $1 AND EXTRACT(DAY FROM created_at) = EXTRACT(DAY FROM NOW()) ORDER BY created_at DESC;`;
        break;
      case "week":
        query = `SELECT * FROM thoughts WHERE user_uuid = $1 AND EXTRACT(DOW FROM created_at) = EXTRACT(DOW FROM NOW()) ORDER BY created_at DESC;`;
        break;
      default:
        return null;
    }
    
    const results = await lib.postgres.db['@0.0.2'].query({
      query,
      parameters: [ userUuid ],
    });
    return results.rows;
  },
  
  success: (payload) => {
    return { statusCode: 200, body: JSON.stringify(payload) };
  },
  
  error: (code, message) => {
    return { statusCode: code, body: JSON.stringify({ error: message }) };
  },
};