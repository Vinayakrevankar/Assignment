const Joi = require('@hapi/joi');
const schema = Joi.object().keys({
    postId: Joi.number().required(),
    name: Joi.string().max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    body: Joi.string().max(250).required()
});

let validate = (obj)=>{

    return Joi.validate(obj, schema,{abortEarly: false});
}

module.exports = validate;