const express = require("express");
const path = require("path");
const hbs = require("hbs");
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const app = express();
const port = process.env.PORT || 3000;
const request = require("request");
const url =
  "https://newsdata.io/api/1/news?apikey=pub_9417c007e4e29ba2b5e4a44e06012a3ed3f2&language=en";
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsPath);

app.get("/", (req, res) => {
  request(
    { url, json: true, headers: { "User-Agent": "MY IPHINE7S" } },
    (error, response) => {
      if (error) {
        console.log("Error has occurred");
      } else if (response.body.results.message) {
        console.log(response.body.results.message);
      } else {
        res.render("index", {
          this: [
            {
              title: response.body.results[0].title,
              description: response.body.results[0].description,
              img: response.body.results[0].image_url,
              date: response.body.results[0].pubDate,
            },
          ],
        });
      }
    }
  );
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Page",
    try: "Please Try Again Later",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
