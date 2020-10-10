import React, { Component } from "react";
import ItemList from '../item-list';
import Person from '../person';

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
      <div className="row lg-2">
        <div className="col-mb-6">
          <ItemList
            getData = {getAllPeople}
            onSelected={this.onSelected}
            selectedId={this.state.selectedId}
          />
        </div>
        <div className="col-mb-6">
          <Person selectedPerson={this.state.selectedId} />
        </div>
      </div>
    );
  }
}

export default PersonPage;
