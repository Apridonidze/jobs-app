const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const PORT = process.env.SERVER_PORT;


app.get('/', (req,res) => {
    res.send('/ path');
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});