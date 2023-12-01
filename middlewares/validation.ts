import validationSchema from "../helpers/validationSchema";

export default {
    userValidation:async (req,res,next)=>{
        try {
            await validationSchema.validateAsync(req.body)
            next()     
        } catch (error) {
            if(error.isJoi==true){
                error.status = 422
                res.status(422).json({errMsg:error.message})
            }
            console.log(error.message);
        }
    }
}