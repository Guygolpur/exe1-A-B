import React, { Component } from 'react';
import Tournament from './Tournament'
export default class MyTournementsByYear extends Component {
  constructor(props){
    super(props);
    this.state = {
      tournaments: [],
      competitor: 'Gal Fridman',
      year: '12/12/2018'
    };
    this.eachTournament = this.eachTournament.bind(this);
    this.add = this.add.bind(this);
    this.nextID = this.nextID.bind(this);
    this.getData = this.getData.bind(this);
    this.handleChangeCompetitor = this.handleChangeCompetitor.bind(this);
    this.handleChangeYear = this.handleChangeYear.bind(this);
  }
  getData() {
    console.log(this.state.competitor);
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const url = "https://olympic-live-game.herokuapp.com/getCruiseByYearCompetitor";
    fetch(`${proxyUrl}${url}` ,
     {method:'PUT',
     body:`year=${this.state.year}&competitor=${this.state.competitor}`,
     headers: {
       "Content-Type": "application/x-www-form-urlencoded",
  }
})
    .then(res=>res.json())
    .then(data=>data.map(item =>
        this.add({userId:item.userId, score:item.score, date:item.date, time:item.time, competitor:item.competitor,competitorDetail:item.competitorDetail})))
        .catch(err => console.error(err));
}

  add({userId = null, score = null, date = null, time = null, competitor = null}){
      this.setState(prevState =>({
        tournaments:[
          ...prevState.tournaments,{
            id: this.nextID(),
            userId: userId,
            score: score,
            date: date,
            time: time,
            competitor: competitor
          }]

      }))
  }
  nextID(){
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
  }
  handleChangeCompetitor(event){
    this.setState({competitor:event.target.value});
  }
  handleChangeYear(event){
    this.setState({year:event.target.value});
  }
  eachTournament(tournament,i){
    return (
      <div key={`container${i}`} className="card" style={{width: 18 + 'rem', marginBottom: 7 + 'px'}}>
      <div className="card-body">
          <Tournament key={`tournament`+i} index={i}>
                  <h5 className="card-title">Name: {tournament.competitor}</h5>
                  <p className="card-text">Score: {tournament.score}<br/> Date: {tournament.date} <br/> Time: {tournament.time}</p>
          </Tournament>
          </div>
      </div>
  )
  }
  render() {
    return (
      <div className="mytournementsbyyear">
      <label>
        competitior: 
        <input type="text" name="competitor" value={this.state.competitor} onChange={this.handleChangeCompetitor}/>
      </label>
      <br/>
      <label>
        year: 
        <input type="text" name="year" value={this.state.year} onChange={this.handleChangeYear}/>
      </label>
      <br/>
      <button type="submit" value="Submit" onClick={this.getData} >get data</button>

        { this.state.tournaments.map(this.eachTournament) }
      </div>
    )
  }
}