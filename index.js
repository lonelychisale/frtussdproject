const translator = require("translate");
const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require('fs');
var firebase = require("firebase");
const { response } =  require("express");
const advesoryjson = require("./mlimi_english.json")
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


newregref.child(phone).on("value",(snapshot)=>{
  mylanguage = snapshot.val().translated_languge
})

console.log(mylanguage)

//inintilizing the app
firebase.initializeApp(firebaseConfig);

//getting database
var db = firebase.database();
const ref = db.ref("weather/districts");



//declaring advisory variables
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

/*working on weather
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

//testing home page naviagation
var namestring ='my  * name * is *lonely* chisale'
var name ='lonely'
var namesarray = namestring.split("*")

if(name=='lonely'){
namesarray.splice(0,namesarray.length)
console.log(namesarray)
}
namesarray.push('lonely')
console.log(namesarray)
*/

//working on language changing
//languagejson.languages.name='chichewa'
//console.log(languagejson.languages.name)
//updating values of the json file

  
  const languagename = "chichewa"
  const phonenumberr = "0996691384"

  //Read the contents of the JSON file
  const data = fs.readFileSync('language.json');
  const obj = JSON.parse(data);

  const newLanguage = {
    name: 'english',
    phonenumber: '0996641385'
  };
 //obj.languages.push(newLanguage);

  // Update the object based on the user's input
  const languageToUpdate = obj.languages.find(language => language.phonenumber === '0996641385')
  if (languageToUpdate) {
    languageToUpdate.name = languagename;

    // Convert the modified object back to JSON format
    const json = JSON.stringify(obj);

    // Write the updated JSON data back to the file
    fs.writeFileSync('language.json', json);
  console.log('data updated')
  } else {
    console.log('data not upadated')
  }



 /*putting data to a json file
 function insertinglanguagejsn(){

  // Read the existing JSON data from the file
  const languagejsonfile = fs.readFileSync('language.json');
  const obj = JSON.parse(languagejsonfile);
  
  // Check if the phonenumber already exists in the "languages" array
  const existingLanguage = obj.languages.find(language => language.phonenumber === '08839578453');
  
  if (!existingLanguage) {
    // Add a new object to the "languages" array
    const newLanguage = {
      name: 'english',
      phonenumber: '08839578453'
    };
    obj.languages.push(newLanguage);
  
    // Convert the modified object back to JSON format
    const json = JSON.stringify(obj);
  
    // Write the updated JSON data back to the file
    fs.writeFileSync('language.json', json);
    console.log('data inserted')
  } 
  
}
insertinglanguagejsn()
*/











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
  let language;

  //array length
  let dataarraysize = dataarray.length;



