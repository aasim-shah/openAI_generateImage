require('dotenv').config()
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const { urlencoded } = require('express')

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const app = express()

const port = process.env.PORT || 8000;
app.use(express.json())
app.use('/' , express.static(__dirname + '/public'))
app.set('view engine' , 'ejs')
app.use(urlencoded({extended : true}))


app.get('/' , async(req ,res) =>{
    res.send('Hoomepage')
})

app.get('/generate' , (req , res) =>{
    res.render('generate' , {data : null})
})


app.post('/generate' , async (req ,res)=>{
    const {query , size } = req.body
    console.log(query , size)
    try {
        const response = await openai.createImage({
            prompt: `${query}`,
            n: 1,
            size: `${size}`,
          });
        
          image_url = response.data.data[0].url;
         res.render('generate' , {data :image_url})

    } catch (error) {
        if(error.response.status === 400){
            return    res.redirect('/generate')
              }
        console.log()   
    }
      
})





app.listen(port , ()=>{
    console.log(`server is running oon http://localhost:${port}`)
})