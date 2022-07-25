const express = require("express");
const app = express();
const path = require("path");
const news = require("./tools/news");
const viewsDirectorty = path.join(__dirname, "../templates/views");
const publicDirectory = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
app.use(express.static(publicDirectory));
app.set("view engine", "hbs");
app.set("views", viewsDirectorty);

app.get("/", (req, res) => {
  news((error, news) => {
    if (error) {
      return res.render("404page", {
        error: "Error page",
      });
    }
    res.render("news", {
      title: "All news",
      data: news,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
