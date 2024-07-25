import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input, Row, Col } from "reactstrap";

export default function Weather() {
  const [data, setData] = useState(null);
  const [text, setText] = useState("Ho Chi Minh");
  const [city, setCity] = useState("Ho Chi Minh");
  const [error, setError] = useState(null);
    const getTime=(value)=>{
        let d = new Date(value*1000)
        return d.toLocaleString();
    }

  const apikey = "08a5b55718117013e573c0aadfddc50e";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  const fetchData = () => {
    axios
      .get(url)
      .then(function (res) {
        console.log(res);
        setData(res.data);
      })
      .catch(function (err) {
        console.log(err);
        if (err.response.status == "404") {
          setError("invalid city name");
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, [city]);
  return (
    <div className="container">
      <div className="sub-container">
        <Input
          type="text"
          className="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setCity(text);
              setText("");
            }
          }}
        />
        {error && <h1>{error}</h1>}
        {data && (
          <div className="content">
            <h1>{data.name}</h1>
            <Row>
              <div className="col-6">
              
                <p><i class="fa-solid fa-location-dot"></i> {data.name}</p>
                <p className="date"><i class="fa-solid fa-calendar-week"></i> DayTime | Thursday</p>
                <p><i class="fa-solid fa-temperature-quarter"></i> {data.main.temp}<span>o</span>C</p>
                <p><i class="fa-solid fa-flag"></i> {data.sys.country}</p>
                <p className="status">{data.weather[0].description}</p>
                <p><i class="fa-solid fa-sun"></i> {getTime(data.sys.sunrise)}</p>
                <p><i class="fa-solid fa-moon"></i> {getTime(data.sys.sunset)}</p>
              </div>
              <div className="col-6 img">
                <img className="img1"
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                />
              </div>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
