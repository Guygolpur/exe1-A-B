const express = require('express');
const ctrl = require('./controller');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/teams',ctrl.getAllTeams); //1)
app.put('/multiple',ctrl.getMul);       //3)
app.post('/editScore',ctrl.setTeamWins);    //2)
app.get('/post',ctrl.addTeam);
app.get('/remove',ctrl.removeTeam);
app.all('*', (req, res)=>{  
    console.log("try: \n http://localhost:3000/teams to get all teams details \n http://localhost:3000/multiple to get teams which answer 2 parameters \n http://localhost:3000/editScore to change no of winnings for a team \n http://localhost:3000/post to add a new team \n http://localhost:3000/remove to remove team from list")                    //works
    res.send('try: \n http://localhost:3000/teams to get all teams details \n http://localhost:3000/multiple to get teams which answer 2 parameters \n http://localhost:3000/editScore to change no of winnings for a team \n http://localhost:3000/post to add a new team \n http://localhost:3000/remove to remove team from list ');
  });

app.listen(port,
    ()=> console.log('Express server ready for requests on: ', port));