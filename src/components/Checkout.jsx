import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userContext } from '../context/user-context';
import { clearCart } from '../redux/cartSlice';

const initialShipping = { name: '', email: '', address: '', city: '', postalCode: '' };
const money = (value) => `$${value.toFixed(2)}`;

export default function Checkout() {
  const { isLoggedIn, currentUser } = useContext(userContext);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    ...initialShipping,
    name: currentUser.username || [currentUser.name?.firstname, currentUser.name?.lastname].filter(Boolean).join(' '),
    email: currentUser.email || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('demo');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) return <Navigate to="/cart" replace />;
  if (!isLoggedIn) {
    return <div className="page-container"><div className="empty-state"><span className="eyebrow">Almost there</span><h2>Sign in to finish your order.</h2><p>Your cart will be right here when you get back.</p><Link to="/login" state={{ from: '/checkout' }} className="primary-button">Sign in to continue</Link></div></div>;
  }
  const updateField = (event) => {
    const { name, value } = event.target;
    setShippingDetails((details) => ({ ...details, [name]: value }));
  };

  const placeOrder = (event) => {
    event.preventDefault();
    const missingField = Object.entries(shippingDetails).find(([, value]) => !value.trim());
    if (missingField) {
      setError('Please complete every delivery detail before placing your order.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) {
      setError('Enter a valid email address for order updates.');
      return;
    }

    setSubmitting(true);
    setError('');
    const order = {
      id: `SC-${Date.now().toString(36).toUpperCase()}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      items: items.map(({ id, title, image, price, quantity }) => ({ id, title, image, price, quantity })),
      shippingDetails,
      subtotal,
      shipping,
      total,
      paymentMethod,
      paymentStatus: paymentMethod === 'demo' ? 'Demo payment simulated' : 'Pay on delivery',
    };

    try {
      const storedOrders = JSON.parse(localStorage.getItem('secureCartOrders') || '[]');
      if (!Array.isArray(storedOrders)) throw new Error('Saved order history is invalid.');
      localStorage.setItem('secureCartOrders', JSON.stringify([order, ...storedOrders]));
      dispatch(clearCart());
      navigate('/profile', { state: { orderPlaced: order.id } });
    } catch {
      setSubmitting(false);
      setError('We couldn’t save your order on this device. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <span className="eyebrow">One last step</span><h1 className="page-title">Secure checkout</h1>
      <form className="checkout-layout" onSubmit={placeOrder}>
        <div>
          <section className="checkout-card">
            <h2>Delivery details</h2>
            {error && <p className="form-alert" role="alert">{error}</p>}
            <div className="checkout-fields">
              {[['name', 'Full name', 'text'], ['email', 'Email for updates', 'email'], ['address', 'Street address', 'text'], ['city', 'City', 'text'], ['postalCode', 'Postal code', 'text']].map(([name, label, type]) => (
                <div className={`form-field${name === 'address' ? ' full' : ''}`} key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input className="form-input" id={name} name={name} type={type} autoComplete={name === 'postalCode' ? 'postal-code' : name} value={shippingDetails[name]} onChange={updateField} required />
                </div>
              ))}
            </div>
          </section>
          <section className="checkout-card">
            <h2>Payment</h2>
            <div className="payment-demo"><span aria-hidden="true">✓</span><div><strong>Demo checkout — no real payment is taken.</strong><br />This prototype does not collect or store card numbers.</div></div>
            <label className="form-field" style={{ display: 'flex', gap: 9, alignItems: 'center', marginTop: 17, fontSize: 12 }}>
              <input type="radio" name="paymentMethod" value="demo" checked={paymentMethod === 'demo'} onChange={() => setPaymentMethod('demo')} /> Simulate a demo payment
            </label>
            <label style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 12 }}>
              <input type="radio" name="paymentMethod" value="delivery" checked={paymentMethod === 'delivery'} onChange={() => setPaymentMethod('delivery')} /> Pay on delivery (demo)
            </label>
          </section>
        </div>
        <aside className="summary-card">
          <h2>Your order</h2>
          {items.map((item) => <div className="summary-line" key={item.id}><span>{item.title} × {item.quantity}</span><strong>{money(Number(item.price) * item.quantity)}</strong></div>)}
          <div className="summary-line"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-line"><span>Shipping</span><strong>{shipping === 0 ? 'Free' : money(shipping)}</strong></div>
          <div className="summary-line summary-total"><span>Total</span><strong>{money(total)}</strong></div>
          <button className="primary-button" type="submit" disabled={submitting}>{submitting ? 'Placing order…' : 'Place demo order'}</button>
          <p className="secure-note">Your order is saved on this device for this demo. No charge is made.</p>
          <Link className="text-button" to="/cart">← Back to cart</Link>
        </aside>
      </form>
    </div>
  );
}
