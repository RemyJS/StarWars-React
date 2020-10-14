import React, { Component } from "react";
import ItemList from "../item-list";
import ItemDetails, { Record } from "../item-details/item-details";
import RandomItem, { RandomRecord } from "../random-item/random-item";

export class StarshipPage extends Component {
  state = {
    selectedId: null,
  };

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  randomVehicle = () => {
    const num = [4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38, 42];
    const id = Math.floor(Math.random() * num.length);
    return num[id];
  }

  render() {
    const {
      getAllStarships,
      getStarship,
      getStarshipImage,
      getVehicle,
      getVehicleImage,
    } = this.props.swapiService;
    return (
      <>
        <RandomItem getData={getVehicle} getImage={getVehicleImage} getId={this.randomVehicle}>
          <RandomRecord label="Class: " field="class" />
          <RandomRecord label="Speed: " field="speed" />
          <RandomRecord label="Length: " field="length" />
        </RandomItem>
        <div className="row">
            <ItemList
              getData={getAllStarships}
              onSelected={this.onSelected}
              selectedId={this.state.selectedId}
            />
            <ItemDetails
              selectedId={this.state.selectedId}
              getData={getStarship}
              getImage={getStarshipImage}
              subtitile="cost"
              footer="manufacturer"
            >
              <Record label="Class: " field="class" />
              <Record label="Speed: " field="speed" />
              <Record label="Length: " field="length" />
              <Record label="Passengers: " field="passengers" />
            </ItemDetails>
        </div>
      </>
    );
  }
}

export default StarshipPage;
