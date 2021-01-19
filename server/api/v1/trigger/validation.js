const chrono = require("chrono-node");
const { Joi } = require('express-validation');

module.exports = {
  body: Joi.object({
    trigger: Joi.string()
      // .custom((value, helper) => {
      //   const parsed = chrono.parseDate(value);
      //
      //   if (!parsed) {
      //     helper.message('needs to be a valid date-like expression');
      //   }
      //
      //   return value;
      // })
      .required()
  })
}

// module.exports = {
//   body: {
//     ,
//     run: Joi.object({
//       type: Joi.any().valid("api_callback"),
//       uri: Joi.string()
//         .uri()
//         .required(),
//       payload: Joi.object()
//     }).required()
//   }
// };
