const bcrypt = require('bcryptjs');

const ApiError = require("../../support/apiError");

const sessionController = {
  async create(req, res) {
    const { email, password } = req.body;

    const user = await req.$models.User.findOne({ email });
    if (user === null) {
      throw new ApiError('Invalid credentials', 401);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new ApiError('Wrong password', 401);
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name
      }
    };

    const token = req.$jwt.sign(payload);

    res.status(200).json({ token });
  }
}

module.exports = sessionController;