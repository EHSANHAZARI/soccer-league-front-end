import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useData, DataProvider } from "./DataContext"; // Import DataProvider
import MainPage from "./MainPage/MainPage";
import Register from "./RegisterPage/register";
import axios from "axios";
import Player from "./PlayerPage/Player";
import League from "./LeaguePage/League";
function App() {
  const {
    leagueData,
    setLeagueData,
    awayGames,
    setAwayGames,
    homeGames,
    setHomeGames,
    news,
    setNews,
  } = useData();
  const myKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchLeagueData = async () => {
      const options = {
        method: "GET",
        url: "https://livescore-football.p.rapidapi.com/soccer/league-table",
        params: {
          country_code: "england",
          league_code: "premier-league",
        },
        headers: {
          "X-RapidAPI-Key": myKey,
          "X-RapidAPI-Host": "livescore-football.p.rapidapi.com",
        },
      };
      const options2 = {
        method: "GET",
        url: "https://livescore-football.p.rapidapi.com/soccer/news-list",
        params: { page: "1" },
        headers: {
          "X-RapidAPI-Key": myKey,
          "X-RapidAPI-Host": "livescore-football.p.rapidapi.com",
        },
      };
      const fetchedData = localStorage.getItem("leagueData");
      const newsFetchedData = localStorage.getItem("newsData");

      if (newsFetchedData) {
        const newsParsedData = JSON.parse(newsFetchedData);

        const newsInfo = newsParsedData.data;
        // console.log(leagueInfo.total);

        setNews(newsInfo);
      }
      if (fetchedData) {
        const parsedData = JSON.parse(fetchedData);
        const leagueInfo = parsedData.data;
        console.log(leagueInfo.total + "data exist");
        setLeagueData(leagueInfo.total);
        setAwayGames(leagueInfo.away);
        setHomeGames(leagueInfo.home);
      } else {
        try {
          const response = await axios.request(options);
          const response2 = await axios.request(options2);

          const fetchedData = response.data;
          const newsFetchedData = response2.data;

          localStorage.setItem("leagueData", JSON.stringify(fetchedData));
          localStorage.setItem("newsData", JSON.stringify(newsFetchedData));
          console.log(fetchedData.total + "data fetched");
          setLeagueData(fetchedData.total);
          setAwayGames(fetchedData.away);
          setHomeGames(fetchedData.home);
          setNews(newsFetchedData);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const leagueDataFetchInterval = setInterval(() => {
      fetchLeagueData();
    }, 24 * 60 * 60 * 1000);

    fetchLeagueData();

    return () => {
      clearInterval(leagueDataFetchInterval);
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage news={news} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Players" element={<Player />} />
        <Route
          path="/Leagues"
          element={
            <League
              leaguTable={leagueData}
              homeGame={homeGames}
              awayGame={awayGames}
            />
          }
        />
      </Routes>
    </div>
  );
}

function AppWithDataProvider() {
  return (
    <DataProvider>
      <App />
    </DataProvider>
  );
}

export default AppWithDataProvider;
