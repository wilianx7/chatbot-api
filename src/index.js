const express = require("express");
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const watsonAssistant = new AssistantV2({
  version: "2020-07-21",
  authenticator: new IamAuthenticator({
    apikey: "0iLcaRXWhmTC5ao1lTuklxDgNd4YhYyJKudYpJDhL_4i",
  }),
  url:
    "https://api.us-south.assistant.watson.cloud.ibm.com/instances/3e247e6c-8e35-4afe-80d9-29937cd2ea65",
});

const assistantId = "303b47ca-b014-4194-942a-e2c2b1070272";

app.post("/create-session/", (req, res) => {
  watsonAssistant
    .createSession({ assistantId: assistantId })
    .then((sessionResponse) => {
      return initConversation(sessionResponse, res);
    })
    .catch((err) => {
      return res.json(err);
    });
<<<<<<< HEAD
});

app.get("/", (req, res) => {
  return res.json("working");
=======
>>>>>>> 1cdbb7c3ae4f19e3c393d15203776d35b90bbca7
});

app.post("/message/", (req, res) => {
  const { message, session_id } = req.body;

  if (!session_id) {
    return res.json("session_id must be present!");
  }

  const params = {
    assistantId: assistantId,
    sessionId: session_id,
    input: {
      message_type: "text",
      text: message,
    },
  };

  watsonAssistant
    .message(params)
    .then((response) => {
      return res.json(response.result);
    })
    .catch((err) => {
      return res.json(err);
    });
});

function initConversation(sessionResponse, postResponse) {
  const params = {
    assistantId: assistantId,
    sessionId: sessionResponse.result.session_id,
    input: {
      message_type: "text",
      text: "",
    },
  };

  watsonAssistant
    .message(params)
    .then((messageResponse) => {
      messageResponse.result.output["session_id"] =
        sessionResponse.result.session_id;
      return postResponse.json(messageResponse.result);
    })
    .catch((err) => {
      return postResponse.json(err);
    });
}

var porta = process.env.PORT || 8080;

app.listen(porta, () => {
  console.log(porta);
  console.log("API Running...");
});
