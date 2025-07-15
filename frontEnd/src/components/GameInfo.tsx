import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { GameInfoProps } from "@/types";
import "../css/GameInfo.css";

function GameInfo({ game }: GameInfoProps): JSX.Element {
  const { addToCart } = useCartContext();

  return (
    <div className="Game">
      <div className="Game-icon">
        <Link to="/details" state={{ game }}>
          <img src={game.background_image} alt={game.name} />
        </Link>
      </div>

      <div className="Game-info">
        <Link to="/details" state={{ game }}>
          <h3>{game.name}</h3>
        </Link>

        <div className="add-to-cart">
          <button 
            className="cart-button"
            onClick={() => addToCart(game)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameInfo;