import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import Header from "../header";
import Films from "../films";
import PersonPage from "../person-page/person-page";
import PlanetPage from "../planet-page";
import StarshipPage from "../starship-page";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.scss";

export default class App extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <div className="app">
        <Router>
          <Header />
          <Route
            path="/"
            render={() => <Films swapiService={this.swapiService} />}
            exact
          ></Route>
          <Route
            path="/people/"
            render={() => <PersonPage swapiService={this.swapiService} />}
          ></Route>
          <Route
            path="/planets/"
            render={() => <PlanetPage swapiService={this.swapiService} />}
          ></Route>
          <Route
            path="/starships/"
            render={() => <StarshipPage swapiService={this.swapiService} />}
          ></Route>
        </Router>
      </div>
    );
  }
}
