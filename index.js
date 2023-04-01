const translator = require("translate");
const app = require("express")();
const bodyParser = require("body-parser");
const logger = require("morgan");
var firebase = require("firebase");
const { response } =  require("express");
const advesoryjson = require("./mlimi_english.json")
const weatherjson = require("./ussd-be4c3-default-rtdb-export.json")


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

let phone = `+265995536312`;
const regref = regdb.ref("sectors");
const newregref = regdb.ref("users");

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

//working on weather
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
  //first

  if (text === "") {
    response = `CON Welcome to Farm Radio Trust
      1.Register
      2.Main Menu
      3.Help
      4.Change language`;
  }
  //validating first menu
  else if(dataarraysize==1 && (text!="1" && text!="2" && text!="3" && text!="4")){
    response = `CON invalid input.try again
    Welcome to Farm Radio Trust
      1.Register
      2.Main Menu
      3.Help
      4.Change language
    `
  }
  
  /*
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
  */
  else if (text == "2") {
    response = `CON Mlimi Main Manu
		1. Advesories
		2. Weather reports
		3. Marketing
		4. Account
		5. help
    #.home`;
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
  #.home`
 } 
 else if(text=='2*1*#'){
  dataarray.splice(0,dataarray.length)
  response = `CON Welcome to Farm Radio Trust
    1.Register
    2.Main Menu
    3.Help
    4.Change language`;

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

/*
  //working on weather menu
  else if (text == "2*2") {
    response = `END please  wait..data is being processed`;
    async function disp() {
      await promise();
    }

    function promise() {
      return new Promise((resolve, reject) => {
        ref.on("value", (snapshot) => {
          let districts = [];
          snapshot.forEach((element) => {
            var datadistrict = element.val().name;
            districts.push(datadistrict);
          });

          const indexDistricts = districts.map(
            (ds, index) => `${index + 1}. ${ds}`
          );

          const spliting = indexDistricts.toString().split(",");
          const joiingdistricts = spliting.join("\n");

          response = `CON choose district for weather \n${joiingdistricts}`;
          console.log(response);
        });
      });
    }

    disp();
  } else if (dataarray[1] == "2" && dataarraysize == 3) {
    response = `CON choose weather information 
 1.actions
 2.expected
 3.weakily weather`;
  } else if (dataarray[1] == "2" && dataarraysize == 4 && dataarray[3] == 1) {
    function getactions() {
      var index = `/${--dataarray[2]}`;
      const actionsref = ref.child(index);

      actionsref.on("value", (snapshot) => {
        var actionsarray = [];
        var selector = 0;
        var districtname = snapshot.val().name;
        actions = snapshot.val().actions;

        actions.forEach((element) => {
          var allactions = ++selector + "." + element;
          actionsarray.push(allactions);
        });

        //conerting an array to sting
        var arraytostring = actionsarray.toString();
        var splitactions = arraytostring.split(",");
        var spacedaction = splitactions.join("\n");

        response = `END actions for ${districtname} district \n ${spacedaction}`;
      });
    }
    getactions();
  } else if (dataarray[1] == "2" && dataarraysize == 4 && dataarray[3] == 2) {
    function getexpected() {
      var index = `/${--dataarray[2]}`;
      const actionsref = ref.child(index);

      actionsref.on("value", (snapshot) => {
        var expectedarray = [];
        var selector = 0;
        var districtname = snapshot.val().name;
        expecteds = snapshot.val().expected;

        expecteds.forEach((element) => {
          var allexpecteds = ++selector + "." + element;
          expectedarray.push(allexpecteds);
        });

        //conerting an array to sting
        var arraytostring = expectedarray.toString();
        var splitexpecteds = arraytostring.split(",");
        var spaceExpecteds = splitexpecteds.join("\n");

        response = `END expectetions for ${districtname} district \n ${spaceExpecteds}`;
      });
    }
    getexpected();
  } else if (dataarray[1] == "2" && dataarraysize == 4 && dataarray[3] == 3) {
    function weeklyweather() {
      var index = `/${--dataarray[2]}`;
      const actionsref = ref.child(index + "/weeklyTemps");

      actionsref.on("value", (snapshot) => {
        var titlemaxmintemparray = [];
        var titlestatusarray = [];
        snapshot.forEach((element) => {
          var titlemaxmintemp =
            element.val().title +
            "  :  " +
            element.val().max +
            " " +
            element.val().min;
          var titlestatus = element.val().title + " : " + element.val().status;

          //pushing data to specific arrays
          titlemaxmintemparray.push(titlemaxmintemp);
          titlestatusarray.push(titlestatus);
        });

        //changing an array to string
        var titlemaxmintempstring = titlemaxmintemparray.toString();
        var titlestatusstring = titlestatusarray.toString();

        //splinting data
        var titlemaxmintempsplit = titlemaxmintempstring.split(",");
        var titilestatussplit = titlestatusstring.split(",");

        //adding next spaces
        var titlesmaxmintemppace = titlemaxmintempsplit.join("\n");
        var titlestatusSpace = titilestatussplit.join("\n");

        response = `END WEEKLY WEATHER REPORTS \n Days  Max  Min \n${titlesmaxmintemppace}\n\nWeather Status For Specific Days\n${titlestatusSpace}
    `;
      });
    }
    weeklyweather();
  }

  */
  //working on market menu
  else if (text == "2*3") {
    response = `CON MLIMI Market
  1. Minimum Farm Gate Prices
  2. Sell Products
  3. Buy Available Products `;
  } else if (text == "2*3*1") {
    response = `CON choose product price per kg
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

  /*changing language
  else if (text == "4") {
    response = `CON Choose your preffered language
1.english
2.chichewa`;
  } else if (text == "4*1") {
    function update() {
      newregref.child(phoneNumber).on("value", (snapshot) => {
        if (snapshot.val().phonenumber == phoneNumber) {
          newregref.child(phone).update({
            translated_languge: "english",
          });
        }
      });
    }
    update();
    response = `END you have successfully switched to english languge`;
  } else if (text == "4*2") {
    function update() {
      newregref.child(phoneNumber).on("value", (snapshot) => {
        if (snapshot.val().phonenumber == phoneNumber) {
          newregref.child(phone).update({
            translated_languge: "chichewa",
          });
        }
      });
    }
    update();
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
