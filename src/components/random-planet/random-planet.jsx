import React, { Component } from "react";
import Loading from "../loading";
import ErrorMsg from '../error-msg'
import SwapiService from "../../services/swapi-service";


export class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    isLoading: true,
    isError: false,
    textError: null,
  };

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  
  componentDidCatch(){
    this.setState({
     isError: true,
    })
  }

  catchError = (err) => {
    this.setState({
      isLoading: false,
      isError: true,
      textError: err.toString(),
    });
  };
  
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

  render() {
    const {
      planet: { id, population, rotation, diameter, name },
      isLoading,
      isError,
      textError,
    } = this.state;

    if (isLoading){
      return (
        <div className="randomItem block">
          <Loading />
        </div>
      );
    }

    if(isError){
      return (
        <div className="randomItem block">
          <ErrorMsg textError={textError}/>
        </div>
      );
    }
      
    return (
      <div className="randomItem block">
        <img
          className="randomItem__img"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="planet"
        />
        <div className="randomItem__info">
          <h3 className="text-success">{name}</h3>
          <ul className="randomItem__info__list">
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
