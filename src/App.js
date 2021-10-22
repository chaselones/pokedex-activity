import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import CarouselComponent from "./components/CarouselComponent";
import Modal from 'react-bootstrap/Modal';

const App = () => {
  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
    handleShow();
  };

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(pokemonData);

  return (
    <div className="App">
      <img id="logo" src='./Images\Logo.svg' alt="pokemon logo" />
      <h1 id="heading">Find a Pokemon</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
          />
        </label>
        <button id="submitButton" type="submit">GO</button>
      </form>

      {pokemonData.map((data) => {
        return (
          <Modal id="modal" show={show} onHide={handleClose}>

            <Modal.Header closeButton closeLabel=" " id="modalHeader">

              <Modal.Title>{data.name.toUpperCase()}</Modal.Title>

            </Modal.Header>

            <Modal.Body>

              <div id="modalbody">
                <img src={data.sprites["front_default"]} alt="pokemon result" />
                <ul id="stats">
                  <li>Pokemon type:{pokemonType}</li>
                  <li>Height: {Math.round(data.height * 3.9)} inches</li>
                  <li>Weight: {Math.round(data.weight / 4.3)} lbs</li>
                  <li>{data.game_indices.length} battles fought</li>
                </ul>
              </div>

            </Modal.Body>

          </Modal>
        );
      })}
      {/* CAROUSEL */}
      <div id="carouselContainer">
        <h1 id="swipeToSee">Swipe to see your Pokemon</h1>
        <CarouselComponent />
      </div>
    </div >
  );
};

export default App;