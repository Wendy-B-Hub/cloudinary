const express=require('express')
const app=express();
var cors = require('cors');
const {cloudinary}=require('./utils/cloudinary')

app.use(cors());
app.use(express.static('public'));
app.use(express.json({
  limit: '10mb' 
}));
app.use(express.urlencoded({extended:true}));


app.get('/api/images', async (req, res) => {
  const { resources } = await cloudinary.search
      // .expression('folder:ml_default')
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  console.log("resources",resources) 
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

// app.get('/api/images', async(req,res)=>{
//   const {resources}=await cloudinary.search
//       .expression('folder:ml_default')
//       .sort_by('public_id','desc')
//       .max_results(30)
//       .execute()
  
//   const publicIds=resources.map((file)=>file.public_id)   
//   console.log("resources",resources) 
//   console.log("publicIds",publicIds)
//   res.send(publicIds)
// })

app.post('/api/upload',async (req,res)=>{
  try{
    const fileStr=req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'ml_default',
  });
    console.log("uploadResponse",uploadResponse)
    res.json({msg:'image(s) has been successfully uploaded to cloudinary'})
  }catch(err){
    console.error(err)
    res.status(500).json({err:'something went wrong'})
  }
})

const port=process.env.PORT || 3000
app.listen(port,()=>{
  console.log(`listening to ${port} port`)
})