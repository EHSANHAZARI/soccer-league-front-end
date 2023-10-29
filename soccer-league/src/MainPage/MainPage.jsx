import React, { useState } from "react";
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
  const hamBut = React.useRef(null);
  const [hamState, sethamState] = useState(false);
  const navRef = React.useRef(null);
  const handleHamButton = () => {
    //  If the ham state is false, it means it hasn't been clicked yet.
    // Therefore, you should change the state to true and apply the new CSS.
    if (!hamState) {
      sethamState(true);
      hamBut.current.className = "hamburgerClicked";
      navRef.current.className = "ham-nav";
    } else {
      sethamState(false);
      hamBut.current.className = "hamburgerButton";
      console.log(navRef.current.className);
      navRef.current.className = "displayNone";
    }
  };
  return (
    <div className="">
      <div className="page-container">
        <header className="header">
          <div className="h-firstRow">
            <div class="hf-firstColumn">
              <span className="sites">League Sites</span>
              <img src={SVG} alt="" />
            </div>
            <nav ref={navRef} className="displayNone">
              <ul>
                <li>
                  <a href="">
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Bets</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>Player</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>League</span>
                  </a>
                </li>
                <li>
                  <a href="">
                    <span>About</span>
                  </a>
                </li>
              </ul>
            </nav>
            <div className="hamburger">
              <button
                className="hamburgerButton"
                ref={hamBut}
                onClick={handleHamButton}
              ></button>
            </div>
            <span className="site-name">Soccer League</span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
