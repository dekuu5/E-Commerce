const dotenv =require('dotenv')
const app = require('./app')
const dbConnection = require('./config/dbconnect')

dotenv.config()

dbConnection();

const port = process.env.PORT || 3000;

// app.use ('/',(req,res)=>{
//     res.send("Hello from server sidee2e2e2e")
// })
app.listen(port,()=>{
    console.log(`server is running at port ${port} 🚀🚀`)
})