// function for updating language based on phone number
function updateLanguage() {
  return new Promise((resolve, reject) => {
    newregref.child(phoneNumber).on("value",(snapshot)=>{
      mylanguage = snapshot.val().name;
      console.log(mylanguage)
    })
    resolve();
  });
}


  // Call the updateLanguage function and then display the response based on the updated language
  updateLanguage()
    .then(() => {
      // response to display for English language
      if (language == 'English' && text=="") {
        // display English response
  response = `CON Welcome to Farm Radio Trust
  1.Register
  2.Main Menu
  3.Help
  4.Change language`;
      }
      // response to display for French language
      else if (language == 'Chichewa' && text== "") {
        response = `CON Takulandira ku Farm Radio Trust
  1.Register
  2.Main Menu
  3.Help
  4.Change language`;
      }
      // response to display for other languages
      else {
        console.log('failed to work on language')
      }
    })
    .catch((error) => {
      console.log('Error updating language:', error);
    });









 
  /*first

  if (text == "") {
    response = `CON Welcome to Farm Radio Trust
      1.Register
      2.Main Menu
      3.Help
      4.Change language`;
  } 
  


  else if (text == "1") {
    response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
        `;
  } else if (text == "1*1") {
    response = `CON enter your name`;
  } else if (dataarray[2] != "" && dataarraysize == 3 && dataarray[0] == "1") {
    response = `CON enter surname`;
  } else if (dataarray[3] != "" && dataarraysize == 4 && dataarray[0] == "1") {
    function registration() {
      name = dataarray[2];
      surname = dataarray[3];
      language = "English";

      newregref.child(phoneNumber).set({
        first_name: name,
        last_name: surname,
        translated_languge: language,
        phonenumber: phoneNumber,
      });
    }
    registration();
    response = `END you have successfully registered`;
  } 
  
  else if (text == "2") {
    response = `CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help`;
  }
  else if(text=='2*#'){
    dataarray.length = 0
    response = `CON Welcome to Farm Radio Trust
    1.Register
    2.Main Menu
    3.Help
    4.Change language`;

  }

  //validating
  
  //working advesory from the json file
 else if(text == "2*1"){
  response =`CON select the advisory catergory 
  ${categoriesnamejoin}
`
 } 
 else if(dataarray[2] !='' && dataarray[1]=='1' && dataarraysize==3 ){
  const secondadvisorycategoryarray= []
  categoryindex =`${--dataarray[2]}`
  specificarrayvalue =categories[categoryindex].categories
  selectedcategory =categories[categoryindex].name
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

 response =`CON select the subcategory for ${selectedcategory }
 ${secondcategoryjoin}
 `
 }
 
 else if(dataarray[3]!='' && dataarray[1]=='1' && dataarraysize==4){
  previousindex = `${--dataarray[2]}`
   secondcategoryindex = `${--dataarray[3]}`

  const thirdadvisorycategoryarray= []
  productsarray = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products
  selectedsecondcategory=advesoryjson.sectors[previousindex].categories[secondcategoryindex].name
 
  function thirdcategory(){
    
    productsarray.forEach(element => {
      thirdadvisorycategoryarray.push(element.id + '.' + element.name)
    });
  }
  thirdcategory()

  //converting the array value to stirng
  thirdadvisorycategorytostring = thirdadvisorycategoryarray.toString()
  thirdcategoryjoin = thirdadvisorycategorytostring.replace(/,/g ,'\n')
  response=`CON select subcategory of ${selectedsecondcategory}
  ${thirdcategoryjoin}`
 }
 
else if(dataarray[4]!='' && dataarray[1]=='1' && dataarraysize==5){
  titleindex = `${--dataarray[4]}`
  advisorytitlearray = []
  selectedadvisorytitles = productsarray = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section
  specificadvisorytilte =productsarray = advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].name

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
else if(dataarray[5]!='' && dataarray[1]=='1' && dataarraysize==6){
  contentarray = []
  contentindex = `${--dataarray[5]}`
  advisorycontent =selectedadvisorytitles =advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].content
  specifictitlename = selectedadvisorytitles =advesoryjson.sectors[previousindex].categories[secondcategoryindex].products[titleindex].section[contentindex].title
  
  //looping through contents
  advisorycontent.forEach(element => {
    contentarray.push('> ' + element)
  });

  //conventing titles to string
  contenttostring = contentarray.toString()
  contentjoin = contenttostring.replace(/,/g, '\n')
  response =`END advisories under  ${specifictitlename}
  ${contentjoin}`
}

//working on weather
else if(text == "2*2"){
  response =`CON select prefered district
  ${weatherdistrictsjoin}`
}
else if(dataarray[1]=='2' && dataarray[2]!='' && dataarraysize==3){
  districtindex = `${--dataarray[2]}`
  districtname = weatherdistricts[districtindex].name
  response = `CON select what you want for ${districtname}
  1.actions
  2.expected
  3.weekly temperature
  `
}
else if(dataarray[1]=='2' && dataarray[3]=='1' && dataarraysize==4){
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
  response = `CON select actions for ${districtname}
  ${actionsjoin}
  `
}

 
else if(dataarray[1]=='2' && dataarray[3]=='2' && dataarraysize==4){
 
  districtexpectionsarray = []
  districtexpecteds = weatherdistricts[districtindex].expected
  
  //looping through expecteds
  districtexpecteds.forEach(element => {
    districtexpectionsarray.push('> ' + element)
  });

  //changing array of expectations to string
  expectedtostring = districtexpectionsarray.toString()
  expectedsjoin = expectedtostring.replace(/,/g , '\n')

  response = `CON  expected for ${districtname}
  ${expectedsjoin}
  `
}
else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarraysize==4){
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
else if(dataarray[1]=='2' && dataarray[3]=='3' && dataarray[4]!='' && dataarraysize==5){
  daysindex = `${--dataarray[4]}`
  dayname = weatherdistricts[districtindex].weeklyTemps[daysindex].title
  maxtemp = weatherdistricts[districtindex].weeklyTemps[daysindex].max
  mintemp = weatherdistricts[districtindex].weeklyTemps[daysindex].min
  statustemp = weatherdistricts[districtindex].weeklyTemps[daysindex].status

  response =`END on ${dayname} it will be ${statustemp} , having maximum temperature of ${maxtemp} and minimum temperature of ${mintemp}`
}


  //working on market menu
  else if (text == "2*3") {
    response = `CON MLIMI Market
  1. Minimum Farm Gate Prices
  2. Sell Products
  3. Buy Available Products `;
  } else if (text == "2*3*1") {
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
  } else if (text == "2*3*2") {
    response = `CON choose product to sell
  1.Maize
  2.Soya bean
  3.Rice
  4.Beans`;
  } else if (text == "2*3*2*1") {
    response = `CON enter quantity(kg) of farm product`;
  }

  //working on help menu
  else if (text == "3") {
    response = `CON choose options below for help
		1.call center`;
  } else if (text == "3*1") {
    response = `END contact for free on *8111# AIRTEL or *7111# TNM `;
  }

  //changing language
  else if (text == "4") {
    response = `CON Choose your preffered language
    1.English
    2.Chichewa`;
  }
   else if (text == "4*1") {
    //updating data to firebase
    newregref.child(phoneNumber).update({
     translated_languge:'English'
     })
    response = `END you have successfully switched to english languge`;
  }

   else if (text == "4*2") {
     //updating data to firebase
newregref.child(phoneNumber).update({
  translated_languge:'Chichewa'
})

  

    response = `END you have successfully switched to chichewa languge`;
  }
  
*/
  //send the response back
  res.set("Content-Type: text/plain");
  res.send(response);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
