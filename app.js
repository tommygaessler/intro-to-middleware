var express = require('express'); //require is a function
var app = express(); //instance type thing

var uuid = require('node-uuid');

var data = require('./data').guests;
console.log(data);

var validate = require('./middleware').validate;
console.log(validate);

function addUUID (req, res, next) {
  if ( req.body ) {
    req.body.id = uuid.v1();
  }
  next();
};

// app.use(function (req, res, next) {
//   var start = new Date();
//   next();
//   var end = new Date();
//   console.log(req.method, req.url, end - start, 'ms');
// });
// custom logging

app.use(require('morgan')('dev')); // hof, dont assign cause we use it once
// morgan logging

app.use(require('body-parser').json());
// same thing as this

// app.use(function(request, response, next) {
//   var body = '';
//
//   request.on('data', function(chunk) {
//     body += chunk.toString();
//   });
//
//   request.on('end', function() {
//     if (body !== '') {
//       request.body = JSON.parse(body);
//     }
//
//     next();
//   });
// });

// function emoji() {
//   console.log('😎');
//   next();
// }

// pass this in somehwere





app.get('/guests', function(request, response, next) {
  response.status(200).send(data);
});

app.post('/guests', addUUID, function(request, response, next) {

  // var newGuest = [];
  //
  // request.on('data', function(chunk) {
  // newGuest.push(chunk.toString());
  //
  // }).on('end', function () {
  //
  //   var data = JSON.parse(newGuest.join(''));
  //
  //   guests.push(data);
  //   response.status(201).send(guests);
  // });

  // response.status(201).send(request.body);

  validate(response, request, next);

  console.log(request.body);


});

app.delete('/kick/:id', (req, res, next) => {
  kicked = data.filter((guest) => {
    return guest.id.toLowerCase() === req.params.id.toLowerCase();
  });

  data = data.filter((guest) => {
    return guest.id.toLowerCase() !== req.params.id.toLowerCase();
  });

  res.send(kicked);
});

app.listen(3000); //port number 3000
