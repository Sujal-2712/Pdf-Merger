const express = require('express')
const path=require('path');
const app = express()
const port = 3000
const multer  = require('multer')
const {mergerPdfs}= require('./merge')
const upload = multer({dest:'uploads/'})

//serving static files using express  -->  static means css ,js and html files
app.use('/static', express.static('public'))



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'templates/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

app.post('/merge', upload.array('pdfs', 2),  async function (req, res, next) {
  console.log(req.files.path);
  let d=await mergerPdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path));
  
  res.redirect(`http://localhost:3000/static/${d}.pdf`);
})