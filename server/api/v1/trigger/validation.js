const Joi = require('../../validator');

module.exports = {
  trigger: {
    body: {
      trigger: Joi.string().chrono().required(),
      run: Joi.array().items([
        Joi.object({
          type: Joi.any().valid('api_callback'),
          uri: Joi.string().uri().required(),
          payload: Joi.object()
        }).required()
      ]).required()
    }
  }
};
