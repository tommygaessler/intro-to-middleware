module.exports.validate = function(response, request, next) {

  var data = require('./data').guests;

  var check = true;
  var emptyCheck = true;

  var validateKeys = {
    preferredName: 'string',
    lastName: 'string',
    company: 'string',
    vip: 'boolean'
  }


  for (var key in validateKeys) {
    console.log('key:', key);
    if (!(request.body.hasOwnProperty(key))) {
      check = false;

    }

    else if ((request.body[key] === '')) {
      emptyCheck = false;
    }
  }

  if (!check) {
    response.status(422).send('Invalid key input');
  }

  else if (!emptyCheck) {
    response.status(422).send('Invalid input');
  }

  else if (check && emptyCheck) {
    console.log(request.body.vip);

    if (request.body.vip.toLowerCase() === 'true') {

      request.body.vip = true;

      var newGuest = request.body;
      data.push(newGuest);
      response.status(201).send(data);
    }

    else if (request.body.vip.toLowerCase() === 'false') {

      request.body.vip = false;

      var newGuest = request.body;
      data.push(newGuest);
      response.status(201).send(data);
    }

    else {
      response.status(422).send('Invalid Boolean');
    }
  }
}
