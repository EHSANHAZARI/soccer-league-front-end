import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Components/style.css";

const Slider = () => {
  const [playerImage, setPlayerImage] = useState([]);
  const [slide, setSlide] = useState(0);
  const myKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://api-football-v1.p.rapidapi.com/v3/players",
          params: {
            season: 2022,
            league: 39,
          },
          headers: {
            "X-RapidAPI-Key": myKey,
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          },
        };

        const cachedData = localStorage.getItem("cachedData");

        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          const sliderPlayerImage = parsedData.response
            .slice(0, 4)
            .map((player) => ({
              url: player.player.photo ? player.player.photo : "", // Check if photo exists
              name: player.player.name,
              id: player.player.id,
            }));
          setPlayerImage(sliderPlayerImage);
        } else {
          const response = await axios.request(options);
          const fetchedData = response.data;
          localStorage.setItem("cachedData", JSON.stringify(fetchedData));
          const sliderPlayerImage = fetchedData.response
            .slice(0, 4)
            .map((player) => ({
              url: player.player.photo ? player.player.photo : "",
              name: player.player.name,
              id: player.player.id,
            }));
          setPlayerImage(sliderPlayerImage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      const newSlide = (slide + 1) % playerImage.length;
      setSlide(newSlide);
    }, 4000);
    // Clear the interval when the component unmounts to prevent memory leaks
    return () => {
      clearInterval(interval);
    };
  }, [slide, playerImage.length]);

  const handleLast = () =>
    setSlide((slide + playerImage.length - 1) % playerImage.length);
  const handleNext = () => setSlide((slide + 1) % playerImage.length);

  return (
    <div>
      <div className="carousel">
        <div className="slider">
          {playerImage.map((image, index) => (
            <div key={image.id}>
              <img
                src={image.url}
                alt=""
                className={slide === index ? "slide" : "slide slide-hidden"}
              />
            </div>
          ))}
          <div className="arrows">
            <ul>
              <li>
                <button className="arrow-left" onClick={handleLast}></button>
              </li>
              <li>
                <button className="arrow-right" onClick={handleNext}></button>
              </li>
            </ul>
            <span>
              {playerImage.map((indicator, index) => (
                <button
                  key={index}
                  className={
                    slide === index
                      ? "indicator"
                      : "indicator indicator-inactive"
                  }
                  onClick={() => {
                    setSlide(index);
                  }}
                ></button>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
