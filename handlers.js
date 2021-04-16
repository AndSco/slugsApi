const Asset = require('./models/asset');
const { getData } = require('./utils');

module.exports.getSlugsFromAssetId = async (req, res, next) => {
  try {
    const { assets } = req.body;
    getData(assets).then((data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.getSingleAsset = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const asset = await Asset.find({
      $or: [{ backstageId: identifier }, { slug: identifier }],
    });

    res.status(200).json(asset);
  } catch (err) {
    return next(err);
  }
};
