const mongoose = require('mongoose');
const consts = require('./const');
const team = require('./teams');

const { MLAB_URL, DB_USER, DB_PASS } = consts;
const url = MLAB_URL;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    user: DB_USER,
    pass: DB_PASS
}


module.exports = {
    getAllTeams(req, res, next) {
        mongoose.connect(url, options)
            .then(
                () => {
                    team.find({},
                        (err, result) => {
                            if (err) throw err
                            console.log(result)
                            mongoose.disconnect();
                            res.json({result});

                        })
                    console.log('connected to Mongo');
                },
                err => {
                    console.log(`connection error: ${err}`);
                }
            );
    },
    getMul(req, res, next) {
        mongoose.connect(url, options)
            .then(async() => {
                  /*  team.find({ win: '999', group: 'B' },
                        (err, result) => {
                            if (err) throw err
                            console.log(result);
                            res.json(result);
                            mongoose.disconnect();
                        })
                    console.log('connected to Mongo');
                },
                err => {
                    console.log(`connection error: ${err}`);
                */
                    const {win = null, group = null} = req.body
                    const result = await team.find({"win": win, "group": group},
                    (err, result) => {
                        if (err) throw err
                        console.log(result);
                        res.json(result);
                        mongoose.disconnect();
                    })
                console.log('connected to Mongo');
            },
            err => {
                console.log(`connection error: ${err}`);
                
            }
            );
    },
    setTeamWins(req, res, next) {
        mongoose.connect(url, options)
        .then (
            () => {
                team.updateOne(
                    { "country": req.body.country},
                    { $set: {"win": req.body.win}}
                )
                .then ((obj) =>{
                    console.log('Updated - ' + req.body.win + ' wins for ' + req.body.country);
                    res.json('Updated - ' + req.body.win + ' wins for ' + req.body.country);
                })
                })

                .catch(err => {
                    console.error('some error occurred', err)
                    res.status(500).send(err.message)
                })

            },
    addTeam(req, res, next) {
        mongoose.connect(url, options)
            .then(
                () => {
                    const newTeam = new team({
                        country: "Germany",
                        win: 20,
                        loses: 1,
                        group: "A"
                    });
                    newTeam.save(
                        (err) => {
                            if (err) {
                                console.log(`err:${err}`);
                            }
                            else {
                                console.log(`saved document:${JSON.stringify(newTeam)}`);
                                res.json({newTeam});
                                mongoose.disconnect();
                            }
                        }
                    )

                    console.log('connected to Mongo');
                },
                err => {
                    console.log(`connection error: ${err}`);
                }
            );
    },
    removeTeam(req, res, next) {
        mongoose.connect(url, options)
            .then(
                () => {
                    const condition = { country: "Germany" };
                    
                    team.deleteOne(condition, (err, result) => {
                        if (err) {
                            console.log(`err: ${err}`);
                        }
                        else {
                            team.find({},(err, result) => {
                                if (err) {
                                    console.log(`err: ${err}`);
                                }
                                console.log(result);
                                res.json(result);
                                mongoose.disconnect();

                            })
                        }
                    })
                    console.log('connected to Mongo');
                },
                err => {
                    console.log(`connection error: ${err}`);
                }
            );
    }
}