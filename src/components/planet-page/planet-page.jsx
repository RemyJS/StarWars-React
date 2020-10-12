import React, { Component } from "react";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";

export class PlanetPage extends Component {
  state = {
    selectedId: null,
  };

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  render() {
    const { getAllPlanet ,getPlanet, getPlanetImage } = this.props.swapiService;
    return (
      <div className="row lg-2">
        <div className="col-mb-6">
          <ItemList
            getData={getAllPlanet}
            onSelected={this.onSelected}
            selectedId={this.state.selectedId}
          />
        </div>
        <div className="col-mb-6">
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
      </div>
    );
  }
}

export default PlanetPage;
