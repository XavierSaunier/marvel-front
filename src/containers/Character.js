import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/Header";

const Chartacter = () => {
  const params = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-xsaunier.herokuapp.com/comics/${params.id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [params.id]);

  return isLoading ? (
    <p>now Loading</p>
  ) : (
    <div className="characterSheet">
      <Header />
      <div className="comicsDisplay">
        {data.comics.map((comic, index) => {
          return (
            <div className="comicShow" key={comic._id}>
              <h2>{comic.title}</h2>
              <img
                alt=""
                src={comic.thumbnail.path + "." + comic.thumbnail.extension}
              />
              <p>{comic.description}</p>
            </div>
          );
        })}
      </div>
      <div className="character">
        <h3>{data.name}</h3>
        <img
          alt=""
          src={data.thumbnail.path + "." + data.thumbnail.extension}
        />
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Chartacter;
