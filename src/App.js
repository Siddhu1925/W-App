import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react";
import swal from 'sweetalert';
import './App.css';
function App() {


  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      swal({
        title: "Wrong Info",
        text: "Please Enter Correct City Name or Zipcode!",
        icon: "error",
        button: "Ok",
      });

    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }


  return (
    <div className="col-md-12">
      <div className="weather">
        <h1 className="title">Weather App</h1>

        <div className="d-grid gap-3 col-3 mt-3">
          <input type="text" className="form-control"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-info" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded weatherResultBox">
            <img className="weatherIcon"
              src="./icon.webp" alt="Logo" />

            <h5 className="weatherCity">
              {data?.name}
            </h5>
            <h6 className="weatherTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
