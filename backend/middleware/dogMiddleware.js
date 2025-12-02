const dogSchema = require("../schema/dogSchema");

const validateDog = (req, res, next) => {
  const { error } = dogSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateDog;
