require('dotenv').config()

//security packages
//const helmet = require('helmet');
const cors = require('cors');
//const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
                               
//routes
const express = require('express');         
const app = express();         

const connectDb = require('./db/connect')
const authenticationMiddleware = require('./middleware/authUser')

//routers
const authRoute = require('./routes/auth')
const dashRoute = require('./routes/chat')
const healthRoute=require('./routes/health')
const placeRoute=require('./routes/findPlace')
const profileRoute=require('./routes/profile')

//error Handler
const notFound = require('./middleware/notFound')
const errorHandlerMiddleware = require('./middleware/errorHandler')

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
//app.use(helmet());
app.use(cors());
//app.use(xss());

//routes
app.get("/", (req, res) => {
  res.send("Your Mental Health App")
})          
        
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/dash', authenticationMiddleware);
app.use('/api/v1/dash', dashRoute);
app.use('/api/v1/dash/places',placeRoute);
app.use('/api/v1/dash/profile',profileRoute);        
app.use('/api/v1/dash/health',healthRoute);
                                              
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;
              
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`app is listeing on port ${port}`)
    })

  } catch (error) {
    console.log("error in app.js", error)
  }
}
start()      