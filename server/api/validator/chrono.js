const chrono = require("chrono-node");
const Joi = require("joi");

const customJoi = Joi.extend(joi => ({
  base: joi.string(),
  name: "string",
  language: {
    chrono: "needs to be a valid date-like expression"
  },
  rules: [
    {
      name: "chrono",
      validate(params, value, state, options) {
        const parsed = chrono.parseDate(value);

        if (!parsed) {
          return this.createError(
            "string.chrono",
            { v: value },
            state,
            options
          );
        }

        return parsed;
      }
    }
  ]
}));

module.exports = customJoi;
