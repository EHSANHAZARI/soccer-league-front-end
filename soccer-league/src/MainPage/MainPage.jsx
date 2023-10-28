import React from "react";
import "./style.css"; // Make sure this CSS file is in the same directory as your component
import serieA from "./Assets/serieA.svg";
import laliga from "./Assets/laliga.jpg";
import premier1 from "./Assets/premier.svg";
import League1 from "./Assets/League1.svg";
import Ball from "./Assets/ball.jpeg";
import Bet from "./Assets/BET-Logo.png";
import SVG from "./Assets/SVG.svg";

import { Link, Route, Routes } from "react-router-dom";
import Player from "../PlayerPage/Player";
import Slider from "./Components/Slider";

const MainPage = ({ leaguTable, homeGame, awayGame, news }) => {
  return (
    <div className="">
      <div className="page-container">
        <header className="header">
          <div className="h-firstRow">
            <div class="hf-firstColumn">
              <span>League Sites</span>
              <img src={SVG} alt="" />
            </div>
            <div className="hf-secondColumn">
              <ul>
                <li>
                  <a href="https://www.premierleague.com/">
                    <img src={premier1} alt=""></img>
                  </a>
                </li>
                <li>
                  <a href="https://www.legaseriea.it/en">
                    <img src={serieA} alt=""></img>
                  </a>
                </li>
                <li>
                  <a href="https://www.ligue1.com/">
                    <img src={League1} alt=""></img>
                  </a>
                </li>
                <li>
                  <a href="https://www.laliga.com/en-CA">
                    <img src={laliga} alt=""></img>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="h-secondRow">
            <div className="h-s-firstColumn">
              <nav>
                <ul id="nav">
                  <li>
                    <a href="">
                      <Link to="https://www.youtube.com/watch?v=UjHT_NKR_gU">
                        Bets
                      </Link>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <Link to="/Players">Player</Link>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <Link to="/Leagues">League</Link>
                    </a>
                  </li>
                  <li>
                    <a href="">About</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="h-s-secondColumn">
              <button className="signIn">Sign In</button>

              <Link to="/Register">
                <button>Register</button>
              </Link>
            </div>
          </div>
        </header>
        <div className="container">
          <div className="advertieser">
            <div className="logo">
              <div className="ball">
                <div className="slider">
                  <Slider />
                </div>
              </div>
              <div className="sticker">
                <a href="">
                  <img src={Bet} alt="Sticker Image"></img>
                </a>
              </div>
            </div>

            <div className="navbar">
              <button></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
