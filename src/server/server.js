import express from "express";
import ReactDOM from "react-dom/server";
import { App } from "../App.tsx";
import { indexTemplate } from "./indexTemplate";
import axios from 'axios';

const app = express();

let token = '';

app.use("/static", express.static("./dist/client"));

app.get("/", (req, res) => {
  res.send(indexTemplate(ReactDOM.renderToString(App)));
});

app.get("/auth", (req, res) => {
  axios
    .post(
      'https://www.reddit.com/api/v1/access_token',
      `grant_type=authorization_code&code=${req.query.code}&redirect_uri=http://localhost:3000/auth`,
      {
        auth: {
          username: process.env.CLIENT_ID,
          password: '3xVQrzRYIiwxVnSFb4PpFgC0sNFI8w'
        },
        headers: { 'Content-type': 'application/x-www-form-urlencoded' }
      }
    )
    .then(({ data }) => {
      token = data['access_token']
      res.send(
        indexTemplate(ReactDOM.renderToString(App), data['access_token']),
      );
    })
    .catch(() => {
      res.send(indexTemplate(ReactDOM.renderToString(App), token));
    })
});

app.listen(3000, () => {
  console.log("server started on port http://localhost:3000");
});
