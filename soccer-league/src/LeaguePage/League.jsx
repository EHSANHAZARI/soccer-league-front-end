import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../LeaguePage/style.css";
import "./style.css";
function League({ leaguTable, homeGame, awayGame }) {
  const [leagueData, setLeagueData] = useState([]);
  const [showAllColumn, setShowAllColumn] = useState(true);
  const [screenSize, setScreenSize] = useState();
  //If you dont do this after refreshing the page it is not going to display your table dat
  useEffect(() => {
    setLeagueData(leaguTable);

    // Create a function to handle the media query change
    const handleScreenSizeChange = (e) => {
      if (e.matches) {
        console.log("false");
        setShowAllColumn(false);
      } else {
        console.log("true");
        setShowAllColumn(true);
      }
    };

    // Add the listener and call the handler initially
    const screenSize = window.matchMedia("(max-width: 768px)");
    screenSize.addListener(handleScreenSizeChange);
    handleScreenSizeChange(screenSize); // Call the handler initially

    // Cleanup the listener when the component unmounts
    return () => {
      screenSize.removeListener(handleScreenSizeChange);
    };
  }, [leaguTable]);

  const data = React.useMemo(() => leagueData, [leagueData]);

  const columns = React.useMemo(() => {
    if (showAllColumn) {
      return [
        {
          Header: "Rank",
          accessor: "rank",
        },
        {
          Header: "Team",
          accessor: "team_name",
        },
        {
          Header: "Points",
          accessor: "points",
        },
        {
          Header: "Games Played",
          accessor: "games_played",
        },
        {
          Header: "Wins",
          accessor: "won",
        },
        {
          Header: "Draw",
          accessor: "draw",
        },
        {
          Header: "Lost",
          accessor: "lost",
        },
        {
          Header: "GD",
          accessor: "goals_diff",
        },
        {
          Header: "GF",
          accessor: "goals_for",
        },
        {
          Header: "GA",
          accessor: "goals_against",
        },
      ];
    } else {
      return [
        {
          Header: "Rank",
          accessor: "rank",
        },
        {
          Header: "Team",
          accessor: "team_name",
        },
        {
          Header: "Points",
          accessor: "points",
        },
        {
          Header: "Games Played",
          accessor: "games_played",
        },
      ];
    }
  }, [showAllColumn]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div className="league_page">
      <div className="table">
        <table {...getTableProps()} className="league-table-container">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={column.render("Header")}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default League;
