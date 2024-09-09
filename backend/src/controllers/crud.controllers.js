const post = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);
    return res.status(201).send(item);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAll = (model) => async (req, res) => {
  try {
    const items = await model.find({}).lean().exec();
    return res.status(200).send(items);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

module.exports = { post: post, getAll };
