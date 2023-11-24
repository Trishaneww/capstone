import { BiSolidTrashAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Deck.scss";

const Deck = ({ deck }) => {
  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      navigate("/");
      console.log("clicked");
      await axios.delete(`http://localhost:1666/deck/${deck.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="deck">
        <div className="deck-nav">
          <p>{deck.category}</p>
          <div className="deck-delete">
            <BiSolidTrashAlt size={22} onClick={handleDelete} />
          </div>
        </div>
        <h1>{deck.title}</h1>
      </div>
    </>
  );
};

export default Deck;
