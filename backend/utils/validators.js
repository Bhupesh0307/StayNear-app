import Joi from "joi";


export const registerValidator = (data) => {
const schema = Joi.object({
name: Joi.string().min(2).max(100).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required(),
role: Joi.string().valid("owner", "renter").optional(),
});
return schema.validate(data);
};


export const loginValidator = (data) => {
const schema = Joi.object({
email: Joi.string().email().required(),
password: Joi.string().required(),
});
return schema.validate(data);
};