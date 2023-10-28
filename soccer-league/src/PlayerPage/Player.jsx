import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTable } from "react-table";
import "./style.css";
import upArrow from "./Assets/up-arrow.png";
import downArrow from "./Assets/down-arrow.png";
import sortBy from "lodash/sortBy";
import Pagination from "react-paginate";

const Player = () => {
  const [sortedPlayer, setsortedPlayer] = useState([]); // Stores retrived data
  const [isReverse, setIsReverse] = useState(false); // Checks if the sort is asc or desc
  const [shouldFetchData, setShouldFetchData] = useState(true);

  const sortImgRef = useRef();
  const myKey = process.env.REACT_APP_API_KEY;
  // Pagination Section
  const [pageNumber, setPageNumber] = React.useState(0); //Represent the page number we are in
  const dataPerPage = 10; // Define the fixed number of items per page
  const dataVisited = pageNumber * dataPerPage; // Represent the amount of data that is displayed
  const pageCount = Math.ceil(sortedPlayer.length / dataPerPage); // Use sortedPlayer for pagination

  const changePage = ({ selected }) => {
    //selected is predefined variable showing current page
    setPageNumber(selected);
  };

  // Sorting Section
  const handleSort = (event) => {
    const value = event.currentTarget.getAttribute("value");

    // Get the data within the current page
    const start = dataVisited;
    const end = start + dataPerPage;
    const dataOnCurrentPage = sortedPlayer.slice(start, end);

    // Sort the data within the current page
    const sortedPlayerOnPage = sortBy(dataOnCurrentPage, value);

    if (!isReverse) {
      // If sorting in ascending order, set the sorted data within the current page
      setIsReverse(true);
      setsortedPlayer((prevData) => {
        const newData = [...prevData];
        newData.splice(start, dataPerPage, ...sortedPlayerOnPage);
        return newData;
      });
    } else {
      // If sorting in descending order, set the reversed sorted data within the current page
      setIsReverse(false);
      const sortedPlayerDesc = sortedPlayerOnPage.reverse();
      setsortedPlayer((prevData) => {
        const newData = [...prevData];
        newData.splice(start, dataPerPage, ...sortedPlayerDesc);
        return newData;
      });
      sortImgRef.current.src = downArrow;
    }

    event.preventDefault();
  };

  // Table Section
  const tableData = React.useMemo(() => {
    const start = dataVisited;
    const end = start + dataPerPage;
    return sortedPlayer.slice(start, end); // Use sortedPlayer for pagination
  }, [sortedPlayer, dataVisited, dataPerPage]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "player.name",
      },
      {
        Header: "Team",
        accessor: `statistics[0].team.name`,
      },
      {
        Header: "Nationality",
        accessor: "player.nationality",
      },
      {
        Header: "League",
        accessor: `statistics[0].league.name`,
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldFetchData(true);
    }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async (leagueId) => {
      const options = {
        method: "GET",
        url: "https://api-football-v1.p.rapidapi.com/v3/players",
        params: {
          league: leagueId,
          season: "2022",
        },
        headers: {
          "X-RapidAPI-Key": myKey,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      const cachedData = localStorage.getItem("cachedData");

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);

        const playerData = parsedData.response;

        setsortedPlayer(playerData);
      } else {
        const jsonData = await axios.request(options);

        localStorage.setItem("cachedData", JSON.stringify(jsonData));

        setsortedPlayer(jsonData);
      }
      setShouldFetchData(false);
    };
    if (shouldFetchData) {
      fetchData(39);
    }
  }, [shouldFetchData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <div className="players">
      <div className="containers">
        <table {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps}>
                    {column.render("Header")}
                    {column.render("Header") === "Name" ||
                    column.render("Header") === "Nationality" ||
                    column.render("Header") === "Team" ? (
                      <a
                        value={column.id}
                        href=""
                        className="upArrow"
                        onClick={handleSort}
                      >
                        <img
                          ref={sortImgRef}
                          src={isReverse === true ? upArrow : downArrow}
                          alt=""
                        />
                      </a>
                    ) : (
                      <></>
                    )}
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
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="paginationButtons"
        previousLinkClassName="previousButtons"
        nextLinkClassName="nextButton"
        disabledClassName="disabledButton"
        activeClassName="paginationActive"
      />
    </div>
  );
};

export default Player;
