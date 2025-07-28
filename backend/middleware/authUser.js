const jwt=require('jsonwebtoken')

const {UnauthenticatedError}=require('../error')

const authenticationMiddleware = (req,res,next) => {
      //check header
      const authHeader=req.headers.authorization
      //console.log('authheader is ',authHeader)
      if(!authHeader || !authHeader.startsWith('Bearer')){
         throw new UnauthenticatedError('Authentication Invalid')
      }
             
      const token=authHeader.split(' ')[1]
     // console.log('token is',token)
    try
      {
          const payload=jwt.verify(token,process.env.JWT_SECRET)
          //attach the user to the Notes Route
         // console.log('payload is',payload)
          req.user={userId:payload.userId,name:payload.name}
          next()
      }
      catch(error){
         throw new UnauthenticatedError('Authentication Invalid')
      }
}
module.exports=authenticationMiddleware    


