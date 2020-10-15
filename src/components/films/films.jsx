import React, { Component } from "react";
import Loading from "../loading";
import ErrorMsg from "../error-msg";
import "./films.scss";

export class Films extends Component {
  state = {
    film: {},
    isLoading: true,
    isError: false,
    textError: null,
    image: null,
  };
  componentDidMount() {
    const { getFilm, getFilmImage } = this.props.swapiService;
    const id = Math.floor(Math.random() * 6 + 1);
    getFilm(id)
      .then((film) => {
        this.setState({
          film,
          image: getFilmImage(id),
          isLoading: false,
        });
      })
      .catch((err) => {
        this.catchError(err);
      });
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
  render() {
    const { isLoading, isError, textError, image, film } = this.state;
    const { title, episode, release, opening, director } = film;
    if (isLoading) {
      return (
        <div className="jumbotron block">
          <Loading />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="jumbotron block">
          <ErrorMsg textError={textError} />
        </div>
      );
    }
    return (
      <div className="jumbotron block">
        <div className="card-passport film">
          <img
            className="film_img"
            src={image}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://starwars-visualguide.com/assets/img/placeholder.jpg";
            }}
          />
          <div className="film_info">
            <h1>Star Wars episode {episode}</h1>
            <h1>{title}</h1>
            <p className="lead text-info">{opening}</p>
            <hr className="my-4" />
            <p className="lead text-success">Director: {director}</p>
            <p className="text-warning">Release date: {release}</p>
            <p className="lead contacts">
              <a className="btn btn-primary btn-lg" href="https://www.linkedin.com/in/andreykorol2019/" role="button">
                Linkedin
              </a>
              <a className="btn btn-secondary btn-lg" href="https://github.com/RemyJS/StarWars-React" role="button">
                Github
              </a>
              <a className="btn btn-info btn-lg" href="https://t.me/Remy_lee" role="button">
                Telegram
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Films;
