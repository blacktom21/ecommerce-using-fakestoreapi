import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../redux/cartSlice';
import { fallbackImageForCategory } from '../fallbackProducts';

const money = (value) => `$${value.toFixed(2)}`;

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state"><span className="eyebrow">Your cart</span><h2>It’s a little quiet in here.</h2><p>Find something lovely and it’ll show up right here.</p><Link to="/#shop" className="primary-button">Explore the shop <span aria-hidden="true">→</span></Link></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <span className="eyebrow">Your SecureCart bag</span>
      <h1 className="page-title">Shopping cart <span className="cart-item-category">({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span></h1>
      <div className="cart-layout">
        <section className="cart-list" aria-label="Cart items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link to={`/productdetails/${item.id}`}><img className="cart-item-image" src={item.image} alt={item.title} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImageForCategory(item.category); }} /></Link>
              <div><Link to={`/productdetails/${item.id}`}><h2 className="cart-item-name">{item.title}</h2></Link><span className="cart-item-category">{item.category}</span><p className="cart-item-price">{money(Number(item.price))}</p></div>
              <div className="cart-item-side">
                <span className="cart-item-price">{money(Number(item.price) * item.quantity)}</span>
                <div className="quantity-controls" aria-label={`Quantity for ${item.title}`}>
                  <button type="button" aria-label="Decrease quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <button className="text-button remove-button" type="button" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            </article>
          ))}
          <div style={{ padding: '8px 18px' }}><button className="text-button" type="button" onClick={() => dispatch(clearCart())}>Clear cart</button></div>
        </section>
        <aside className="summary-card">
          <h2>Order summary</h2>
          <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : money(shipping)}</strong></div>
          {shipping > 0 && <p className="secure-note">Add {money(50 - subtotal)} more for free shipping.</p>}
          <div className="summary-line summary-total"><span>Total</span><strong>{money(total)}</strong></div>
          <Link className="primary-button" to="/checkout">Continue to checkout <span aria-hidden="true">→</span></Link>
          <p className="secure-note">No card details are collected in this demo checkout.</p>
          <Link className="text-button" to="/#shop">← Continue shopping</Link>
        </aside>
      </div>
    </div>
  );
}
