const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8081;
const mongo = require('./mongo');
const { getSlugsFromAssetId, getSingleAsset } = require('./handlers');

// BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.get('/api/slug/:identifier', getSingleAsset);

app.post('/api/slug', getSlugsFromAssetId);

// ERROR HANDLER
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Ooops, something went wrong!',
    },
  });
});

const init = async () => {
  try {
    await mongo();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};

init();
