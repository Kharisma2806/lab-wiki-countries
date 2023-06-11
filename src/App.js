import "./App.css";
import Navbar from "./components/Navbar";
import CountriesList from "./components/CountriesList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [countriesArr, setcountriesArr] = useState([]);

  useEffect(() => {
    axios
      .get("https://ih-countries-api.herokuapp.com/countries")
      .then(response => {
        const countries = response.data;
        setcountriesArr(countries);
        console.log(countriesArr);
      })
      .catch(error => {
        console.error("Error fetching countries:", error);
      });
  }, [countriesArr]);

  return (
    <Router> 
      <div className="App-headerpp">
        <Navbar />
      </div>
      <div className="container">
        <div className="row">
          <div
            className="col-3"
            style={{ maxHeight: "90vh", overflow: "scroll" }}
          >
            <CountriesList countries={countriesArr} />
          </div>
          <div className="col-9">
            <Routes>
              <Route
                path="/:id"
                element={<CountryDetails countries={countriesArr} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
