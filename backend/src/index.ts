import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";



//listener&connectors
const PORT=process.env.PORT
connectToDatabase().then(()=>{
  app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT} & connected to DB`);
  })
}).catch(err=>{
  console.log(err)
})

