const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req,res) {
  res.sendFile(__dirname+'/signup.html');
});

app.post('/', function(req,res) {
  var firstName = req.body.fname;
  var secondName = req.body.sname;
  var email = req.body.email;




  axios({
    method: 'post',
    url: 'https://us19.api.mailchimp.com/3.0/lists/b510700302',
    headers: {
      'Authorization': 'Hashim f933a7d100c8a3ad229244df29471df2-us19'
    },

    data: {
          members: [
          {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
              FNAME: firstName,
              LNAME: secondName
            }
          }
        ]
    }
  })

  .then(function (response) {
    if(response.status === 200) {
      res.sendFile(__dirname + '/success.html');
      console.log(response.status);
    }
    else {
      res.sendFile(__dirname + '/failure.html');
    }
  })
  .catch(function (error) {
    res.sendFile(__dirname + '/failure.html');
  });
  
})

  app.post('/failure', function(req, res) {
    res.redirect('/');
  });
 
app.listen(process.env.PORT || 3000, function() {
  console.log('server is running at port 3000');
});
