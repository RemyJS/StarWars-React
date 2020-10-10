import React, { Component } from "react";
import ItemList from '../item-list';
import ItemDetails, { Record } from '../item-details/item-details';

export class StarshipPage extends Component {
  state = {
    selectedId: null,
  }

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    })
  }

  render() {
    const { getAllStarships ,getStarship, getStarshipImage } = this.props.swapiService;
    return (
      <div className="row lg-2">
        <div className="col-mb-6">
          <ItemList
            getData = {getAllStarships}
            onSelected={this.onSelected}
            selectedId={this.state.selectedId}
          />
        </div>
        <div className="col-mb-6">
          <ItemDetails selectedId={this.state.selectedId} getData = {getStarship} getImage = {getStarshipImage} subtitile='cost' footer='manufacturer'>
            <Record label="Class: " field="class"/>
            <Record label="Speed: " field="speed"/>
            <Record label="Length: " field="length"/>
            <Record label="Passengers: " field="passengers"/>
          </ItemDetails>
        </div>
      </div>
    );
  }
}

export default StarshipPage;
