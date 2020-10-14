import React, { Component } from "react";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";
import RandomItem, { RandomRecord } from "../random-item/random-item";

export class PlanetPage extends Component {
  state = {
    selectedId: null,
  };

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  randomSpecies = () => {
    return Math.floor(Math.random() * 36 + 1);
  };

  render() {
    const {
      getAllPlanet,
      getPlanet,
      getPlanetImage,
      getSpecies,
      getSpeciesImage,
    } = this.props.swapiService;
    return (
      <>
        <RandomItem
          getData={getSpecies}
          getImage={getSpeciesImage}
          getId={this.randomSpecies}
        >
          <RandomRecord label="Class: " field="class" />
          <RandomRecord label="Designation: " field="designation" />
          <RandomRecord label="Language: " field="language" />
        </RandomItem>
        <div className="row">
          <ItemList
            getData={getAllPlanet}
            onSelected={this.onSelected}
            selectedId={this.state.selectedId}
          />

          <ItemDetails
            selectedId={this.state.selectedId}
            getData={getPlanet}
            getImage={getPlanetImage}
            subtitile="population"
            footer="terrain"
          >
            <Record label="Diameter: " field="diameter" />
            <Record label="Rotation: " field="rotation" />
            <Record label="Gravity: " field="gravity" />
            <Record label="Climate: " field="climate" />
          </ItemDetails>
        </div>
      </>
    );
  }
}

export default PlanetPage;
