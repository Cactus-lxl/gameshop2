import { CartItem as CartItemType } from "@/types";
import { useCartContext } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
}

function CartItem({ item }: CartItemProps): JSX.Element {
  const { removeFromCart } = useCartContext();

  return (
    <div className="cart-item">
      <img src={item.background_image} alt={item.name} />
      <h3>{item.name}</h3>
      <h3>Price: ${item.price}</h3>
      <button 
        onClick={() => removeFromCart(item.id)}
        className="remove-button"
      >
        Remove from Cart
      </button>
    </div>
  );
}

export default CartItem;