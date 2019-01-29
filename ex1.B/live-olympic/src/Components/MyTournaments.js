import React, { Component } from 'react'

class MyTournaments extends Component {
        constructor(props) {
          super(props)
          this.state = {
              tournaments: [],
              score:'5',
              time:'14:00',
              id:2
          }
          this.eachTournament     = this.eachTournament.bind(this)
          this.setData            = this.setData.bind(this)
          this.handleChangeScore  = this.handleChangeScore.bind(this);
          this.handleChangeTime   = this.handleChangeTime.bind(this);
          this.handleChangeId     = this.handleChangeId.bind(this);
        }
  
        handleChangeId(event) {
          this.setState({id:event.target.value})
        }

      handleChangeScore(event) {
        this.setState({score:event.target.value})
      }

      handleChangeTime(event) {
        this.setState({time:event.target.value})
      }

      setData() {
          const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
          const url = `https://olympic-live-game.herokuapp.com/cruise/${this.state.id}`;
          fetch(`${proxyUrl}${url}`,
            {method:'POST',
            body:`score=${this.state.score}&time=${this.state.time}`,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
         }})
          .then(res => res.json())
            .catch(err => console.error(err));
            console.log(this.state.score)
            console.log(this.state.time)
          
         }
  
      eachTournament(tournament, i) {
          return (
              <div key={`container${i}`} className="card" style={{width: 18 + 'rem', marginBottom: 7 + 'px'}}>
              <div className="card-body">
                  <MyTournaments key={`tournament`+i} index={i} onChange={this.update} onDelete={this.delete}>
                  <h5 className="card-title">Name: {tournament.competitor}</h5>
                  <p className="card-text">Score: {tournament.score}<br/> Date: {tournament.date} <br/> Time: {tournament.time}</p>
                      </MyTournaments>
                  </div>
              </div>
          )
      }
      render(){
          return (
              <div className="tournamentsList">
              { this.state.tournaments.map (this.eachTournament)}
              <label>
              id:
              <input type="number" name="id" value={this.state.id} onChange={this.handleChangeId} />
            </label>
            <label>
              Score:
              <input type="text" name="score" value={this.state.score} onChange={this.handleChangeScore} />
            </label>
            <label>
              Time:
              <input type="text" name="score" value={this.state.time} onChange={this.handleChangeTime} />
            </label>
            <button type="submit" onClick={this.setData}>Add</button>
              </div>
          )
      }
  }
export default MyTournaments