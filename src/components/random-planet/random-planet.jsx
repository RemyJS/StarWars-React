import React, { Component } from "react";
import Loading from "../loading";
import ErrorMsg from '../error-msg'
import SwapiService from "../../services/swapi-service";

import "./random-planet.scss";

export class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService.getPlanet(id).then((planet) => {
      this.setState({
        planet,
        isLoading: false,
        isError: false,
      });
    }).catch((err) => {
      this.catchError(err);
    })
  }

  catchError = (err) =>  {
    console.log(err);
    this.setState({
      isError: true,
      isLoading: false,
    })
  }
  render() {
    const {
      planet: { id, population, rotation, diameter, name },
      isLoading,
      isError,
    } = this.state;

    if (isLoading){
      return (
        <div className="randomPlanet block">
          <Loading />
        </div>
      );
    }

    if(isError){
      return (
        <div className="randomPlanet block">
          <ErrorMsg/>
        </div>
      );
    }
      
    return (
      <div className="randomPlanet block">
        <img
          className="randomPlanet__img"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="planet"
        />
        <div className="randomPlanet__info">
          <h3 className="randomPlanet__info__img">{name}</h3>
          <ul className="randomPlanet__info__list">
            <li>Population: {population}</li>
            <li>Rotation Period: {rotation}</li>
            <li>Diametr: {diameter}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RandomPlanet;