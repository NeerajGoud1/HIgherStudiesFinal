import Joi from "joi";

const examSchemaValidation = Joi.object({
  name: Joi.string().required(),
  rollNo: Joi.string().required(),
  branch: Joi.string().required(),
  mobileNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits.",
    }),
  email: Joi.string().email().required(),
  passedOutYear: Joi.number().required(),
  examType: Joi.string().required(),
  customExam: Joi.string().allow("", null),
  registrationNo: Joi.string().required(),
  score: Joi.number().required(),
});

const higherStudiesValidation = Joi.object({
  name: Joi.string().required(),
  rollNo: Joi.string().required(),
  branch: Joi.string().required(),
  mobileNo: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile number must be exactly 10 digits.",
    }),
  email: Joi.string().email().required(),
  passedOutYear: Joi.number().required(),
  customCourse: Joi.string().allow("", null),
  joiningInstituteName: Joi.string().required(),
  yearOfAdmission: Joi.number().required(),
  course: Joi.string().required(),
});

export { examSchemaValidation, higherStudiesValidation };
