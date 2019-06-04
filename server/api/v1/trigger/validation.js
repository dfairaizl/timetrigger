const Joi = require('../../validator');

module.exports = {
  trigger: {
    trigger: Joi.string().chrono().required(),
    run: Joi.object({
      type: Joi.any().valid('api_callback'),
      uri: Joi.string().uri().required(),
      payload: Joi.object()
    }).required()
  }
};
