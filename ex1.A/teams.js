const mongoose = require('mongoose');

const schema = {
 country: { type: String, index:1, required: true },
 win: Number,
 loses: Number,
 group: String 
}

const user_schema = new mongoose.Schema(schema);
const team = mongoose.model('team',user_schema);
//console.log(team)
module.exports = team;