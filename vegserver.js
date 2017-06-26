// // import library/module required in current scope
// var express = require('express');
// var bodyParser = require('bodyParser');
//
// var mongoose = require('mongoose');
// var Veg = require(/Users/shruti/projects/nutrition_api/models/veg.js);
//
// // app object coventionally denotes the express application
// var app = express();
//
// // router to route bind request and response object
// var router = express.Router();
//
// //port connection
// var port = process.env.PORT || 8080;
// app.listen(port);
//
// // router bind and perform all request and then next request
// router.use(function(request,response,next){
//   console.log("vegtables Nutirtion API ");
//     next();
// });
//
// //'/' route to main home page when request made
// router.get('/', function(request, response){
//   console.log("Welcome to vegtables Nutrition home page");
// });
//
// // '/veg' get menthod use to retrive /veg list & its detail
// router.route('/veg')
//     .get(function(request,response){
//       Veg.find(function(err, vege){
//         if(err)
//           resposne.send("veg not found");
//         response.json(vege);
//
//       });
//         response.json({message: 'List of Vegetables and its content'});
// });
//
//
//
// //
//
// //Main entry point of app
// app.use('/api',router);
