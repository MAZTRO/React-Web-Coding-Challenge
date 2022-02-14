import React, { useState } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import Cards from "../../components/cards/Cards";

import './indexPage.css'

let Index = (props) => {
  const [bikes, setBikes] = useState([])
  const [loanding, setLoanding] = useState(false)

  return (
    <div className="indexContainer">
      <header>
        <div className="titlesCont">
          <div className="logo"></div>
          <div className="titles">
            <h1>Police Departament of Chiper</h1>
            <h2>Stolen Bikes</h2>
          </div>
        </div>
        <SearchBar
          state={{
            bikes: [bikes, setBikes],
            loanding: [loanding, setLoanding]
          }}
        />
      </header>

      <div className="container">
        <Cards
          state={{
            bikes: [bikes, setBikes],
            loanding: [loanding, setLoanding]
          }}
        />
      </div>
    </div>
  )
}

export default Index
