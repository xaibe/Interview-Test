import prisma from "./client.js";
import express from "express";
const app = express();
import axios from "axios";

//****************************** Test Api ********************************
app.get("/", function (req, res) {
  res.send(
    "Welcome to the world of science fiction, conflicting theories, fantasies and some eccentric nerds!"
  );
});

//****************************** Function to fetch counties from Api's ********************************
async function fetchData() {
  return await axios.get("https://restcountries.com/v3.1/all");
}

//****************************** Get All Countries ********************************
app.get("/countries", async (req, res) => {
  const countries = await prisma.country.findMany({
    include:{language:true,
    currency:true}
  });
  res.json(countries);
});
//****************************** Get All Countries BY Name  ********************************
app.get("/country/:name", async (req, res) => {
  const name=req.params.name;
  console.log("name",name);
  const countries = await prisma.country.findMany({
    where:{name:name},
    select:{currency:true}
  });
  console.log("countries",countries);
  res.json(countries);
});
//****************************** Get All Countries by CCA2 ********************************
app.get("/country/:CCA2", async (req, res) => {
  const CCA2=req.params.CCA2;
  const countries = await prisma.country.findMany({
    where:{CCA2:CCA2},
    include:{language:true,
      currency:true}
  });
  res.json(countries);
});

//****************************** Get All Countries by CCA3 ********************************
app.get("/country/:CCA3", async (req, res) => {
  const CCA3=req.params.CCA3;
  const countries = await prisma.country.findMany({
    where:{CCA3:CCA3},
    include:{language:true,
      currency:true}
  });
  res.json(countries);
});
//****************************** Get All Countries by CCN3 ********************************
app.get("/country/:CCN3", async (req, res) => {
  const CCN3=req.params.CCN3;
  const countries = await prisma.country.findMany({
    where:{CCA3:CCA3},
    include:{language:true,
      currency:true}
  });
  res.json(countries);
});
//****************************** Get All Currencies by CCA2 ********************************
app.get("/country/currency/:CCA2", async (req, res) => {
  const CCA2=req.params.CCA2;
  console.log("CCA2",CCA2);
  const currencies = await prisma.country.findMany({
    where:{CCA2:CCA2.toString()},
    select:{currency:true}
  });
  console.log("Currencies",currencies);
  res.json(currencies);
});
//****************************** Get Countries Group By Region ********************************
app.get("/country/groupByRegion", async (req, res) => {
  
  const groupUsers = await prisma.country.groupBy({
    by: ['region'],
    include:{language:true,
      currency:true}
  })
  res.json(groupUsers);
});
//****************************** Get Countries Group By Languages ********************************
app.get("/country/groupByLanguages", async (req, res) => {
  
  const groupUsers = await prisma.country.groupBy({
    by: ['language'],
    include:{language:true,
      currency:true}
  })
  res.json(groupUsers);
});


//****************************** Save data api ********************************
app.get("/saveData", async function (req, res) {
  const result = await fetchData();
  result.data.forEach(async (element) => {
    const name = element.name.common;
    const CCA2 = element.cca2;
    const CCA3 = element.cca3;
    const CCN3 = element.ccn3;
    const region = element.region;
    const currencies = element.currencies;
    const languages = element.languages;
    const latlng = element.latlng;

    const result = await prisma.country.create({
      data: {
        name: name,
        CCA2: CCA2,
        CCA3: CCA3,
        CCN3: CCN3,
        region: region,
        latitude: latlng[0],
        longitude: latlng[1],
      },
    });

// ******************** To save languages ************************
     if(languages===null||languages===undefined){

     }else{
      const LanguageObjectSize=Object.keys(languages).length;
      for (let i = 0; i < LanguageObjectSize; i++) {

        const element = languages[Object.keys(languages)[i]];
     if(element){
      const languageCreated = await prisma.language.create({
        data: {
          name: element,
          countryId: result.id,
        },
      });

      
    }
       }
     }
// ****************************** To save Currencies ********************************
    if (currencies === null || currencies === undefined) {
    } else {
      const currenciesObjectSize = Object.keys(currencies).length;
      for (let i = 0; i < currenciesObjectSize; i++) {
        const currency = currencies[Object.keys(currencies)[i]];
        if(currency.name===undefined||currency.name===null){
          currency.name="";
       currency.symbol="";
          if(currency.symbol===undefined||currency.symbol===null){
            currency.name="";
            currency.symbol="";
          }
      }
        else{
        if(currency.symbol===undefined||currency.symbol===null){
          currency.name="";
          currency.symbol="";
          if(currency.name===undefined||currency.name===null){
       currency.name="";
       currency.symbol=""; 
      }
      }
        const currencyCreated = await prisma.currency.create({
          data: {
            name: currency.name,
            symbol: currency.symbol,
            countryId: result.id,
          },
        });
      }
      }
    }
   });

  res.send("Saved all data to the database");
});


app.use(express.json());
app.listen(3000, function () {
  console.log("SERVER STARTED ON localhost:3000");
});
