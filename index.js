require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', '*');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.options('*', function (req,res) { res.sendStatus(200); });

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_TOKEN,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send({ message: "Connection success " });
});

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  console.log("Received prompt:", prompt); // Add this line for debugging

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 64,
    });

    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// err handling
app.use((err, req, res, next) => {
    res.send(err);
    next();
});
// Handle requests to the root URL ("/") with a 404 status code.
app.use("/", (req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Server is running on http://localhost:${port} !!`));