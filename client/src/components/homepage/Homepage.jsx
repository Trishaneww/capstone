import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import axios from "axios";
import "./Homepage.scss";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [findDeck, setFindDeck] = useState([""]);
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setSearch(e.target.value);
    const res = await axios.get(
      `http://localhost:1666/deck/find/${e.target.value}`
    );
    setFindDeck(res.data);
    console.log(res.data);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:1666/deck");
      setData(res.data);
    };
    fetchData();
  }, []);

  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the data from the API
    axios
      .get("http://localhost:1666/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  if (failedAuth) {
    navigate("/login");
  }

  return (
    <div>
      <Navbar />
      <div className="homepage">
        <div className="homepage-searchbar">
          <IoMdSearch className="homepage-searchbar__icon" size={22} />
          <input
            onChange={handleChange}
            type="text"
            placeholder="Search Study Decks"
          />
        </div>

        {findDeck[0] &&
          findDeck.map((deck) => (
            <div className="searchbar-output">
                <div className="searchbar-output__card">
                  <p>{deck.title}</p>
                  <p>{deck.username}</p>
                  <Link to={`/deck/${deck.id}`}>
                    <FaArrowUpRightFromSquare className="searchbar-output__card-link" />
                  </Link>
                </div>
            </div>
          ))}

        <p>Email: {!user ? "" : user.email}</p>

        <div className="media-scroller snaps-inline">
          {data
            .slice(0)
            .reverse()
            .map((deck) => (
              <Link className="link" key={deck.id} to={`/deck/${deck.id}`}>
                <div className="media-scroller__element">
                  <div className="media-scroller__element-divider">
                    <h1>{deck.title}</h1>
                    <div className="media-scroller__element-category">
                      <p>{deck.category}</p>
                    </div>
                  </div>
                  <p>{deck.username}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
