import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";

import "./person.scss";
export default class Person extends Component {
  swapiService = new SwapiService();

  state = {
    person: null,
    planet: null,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedPerson !== prevProps.selectedPerson) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const id = this.props.selectedPerson;
    if (!id) return;

    this.swapiService.getPerson(id).then((person) => {
      this.swapiService.getPlanet(person.homeworld).then((planet) => {
        this.setState({ person, planet });
      });
    });
  }

  render() {
    const { person, planet } = this.state;
    if (!person) {
      return (
        <div className="card mb-3">
          <h5 className="card-header">Select a person from a list</h5>
        </div>
      );
    }

    const {
      id,
      name,
      gender,
      birthYear,
      eyeColor,
      height,
      skin,
    } = person;
    const { name: PlanetName } = planet;
    return (
      <div className="card mb-3">
        <h4 className="card-header bg-primary">{name}</h4>
        <div className="card-passport">
          <img
            className="card-img"
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Birth Year: {birthYear}</li>
            <li className="list-group-item">Height: {height}</li>
            <li className="list-group-item">Eye Color: {eyeColor}</li>
            <li className="list-group-item">Skin Color: {skin}</li>
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-subtitle">Home planet: {PlanetName}</h4>
        </div>
        <div className="card-footer text-muted">gender: {gender}</div>
      </div>
    );
  }
}
