import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Header from '../header';
import PersonPage from '../person-page/person-page';
import PlanetPage from '../planet-page';
import RandomPlanet from '../random-planet';
import StarshipPage from '../starship-page';
import './app.scss';

export default class App extends Component{
  swapiService = new SwapiService();

  render() {
    return (
      <div className='app'>
        <Header/>
        <RandomPlanet/>
        <PersonPage swapiService = {this.swapiService}/>
        <PlanetPage swapiService = {this.swapiService}/>
        <StarshipPage swapiService = {this.swapiService}/>
      </div>
    )
  }
}