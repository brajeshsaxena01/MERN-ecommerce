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
    const items = await model
      .find({})
      // .lean()// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

      .exec();
    return res.status(200).send(items);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const fetchById = (model) => async (req, res) => {
  try {
    const item = await model
      .findById(req.params.id)
      // .lean()// the lean is used convert the mongoose docs into json, but in model we already conveted to json during modification of _id as id, so only use exec to fulfill the promise and don't use lean it will conflict and return as _id

      .exec();
    return res.status(200).send(item);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { post: post, getAll, fetchById };
