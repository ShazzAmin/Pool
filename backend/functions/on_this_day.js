const { getOnThisDayThoughts, success, error } = require('../common.js');

/**
* On This Day
* @returns {object.http} result
*/
module.exports = async (context) => {
  const userUuid = context.http.headers["x-user-uuid"] || null;
  if (!userUuid) {
    return error(400, "no user specified");
  }
  
  const period = context.params["period"] || null;
  if (!period) {
    return error(400, "no period specified");
  }
  
  const result = await getOnThisDayThoughts(userUuid, period);
  if (!result) {
    return error(400, "invalid request");
  }
  
  return success(result);
}