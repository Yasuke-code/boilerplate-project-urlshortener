require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({extended:true}))

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}
// {
//   "original_url": "https://www.google.com",
//   "short_url": 1
//   }
const  originalUrls= []
const shortUrls= []

app.post('/api/shorturl',(req,res)=>{

  const url=req.body.url;
  const foundUrl=originalUrls.indexOf(url)

  if(foundUrl<0){
    originalUrls.push(url)
    shortUrls.push(shortUrls.length)
    return res.json({
              original_url:url,
              short_url:shortUrls[shortUrls.length-1]
            })
  }

  return res.json({
    original_url:url,
    short_url:shortUrls[foundUrl]
  })

});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
