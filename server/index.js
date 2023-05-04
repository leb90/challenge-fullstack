const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3030;

app.get('/files/data', async (req, res) => {
  try {
    const fileList = await axios.get('https://echo-serv.tbxnet.com/v1/secret/files', {
      headers: { 'Authorization': 'Bearer aSuperSecretKey' }
    });

    const result = [];
    for (const file of fileList.data.files) {
      try {
        const fileData = await axios.get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
          headers: { 'Authorization': 'Bearer aSuperSecretKey' }
        });
        const fileJson = await csv().fromString(fileData.data);
        const validLines = fileJson.filter(line => line.text && line.number && line.hex);
        const formattedData = {
          file: file,
          lines: validLines.map(line => ({ text: line.text, number: Number(line.number), hex: line.hex }))
        };
        result.push(formattedData);
      } catch (err) {
        console.error(`Error getting or processing file ${file}`, err);
      }
    }
    res.status(200).json(result);
  } catch (err) {
    console.error('Error getting list of files', err);
    res.status(500).send('There was an error processing the request');
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;
