import React, { Component } from "react";
import Loading from "../loading";
import ErrorMsg from "../error-msg";

import './random-item.scss';

const RandomRecord = ({ item, field, label }) => {
  return (
    <li>
      {label} {item[field]}
    </li>
  );
};
export { RandomRecord };
export default class RandomItem extends Component {
  state = {
    item: {},
    image: null,
    isLoading: true,
    isError: false,
    textError: null,
  };

  componentDidMount() {
    this.updateItem();
    this.interval = setInterval(this.updateItem, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidCatch() {
    this.setState({
      isError: true,
    });
  }

  catchError = (err) => {
    this.setState({
      isLoading: false,
      isError: true,
      textError: err.toString(),
    });
  };

  updateItem = () => {
    const { getData, getImage, getId } = this.props;
    const id = getId();
    getData(id)
      .then((item) => {
        this.setState({
          item,
          image: getImage(id),
          isLoading: false,
        });
      })
      .catch((e) => this.catchError(e));
  }

  render() {
    const {
      item,
      image,
      isLoading,
      isError,
      textError,
    } = this.state;
  
    if (isLoading) {
      return (
        <div className="randomItem block">
          <Loading />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="randomItem block">
          <ErrorMsg textError={textError} />
        </div>
      );
    }

    return (
      <div className="randomItem block">
        <img className="randomItem__img" src={image} alt="random-image" />
        <div className="randomItem__info">
          <h3 className="text-success">{item.name}</h3>
          <ul className="randomItem__info__list">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </div>
    );
  }
}
