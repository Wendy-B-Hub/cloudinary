# cloudinary-react

## upload images to cloudinary

```javascript

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)
    try {
      const url=`${BASE_URL}/api/upload`
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ data: base64EncodedImage }),
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error(err);
        setErrMsg('Something went wrong!');
    }
};

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

```


## retrieve images from cloudinary

```javascript
  const [imageIds,setImageIds]=useState();

  const loadImages=async()=>{
    try{
      const url=`${BASE_URL}/api/images`
      const res=await fetch(url);
      const data=await res.json();
      setImageIds(data);
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    loadImages();
  },[])
  
  
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

```

