import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any";

const yourBearerToken = "fce8982e-add0-47d4-acc8-bca8e22cd966";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-joke", async (req, res) => {
  const searchName = req.body.name;
  try {
    const result = await axios.get(API_URL + `?contains=${searchName}`);
    let ans = result.data.setup+ " "+result.data.delivery;
    if(result.data.setup === undefined & result.data.delivery === undefined){
      if(result.data.joke === undefined){
        ans = result.data.message;
      }else{
        ans = result.data.joke;
      }
    }
    res.render("index.ejs", { content: ans});
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
