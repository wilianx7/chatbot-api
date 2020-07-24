const express = require('express');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const watsonAssistant = new AssistantV2({
    version: '2020-07-21',
    authenticator: new IamAuthenticator({
        apikey: '0iLcaRXWhmTC5ao1lTuklxDgNd4YhYyJKudYpJDhL_4i'
    }),
    url: 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/3e247e6c-8e35-4afe-80d9-29937cd2ea65',
});

const assistantId = '303b47ca-b014-4194-942a-e2c2b1070272';

app.post('/create-session/', (req, res) => {
    watsonAssistant.createSession({ assistantId: assistantId })
        .then(response => {
            res.json(response.result);
        })
        .catch(err => {
            res.json(err);
        });
});

app.post('/message/', (req, res) => {
    const { message, session_id } = req.body;

    if (!session_id) {
        res.json('session_id must be present!');
        return;
    }

    const params = {
        assistantId: assistantId,
        sessionId: session_id,
        input: {
            'message_type': 'text',
            'text': message
        },
    };

    watsonAssistant.message(params).then(response => {
        res.json(response.result);
    }).catch(err => {
        res.json(err);
    });
});

app.listen(3000, () => {
    console.log('API Running...');
});
