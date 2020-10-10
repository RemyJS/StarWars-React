import React, { Component } from "react";
import Loading from "../loading";

import './item-list.scss';

export class ItemList extends Component {

  state = {
    itemList: null,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({ itemList });
    });
  }

  renderItems = (arr) => {
    return arr.map(({ id, name }) => {
      return (
        <li 
          className={this.props.selectedId === id ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action' }
          key={id}
          onClick={()=>{this.props.onSelected(id)}}>
          {name}
        </li>
      );
    });
  };

  render() {
    const { itemList } = this.state;
    if (!itemList) {
      return <Loading />;
    }
    const items = this.renderItems(itemList);

    return <ul className="list-group item-list">{items}</ul>;
  }
}

export default ItemList;
