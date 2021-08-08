import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logoMarvel from "../images/marvel-logo.png";

import Header from "../components/Header";

const FrontPage = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("");
  const [limit, setLimit] = useState(100);

  const history = useHistory();

  const nextPage = () => {
    const newPage = Number(page) + 1;
    setPage(newPage);
    history.push(`/comics?page=${page}`);
  };

  const prevPage = () => {
    const newPage = Number(page) - 1;
    setPage(newPage);
    history.push(`/comics?page=${page}`);
  };

  if (page < 1) {
    setPage(1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-xsaunier.herokuapp.com/comics?page=${page}&title=${title}&limit=${limit}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [page, title, limit]);

  return isLoading ? (
    <p>Now Loading</p>
  ) : (
    <div>
      <div className="header">
        <Link to="/characters">
          <img alt="logo-marvel" src={logoMarvel} />
        </Link>
        <input
          type="text"
          className="search"
          placeholder="search a comic"
          onChange={(event) => {
            setTitle(event.target.value);
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
              setPage(event.target.value);
            }}
          ></input>
          <button onClick={nextPage} className="next">
            Next page
          </button>
        </div>
        <p>{page}</p>
        <Link to="/characters">
          <button className="switch">characters</button>
        </Link>
      </div>
      {console.log(page)}
      <div className="comicList">
        {data.results.map((comic, index) => {
          return (
            <div key={comic._id} className="comicLink">
              <img
                alt=""
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              />
              <h3>{comic.title}</h3>
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrontPage;
