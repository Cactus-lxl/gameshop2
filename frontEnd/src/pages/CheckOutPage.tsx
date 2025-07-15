import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function CheckOutPage(): JSX.Element {
  const { cartItem, getTotalPrice } = useCartContext();

  return (
    <div className="checkout-page">
      <Link to="/cart">Back To Cart</Link>
      <h2>Checkout</h2>
      <div className="checkout-items">
        {cartItem.map(game => (
          <p key={game.id}>
            {game.name} — ${game.price}
          </p>
        ))}
      </div>
      <h3>Total: ${getTotalPrice()}</h3>
    </div>
  );
}

export default CheckOutPage;