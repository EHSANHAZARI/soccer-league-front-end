import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import "../LeaguePage/style.css";
import "./style.css";
function League({ leaguTable, homeGame, awayGame }) {
  const [leagueData, setLeagueData] = useState([]);

  //If you dont do this after refreshing the page it is not going to display your table dat
  useEffect(() => {
    setLeagueData(leaguTable);
  }, [leaguTable]);

  const data = React.useMemo(() => leagueData, [leagueData]);

  const columns = React.useMemo(
    () => [
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
    ],
    []
  );

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
                  <th {...column.getHeaderProps()}>
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
