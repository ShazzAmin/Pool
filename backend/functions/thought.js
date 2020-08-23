const { getRecentThoughts, addOrUpdateThought, success, error } = require('../common.js');

/**
* Thought
* @returns {object.http} result
*/
module.exports = async (context) => {  
  const userUuid = context.http.headers["x-user-uuid"] || null;
  
  try {
    switch (context.http.method) {
      case "POST":
        const req = JSON.parse(context.http.body);
        const { text = null } = req;
        if (!text) {
          return error(400, "no text specified");
        }
        
        return success(await addOrUpdateThought(userUuid, text));
        
        case "GET":
        if (!userUuid) {
          return error(400, "no user specified");
        }
        
        return success(await getRecentThoughts(userUuid));
      
      default:
        return error(405, "method not supported");
    }
  } catch (e) {
    return error(500, "something went wrong");
  }
}