import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import Navbar from '../navbar/Navbar';
import Deck from '../deck/Deck'
import './Settings.scss'
import { FaUser } from "react-icons/fa";

const Settings = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [isDecks, setIsDecks] = useState(false)
    const [isStats, setIsStats] = useState(true)
    const [data, setData] = useState([])
    const show = () => {
        setIsStats(!isStats)
        setIsDecks(!isDecks)
    }

    const perct1 = 280;
    const perct2 = 200;
    const perct3 = 60;
    const perct4 = 260;
    const perct5 = 200;
    const perct6 = 10;
    const perct7 = 120;

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

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    navigate('/login')
  }


  useEffect(() => {
    const fetchData = async () => {
        const res = await axios.get(`http://localhost:1666/deck/user/${id}`)
        setData(res.data)
    }
    fetchData()
  }, [])


  return (
    <>

    <Navbar />
    <div className="settings-container">
            <FaUser size={90} style={{color: 'white'}}/>

            <h1>{!user ? '' : user.username}</h1>

            <div className="user-container__stats">
                <p onClick={show}>Statistics</p>
                <p onClick={show}>Study Decks</p>
            </div>


        {isStats && (
        <>
        <section className="activity-form">
            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct1}px`}}></div>
                </div>
                <p>MO</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct2}px`}}></div>
                </div>
                <p>TU</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct3}px`}}></div>
                </div>
                <p>WE</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct4}px`}}></div>
                </div>
                <p>TH</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct5}px`}}></div>
                </div>
                <p>FR</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct6}px`}}></div>
                </div>
                <p>SA</p>   
            </div>

            <div className="activity-bar">
                <div className="activity-bar-graph">
                    <div className="activity-bar-status" style={{height:`${perct7}px`}}></div>
                </div>
                <p>SU</p>   
            </div>         
        </section>
        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>  
        </>
        )}

    
        {isDecks && (
            <div className="deck-container">
            {data.slice(0).reverse().map((deck) => (
                <Link className="link" key={deck.id} to={`/editdeck/${deck.id}`}>
                    <Deck deck={deck} />
                </Link> 
            ))}
        </div>
        )}
    </div>
    </>
  )
}

export default Settings