import React from 'react'
import {Route} from 'react-router-dom'
import TournamentList from '../Components/TournamentList'
import MyTournaments from '../Components/MyTournaments'
import MyTournementsByYear from '../Components/MyTournementsByYear'
import Header from '../Header'
// import Route from 'react-router-dom/Route';

const ReactRouter = () => {
    return (
        <React.Fragment>
            <Header/>
            <Route exact path="/" component={TournamentList}/>
            <Route path="/MyTournaments" component={MyTournaments}/>
            <Route path="/MyTournementsByYear" component={MyTournementsByYear}/>
        </React.Fragment>
    )
}

export default ReactRouter