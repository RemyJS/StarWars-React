import React, { Component } from "react";
import ItemList from "../item-list";
import Person from "../person";
import RandomPlanet from "../random-planet";
import RandomPlaner from "../random-planet";

export class PersonPage extends Component {
  state = {
    selectedId: null,
  };

  onSelected = (id) => {
    this.setState({
      selectedId: id,
    });
  };

  render() {
    const { getAllPeople } = this.props.swapiService;
    return (
      <>
        <RandomPlanet />
        <div className="row lg-2">
          <div className="col-mb-6">
            <ItemList
              getData={getAllPeople}
              onSelected={this.onSelected}
              selectedId={this.state.selectedId}
            />
          </div>
          <div className="col-mb-6">
            <Person selectedPerson={this.state.selectedId} />
          </div>
        </div>
      </>
    );
  }
}

export default PersonPage;
