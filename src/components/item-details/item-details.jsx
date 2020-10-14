import React, { Component } from "react";
import ErrorMsg from "../error-msg";

import "./item-details.scss";

const Record = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      {label} {item[field]}
    </li>
  );
};

export { Record };
export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
    isError: false,
    textError: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedId !== prevProps.selectedId) {
      this.updateItem();
    }
  }
  
  updateItem() {
    const { selectedId: id, getData, getImage } = this.props;
    if (!id) return;

    getData(id)
      .then((item) => {
        this.setState({
          item,
          image: getImage(id),
        });
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

  render() {
    const { item, image, isError, textError } = this.state;
    if (isError) {
      return (
        <div className="card md-3">
          <ErrorMsg textError={textError}/>
        </div>
      );
    }

    if (!item) {
      return (
        <div className="card md-3">
          <h5 className="card-header">Select a item from a list</h5>
        </div>
      );
    }

    const { name } = item;
    const { footer, subtitile } = this.props;
    return (
      <div className="card md-3">
        <h4 className="card-header bg-primary">{name}</h4>
        <div className="card-passport">
          <img
            className="card-img"
            src={image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
        <div className="card-body">
          <h4 className="card-subtitle">
            {subtitile}: {item[subtitile]}
          </h4>
        </div>
        <div className="card-footer text-muted">{`${footer}: ${item[footer]}`}</div>
      </div>
    );
  }
}
