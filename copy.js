var firebase = require("firebase")
const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

//Twilio Configulatio==================================================================
var accountSid = 'AC9409d8e6d57b658546a1a78de152b163';
var authToken  = '05aa90e3d44834c309de115e64a18f9d';
const client = require('twilio')(accountSid, authToken);

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const firebaseConfig = {

    apiKey: "AIzaSyCgCBxz9u9Q-IKgBZk8mlJUw2icHa0aqU4",
  
    authDomain: "ussd-be4c3.firebaseapp.com",
  
    databaseURL: "https://ussd-be4c3-default-rtdb.firebaseio.com",
  
    projectId: "ussd-be4c3",
  
    storageBucket: "ussd-be4c3.appspot.com",
  
    messagingSenderId: "195880245900",
  
    appId: "1:195880245900:web:25477a933deae90d1339a9",
  
    measurementId: "G-9JEGRHY1GM"
  
  };
  

  //inintilizing the app 
  firebase.initializeApp(firebaseConfig)

  //getting database
  var db=firebase.database();

  const ref = db.ref("weather")
  
/*
  ref.set({
    likoma:{
    districtname:'likoma',
    actions: 'hie there its lonely',
    expection:'hie jjgdlndnfi',
    weatherdata:{
      max: '27',
       min: '21',
       status: 'Cloudy with thunderstorms',
       title: 'Tue'
 }
    },
    mzimba:{
      districtname:'mzimba',
      actions: 'hie there its lonely',
      expection:'hie jjgdlndnfi',
      weatherdata:{
           max: '27',
            min: '21',
            status: 'Cloudy with thunderstorms',
            title: 'Tue'
      }
      },
      lilongwe:{
        districtname:'lilongwe',
        actions: 'hie there its lonely',
        expection:'hie jjgdlndnfi',
        weatherdata:{
          max: '27',
           min: '21',
           status: 'Cloudy with thunderstorms',
           title: 'Tue'
     }
        },
        tchitsi:{
          districtname:'tchisi',
          actions: 'hie there its lonely',
          expection:'hie jjgdlndnfi',
          weatherdata:{
            max: '27',
             min: '21',
             status: 'Cloudy with thunderstorms',
             title: 'Tue'
       }
          }
    

  })
*/
  //getting all districts from the database from the databse
  
  ref.on('value',function(snapshot){
    var dataweather =snapshot.val()
    var keys = Object.keys(dataweather)

    //looping throug an array of districts
    for (let i = 0; i < keys.length; i++) {
      const element = keys[i];
      const responsedata = keys.indexOf(element) + ". " + element
      //displaying all available districts
      console.log(responsedata)

    }


    //getting data of the specific district
    //displaying the district name
    var districtname = ref.child('likoma' + '/districtname')
    districtname.on("value",(snapshot)=>{
      console.log('weather data for ' +' ' + snapshot.val() + ' ' + 'district')
    })

    //actions
    var actions = ref.child('likoma' + '/actions')
    actions.on("value",(snapshot)=>{
      console.log('actions:' +'' + snapshot.val())
    })

    //expections
    var expectations= ref.child('likoma' + '/expections')
    actions.on("value",(snapshot)=>{
      console.log('expections:' +'' + snapshot.val())
    })

    //weather data
    var weatherdata = ref.child('likoma').child('weatherdata')
    weatherdata.on("value",(snapshot)=>{
      weatherdataarray =snapshot.val()
    })

  })
 
  app.get('*', (req, res) => {
    res.send('hello')
  })	

	app.post('*', (req, res) => {
	let {sessionId, serviceCode, phoneNumber, text} = req.body
	
    //creating an array of data
    let dataarray=text.split('*');

    //array length
    let dataarraysize=dataarray.length
    
    //registration Variables
    let district;
    let traditional;
    let village;
    let farmVariate
    let epa;
    let fulname;
    let groupName;
    let title; 

    //first 
    if(text == '') {

        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~First request for the FRT main menu~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        response = `CON Welcome to Farm Radio Trust
        1. Register
        2. Main Menu
        3. Help`;
    }

    //seconds
    else if(text=='1'){

        response = `CON Welcome to Mlimi Registration services. 
        
        1. Start Registration
        0. Main Menu
        `

    }





    else if(text=='2'){
            response=`CON Mlimi Main Manu
            1. Advesories
            2. Weather reports
            3. Marketing
            4. Account
            5. help`
            
        }
    else if(text=='3'){
            
                response=`CON choose options below for help
                1.call center`
            
    }


    // ==============================================register========================================================================================================
    else if(text=='1*1'){
        response=`CON Select your District
        1. Salima
        2. Zomba
        3. Mulanje
        4. Nchinji
        5. Mzimba`

    }
    else if(dataarraysize==3 && dataarray[0]=='1' && dataarray[1]=='1'){


        response= `CON Enter Name Of a T/A(Traditional Authority)
        `

    }

    else if(dataarraysize==4 && dataarray[0]=='1' && dataarray[1]=='1'){


        response= `CON Enter the NAme of Group Village Head  `


    }

    else if(dataarraysize==5 && dataarray[0]=='1' && dataarray[1]=='1'){


        response= `CON Enter the Crop Variate of Your Farming 
        1. Maize
        2. Beans
        3. Soya Beans `
        

    }
    

     else if(dataarraysize==6 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[5]=='1'){


        response= `CON Enter Your Full Name `
        

    }

    
     else if(dataarraysize==7 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[5]=='1'){


        response= `CON Enter Your GroupName `
        

    }


    else if(dataarraysize==8 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[5]=='1'){


        response= `CON Enter Your Your Position Title `
        

    }

    else if(dataarraysize==9 && dataarray[0]=='1' && dataarray[1]=='1' && dataarray[5]=='1'){

        district = "Blantyre";
        traditional= dataarray[3];
        village = dataarray[4];
        farmVariate = dataarray[5]
        fulname = dataarray[6];
        groupName = dataarray[7];
        title = dataarray[8];

/*
        function rigisterData(){

            const reference = ref(db, 'farmers/' + phoneNumber);

            set(reference,{
                districtFrom: district,
                traditionalFrom:traditional,
                villageFrom:village,
                farmVariation: farmVariate,
                fullname: fulname,
                clubName:groupName,
                titleName:title
                
    
    
            }).then(()=>{
                response=`CON Thanks for Registering with Mlimi USSD 

                1. ${district}
                2. ${traditional}
                3. ${village}
                4. ${farmVariate}
                5. ${fulname}
                6. ${groupName}
                7. ${title}

        ` 
            })
            .catch((error)=>{
                response=`CON Thanks for Registering with Mlimi USSD

        ` 
            })
        }
        
*/
        


    }
    

    //==============================================THIRD options=======================================================================================================================================================================================
    

    //.............................................. 1. ADVISORYS...........................................................

    else if(text=='2*1'){
        response=`CON Select the preffered advesory category
        1. Crops
        2. Livestock
        3. Radio programs
        4. Nutritions
        5. Food Security`

    }

    //___________________________________________CROPS_______________________________________
    else if(text=='2*1*1'){
        response=`CON Select Crop category
        1. Cereals
        2. Legumes
        3. Oil and Seeds`

    }

    //-------------------Careals Advice-----------------
    else if(text=='2*1*1*1'){
        response=`CON choose Maize Advisory
        1. Maize
        `

    }
    else if(text=='2*1*1*1*1'){

        response=`CON Maize
        1. Choice of Variety
        2. Source of Seed
        3. Site Selection
        4. Land preparation
        5. Planting Pattern and seed rates
        0. Next
        *. Back
        #. Home
        
        ` 
    }

    else if(text=='2*1*1*1*1*0'){

        response=`CON Maize
         6. Fertilizer application
         7. Weeding
         8. Disease and pest control
         9. Harvesting
        10. Storage
         0. Next
         *. Back
         #. Home
        
        ` 
    }



    ///////////first
    
    else if(text=='2*1*1*1*1*1'){

        response=`END Choose Of variety
        Select maize seed according to agro-ecology and rainfall pattern of your area
        The Department of Agricultural Research services and seed companies have a wide range of varieties suited to all agro-ecological zones and needs of the farmer
        ` 


        client.messages
        .create({
            body: '    Select maize seed according to agro-ecology and rainfall pattern of your area, The Department of Agricultural Research services and seed companies have a wide range of varieties suited to all agro-ecological zones and needs of the farmer',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }



    else if(text=='2*1*1*1*1*2'){

        response=`END Source of seed
        > Research institutions
        > Accredited seed companies
        > Agro-dealers
        > For hybrid maize, new seed should be bought for every production to ensure optimum yields
        > Open pollinated varieties (Composite) maize varieties can be recycled for another two seasons. If you bought certified seed in season one, you may plant seed from your harvest for another 2 years/productions. Ensure to buy new seed in the fourth season as recycling further lowers yield.
        > For local maize, select seed of desirable attributes at harvest` 


        client.messages
        .create({
            body: ' Research institutions /n .Accredited seed companies /n .Agro-dealers /n .For hybrid maize new seed should be bought for every production to ensure optimum yields.Open pollinated varieties (Composite) maize varieties can be recycled for another two seasons. If you bought certified seed in season one, you may plant seed from your harvest for another 2 years/productions. Ensure to buy new seed in the fourth season as recycling further lowers yield.For local maize, select seed of desirable attributes at harvest ',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }
    

    else if(text=='2*1*1*1*1*3'){

        response=`END Site selection
        > Select deep, well-drained, fertile soils, and where total seasonal rainfall exceeds 500 mm
        > Maize is reasonably tolerant to soil acidity, but if the soil is very acid, lime to improve the soil and enhance maize yields
        > Maize is susceptible to both drought and waterlogging, therefore avoid poorly drained soils, apply practices like ridging, drainage and early planting to remedy these challenges.
        > "Drought during the four-week period spanning flowering (silking and tasselling) can cause serious yield losses, and therefore some form of water conservation is important (e.g., pot-holing, mulching, tied/box-ridges), especially in the drier areas
        > Temperatures above 38 degrees celcius affect yield by affecting pollen viability while temperatures below 10 retards maize growth` 


        client.messages
        .create({
            body: 'Site selection > Select deep, well-drained, fertile soils, and where total seasonal rainfall exceeds 500 mm > Maize is reasonably tolerant to soil acidity, but if the soil is very acid, lime to improve the soil and enhance maize yields  > Maize is susceptible to both drought and waterlogging, therefore avoid poorly drained soils, apply practices like ridging, drainage and early planting to remedy these challenges.  "Drought during the four-week period spanning flowering (silking and tasselling) can cause serious yield losses, and therefore some form of water conservation is important (e.g., pot-holing, mulching, tied/box-ridges), especially in the drier areas  > Temperatures above 38 degrees celcius affect yield by affecting pollen viability while temperatures below 10 retards maize growth',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    //thied
    else if(text=='2*1*1*1*1*4'){
2
        response=`END Land preparation
        > Prepare land early to ensure early planting
        > Clear, plough and harrow the land where maize is to be planted
        > In most cases, maize is planted on ridges while in some cases, the crop is planted in rows, especially under irrigated conditions. Ridges and rows should be spaced at 75cm apart
        `


        client.messages
        .create({
            body: ' Land preparation > Prepare land early to ensure early planting> Clear, plough and harrow the land where maize is to be planted >  In most cases, maize is planted on ridges while in some cases, the crop is planted in rows, especially under irrigated conditions. Ridges and rows should be spaced at 75cm apart',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }
    //fourth
    else if(text=='2*1*1*1*1*5'){
        response=`END Planting Pattern and seed rates
        >Under rain fed conditions, plant after first effective rains, when the soils are sufficiently wetted to a depth of 15cm. This is usually between October and December.>
        >Under irrigation, plant when the soil is wet enough to such a depth of 15cm continuously for a longer duration. In most such cases, soils are continuously wet and are in wetted residual conditions>
        >Plant one seed per station every 25cm in the rows /ridges that are 75 cm apart>
        >You may also opt to plant 2 seeds per station every 50 cm in rows/ridges spaced at 75 cm apart. Similarly, a farmer may opt to plant 3. seeds per station every 50 cm in rows/ridges spaced at 75 cm apart>
        >Seed rate is 25 kg/ha (10kg/acre)`


        client.messages
        .create({
            body: ' Under rain fed conditions, plant after first effective rains, when the soils are sufficiently wetted to a depth of 15cm. This is usually between October and December.>Under irrigation, plant when the soil is wet enough to such a depth of 15cm continuously for a longer duration. In most such cases, soils are continuously wet and are in wetted residual conditions>Plant one seed per station every 25cm in the rows /ridges that are 75 cm apart>You may also opt to plant 2 seeds per station every 50 cm in rows/ridges spaced at 75 cm apart. Similarly, a farmer may opt to plant 3. seeds per station every 50 cm in rows/ridges spaced at 75 cm apart>Seed rate is 25 kg/ha (10kg/acre)',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    //fiveth


    else if(text=='2*1*1*1*1*0*6'){
        response=`END Fertilizer application
        >Apply basal dressing fertilizer is applied at planting, soon after planting or 5 to 7 days after seed emergency
        > 100kg (2 bags) of NPK (23:21:0+4S, Zn) are sufficient for one hectare
        > Apply one full Coca-Cola bottle top of NPK fertilizer using the dollop method where a hole which is about 3-5cm deep is made between planting stations (where maize is planted at 25 cm apart) or on both sides of the seed station if planted at 50 and 90 cm apart
        > Apply top dressing fertilizers 3 weeks from basal dressing fertilizer application
        > Use a similar dollop methodology as it was done during basal dressing
        > 150kg (3bags) of Urea are sufficient for one hectare
        `
        client.messages
        .create({
            body: 'Apply basal dressing fertilizer is applied at planting, soon after planting or 5 to 7 days after seed emergency > 100kg (2 bags) of NPK (23:21:0+4S, Zn) are sufficient for one hectare > Apply one full Coca-Cola bottle top of NPK fertilizer using the dollop method where a hole which is about 3-5cm deep is made between planting stations (where maize is planted at 25 cm apart) or on both sides of the seed station if planted at 50 and 90 cm apart> Apply top dressing fertilizers 3 weeks from basal dressing fertilizer application > Use a similar dollop methodology as it was done during basal dressing > 150kg (3bags) of Urea are sufficient for one hectare',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    else if(text=='2*1*1*1*1*0*7'){
        response=`END Weeding
        > Keep the maize field as free from weeds as much as possible
        > Ensure maize crop is weed free for the first 2-6 weeks. Two to three hoe weeding rounds are enough after planting
        > Weeding can be done manually or using herbicides
        > Crop rotation and other cultural practices also help in reducing weed intensity
        `
        client.messages
        .create({
            body: 'Weeding, Keep the maize field as free from weeds as much as possible > Ensure maize crop is weed free for the first 2-6 weeks. Two to three hoe weeding rounds are enough after planting > Weeding can be done manually or using herbicides > Crop rotation and other cultural practices also help in reducing weed intensity',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    else if(text=='2*1*1*1*1*0*8'){
        response=`END Disease and pest control
        > Maize is affected by leaf blight, maize streak virus, cob rot, grey leaf spot diseases.
        > Important pests of maize are Fall army worms, maize stalk borer, leaf rollers, earth worms and termites. 
        > Pests and diseases in maize can be controlled by planting resistant/tolerant varieties, good cultural practices and use of chemicals where ever necessary i.e. Crop rotation, early planting, right plant population/densities, and practices that ensure a healthy plant (proper soil pH and fertility) reduce the impact of pest and disease problems
        `
        client.messages
        .create({
            body: 'Disease and pest control, Maize is affected by leaf blight, maize streak virus, cob rot, grey leaf spot diseases. Important pests of maize are Fall army worms, maize stalk borer, leaf rollers, earth worms and termites. Pests and diseases in maize can be controlled by planting resistant/tolerant varieties, good cultural practices and use of chemicals where ever necessary i.e. Crop rotation, early planting, right plant population/densities, and practices that ensure a healthy plant (proper soil pH and fertility) reduce the impact of pest and disease problems',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    else if(text=='2*1*1*1*1*0*9'){
        response=`END Maize harvesting
        > Harvest maize once it is dry
        > Stoking is recommended for cobs to complete drying
        > Once dry, remove cobs from stalks for shelling and storage or use
        `
        client.messages
        .create({
            body: 'Harvest maize once it is dry, Stoking is recommended for cobs to complete drying, Once dry, remove cobs from stalks for shelling and storage or use',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }

    else if(text=='2*1*1*1*1*0*10'){
        response=`END Maize storage
        > Store well dried and cleaned maize grain, 
        > Maize for storage should be well treated with storage pesticides following recommendations on safe use and correct application rates, 
        > Check stored maize every 3-6 months to ensure safety from pest attack. 
        > Maize grain is conveniently stored when packed in 50kg or 100kg bags stacked on pallets or poles for air circulation. 
        > Avoid contact of bags of maize with the floor and walls that may emit moisture. Storage facility should be leak-proof. 
        `
        client.messages
        .create({
            body: 'Store well dried and cleaned maize grain, Maize for storage should be well treated with storage pesticides following recommendations on safe use and correct application rates,Check stored maize every 3-6 months to ensure safety from pest attack. Maize grain is conveniently stored when packed in 50kg or 100kg bags stacked on pallets or poles for air circulation, Avoid contact of bags of maize with the floor and walls that may emit moisture. Storage facility should be leak-proof.',
            from: '+16075363568',
            mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
            to: '+265991319689'
        })
        .then(message => console.log(message.sid));

    }


    //mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
    else if(text=='2*1*1*1*2'){
        response=`CON Chooose The Desease
        1. Maydis Leaf blight
        2. Armyworms  
        3. Charcoal rot`


        

    }


    else if(text=='2*1*1*1*2*1'){
        response=`END Umu ndimene mungapewere nthenda ya MphereBungu `
        client.messages
        .create({
            from: '+16075363568',
             body: 'Umu ndimene mungapangire pothila Fertilizer wanu  kut mukolole chimanga chanu mochuluka, Choyamba tengani fertilizer wanu ndikumuika mudzonyamulila zanu ndikumabooya 10centmeter pafupi ndi chimanga chanu, mukatelo tengani spoon yanu nkuthila fertizer mochuluka mulingo wa 10ml ', 
             to: '+265991319689'})
        .then(message => console.log(message.sid));


    }
    else if(text=='2*1*1*1*2*2'){
        response=`END Umu ndimene mungapewere nthenda ya Kasochera `
        client.messages
        .create({
            from: '+16075363568',
             body: 'Umu ndimene mungapangire pothila Fertilizer wanu  kut mukolole chimanga chanu mochuluka, Choyamba tengani fertilizer wanu ndikumuika mudzonyamulila zanu ndikumabooya 10centmeter pafupi ndi chimanga chanu, mukatelo tengani spoon yanu nkuthila fertizer mochuluka mulingo wa 10ml ', 
             to: '+265991319689'})
        .then(message => console.log(message.sid));


    }
    else if(text=='2*1*1*1*2*3'){
        response=`END Umu ndimene mungapewere nthenda ya Mapiano , posiya kuledzera nkupita muma bar `
        client.messages
        .create({
            from: '+16075363568',
             body: 'Umu ndimene mungapangire pothila Fertilizer wanu  kut mukolole chimanga chanu mochuluka, Choyamba tengani fertilizer wanu ndikumuika mudzonyamulila zanu ndikumabooya 10centmeter pafupi ndi chimanga chanu, mukatelo tengani spoon yanu nkuthila fertizer mochuluka mulingo wa 10ml ', 
             to: '+265991319689'})
        .then(message => console.log(message.sid));


    }






    //Beans Advice
    else if(text=='2*1*1*2'){
        response=`CON choose Soya Beans Advisory
        1. Fertilize Aplication
        2. Soya Deseases 
        3. Soya  Havesting`

    }



    //GroundNuts Advice
    else if(text=='2*1*1*3'){
        response=`CON choose Soya Beans Advisory
        1. Fertilizer Aplication
        2. GroundNuts Deseases 
        3. GroundNuts  Havesting`

    }
    else if(text=='2*1*1*3*1'){
        response=`END Umu ndimene mungathilile Fertilizer wanu mu munda wantedza`

        client.messages
        .create({
            from: '+16075363568',
             body: 'Umu ndimene mungapangire pothila Fertilizer wanu  kut mukolole chimanga chanu mochuluka, Choyamba tengani fertilizer wanu ndikumuika mudzonyamulila zanu ndikumabooya 10centmeter pafupi ndi chimanga chanu, mukatelo tengani spoon yanu nkuthila fertizer mochuluka mulingo wa 10ml ', 
             to: '+265991319689'})
        .then(message => console.log(message.sid));



    }
    //groundNuts Deseases
    else if(text=='2*1*1*3*2'){
        response=`CON choose GroundNuts desease
        1. Fertilizer Aplication
        2. GroundNuts Deseases 
        3. GroundNuts  Havesting`

    }






    //_____________________________________________LIVESTOCK__________________________________________

    else if(text=='2*1*2'){
        
            response=`CON Livestock variates`
    

    }






    //____________________________________Farm radio programs________________________________________
    else if(text=='2*1*3'){
        
            response=`CON FArm radio programs
            1.Send the Program picture
            2.send the video`  

    }

    else if(text=='2*1*3*1'){
        
        response=`END the program picture has been sent`
        
        client.messages
  .create({
     body: 'This is the picture shows the Farn Radio Trust Radio Progams',
     from: '+16075363568',
     mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
     to: '+265991319689'
   })
  .then(message => console.log(message.sid));

}

else if(text=='2*1*3*2'){
        
    response=`END the program picture has been sent`
    
    client.messages
.create({
 body: 'This is the video shows the Farn Radio Trust Radio Progams',
 from: '+16075363568',
 mediaUrl: ['https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'],
 to: '+265991319689'
})
.then(message => console.log(message.sid));

}

    //____________________________________________________Nutritions_________________________________________________________ 
    else if(text=='2*1*4'){
        
            response=`CON Health and Nutrition`
        
    }


    //____________________________________________________Nutritions_________________________________________________________ 
    else if(text=='2*1*5'){
        
            response=`CON Food Security`
        
    }


    //...........................................................2. WEATHER REPORTS..............................................................................

     
    //--------------weather updates based on the location---------------------
    else if(text=='2*2'){
        response=`CON Select your location for weather report
        1. Blantyre
        2. Lilongwe
        3. Zomba
        4. Karonga
        5. Kasungu
        6. Mangochi
        7. Salima
        8. Nkhotakota
        9. Mulanje
        0. Next `;


    }

else if(text=='2*2*0'){
        response=`CON Select your location for weather report
        10. Rumphi
        11. Balaka
        12. Chitipa
        13. Mzimba
        14. NkhataBay
        15. Dedza
        16. Nsanje
        17. MWanza
        18. Chikwawa
        0. Next `;


    }

    else if(text=='2*2*0*0'){
        response=`CON Select your location for weather report
        19. Dowa
        20. Ntchewu
        21. Ntchisi
        22. Thyolo
        23. Machinga
        24. Chiradzulu
        00. Main Menu `;


    }


    //the whether Report implemented here 


    //...........................................................3. MARKETING SERVICES..............................................................................

    //---------------MArkerting Option services-------------------
    else if(text=='2*3'){
            response=`CON MLIMI Market
            1. Minimum Farm Gate Prices
            2. Sell Products
            3. Buy Available Products `
        }


    //---------------Minimum Farm Gate Prices-------------------
    else if(text=='2*3*1'){
            response=`CON Prices per KG
            1. Maize, MK220
            2. Rice Polished, MK700
            3. Rice Unpolished, MK300
            4. Sorghum, MK360
            5. Finger Millet, MK480
            6. Soya Beans, MK480
            7. Pure Beans, MK480
            8. White Harricot Beans, MK500 `
        }
        
    //---------------Sell Products-------------------
    else if(text=='2*3*2'){
            response=`END Your Number is not registered with Mlimi Market. Call 7111(TNM) or 8111(Airtel) or visit our Platforms to register with MLIMI market and sell Your products`
        }

    //---------------Sell Products-------------------
    else if(text=='2*3*2'){
            response=`END Your Number is not registered with Mlimi Market. Call 7111(TNM) or 8111(Airtel) or visit our Platforms to register with MLIMI markert to buy products on the available market `
        }
 



    //.............................................. 4.ACCOUNT ...........................................................

    //---------------My Account Option services-------------------
    else if(text=='2*4'){
        response=`CON Mlimi Account
        1. Our Farm Group
        2. Change Languege 
        3. what we Buy`
}

    //.............................................. 5 .ACCOUNT ...........................................................
    
    //---------------Help Option services-------------------
    else if(text=='2*5'){
        response=`END Thank you for Choosing Farm Radio Trust. bwezi lanu paulangidzi za ulimi. imbani 8111(Airtel) and 7111(TNM) mwaulele kut muyankhule Ndalangidzi kut muthandidzike`;

    }



    
    //.............................................. 6 .CONTROLS ...........................................................
    
    else if(text=='*00*'){

        text=='2';
   
    }

    else{
        response = `END invalid input sorry try again`
    }

    


    //send the response back
    res.set('Content-Type: text/plain');
    res.send(response)


})
	
	app.listen(port, () => {
	console.log(`Server running on port ${port}`)
	})

