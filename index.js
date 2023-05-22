const translator = require("translate");
const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require('fs');
var firebase = require("firebase");
const { response } =  require("express");
const advesoryjson = require("./mlimi_english.json")
const advisorychichewajson = require("./mlimi_chichewa(1).json")
const weatherjson = require("./ussd-be4c3-default-rtdb-export.json")
const languagejson = require("./language.json")


//firebase configuration for weather db

const firebaseConfig = {
  apiKey: "AIzaSyCgCBxz9u9Q-IKgBZk8mlJUw2icHa0aqU4",

  authDomain: "ussd-be4c3.firebaseapp.com",

  databaseURL: "https://ussd-be4c3-default-rtdb.firebaseio.com",

  projectId: "ussd-be4c3",

  storageBucket: "ussd-be4c3.appspot.com",

  messagingSenderId: "195880245900",

  appId: "1:195880245900:web:25477a933deae90d1339a9",

  measurementId: "G-9JEGRHY1GM",
};

const registrationconfig = {
  apiKey: "AIzaSyBTSs9vQ39HhpH8Y4HR4X3OjkoO0BTv5ew",

  
  authDomain: "formdata-f4646.firebaseapp.com",

  databaseURL: "https://formdata-f4646-default-rtdb.firebaseio.com",

  projectId: "formdata-f4646",

  storageBucket: "formdata-f4646.appspot.com",

  messagingSenderId: "564962263653",

  appId: "1:564962263653:web:5e74ecce556368bf9f7c8c",
};

const regiintialize = firebase.initializeApp(
  registrationconfig,
  "registration"
);

const regdb = regiintialize.database();

let phone = `+265995537312`;
const regref = regdb.ref("sectors");
const newregref = regdb.ref("users");

let mylanguage ='chichewa'



//inintilizing the app
firebase.initializeApp(firebaseConfig);

//getting database
var db = firebase.database();
const ref = db.ref("weather/districts");
phone ='0993347204'


var num = '10'
console.log(`${num}`-1)

//.............................declaring global advisory variables for english..................................
namesss = advesoryjson.sectors[0].categories[0].products
namesss.forEach(element => {
  //console.log(element.name)
  
});
const categories =advesoryjson.sectors
const categoriesarray =[]
categories.forEach(element => {
  categoriesname =element.id + '.' + element.name
  categoriesarray.push(categoriesname)
});

categoriesnametostring = categoriesarray.toString()
categoriesnamejoin = categoriesnametostring.replace(/,/g, '\n')



//......................global chichewa advisories variables
var chichewasectors = advisorychichewajson.sectors

//looping throug sectors to get all advisory product names
var chichewaadvisoryproductnamearray = []
chichewasectors.forEach(element => {
  chichewaadvisoryproductnames = element.id + '.' + element.name
  chichewaadvisoryproductnamearray.push(chichewaadvisoryproductnames)
  
});

//converting the array to string
chichewaadvisoryproductnamestostring = chichewaadvisoryproductnamearray.toString()
chichewaadvisoryproductnamesjoin = chichewaadvisoryproductnamestostring.replace(/,/g , '\n')
//console.log(chichewaadvisoryproductnamesjoin)

//working on subcatigory category of specic product name
var specificproduct = chichewasectors[0].categories[0].products
//console.log(specificproduct)







//........................working on weather.......................................
const weatherdistricts = weatherjson.weather.districts
const weatherdistrictsarray = []
weatherdistricts.forEach(element => {
  weatherdistrictsarray.push(element.id + '.' + element.name) 
});

//changing weatherdistrictsarray to string
const waetherdstrictstostring = weatherdistrictsarray.toString()
const weatherdistrictsjoin = waetherdstrictstostring.replace(/,/g , '\n')

//working on weekly temprature
const temperature = weatherdistricts[0].weeklyTemps[0]


//districts for registration
registrationdistricts = ['salima','zomba','mulanje','mchinji','mzimba','blantyre','lilongwe','kasungu',
'balaka','machinga','rumphi','nkhatabay','dwangwa','nkhotakota','chirazulu','ntchitsi','mangochi',
'nsanje','neno','karonga','chitipa','mulanje','thyolo']

// Read the existing JSON data from the file
const languagejsonfile = fs.readFileSync('language.json');
const obj = JSON.parse(languagejsonfile);

// Check if the phonenumber already exists in the "languages" array
const existingLanguage = obj.languages.find(language => language.phonenumber === phone);

if (!existingLanguage) {
  // Add a new object to the "languages" array
  const newLanguage = {
    name: 'English',
    phonenumber: phone
  };
  obj.languages.push(newLanguage);

  // Convert the modified object back to JSON format
  const json = JSON.stringify(obj);

  // Write the updated JSON data back to the file
  fs.writeFile('language.json', json, (err) => {
    if (err) throw err;
    //console.log('Data updated in language.json');
  });
} else {
  //console.log('Phone number already exists in language.json');
}







const phoneNumber = "0996691384";
const languageJSON = fs.readFileSync('language.json');

let language = "";

for (let i = 0; i < obj.languages.length; i++) {
  if (obj.languages[i].phonenumber === phoneNumber) {
    language = obj.languages[i].name;
    break;
  }
}

//console.log(`Language for phone number ${phoneNumber} is ${language}`);


// checking if numbers exist in the database of users

var checknum ='+265995434579'

newregref.child('+265995434579').once('value')
  .then((snapshot) => {
    var numbers = snapshot.val();
   if(numbers===null){
    console.log('you have not registered')
   }
   else{
    console.log('you are registered')
   }

  });





const port = process.env.PORT || 3030;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("*", (req, res) => {
  res.send("USSD deployed successfully");
});

