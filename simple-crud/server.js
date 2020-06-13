import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import Character from './character'; // model import
require('dotenv').config();

const app = express();
// const port = 3001;
const port = process.env.PORT || 3001; // herokuの環境変数で指定されるportを使う
// const dbUrl = 'mongodb://localhost:27017/crud'// dbの名前をcrudに指定
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost/crud';

app.use(express.static(path.join(__dirname, 'client/build')))

// body-parserを適用
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl, dbErr => {
  if (dbErr) throw new Error(dbErr)
  else console.log('db connected');

  // post request
  app.post('/api/characters', (request, response) => {
    // console.log('receive post request');
    // console.log(request.body);
    // response.status(200).send();
    const { name, age } = request.body;
    new Character({
      name,
      age,
    }).save(err => {
      if (err) response.status(500)
      // else response.status(200).send(`${name}(${age}) was successfully created.`);
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send();
          else response.status(200).send(characterArray);
        })
      }
    })
  })

  app.get('/api/characters', (request, response) => {
    Character.find({}, (err, characterArray) => {
      if (err) response.status(500).send();
      else response.status(200).send(characterArray);
    });
  });

  app.put('/api/characters', (request, response) => {
    const { id } = request.body;
    Character.findByIdAndUpdate(id, { $inc: { "age": 1 } }, err => {
      if (err) response.status(500).send();
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send();
          else response.status(200).send(characterArray);
        })
      }
    })
  })
  app.delete('/api/characters', (request, response) => {
    const { id } = request.body;
    Character.findByIdAndDelete(id, err => {
      if (err) response.status(500).send();
      else {
        Character.find({}, (findErr, characterArray) => {
          if (findErr) response.status(500).send();
          else response.status(200).send(characterArray);
        })
      }
    })
  })

  // MongoDbに接続してからサーバーを立ち上げるために
  app.listen(port, err => {
    if (err) throw new Error(err);
    else console.log(`listening on port ${port}`);
  });
})
