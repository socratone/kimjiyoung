import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  password2: Joi.ref('password'),

  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
})
  .with('password', 'password2');

export default schema;