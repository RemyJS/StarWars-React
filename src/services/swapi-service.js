export default class SwapiService {
  _apiBase = "https://swapi.dev/api";
  _apiImage ="https://starwars-visualguide.com/assets/img/"

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) throw new Error(`Could not fetch ${url}`);
    return await res.json();
  };

  getAllPeople = async () => {
    const res = await this.getResource("/people/");
    return res.results.map((people) => this._transphormPerson(people));
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}`);
    return this._transphormPerson(person);
  };

  getPersonImage = (id) => {
    return `${this._apiImage}characters/${id}.jpg`;
  }

  getAllPlanet = async () => {
    const res = await this.getResource("/planets/");
    return res.results.map((p) => this._transphormPlanet(p));
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transphormPlanet(planet);
  };

  getPlanetImage = (id) => {
    if(id == 1) return 'https://vignette.wikia.nocookie.net/starwars/images/b/b0/Tatooine_TPM.png/revision/latest/scale-to-width-down/350?cb=20131019121937';
    return `${this._apiImage}planets/${id}.jpg`;
  }

  getAllStarships = async () => {
    const res = await this.getResource("/starships/");
    return res.results.map((s) => this._transphormStarship(s));
  };

  getStarship = async (id) => {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transphormStarship(starship);
  };

  getStarshipImage = (id) => {
    if(id == 2) return 'https://vignette.wikia.nocookie.net/rustarwars/images/e/e3/Sundered-Heart.jpg/revision/latest/scale-to-width-down/340?cb=20131105140636';
    if(id == 3) return 'https://vignette.wikia.nocookie.net/starwars/images/5/58/ISD-I.png/revision/latest/scale-to-width-down/250?cb=20150416041211';
    if(id == 17) return 'https://4.bp.blogspot.com/-aDB79v_b9w4/V7C8wfnNE7I/AAAAAAAAKyc/IKA6VrxOlfYq0ns2KVhTWBu_60_ihb6bACLcB/s1600/Rebel_transport_box_art.jpg';
    return `${this._apiImage}starships/${id}.jpg`;
  }

  getAllVehicles  = async () => {
    const res = await this.getResource("/vehicles/");
    return res.results.map((v) => this._transphormVehicle(v));
  };

  getVehicle  = async (id) => {
    const starship = await this.getResource(`/vehicles/${id}`);
    return this._transphormVehicle(starship);
  };

  getVehicleImage = (id) => {
    return `${this._apiImage}vehicles/${id}.jpg`;
  }

  getFilm = async (id) => {
    const film = await this.getResource(`/films/${id}`);
    return this._transphormFilm(film);
  }

  getFilmImage = (id) => {
    return `${this._apiImage}films/${id}.jpg`;
  }
  
  _getId = (url) => {
    const reg = /\/([0-9]*)\/$/;
    return url.match(reg)[1];
  };

  _transphormPerson = (person) => {
    const id = this._getId(person.url);
    const homeworld = this._getId(person.homeworld);
    return {
      id,
      homeworld,
      skin: person.skin_color,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      height: person.height,
      eyeColor: person.eye_color,
    };
  };

  _transphormPlanet = (planet) => {
    const id = this._getId(planet.url);
    return {
      id,
      name: planet.name,
      population: planet.population,
      rotation: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
    };
  };

  _transphormStarship= (starship) => {
    const id = this._getId(starship.url);
    return {
      id,
      name: starship.name,
      class: starship.starship_class,
      speed: starship.max_atmosphering_speed,
      length: starship.length,
      passengers: starship.passengers,
      cost: starship.cost_in_credits,
      manufacturer: starship.manufacturer,
    };
  };

  _transphormVehicle = (vehicle) => {
    const id = this._getId(vehicle.url);
    return {
      id,
      name: vehicle.name,
      class: vehicle.vehicle_class,
      speed: vehicle.max_atmosphering_speed,
      length: vehicle.length,
      passengers: vehicle.passengers,
      cost: vehicle.cost_in_credits,
      manufacturer: vehicle.manufacturer,
    };
  };

  _transphormFilm = (film) => {
    return {
      title: film.title,
      episode: film.episode_id,
      release: film.release_date,
      opening: film.opening_crawl,
      director: film.director,
    }
  }
}
