const request = require("request");
const news = (callback) => {
  const url =
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=690a90f852d84a8d95945db246e8a160";
  request(
    { url, json: true, headers: { "User-Agent": "Chrome" } },
    (error, response) => {
      if (error) {
        callback("Error has ocurred", undefined);
      } else if (response.body.message) {
        callback(response.body.message, undefined);
      } else if (response.body.articles.length === 0) {
        callback("Please enter valid data", undefined);
      } else {
        callback(undefined, response.body.articles);
      }
    }
  );
};
module.exports = news;
