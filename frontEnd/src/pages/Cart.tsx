import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";
import "../css/Cart.css";

function Cart(): JSX.Element {
  const { cartItem } = useCartContext();

  if (cartItem.length > 0) {
    return (
      <div className="Cart">
        <Link to="/home">Game Hub</Link>

        <div className="cart-grid">
          {cartItem.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <Link to="/checkoutpage">Check Out</Link>
      </div>
    );
  }

  return (
    <div className="Cart">
      <Link to="/home">Game Hub</Link>

      <h2>Nothing in cart</h2>
      <p>Start adding Games to Your Shopping Cart</p>
    </div>
  );
}

export default Cart;