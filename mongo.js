// @ts-check

const mongoose = require('mongoose');
const mongoURI =
  'mongodb+srv://superkoders:superpassword@cluster0.lnzjn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoSettings = {
  keepAlive: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

const mongo = () => {
  try {
    mongoose.set('debug', true);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = Promise;

    const connected = new Promise((resolve, reject) => {
      mongoose.connection.on('connected', () => {
        console.log('MONGO connected');
        resolve();
      });
    });
    mongoose.connect(mongoURI, mongoSettings);
    return connected;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongo;
