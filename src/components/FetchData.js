import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FetchData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not found");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
      });
  }, []);
  const [query, setQuery] = useState("");
  const search_parameters = Object.keys(Object.assign({}, ...data));
  function search(data) {
    return data.filter((data) =>
      search_parameters.some((parameter) =>
        data[parameter].toString().toLowerCase().includes(query)
      )
    );
  }

  return (
    <div>
      <div className="searchBar">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="search"
          name="search-form"
          placeholder="  Search for Pokemon"
          className="search-input"
          id="search-form"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <ul className="card-container">
        {search(data).map((item, index) => {
          const id = item.url.split("/").filter(Boolean).pop();
          return (
            <div key={index} className="card">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                alt={item.name}
                className="pokemon-img"
              />
              <p>{item.name}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FetchData;
