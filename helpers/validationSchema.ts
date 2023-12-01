import Joi from "joi"

const validationSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password:Joi.string().min(4).required()
})

export default validationSchema