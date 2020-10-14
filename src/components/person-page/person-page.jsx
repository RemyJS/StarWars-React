import React, { Component } from "react";
import ItemList from "../item-list";
import Person from "../person";
import RandomItem, { RandomRecord } from "../random-item/random-item";

export class PersonPage extends Component {
  state = {
    selectedId: null,
  };

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  
  randomPlanet = () => {
    return Math.floor(Math.random() * 17 + 2);
  }

  render() {
    const { getAllPeople, getPlanet, getPlanetImage } = this.props.swapiService;
    return (
      <>
        <RandomItem
          getData={getPlanet}
          getImage={getPlanetImage}
          getId={this.randomPlanet}
        >
          <RandomRecord label="Diameter: " field="diameter" />
          <RandomRecord label="Rotation Period: " field="rotation" />
          <RandomRecord label="Population: " field="population" />
        </RandomItem>
        <div className="row">
            <ItemList
              getData={getAllPeople}
              onSelected={this.onSelected}
              selectedId={this.state.selectedId}
            />
            <Person selectedPerson={this.state.selectedId} />
        </div>
      </>
    );
  }
}

export default PersonPage;
