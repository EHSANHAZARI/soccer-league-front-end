import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [leagueData, setLeagueData] = useState([]);
  const [awayGames, setAwayGames] = useState([]);
  const [homeGames, setHomeGames] = useState([]);
  const [news, setNews] = useState([]);

  return (
    <DataContext.Provider
      value={{
        leagueData,
        setLeagueData,
        awayGames,
        setAwayGames,
        homeGames,
        setHomeGames,
        news,
        setNews,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
