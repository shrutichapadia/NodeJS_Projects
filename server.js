var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//initialize app as an instance of Express
var app = express();

var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/nutritions'); // mongoose to interact with database

var Fruit = require('/Users/shruti/projects/nutrition_api/models/fruit');
var Veg = require('/Users/shruti/projects/nutrition_api/models/veg');

app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

//set port
var port = process.env.PORT || 8080;

// routing create router object
var router = express.Router();

//middleware to use for all requests
router.use(function (request, response, next) {
    console.log("Nutrition API entry point");
    // perform common task here and go to next
    next();
});

router.get('/', function (request, response) {
    response.json({message: 'Nutrition Application helps you to prepare your own Nutrition '});
  
});

router.route('/fruits')
    .get(function (request, response) {
        Fruit.find(function (err, fruits) {
            if (err)
                response.send(err);

            response.json(fruits);
        });
    })
    .post(function (request, response) {
        //console.log(request);
        var name = request.body.name;
        console.log("Saving new fruit :" + name);

        // lets do validation for fruit first

        // lets save this fruits in database
        var fruit = new Fruit();
        fruit.name = name;

        fruit.save(function (err) {
            console.log('Saving new fruit in db');
            if (err)
                console.log('error saving new fruit ' + err);
            response.send(err);

            response.json({message: 'Fruit created'});
        });

    });

router.route('/fruits/:fruit_id')
    .get(function (request, response) {
        var fruitId = request.params.fruit_id;
        console.log("Fruit ID :" + fruitId);

        Fruit.findById(fruitId, function (err, fruit) {
            if (err)
                response.send(err);
            console.log('Found Fruit : ' + fruit);
            response.send(fruit);
        });
    })
    .put(function (request, response) {
        var fruitId = request.params.fruit_id;

        Fruit.findById(fruitId, function (err, fruit) {
            if (err)
                response.send(err);

            // update fruit
            var fruitName = request.body.name;
            fruit.name = fruitName;
            // save fruit in db
            fruit.save(function (err) {
                if (err)
                    response.send(err);

                response.json({message: 'Fruit updated'});
            });
        });

    })
    .delete(function (request, response) {
        Fruit.remove({_id: request.params.fruit_id},
            function (err, fruit) {
                if (err)
                    response.send(err);
                response.json({message: 'Successfully deleted '});
            });
    });

router.route('/veges')
// routing to veg to retrive Vegetables
    .get(function (request, response) {
        Veg.find(function (err, veg) {
            if (err)
                resposne.send(err);

            response.json(veg);

        });
    })
    // create new vege and save in database
    .post(function (request, response) {
        // get new vegetable name from request
        var name = request.body.name;
        console.log("New Vegetable : " + name);
        // validation new vegetable

        // create new object of vegetable and assign name
        var veg = new Veg();
        veg.name = name;

        // save into database
        veg.save(function (err) {
            if (err)
                response.send(err);
            response.json({message: 'Vegetable created'});
        });
    });

    router.route('/veges/:veg_id')
    // before update need to find one partciluar veg
    .get(function(request, response){
        var vegId = request.params.veg_id;
        console.log('Vegetable ID : ' + vegId);

        Veg.findById(vegId, function(err,veg){
          if(err)
            response.send(err);
          console.log('Vegetable Found : ' + veg);
          resposne.send(veg);

        });

    })
    //update existing vegetable in database
    .put(function(request, response){
      var vegId = request.params.veg_id;

      Veg.findById(vegId, function(err, veg){

        if(err)
          response.send(err);
        // update it in database
        var vegName = request.body.name;
        veg.name = vegName;
        // save it in database
        veg.save(function(err, veg){
          if(err)
            response.send(err)
          response.json({message: 'Veg Updated'});
        });

      });
    })
    .delete(function(request, response){
      Veg.remove({_id: request.params.veg_id},
      function(err, veg){
        if(err)
          response.send(err)
        response.json({message: 'Vegetable deleted'})

      });
    });


//register routes - main entry point
app.use('/api', router);

app.listen(port);

console.log("nutritions api running at port : " + port);
