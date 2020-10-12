import React, { Component } from "react";
import Loading from "../loading";
import ErrorMsg from "../error-msg";

import "./item-list.scss";

export class ItemList extends Component {
  state = {
    itemList: null,
    isError: false,
    textError: null,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((itemList) => {
        this.setState({ itemList });
      })
      .catch((e) => this.catchError(e));
  }

  componentDidCatch(){
    this.setState({
     isError: true,
    })
  }

  catchError = (err) => {
    this.setState({
      isError: true,
      textError: err.toString(),
    });
  };

  renderItems = (arr) => {
    return arr.map(({ id, name }) => {
      return (
        <li
          className={
            this.props.selectedId === id
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          key={id}
          onClick={() => {
            this.props.onSelected(id);
          }}
        >
          {name}
        </li>
      );
    });
  };

  render() {
    const { itemList, isError, textError} = this.state;

    if (isError) {
      return (
        <ul className="list-group item-list">
          <ErrorMsg textError={textError}/>
        </ul>
      );
    }

    if (!itemList) {
      return <Loading />;
    }

    const items = this.renderItems(itemList);

    return <ul className="list-group item-list">{items}</ul>;
  }
}

export default ItemList;
