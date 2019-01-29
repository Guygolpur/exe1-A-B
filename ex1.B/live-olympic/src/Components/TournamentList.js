import React, { Component } from 'react';
import Tournament from './Tournament';
import { MdAdd } from 'react-icons/md';
import data from '../data/data.json';

class TournamentList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tournaments: [

            ]
        }
        this.eachTournament   = this.eachTournament.bind(this)
        this.update     =  this.update.bind(this)
        this.delete     = this.delete.bind(this)
        this.add        = this.add.bind(this)
        this.nextID     = this.nextID.bind(this)
    }

    componentDidMount() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const url = "https://olympic-live-game.herokuapp.com/cruises";
        fetch(proxyUrl + url)
        .then(res => res.json())
        .then(data => data.map(item =>
          this.add({userId:item.userId, score:item.score, date:item.date, time:item.time, competitor:item.competitor,competitorDetail:item.competitorDetail})))      .catch(err => console.error(err));
       }

    update(newTournament, i) {
        console.log(`update: ${i} ${newTournament}`)
        this.setState(prevState => ({
            tournaments: prevState.tournaments.map(
                tournament => (tournament.id !== i) ? tournament : {...tournament, tournament: newTournament}
            )
        }))
    }

    delete(id) {
        console.log('delete at ', id)
        this.setState(prevState => ({
            tournaments:prevState.tournaments.filter(tournament => tournament.id !== id)
        }))
    }


    add({userId = null, score = null, date = null, time = null, competitor = null}) {
        console.log( userId + score + date + time + competitor);
        this.setState(prevState => ({
            tournaments: [
                ...prevState.tournaments, {
                    id:this.nextID(),
                    userId: userId,
                    score: score,
                    date: date,
                    time: time,
                    competitor: competitor

                }]
        }))
    }


    nextID() {
        this.uniqueId = this.uniqueId || 0
        return this.uniqueId++
    }

    eachTournament(tournament, i) {
        return (
            <div key={`container${i}`} className="card" style={{width: 18 + 'rem', marginBottom: 7 + 'px'}}>
            <div className="card-body">
                <Tournament key={`tournament`+i} index={i} onChange={this.update} onDelete={this.delete}>
                <h5 className="card-title">Name: {tournament.competitor}</h5>
                <p className="card-text">Score: {tournament.score}<br/> Date: {tournament.date} <br/> Time: {tournament.time}</p>
                    </Tournament>
                </div>
            </div>
        )
    }
    render(){
        return (
            <div className="tournamentsList">
            { this.state.tournaments.map (this.eachTournament)}
            </div>
        )
    }
}

export default TournamentList