app.post("*", (req, res) => {
  let { sessionId, serviceCode, phoneNumber, text, response } = req.body;
  //creating an array of data
  let dataarray = text.split("*");
  let name;
  let surname;

  //array length
  let dataarraysize = dataarray.length;


//............. Read the existing JSON data from the file.........................
const languagejsonfile = fs.readFileSync('language.json');
const obj = JSON.parse(languagejsonfile);

//.................. Check if the phonenumber already exists in the "languages" array.............
const existingLanguage = obj.languages.find(language => language.phonenumber === phoneNumber);

if (!existingLanguage) {
  const newLanguage = {
    name: 'English',
    phonenumber: phoneNumber
  };
  
  obj.languages.push(newLanguage);
  
  // Convert the modified object back to JSON format
  const json = JSON.stringify(obj);
  console.log(json)
  
  // Write the updated JSON data back to the file
  fs.writeFile('language.json', json, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}


//....................getting language name from the json file

for (let i = 0; i < obj.languages.length; i++) {
  if (obj.languages[i].phonenumber === phoneNumber) {
    language = obj.languages[i].name;
    break;
  }
}

//console.log(`Language for phone number ${phoneNumber} is ${language}`);
 
mainmenuselector = ['1','2','3']
  //......................................first menu...........................................
  if (text == "" && language == "English") {
    
    response = `CON Welcome to Farm Radio Trust
      1.Register
      2.Main Menu
      3.Help`

  }
 
  else if( text=="" && language == "Chichewa"){
    response = `CON Takulandirani ku Farm Radio Trust
    1.Lembetsani
    2.menyu yayikulu
    3.chithandizo
    `;

  }
  

//..............................................English registration..............................................
  else if (text == "1" && language =="English") {
    response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
      `;

  }

   
  else if(text=='1*1' && language =="English"){
    
   registrationcategory = ['farmer','buyer']
    response = `CON choose registration category
    1.farmer
    2.buyer`
  }

  else if(text == '1*1*1'){
    response=`CON Select your District
    1. Salima
    2. Zomba
    3. Mulanje
    4. Nchinji
    5. Mzimba
    6. Blantyre
    7. Lilongwe
    8. kasungu
    9. Balaka
    0. Next`

}


else if(text=='1*1*1*0' && language =="English"){

  response=`CON Select your District
  10. Machinga
  11. Rumphi
  12. Nkhatabay
  13. Dwangwa
  14. nkhotakota
  15. chirazulu
  16. Ntchitsi
  17. Mangochi
  18. Nsanje
  19. Neno
  0. Next
  
  `

}

else if(text=='1*1*1*0*0' && language =="English"){

  

  response=`CON Select your District
  20. Karonga
  21. Chitipa
  22. Mulanje
  23. thyolo

  `

}

  
else if(dataarraysize==4 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0' &&  language =="English"){

  response= `CON Enter Name Of a T/A(Traditional Authority)
  `
}


else if(dataarraysize==5 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[4]!='' && language =="English"){

  response= `CON Enter the NAme of Group Village Head  `

}


else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1'&& dataarray[2]=='1' && dataarray[3]!='0' && dataarray[5]!='' && language =="English"){
  
  farmersvariety = ['Maize','Beans','soya Beans']

  response= `CON Enter the Crop Variate of Your Farming 
  1. Maize
  2. Beans
  3. Soya Beans `

}


else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1'   && dataarray[2]=='1' && dataarray[3]!='0'  && dataarray[6]!='' && language =="English"){

  response= `CON Enter Your Full Name `
  
}

else if(dataarraysize==8 && dataarray[0]==1 && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[7]!='' && language =="English"){
  
  farmersgender = ['Male','Female']

  response = `CON choose your gender
  1.Male
  2.Female`

}


else if(dataarraysize==9 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[8]!=='' && dataarray[2]!='0' && language =="English"){

  farmersagerange = ['0-18','19-25','26-40','41-60','60 above']

  response = `CON choose your age range
  1. 0-18
  2. 19-25
  3. 26-40
  4. 41-60
  5. 61 above
  `
}


else if(dataarraysize==10 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[9]!='' && language =="English"){

  response= `CON Enter Your GroupName `
  
}


else if(dataarraysize==11 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[10]!='' && language =="English"){
  
  farmerposition = ['chairman/chairlady','secretary','tresurer','member']

  response= `CON choose your postion
  1. chairman/chairlady 
  2. secretary
  3. tresurer
  4. member`
  
}
  
else if (dataarraysize == 12 && dataarray[0] == "1" && dataarray[11]!='' && dataarray[2]=='1' && dataarray[3]!='0' && language =="English") {
  regcategory              =`${--dataarray[2]}`
  regdstrictindex           =`${dataarray[3]}`
  regvarietyindex           =`${--dataarray[6]}`
  regenderindex             =`${--dataarray[8]}`
  regageindex               =`${--dataarray[9]}`
  regpostionindex           =`${--dataarray[11]}`

  Registrationcategory      =registrationcategory[regcategory]
  Registratindistrict       = registrationdistricts[regdstrictindex]
  RegistrationTA            = `${dataarray[4]}`
  RegistratinGVH            = `${dataarray[5]}`
  Registratinfarnvariety    =farmersvariety[regvarietyindex]
  Registrationfullname      =`${dataarray[7]}`
  Registrationgender        =farmersgender[regenderindex]
  Registrationagerange      =farmersagerange[regageindex]
  Registrationgroupname     =`${dataarray[10]}`
  Registrationfarmerpositon =farmerposition[regpostionindex]
  Registrationphonenumber   =phoneNumber
 
  /*
  newregref.child(phoneNumber).set({
    userdistrict:Registratindistrict   ,
    userTA:RegistrationTA,
    userGVH:RegistratinGVH ,
    userfarmvariety:Registratinfarnvariety ,
    userfullname:Registrationfullname ,
    usergender:Registrationgender ,
    useragerange:Registrationagerange,
    usergroupname:Registrationgroupname ,
    userpostion:Registrationfarmerpositon,
    userPhonenumber:phoneNumber

  })
  */

  response = `END Your number ${phoneNumber} have been successfully registered
  1.${Registratindistrict}
  2.${RegistrationTA}
  3.${RegistratinGVH}
  4.${Registratinfarnvariety}
  5.${Registrationfullname}
  6.${Registrationfarmerpositon}
  7.${phoneNumber}
  8.${Registrationgender}
  9.${Registrationagerange }
  10.${Registrationcategory }
  
  `;

  } 


  //....................if clicked first next on districts...................................................
    
else if(dataarraysize==5 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0'  && dataarray[4]!='' &&  language =="English"){

  response= `CON Enter Name Of a T/A(Traditional Authority)
  `
}


else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0'  && dataarray[5]!='' && language =="English"){

  response= `CON Enter the NAme of Group Village Head  `

}


else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[6]!='' && language =="English"){
  
  farmersvariety = ['Maize','Beans','soya Beans']

  response= `CON Enter the Crop Variate of Your Farming 
  1. Maize
  2. Beans
  3. Soya Beans `

}


else if(dataarraysize==8 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0'  && dataarray[7]!='' && language =="English"){

  response= `CON Enter Your Full Name `
  
}

else if(dataarraysize==9 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[8]!='' && language =="English"){
  
  farmersgender = ['Male','Female']

  response = `CON choose your gender
  1.Male
  2.Female`

}


else if(dataarraysize==10 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[9]!=='' && language =="English"){

  farmersagerange = ['0-18','19-25','26-40','41-60','60 above']

  response = `CON choose your age range
  1. 0-18
  2. 19-25
  3. 26-40
  4. 41-60
  5. 61 above
  `
}


else if(dataarraysize==11 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[10]!='' && language =="English"){

  response= `CON Enter Your GroupName `
  
}


else if(dataarraysize==12 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[11]!='' && language =="English"){
  
  farmerposition = ['chairman/chairlady','secretary','tresurer','member']


  response= `CON choose your postion
  1. chairman/chairlady 
  2. secretary
  3. tresurer
  4. member`
  
}
  
else if (dataarraysize == 13 && dataarray[0] == "1" && dataarray[2]=='1' && dataarray[3]=='0' &&  dataarray[12]!='' && language =="English") {
 
  secregcategory              =`${--dataarray[2]}`
  secregdstrictindex          =`${--dataarray[4]}`
  secregvarietyindex          =`${--dataarray[7]}`
  secregenderindex            =`${--dataarray[9]}`
  secregageindex              =`${--dataarray[10]}`
  secregpostionindex          =`${--dataarray[12]}`
 

  

  Registrationcategory         =registrationcategory[secregcategory]
  Registratindistrict          = registrationdistricts[secregdstrictindex]
  RegistrationTA               = `${dataarray[5]}`
  RegistratinGVH               = `${dataarray[6]}`
  Registratinfarnvariety       = farmersvariety [secregvarietyindex]
  Registrationfullname         =`${dataarray[8]}`
  Registrationgender           =farmersgender[secregenderindex]
  Registrationagerange         =farmersagerange[secregageindex]
  Registrationgroupname        =`${dataarray[11]}`
  Registrationfarmerpositon    =farmerposition[secregpostionindex]
  Registrationphonenumber      =phoneNumber

  
/*
  newregref.child(phoneNumber).set({
    userdistrict:Registratindistrict,
    userTA:RegistrationTA,
    userGVH:RegistratinGVH ,
    userfarmvariety:Registratinfarnvariety ,
    userfullname:Registrationfullname ,
    usergender:Registrationgender ,
    useragerange:Registrationagerange,
    usergroupname:Registrationgroupname ,
    userpostion:Registrationfarmerpositon,
    userPhonenumber:phoneNumber

  })
 */ 
  


  response = `END  Your number ${phoneNumber} have been successfully registered
  1.${Registratindistrict}
  2.${RegistrationTA}
  3.${RegistratinGVH }
  4.${Registratinfarnvariety}
  5.${Registrationfullname}
  6.${Registrationgender }
  7.${Registrationagerange}
  8.${Registrationgroupname}
  9.${Registrationfarmerpositon}
  10.${Registrationphonenumber}
  11.${Registrationcategory}
  `;

  } 

  //.........................if the second next is clicked............................................
   
  else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[5]!='' &&  language =="English"){

    response= `CON Enter Name Of a T/A(Traditional Authority)
    `
  }
  
  
  else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[6]!='' && language =="English"){
  
    response= `CON Enter the NAme of Group Village Head  `
  
  }
  
  
  else if(dataarraysize==8 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[7]!='' && language =="English"){
    
    farmersvariety = ['Maize','Beans','soya Beans']
  
    response= `CON Enter the Crop Variate of Your Farming 
    1. Maize
    2. Beans
    3. Soya Beans `
  
  }
  
  
  else if(dataarraysize==9 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[8]!='' && language =="English"){
  
    response= `CON Enter Your Full Name `
    
  }
  
  else if(dataarraysize==10 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[9]!='' && language =="English"){
    
    farmersgender = ['Male','Female']
  
    response = `CON choose your gender
    1.Male
    2.Female`
  
  }
  
  
  else if(dataarraysize==11 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[10]!=='' && language =="English"){
  
    farmersagerange = ['0-18','19-25','26-40','41-60','60 above']
  
    response = `CON choose your age range
    1. 0-18
    2. 19-25
    3. 26-40
    4. 41-60
    5. 61 above
    `
  }
  
  
  else if(dataarraysize==12 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[11]!='' && language =="English"){
  
    response= `CON Enter Your GroupName `
    
  }
    
  
  else if(dataarraysize==13 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[4]=='0' && dataarray[12]!='' && language =="English"){
    
    farmerposition = ['chairman/chairlady','secretary','tresurer','member']
  
    response= `CON choose your postion
    1. chairman/chairlady 
    2. secretary
    3. tresurer
    4. member`
    
  }
    
  else if (dataarraysize == 14 && dataarray[0] == "1" && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[5]!='0' &&  dataarray[13]!='' && language =="English") {

    lastregcategory              =`${--dataarray[2]}`
    lastregdstrictindex          =`${--dataarray[5]}`
    lastregvarietyindex          =`${--dataarray[8]}`
    lastregenderindex            =`${--dataarray[10]}`
    lastregageindex              =`${--dataarray[11]}`
    lastregpostionindex          =`${--dataarray[13]}`
  
    Registrationcategory      =registrationcategory[lastregcategory]
    Registratindisrict        = registrationdistricts[lastregdstrictindex]
    RegistrationTA            = `${dataarray[6]}`
    RegistratinGVH            = `${dataarray[7]}`
    Registratinfarnvariety    =farmersvariety[lastregvarietyindex]
    Registrationfullname      =`${dataarray[9]}`
    Registrationgender        =farmersgender[lastregenderindex]
    Registrationagerange      =farmersagerange[lastregageindex]
    Registrationgroupname     =`${dataarray[12]}`
    Registrationfarmerpositon =farmerposition[lastregpostionindex]
    Registrationphonenumber   =phoneNumber


/*
    newregref.child(phoneNumber).set({
      userdistrict:Registratindisrict  ,
      userTA:RegistrationTA,
      userGVH:RegistratinGVH ,
      userfarmvariety:Registratinfarnvariety ,
      userfullname:Registrationfullname ,
      usergender:Registrationgender ,
      useragerange:Registrationagerange,
      usergroupname:Registrationgroupname ,
      userpostion:Registrationfarmerpositon,
      userPhonenumber:phoneNumber
  
    })
*/
  
      response = `END END your number ${phoneNumber} have been successfully registered
      1.${Registratindisrict}
      2.${RegistrationTA}
      3.${RegistratinGVH }
      4.${Registratinfarnvariety}
      5.${Registrationfullname}
      6.${Registrationgender }
      7.${Registrationagerange}
      8.${Registrationgroupname}
      9.${Registrationfarmerpositon}
      10.${Registrationphonenumber}
      11.${Registrationcategory}
      `;
  
    } 
  
   



  //..................................farmer chichewa registration............................................
   else if (text == "1" && language == "Chichewa") {
    response = `CON Takulandilani ku ntchito za Kulembetsa ku Mlimi. 
        
        1. Yambani Kulembetsa
        0. Main Menu
      `;

  }

  else if(text=='1*1'  && language == "Chichewa"){
    
    registrationcategory = ['farmer','buyer']
     response = `CON sankhani mtundu lolembetsa
     1.Mlimi
     2.Ogula zokolora`
   }

  else if(text=='1*1*1' && language == "Chichewa"){

    chichewaregistrationdistricts = ['salima','zomba','mulanje','mchinji','mzimba','blantyre','lilongwe','kasungu','balaka','machinga','rumphi','nkhatabay','dwangwa','nkhotakota','chirazulu','ntchitsi','mangochi','nsanje','neno','karonga','chitipa','mulanje','thyolo']

    response=`CON Sankhani Boma
    1. Salima
    2. Zomba
    3. Mulanje
    4. Nchinji
    5. Mzimba
    6. Blantyre
    7. Lilongwe
    8. kasungu
    9. Balaka
    0. Next`

}


else if(text=='1*1*1*0' && language == "Chichewa"){

  chichewaregistrationdistricts = ['salima','zomba','mulanje','mchinji','mzimba','blantyre','lilongwe','kasungu','balaka','machinga','rumphi','nkhatabay','dwangwa','nkhotakota','chirazulu','ntchitsi','mangochi','nsanje','neno','karonga','chitipa','mulanje','thyolo']

  response=`CON Sankhani Boma
  10. Machinga
  11. Rumphi
  12. Nkhatabay
  13. Dwangwa
  14. nkhotakota
  15. chirazulu
  16. Ntchitsi
  17. Mangochi
  18. Nsanje
  19. Neno
  0. Next

  `

}

else if(text=='1*1*1*0*0' && language == "Chichewa"){

  chichewaregistrationdistricts = ['salima','zomba','mulanje','mchinji','mzimba','blantyre','lilongwe','kasungu','balaka','machinga','rumphi','nkhatabay','dwangwa','nkhotakota','chirazulu','ntchitsi','mangochi','nsanje','neno','karonga','chitipa','mulanje','thyolo']

  response=`CON Sankhani Boma
  20. Karonga
  21. Chitipa
  22. Mulanje
  23. thyolo

  `

}

  
else if(dataarraysize==4 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='0'  && language == "Chichewa"){

  response= `CON lembani zina la a T/A(Traditional Authority)
  `
}


else if(dataarraysize==5 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]!='' && dataarray[4]!='' && language == "Chichewa"){

  response= `CON lembani zina la a  Group Village Head anu  `

}


else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1'  && dataarray[5]!='' && language == "Chichewa"){

  farmersvariety = ['Maize','Beans','soya Beans']

  response= `CON sankhani zomwe mumalima
  1. chimanga
  2. nyemba
  3. Soya `

}


else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1'   && dataarray[2]=='1' && dataarray[6]!='' && language == "Chichewa"){

  response= `CON lembani zina lanu lonse `
  
}

else if(dataarraysize==8 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[7]!='' && language == "Chichewa"){
  
  farmersgender = ['Male','Female']

  response = `CON sankhani jenda
  1.Male
  2.Female`

}


else if(dataarraysize==9 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[8]!=='' && language == "Chichewa"){
  
  farmersagerange = ['0-18','19-25','26-40','41-60','60 above']

  response = `CON sankhani zaka zanu
  1. 0-18
  2. 19-25
  3. 26-40
  4. 41-60
  5. 61 above
  `
}
   

else if(dataarraysize==10 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[9]!='' && language == "Chichewa"){

  response= `CON Lembani zina la group yanu `
  
}


else if(dataarraysize==11 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[10]!='' && language == "Chichewa"){
  
  farmerposition = ['chairman/chairlady','secretary','tresurer','member']

  response= `CON sankhani udindo wanu
  1. chairman/chairlady 
  2. secretary
  3. tresurer
  4. member`
  
}
  
else if (dataarraysize == 12 && dataarray[0] == "1" && dataarray[2]=='1' && dataarray[3]!='0' && dataarray[11]!='' && language == "Chichewa") {

  regcategory               =`${--dataarray[2]}`
  regdstrictindex           =`${--dataarray[3]}`
  regvarietyindex           =`${--dataarray[6]}`
  regenderindex             =`${--dataarray[8]}`
  regageindex               =`${--dataarray[9]}`
  regpostionindex           =`${--dataarray[11]}`


  Registrationcategory      =registrationcategory[regcategory]
  Registratindisrict        = registrationdistricts[regdstrictindex]
  RegistrationTA            = `${dataarray[4]}`
  RegistratinGVH            = `${dataarray[5]}`
  Registratinfarnvariety    =farmersvariety[regvarietyindex]
  Registrationfullname      =`${dataarray[7]}`
  Registrationgender        =farmersgender[regenderindex]
  Registrationagerange      =farmersagerange[regageindex]
  Registrationgroupname     =`${dataarray[10]}`
  Registrationfarmerpositon =farmerposition[regpostionindex]
  Registrationphonenumber   =phoneNumber

/*
  newregref.child(phoneNumber).set({
    userdistrict:Registratindisrict  ,
    userTA:RegistrationTA,
    userGVH:RegistratinGVH ,
    userfarmvariety:Registratinfarnvariety ,
    userfullname:Registrationfullname ,
    usergender:Registrationgender ,
    useragerange:Registrationagerange,
    usergroupname:Registrationgroupname ,
    userpostion:Registrationfarmerpositon,
    userPhonenumber:phoneNumber

  })
*/
    response = `END mwalembetsa bwino pa nambala yanu ya ${phoneNumber}
    1.${Registratindisrict}
    2.${RegistrationTA}
    3.${RegistratinGVH }
    4.${Registratinfarnvariety}
    5.${Registrationfullname}
    6.${Registrationgender }
    7.${Registrationagerange}
    8.${Registrationgroupname}
    9.${Registrationfarmerpositon}
    10.${Registrationphonenumber}
    11.${Registrationcategory}
   `;
    
  }

  //....................if clicked first next on districts...................................................
    
else if(dataarraysize==5 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && language == "Chichewa"){

  response= `CON lembani zina la a T/A(Traditional Authority)
  `
}


else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[5]!='' && language == "Chichewa"){

  response= `CON lembani zina la a  Group Village Head anu  `

}


else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[6]!='' && language == "Chichewa"){
  
  farmersvariety = ['Maize','Beans','soya Beans']

  response= `CON sankhani zomwe mumalima 
  1. Maize
  2. Beans
  3. Soya Beans `

}


else if(dataarraysize==8 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0'  && dataarray[7]!='' && language == "Chichewa"){

  response= `CON lembani zina lanu lonse `
  
}

else if(dataarraysize==9 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[8]!='' && language == "Chichewa"){
  
  farmersgender = ['Male','Female']

  response = `CON sankhani jenda
  1.Male
  2.Female`

}


else if(dataarraysize==10 && dataarray[0]==1 && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[9]!=='' && language == "Chichewa"){

  farmersagerange = ['0-18','19-25','26-40','41-60','60 above']

  response = `CON sankhani zaka zanu
  1. 0-18
  2. 19-25
  3. 26-40
  4. 41-60
  5. 61 above
  `
}


else if(dataarraysize==11 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[10]!='' && language == "Chichewa"){

  response= `CON Lembani zina la group yanu `
  
}


else if(dataarraysize==12 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' && dataarray[11]!='' && language == "Chichewa"){
  
  farmerposition = ['chairman/chairlady','secretary','tresurer','member']

  response= `CON sankhani udindo wanu
  1. chairman/chairlady 
  2. secretary
  3. tresurer
  4. member`
  
}
  
else if (dataarraysize == 13 && dataarray[0] == "1" && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]!='0' &&  dataarray[12]!='' && language == "Chichewa") {

  secregcategory              =`--${--dataarray[2]}`
  secregdstrictindex          =`${--dataarray[4]}`
  secregvarietyindex          =`${--dataarray[7]}`
  secregenderindex            =`${--dataarray[9]}`
  secregageindex              =`${--dataarray[10]}`
  secregpostionindex          =`${--dataarray[12]}`


  Registrationcategory        =registrationcategory[secregcategory]
  Registratindisrict          = registrationdistricts[secregdstrictindex]
  RegistrationTA              = `${dataarray[5]}`
  RegistratinGVH              = `${dataarray[6]}`
  Registratinfarnvariety      =farmersvariety[secregvarietyindex]
  Registrationfullname        =`${dataarray[8]}`
  Registrationgender          =farmersgender[secregenderindex]
  Registrationagerange        =farmersagerange[secregageindex]
  Registrationgroupname       =`${dataarray[11]}`
  Registrationfarmerpositon   =farmerposition[secregpostionindex]
  Registrationphonenumber     =phoneNumber

/*
  newregref.child(phoneNumber).set({
    userdistrict:Registratindisrict  ,
    userTA:RegistrationTA,
    userGVH:RegistratinGVH ,
    userfarmvariety:Registratinfarnvariety ,
    userfullname:Registrationfullname ,
    usergender:Registrationgender ,
    useragerange:Registrationagerange,
    usergroupname:Registrationgroupname ,
    userpostion:Registrationfarmerpositon,
    userPhonenumber:phoneNumber

  })
  */

    response = `END mwalembetsa bwino pa nambala yanu ya ${phoneNumber}
    1.${Registratindisrict}
    2.${RegistrationTA}
    3.${RegistratinGVH }
    4.${Registratinfarnvariety}
    5.${Registrationfullname}
    6.${Registrationgender }
    7.${Registrationagerange}
    8.${Registrationgroupname}
    9.${Registrationfarmerpositon}
    10.${Registrationphonenumber}
    11.${Registrationcategory}
    `;

  } 

  //.........................if the second next is clicked............................................
   
  else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[5]!=''  && language == "Chichewa"){

    response= `CON lembani zina la a T/A(Traditional Authority)
    `
  }
  
  
  else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[6]!='' && language == "Chichewa"){
  
    response= `CON lembani zina la a  Group Village Head anu  `
  
  }
  
  
  else if(dataarraysize==8 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[7]!='' && language == "Chichewa"){
    
    farmersvariety = ['Maize','Beans','soya Beans']
  
    response= `CON sankhani zomwe mumalima
    1. Maize
    2. Beans
    3. Soya Beans `
  
  }
  
  
  else if(dataarraysize==9 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[8]!='' && language == "Chichewa"){
  
    response= `CON lembani zina lanu lonse `
    
  }
  
  else if(dataarraysize==10 && dataarray[0]==1 && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[9]!='' && language == "Chichewa"){
    
    farmersgender = ['Male','Female']
  
    response = `CON sankhani jenda
    1.Male
    2.Female`
  
  }
  
  
  else if(dataarraysize==11 && dataarray[0]==1 && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[10]!==''&& language == "Chichewa"){
  
    farmersagerange = ['0-18','19-25','26-40','41-60','60 above']
  
    response = `CON sankhani zaka zanu
    1. 0-18
    2. 19-25
    3. 26-40
    4. 41-60
    5. 61 above
    `
  }
  
  
  else if(dataarraysize==12 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[11]!='' && language == "Chichewa"){
  
    response= `CON Lembani zina la group yanu`
    
  }
  
  
  else if(dataarraysize==13 && dataarray[0]=='1' && dataarray[1]=='1'  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' && dataarray[12]!='' && language == "Chichewa"){
    
    farmerposition = ['chairman/chairlady','secretary','tresurer','member']
  
    response= `CON sankhani udindo wanu
    1. chairman/chairlady 
    2. secretary
    3. tresurer
    4. member`
    
  }
    
  else if (dataarraysize == 14 && dataarray[0] == "1"  && dataarray[2]=='1' && dataarray[3]=='0' && dataarray[4]=='0' &&  dataarray[13]!='' && language == "Chichewa") {

    lastregcategory             =`${--dataarray[2]}`
    lastregdstrictindex          =`${--dataarray[5]}`
    lastregvarietyindex          =`${--dataarray[8]}`
    lastregenderindex            =`${--dataarray[10]}`
    lastregageindex              =`${--dataarray[11]}`
    lastregpostionindex          =`${--dataarray[13]}`
  
    Registrationcategory         =registrationcategory[lastregcategory]
    Registratindisrict           = registrationdistricts[lastregdstrictindex]
    RegistrationTA               = `${dataarray[6]}`
    RegistratinGVH               = `${dataarray[7]}`
    Registratinfarnvariety       =farmersvariety[lastregvarietyindex]
    Registrationfullname         =`${dataarray[9]}`
    Registrationgender           =farmersgender[lastregenderindex]
    Registrationagerange         =farmersagerange[lastregageindex]
    Registrationgroupname        =`${dataarray[12]}`
    Registrationfarmerpositon    =farmerposition[lastregpostionindex]
    Registrationphonenumber      =phoneNumber
  
  /*
    newregref.child(phoneNumber).set({
      userdistrict:Registratindisrict  ,
      userTA:RegistrationTA,
      userGVH:RegistratinGVH ,
      userfarmvariety:Registratinfarnvariety ,
      userfullname:Registrationfullname ,
      usergender:Registrationgender ,
      useragerange:Registrationagerange,
      usergroupname:Registrationgroupname ,
      userpostion:Registrationfarmerpositon,
      userPhonenumber:phoneNumber
  
    })
*/

      response = `END mwalembetsa bwino pa nambala yanu ya ${phoneNumber}
      1.${Registratindisrict}
      2.${RegistrationTA}
      3.${RegistratinGVH }
      4.${Registratinfarnvariety}
      5.${Registrationfullname}
      6.${Registrationgender }
      7.${Registrationagerange}
      8.${Registrationgroupname}
      9.${Registrationfarmerpositon}
      10.${Registrationphonenumber}
      12.${Registrationcategory}
      `;
  
    } 
  

    
 

//.........................................main menu in english.........................................................
  else if (text == "2" && language =="English") {

    response = `CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help`;
    
   }
  

  //...........................................chichewa main menu..............................................
  else if (text == "2" && language == "Chichewa") {
    response = `CON Mlimi Menu yaikulu
		1. Malangizo
		2. zanyengo
		3. Msika
		4. Account
		5. chithandizo`;
  }
 
  
  //......................................working advesory from the json file.......................
 else if(text == "2*1" && language =="English"){

  response = `CON select the advisory catergory 
  ${categoriesnamejoin}
`

 } 

 else if(dataarray[2] !='' && dataarray[1]=='1' && dataarraysize==3  && language =="English"){

  const secondadvisorycategoryarray= []
  categoryindex =`${--dataarray[2]}`
  specificarrayvalue = categories[categoryindex].categories
  selectedcategory = categories[categoryindex].name

 function secondcategory(){

  //looping through second category
  specificarrayvalue.forEach(element => {

    secondadvisorycategoryarray.push(element.id +'.' + element.name)
    
  });

 }

 secondcategory()

 //converting  values to string
 secondcategorytostring = secondadvisorycategoryarray.toString()
 secondcategoryjoin = secondcategorytostring.replace(/,/g ,'\n') 

 response = `CON select the subcategory for ${selectedcategory }
 ${secondcategoryjoin}
 `

 }
 
 else if(dataarray[3]!='' && dataarray[1]=='1' && dataarraysize==4 && language =="English"){

  previousindex = `${--dataarray[2]}`
  secondcategoryindex = `${--dataarray[3]}`

  const thirdadvisorycategoryarray= []
  productsarray = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products
  selectedsecondcategory= advesoryjson.sectors[previousindex].categories[secondcategoryindex].name
 
  function thirdcategory(){
    
    productsarray.forEach(element => {
      thirdadvisorycategoryarray.push(element.id + '.' + element.name)
    });

  }

  thirdcategory()

  //converting the array value to stirng
  thirdadvisorycategorytostring = thirdadvisorycategoryarray.toString()
  thirdcategoryjoin = thirdadvisorycategorytostring.replace(/,/g ,'\n')

  response = `CON select subcategory of ${selectedsecondcategory}
  ${thirdcategoryjoin}`

 }

 
else if(dataarray[4]!='' && dataarray[1]=='1' && dataarraysize==5  && language =="English"){

  titleindex = `${--dataarray[4]}`
  advisorytitlearray = []
  selectedadvisorytitles  = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section
  specificadvisorytilte  = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].name

  //looping through sections
  selectedadvisorytitles.forEach(element => {
    advisorytitlearray.push(element.id + '.' + element.title)
  });

  //changing the array to string
  advisorytitiletostring = advisorytitlearray.toString()
  advisorytitilejoin = advisorytitiletostring.replace(/,/g , '\n')

  response = `CON select advisory title for ${specificadvisorytilte}
  ${advisorytitilejoin}`

}


else if(dataarray[5]!='' && dataarray[1]=='1' && dataarraysize==6 && language =="English"){

  contentarray = []
  contentindex = `${--dataarray[5]}`
  advisorycontent  = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].content
  specifictitlename  = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].title
  
  //looping through contents
  advisorycontent.forEach(element => {
    contentarray.push('> ' + element)
  });

  //conventing titles to string
  contenttostring = contentarray.toString()
  contentjoin = contenttostring.replace(/,/g, '\n')

  response = `END advisories under  ${specifictitlename}
  ${contentjoin}`

}



  //working advesory from the json file in chichewa
  else if(text == "2*1" && language == "Chichewa"){

    response =`CON sakhani malangizo a zomwe mkufuna 
    ${chichewaadvisoryproductnamesjoin}
  `

   } 

   


   else if(dataarray[2] !='' && dataarray[1]=='1' && dataarraysize==3  && language == "Chichewa"){

    
    const chichewasecondadvisorycategoryarray= []
    categoryindex =`${--dataarray[2]}`
    specificproduct = chichewasectors[categoryindex].categories
    chichewaselectedcategory =chichewasectors[categoryindex].name

    function secondcategory(){
    //looping through second category
    specificproduct.forEach(element => {

      chichewasecondadvisorycategoryarray.push(element.id +'.' + element.name)
      
    });

   }

   secondcategory()
  
   //converting  values to string
   chichewasecondcategorytostring = chichewasecondadvisorycategoryarray.toString()
   chichewasecondcategoryjoin = chichewasecondcategorytostring.replace(/,/g ,'\n') 
  
   response =`CON sankhani mutundu  wina  wa malangizo a ${chichewaselectedcategory }
   ${chichewasecondcategoryjoin}
   `
   }


   
   else if(dataarray[3]!='' && dataarray[1]=='1' && dataarraysize==4 && language == "Chichewa"){

    previousindex = `${--dataarray[2]}`
    secondcategoryindex = `${--dataarray[3]}`
  
    const chichewathirdadvisorycategoryarray= []
    chichewaproductsarray = chichewasectors[previousindex].categories[secondcategoryindex].products
    chichewaselectedsecondcategory=chichewasectors[previousindex].categories[secondcategoryindex].name
   
    function thirdcategory(){
      
      chichewaproductsarray.forEach(element => {
        chichewathirdadvisorycategoryarray.push(element.id + '.' + element.name)
      });

    }

    thirdcategory()
  
    //converting the array value to stirng
    chichewathirdadvisorycategorytostring = chichewathirdadvisorycategoryarray.toString()
    chichewathirdcategoryjoin = chichewathirdadvisorycategorytostring.replace(/,/g ,'\n')

    response=`CON sankhani mtundu wa malangizo a ${chichewaselectedsecondcategory}
    ${chichewathirdcategoryjoin}`

   }

   

  else if(dataarray[4]!='' && dataarray[1]=='1' && dataarraysize==5){

    titleindex = `${--dataarray[4]}`
    chichewaadvisorytitlearray = []
    chichewaselectedadvisorytitles = chichewasectors[previousindex].categories[secondcategoryindex].products[titleindex].section
    chichewaspecificadvisorytilte = chichewasectors[previousindex].categories[secondcategoryindex].products[titleindex].name
  
    //looping through sections
    chichewaselectedadvisorytitles.forEach(element => {
      chichewaadvisorytitlearray.push(element.id + '.' + element.title)
    });
  
    //changing the array to string
    chichewaadvisorytitiletostring = chichewaadvisorytitlearray.toString()
    chichewaadvisorytitilejoin = chichewaadvisorytitiletostring.replace(/,/g , '\n')

    response = `CON sakhani mutu wa malangizo a ${chichewaspecificadvisorytilte}
    ${chichewaadvisorytitilejoin}`

  }


  else if(dataarray[5]!='' && dataarray[1]=='1' && dataarraysize==6 && language == "Chichewa"){

    chichewacontentarray = []
    contentindex = `${--dataarray[5]}`
    chichewaadvisorycontent  = chichewasectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].content
    chichewaspecifictitlename = chichewasectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].title
    
    //looping through contents
    chichewaadvisorycontent.forEach(element => {
      chichewacontentarray.push('> ' + element)
    });
  
    //conventing titles to string
    chichwacontenttostring = chichewacontentarray.toString()
    chichewacontentjoin = chichewacontenttostring.replace(/,/g, '\n')

    response =`END malangizo a mutu wa  ${chichewaspecifictitlename}
    ${chichewacontentjoin}`

  }
  
  


//.........................................working on weather.................................
else if( text == "2*2" && language == "English" ){

  response =`CON select prefered district
  ${weatherdistrictsjoin}`

}


else if(dataarray[1]=='2' && dataarray[2]!='' && dataarraysize==3 && language =="English"){

  districtindex = `${--dataarray[2]}`
  districtname = weatherdistricts[districtindex].name

  response = `CON select what you want for ${districtname}
  1.actions
  2.expected
  3.weekly temperature
  `

}


else if(dataarray[1]=='2' && dataarray[3]=='1' && dataarraysize==4 && language =="English"){

  districtindex = `${--dataarray[2]}`
  districtactionarray = []
  districtname = weatherdistricts[districtindex].name
  districtactions = weatherdistricts[districtindex].actions
  districtactions.forEach(element => {
    districtactionarray.push('> ' + element) 
  });

  //changing the arrayof actions to string
  actionstosting = districtactionarray.toString()
  actionsjoin = actionstosting.replace(/,/g , '\n')

  response = `END select actions for ${districtname}
  ${actionsjoin}
  `

}

 
else if(dataarray[1]=='2' && dataarray[3]=='2' && dataarraysize==4 && language =="English"){
 
  districtexpectionsarray = []
  districtexpecteds = weatherdistricts[districtindex].expected
  
  //looping through expecteds
  districtexpecteds.forEach(element => {
    districtexpectionsarray.push('> ' + element)
  });

  //changing array of expectations to string
  expectedtostring = districtexpectionsarray.toString()
  expectedsjoin = expectedtostring.replace(/,/g , '\n')

  response = `END  expected for ${districtname}
  ${expectedsjoin}
  `
}


else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarraysize==4 && language =="English"){

  weathertemperature = weatherdistricts[districtindex].weeklyTemps
  weathertemperaturearray = []
  selectors = 0

  weathertemperature.forEach(element => {
  weathertemperaturearray.push(++selectors + '.' + element.title)
});

//changing weather temperaturedays to string
  daystostring = weathertemperaturearray.toString()
  daysjoin = daystostring.replace(/,/g, '\n')

  response = `CON select day for temperature of ${districtname}
  ${daysjoin}
  `

}


else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarray[4]!='' && dataarraysize==5 && language =="English"){
  
  daysindex = `${--dataarray[4]}`
  dayname = weatherdistricts[districtindex].weeklyTemps[daysindex].title
  maxtemp = weatherdistricts[districtindex].weeklyTemps[daysindex].max
  mintemp = weatherdistricts[districtindex].weeklyTemps[daysindex].min
  statustemp = weatherdistricts[districtindex].weeklyTemps[daysindex].status

  response =`END on ${dayname} it will be ${statustemp} , having maximum temperature of ${maxtemp} and minimum temperature of ${mintemp}`

}




//......................working on weather in chichewa.......................................
else if(text == "2*2" && language == "Chichewa"){

  response =`CON sankhani Boma
  ${weatherdistrictsjoin}`

}


else if(dataarray[1]=='2' && dataarray[2]!='' && dataarraysize==3 && language == "Chichewa"){

  districtindex = `${--dataarray[2]}`
  districtname = weatherdistricts[districtindex].name


  response = `CON sankhani zomwe mkufuna za Boma la ${districtname}
  1.actions
  2.expected
  3.weekly temperature
  `

}



else if(dataarray[1]=='2' && dataarray[3]=='1' && dataarraysize==4 && language == "Chichewa"){

  districtindex = `${--dataarray[2]}`
  districtactionarray = []
  districtname = weatherdistricts[districtindex].name
  districtactions = weatherdistricts[districtindex].actions

  districtactions.forEach(element => {
    districtactionarray.push('> ' + element) 
  });

  //changing the arrayof actions to string
  actionstosting = districtactionarray.toString()
  actionsjoin = actionstosting.replace(/,/g , '\n')
  
  response = `END sankhani zomwe mkuyenera kuchita mu Boma la ${districtname}
  ${actionsjoin}
  `

}

 
else if(dataarray[1]=='2' && dataarray[3]=='2' && dataarraysize==4 && language == "Chichewa"){
 
  districtexpectionsarray = []
  districtexpecteds = weatherdistricts[districtindex].expected
  
  //looping through expecteds
  districtexpecteds.forEach(element => {
    districtexpectionsarray.push('> ' + element)
  });

  //changing array of expectations to string
  expectedtostring = districtexpectionsarray.toString()
  expectedsjoin = expectedtostring.replace(/,/g , '\n')

  response = `END zomwe mkuyenera kuyembekezera mu  ${districtname}
  ${expectedsjoin}
  `
}


else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarraysize==4 && language == "Chichewa"){

  weathertemperature = weatherdistricts[districtindex].weeklyTemps
  weathertemperaturearray = []
  selectors = 0

  weathertemperature.forEach(element => {
  weathertemperaturearray.push(++selectors + '.' + element.title)
});

//changing weather temperaturedays to string
  daystostring = weathertemperaturearray.toString()
  daysjoin = daystostring.replace(/,/g, '\n')

  response = `CON sankhani siku la zanyengo za ${districtname}
  ${daysjoin}
  `

}



else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarray[4]!='' && dataarraysize==5 && language == "Chichewa"){
  
  daysindex = `${--dataarray[4]}`
  dayname = weatherdistricts[districtindex].weeklyTemps[daysindex].title
  maxtemp = weatherdistricts[districtindex].weeklyTemps[daysindex].max
  mintemp = weatherdistricts[districtindex].weeklyTemps[daysindex].min
  statustemp = weatherdistricts[districtindex].weeklyTemps[daysindex].status

  response =`END Pa ${dayname} kuzakhara ${statustemp} , ndi kutetha kokulira kwa ${maxtemp} komaso kuchepera kwa ${mintemp}`

}



  //......................working on market menu...........................................
  else if (text == "2*3" && language =="English") {

    response = `CON MLIMI Market
  1. Minimum Farm Gate Prices
  2. Sell Products
  3. Buy Available Products `;

  }

     //..........................working on market menu in chichewa......................................
  else if (text == "2*3" && language == "Chichewa") {

    response = `CON MLIMI Market
  1. Mitengo Yochepera Yapafamu
  2. kugulitsa malonda
  3. Gulani Zogulitsa Zomwe Zikupezeka`;

  }
  
 
  else if (text == "2*3*1" && language =="English") {

    response = `END choose product price per kg
  1. Maize, MK220
  2. Rice Polished, MK700
  3. Rice Unpolished, MK300
  4. Sorghum, MK360
  5. Finger Millet, MK480
  6. Soya Beans, MK480
  7. Pure Beans, MK480
  8. White Harricot Beans, MK500
  0.exit`;

  }

 
  
  
  else if (text == "2*3*1" && language == "Chichewa") {

  response = `END  mtengo wazogulitsa pa kg iliyonse
  1. Chimanga, MK220
  2. Mpunga okonora, MK700
  3. Mpunga osakonora, MK300
  4. Sorghum, MK360
  5. Malezi, MK480
  6. Soya, MK480
  7. Nyemba, MK480
  8. White Harricot Beans, MK500
  0.exit`;

  }
  
  
  else if (text == "2*3*2" && language =="English") {

  marketproductarray = ['Maize','Soya bean','Rice','Beans']

  response = `CON choose product to sell
  1. Maize
  2. Soya bean
  3. Rice
  4. Beans`;

  }
   
  
  else if (dataarraysize==4 && dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='2' && dataarray[3]!='' && language =="English") {
   
    marketproductindex = `${--dataarray[3]}`
    marketproductquatityarray = ['1-20kg','21-40kg','41-80kg','81-100kg','100kg above']

    response = `CON choose quantity(kg) of ${marketproductarray[marketproductindex]}
    1. 1-20kg
    2. 21-40kg
    3. 41-80kg
    4. 81-100kg
    5. 100kg above
    `;

  }



  else if(dataarraysize==5 && dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='2' && dataarray[4]!='' && language=='English'){
   
    quatityindix = `${--dataarray[4]}`

    response = `END you have successfully  sent marketing processing request for ${marketproductquatityarray[quatityindix]} of ${marketproductarray[marketproductindex]} to farm radio trust`
  }

  
  
  //................................seller  in chichewa.....................................................................
  else if (text == "2*3*2" && language == "Chichewa") {

    response = `CON sankhani chomwe mkufuna kugulisa
  1.Chimanga
  2.Soya
  3.Mpunga
  4.Nyemba`;

  }
  
  
  else if (dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='2' && dataarray[3]!='' && language == "Chichewa") {
   
    marketproductindex = `${--dataarray[3]}`
    marketproductquatityarray = ['1-20kg','21-40kg','41-80kg','81-100kg','100kg above']

    response = `CON choose quantity(kg) of ${marketproductarray[marketproductindex]}
    1. 1-20kg
    2. 21-40kg
    3. 41-80kg
    4. 81-100kg
    5. 100kg above
    `;

  }


  else if(dataarraysize==5 && dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='2' && dataarray[4]!='' && language=='Chichewa'){
   
    quatityindix = `${--dataarray[4]}`

    response = `END you have successfully  sent marketing processing request for ${marketproductquatityarray[quatityindix]} of ${marketproductarray[marketproductindex]} to farm radio trust`
  }





//.....................................buyer in english.......................................................
else if (text == "2*3*3" && language == "English") {


  buyerproductarray = ['Maize','Soya bean','Rice','Beans']

  response = `CON choose product to buy
  1. Maize
  2. Soya bean
  3. Rice
  4. Beans`;

  }
   
  
  else if (dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='3' && language =="English") {
   
    buyerproductindex = `${--dataarray[3]}`
    buyerproductquatityarray = ['1-20kg','21-40kg','41-80kg','81-100kg','100kg above']

    response = `CON choose quantity(kg) of ${buyerproductarray[buyerproductindex]}
    1. 1-20kg
    2. 21-40kg
    3. 41-80kg
    4. 81-100kg
    5. 100kg above
    `;

  }


  else if(dataarraysize==5 && dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='3' && dataarray[4]!='' && language=='English'){
   
    quatityindix = `${--dataarray[4]}`

    response = `END you have successfully  sent marketing processing request for ${marketproductquatityarray[quatityindix]} of ${marketproductarray[marketproductindex]} to farm radio trust`
  }


  //...............................buyer in chichewa............................................................
  else if (text == "2*3*3" &&  language == "Chichewa") {


    buyerproductarray = ['Maize','Soya bean','Rice','Beans']
  
    response = `CON choose product to buy
    1. Maize
    2. Soya bean
    3. Rice
    4. Beans`;
  
    }
     
    
    else if (dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='3' && dataarray[3]!='' && language == "Chichewa") {
     
      buyerproductindex = `${--dataarray[3]}`
      buyerproductquatityarray = ['1-20kg','21-40kg','41-80kg','81-100kg','100kg above']
  
      response = `CON choose quantity(kg) of ${buyerproductarray[buyerproductindex]}
      1. 1-20kg
      2. 21-40kg
      3. 41-80kg
      4. 81-100kg
      5. 100kg above
      `;
  
    }
  
  
    else if(dataarraysize==5 && dataarray[0]=='2' && dataarray[1]=='3' && dataarray[2]=='3' && dataarray[4]!='' && language=='Chichewa'){
   
     quatityindix = `${--dataarray[4]}`

     response = `END you have successfully  sent marketing processing request for ${marketproductquatityarray[quatityindix]} of ${marketproductarray[marketproductindex]} to farm radio trust`
    }



  //.............................. ......my account menu.............................................................
  else if(text=='2*4' && language =="English"){

    response=`CON Mlimi Account
    1. Our Farm Group
    2. Change Languege 
    3. what we Buy`

}

//......................................my account menu in chichewa.................................
else if(text=='2*4' && language == "Chichewa"){

  response=`CON Mlimi Account
  1.Ma group anthu a alimi
  2. sithani chiyankhulo 
  3. zomwe timagura`

}


//...................................our groups in english............................................
else if(text=='2*4*1' && language=='English'){

  response = `END registered groups will be dsplayed here`

}



//.................. .................our groups in chichewa............................................
else if(text=='2*4*1' && language=='Chichewa'){

  response = `END registered groups will be dsplayed here`

}



//.....................................changing language....................................
else if (text == "2*4*2" && language =="English") {

    response = `CON Choose your preffered language
    1.English
    2.Chichewa`;

  }

   else if (text == "2*4*2*1" && language =="English") {

      // Update the object based on the user's input
      const languageToUpdate = obj.languages.find(language => language.phonenumber === phoneNumber)

      if (languageToUpdate) {
        languageToUpdate.name = "English";
      
        // Convert the modified object back to JSON format
        const json = JSON.stringify(obj);
      
        // Write the updated JSON data back to the file
        fs.writeFile('language.json', json, (err) => {
          if (err) {
            console.log('Error updating language:', err);
          } else {
            console.log('Data updated');
            console.log(json)
          }
        });
      } else {
        console.log('Data not updated');
      }
      
   
    response = `END you have successfully switched to english languge`;

  }



   else if (text == "2*4*2*2" && language =="English") {

       // Update the object based on the user's input
       const languageToUpdate = obj.languages.find(language => language.phonenumber === phoneNumber)

       if (languageToUpdate) {
         languageToUpdate.name = "Chichewa";
       
         // Convert the modified object back to JSON format
         const json = JSON.stringify(obj);
       
         // Write the updated JSON data back to the file
         fs.writeFile('language.json', json, (err) => {
           if (err) {
             console.log('Error updating language:', err);
           } else {
             console.log('Data updated');
             console.log(json)
           }
         });
       } else {
         console.log('Data not updated');
       }
       

    response = `END you have successfully switched to chichewa languge`;

  }


  //................................changing language in chichewa...................................
  else if (text == "2*4*2" && language == "Chichewa") {

    response = `CON Sankhani chiyankhuro chomwe mkufuna
    1.Chingerezi
    2.Chichewa`;

  }


   else if (text == "2*4*2*1" && language == "Chichewa") {

      // Update the object based on the user's input
      const languageToUpdate = obj.languages.find(language => language.phonenumber === phoneNumber)

      if (languageToUpdate) {
        languageToUpdate.name = "English";
      
        // Convert the modified object back to JSON format
        const json = JSON.stringify(obj);
      
        // Write the updated JSON data back to the file
        fs.writeFile('language.json', json, (err) => {
          if (err) {
            console.log('Error updating language:', err);
          } else {
            console.log('Data updated');
            console.log(json)
          }
        });
      } else {
        console.log('Data not updated');
      }
      
   
    response = `END kusitha chiyankhuro ku chingerezi kwatheka`;

  }


   else if (text == "2*4*2*2" && language == "Chichewa") {

       // Update the object based on the user's input
       const languageToUpdate = obj.languages.find(language => language.phonenumber === phoneNumber)

       if (languageToUpdate) {
         languageToUpdate.name = "Chichewa";
       
         // Convert the modified object back to JSON format
         const json = JSON.stringify(obj);
       
         // Write the updated JSON data back to the file
         fs.writeFile('language.json', json, (err) => {
           if (err) {
             console.log('Error updating language:', err);
           } else {
             console.log('Data updated');
             console.log(json)
           }
         });
       } else {
         console.log('Data not updated');
       }
       

    response = `END kusitha chiyankhulo ku chichewa kwatheka`;

  }
  


  //.......................................what we buy in English......................................
  else if(text=='2*4*3' && language=='English'){

    response = `END this is the list of farm product farm radio trust buy
    1.Maize
    2.Soya beans
    3.Beans
    `

  }


   //.......................................what we buy in English......................................
   else if(text=='2*4*3' && language=='Chichewa'){

    response = `END iyi ndi list ya zinthu zomwe farm radio trust timagura
    1.chimanga
    2.Soya 
    3.Nyemba
    `

  }


  //...................................working on help menu.............................................
  else if (text == "3" && language =="English") {

    response = `CON choose options below for help
		1.call center`;

  } 
  
  
  else if (text == "3*1" && language =="English") {

    response = `END contact for free on *8111# AIRTEL or *7111# TNM `;

  }


  //................................................help menu in chichewa......................................
  else if (text == "3" && language == "Chichewa") {

    response = `CON sankhani njira yomwe mungathandizikire
		1.call center`;

  }
  
  
  else if (text == "3*1"&& language == "Chichewa") {

    response = `END Imbani mwaulere pa *8111# AIRTEL kapena *7111# TNM `;

  }

  else{

    response = `END invalid input`
  }
   text = dataarray.join('*')
  //......................................send the response back.................................
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
