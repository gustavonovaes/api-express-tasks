const ApiError = require('../../support/apiError');

const taskController = {
  async index(req, res) {
    const tasks = await req.$models.Task.find({});
    res.status(200).json({ tasks });
  },

  async find(req, res) {
    const { id } = req.params;

    const task = await req.$models.Task.findById(id);
    if (!task) {
      throw ApiError.create(`Can not find task for id ${id}`, 404);
    }

    res.status(200).json({ task });
  },

  async create(req, res) {
    const task = await req.$models.Task.create(req.body);
    res.status(201).json({ task });
  },

  async update(req, res) {
    const { id } = req.params;

    const task = await req.$models.Task.findOneAndUpdate({ _id: id }, req.body);
    if (!task) {
      throw ApiError.create(`Can not find task for id ${id}`, 404);
    }

    res.status(200).json({ task });
  },

  async delete(req, res) {
    const { id } = req.params;

    const task = await req.$models.Task.findByIdAndDelete(id);
    if (!task) {
      throw ApiError.create(`Can not find task for id ${id}`, 404);
    }

    return res.status(204).json({ task });
  }
};

module.exports = taskController;