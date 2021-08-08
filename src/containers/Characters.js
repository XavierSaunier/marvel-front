import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logoMarvel from "../images/marvel-logo.png";

import Header from "../components/Header";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(100);

  const history = useHistory();

  const nextPage = () => {
    const newPage = Number(page) + 1;
    setPage(newPage);
    history.push(`/characters?page=${page}`);
  };

  const prevPage = () => {
    const newPage = Number(page) - 1;
    setPage(newPage);
    history.push(`/characters?page=${page}`);
  };

  if (page < 1) {
    setPage(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-xsaunier.herokuapp.com/characters?page=${page}&name=${name}&limit=${limit}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, name, limit]);

  return isLoading ? (
    <p>Now Loading</p>
  ) : (
    <div>
      <div className="header">
        <Link to="/comics">
          <img alt="logo-marvel" src={logoMarvel} />
        </Link>
        <input
          type="text"
          className="search"
          placeholder="search name"
          onChange={(event) => {
            setName(event.target.value);
          }}
        ></input>
        <div className="log">
          <button className="signUp">Sign up</button>
          <button className="logIn">Log in</button>
        </div>
      </div>

      <div className="control">
        <h3>Display items</h3>
        <div className="limiter">
          <button
            className={limit === 10 ? "currentLimit" : "limitSetter"}
            onClick={(event) => {
              setLimit(10);
            }}
          >
            10
          </button>
          <button
            className={limit === 50 ? "currentLimit" : "limitSetter"}
            onClick={(event) => {
              setLimit(50);
            }}
          >
            50
          </button>
          <button
            className={limit === 100 ? "currentLimit" : "limitSetter"}
            onClick={(event) => {
              setLimit(100);
            }}
          >
            100
          </button>
        </div>

        <div className="pager">
          {page > 1 && (
            <button onClick={prevPage} className="prev">
              Previous page
            </button>
          )}
          <input
            type="text"
            placeholder="jump to page"
            onChange={(event) => {
              setPage(Number(event.target.value));
            }}
          ></input>
          <button onClick={nextPage} className="next">
            Next page
          </button>
        </div>
        <p>{page}</p>
        <Link to="/comics">
          <button className="switch">comics</button>
        </Link>
      </div>
      <div className="comicList">
        {data.results.map((character, index) => {
          return (
            <Link
              key={character._id}
              className="comicLink"
              to={`/comics/${character._id}`}
            >
              <img
                alt=""
                src={
                  character.thumbnail.path + "." + character.thumbnail.extension
                }
              />
              <h3>{character.name}</h3>
              <p>{character.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
