const Asset = require('./models/asset');

module.exports.slugify = (label) => parameterize(label);

const fetchAsset = async (asset) => {
  const found = await Asset.findOne({ backstageId: asset.id });
  if (!found) {
    const newAsset = await Asset.create({
      backstageId: asset.id,
      slug: slugify(asset.name),
    });
    return Promise.resolve(newAsset);
  }
  return Promise.resolve(found);
};

const fetchAssetAsync = async (asset) => {
  return fetchAsset(asset);
};

module.exports.getData = async (assetList) => {
  return Promise.all(assetList.map((item) => fetchAssetAsync(item)));
};
