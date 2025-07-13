const axios = require("axios");

const sendRequest = async (url, requestType, regions) => {
  const results = await Promise.all(
    regions.map(async (region) => {
      try {
        const start = Date.now();
        const response = await axios({
          method: requestType,
          url,
          timeout: 10000,
        });
        const responseTime = Date.now() - start;
        return { region, responseTime, statusCode: response.status };
      } catch (error) {
        return {
          region,
          responseTime: null,
          statusCode: error.response?.status || 500,
        };
      }
    })
  );
  return results;
};

module.exports = { sendRequest };
