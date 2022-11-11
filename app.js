
import prisma from './client.js'
import express from 'express' 
const app= express();
import axios from 'axios'




app.get("/", function(req,res){
  res.send("Welcome to the world of science fiction, conflicting theories, fantasies and some eccentric nerds!")
});


async function makeOtherServiceCall() {
    return await axios.get('https://restcountries.com/v3.1/all');
  }

  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
  })
  

app.get("/test", async function(req,res){
 const result =await makeOtherServiceCall();
 result.data.forEach(async element => {
   
    const name=element.name.common;
    const CCA2= element.cca2;
    const CCA3= element.cca3;
    const CCN3= element.ccn3;
    const region= element.region;
    const currencies= element.currencies;

   const languages= element.languages;
   const latlng = element.latlng;
    
    // console.log("name",name);
    // console.log("CCA2",CCA2);
    // console.log("CCA3",CCA3);
    // console.log("CCN3",CCN3);
    // console.log("region",region);
    // console.log("Currencies",currencies);
  
    //  console.log("languages",languages);
    
    //  if(languages===null||languages===undefined){
      
    //  }else{
    //   const LanguageObjectSize=Object.keys(languages).length;
    //   for (let i = 0; i < LanguageObjectSize; i++) {
       
    //     const element = languages[Object.keys(languages)[i]];  
    //  console.log("element",element);
    //    }
    //  }

     if(currencies===null||currencies===undefined){
      
    }else{
     const currenciesObjectSize=Object.keys(currencies).length;
     for (let i = 0; i < currenciesObjectSize; i++) {
      console.log("currency of : ", name);
       const currency = currencies[Object.keys(currencies)[i]];  
    console.log("currency",currency);
    console.log("currency name",currency.name);
    console.log("currency symbol",currency.symbol);
      }
    }
    
    
    console.log("latlng",latlng);
    // const result = await prisma.country.create({
    //     data:{
    //      name:name,
    //     CCA2 :CCA2,
    //      CCA3 : CCA3,
    //     CCN3 : CCN3,
    //      region:region,
            
    // }})
    // console.log("result",result);
 });
//  const users = await prisma.user.findMany()
//     res.json(users)
//  console.log("result",result);
 res.send("completed");

 // axios.get("https://restcountries.com/v3.1/all")
    // .then(data => 
    //     console.log("data",data),
    //     res.json(data))
    //  .catch(err => 
    //     console.log("error",err)
    // res.secn(err)
    // );
    // res.render("./pages/plot");
  });

  app.use(express.json())
app.listen(3000, function(){
        console.log("SERVER STARTED ON localhost:3000");     
})