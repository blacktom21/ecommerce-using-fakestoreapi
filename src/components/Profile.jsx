import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userContext } from '../context/user-context';

function readOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem('secureCartOrders') || '[]');
    return Array.isArray(orders) ? orders : [];
  } catch {
    return [];
  }
}

const money = (value) => `$${Number(value).toFixed(2)}`;

export default function Profile() {
  const { currentUser, isLoggedIn, logout } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();
  if (!isLoggedIn) return <div className="page-container"><div className="empty-state"><h2>Your account is waiting.</h2><p>Sign in to see your orders and account details.</p><Link to="/login" className="primary-button">Sign in</Link></div></div>;

  const orders = readOrders().filter((order) => order.userId === currentUser.id);
  const fullName = currentUser.username || [currentUser.name?.firstname, currentUser.name?.lastname].filter(Boolean).join(' ') || 'SecureCart shopper';
  const initial = fullName.charAt(0).toUpperCase();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page-container">
      <span className="eyebrow">Your SecureCart</span><h1 className="page-title">Hello, {fullName.split(' ')[0]}.</h1>
      {location.state?.orderPlaced && <div className="payment-demo" role="status" style={{ marginBottom: 20 }}><span>✓</span><div><strong>Your order is confirmed.</strong><br />Order {location.state.orderPlaced} has been saved in your order history.</div></div>}
      <div className="account-layout">
        <aside className="account-card">
          <div className="account-avatar">{initial}</div><h2>{fullName}</h2><p>{currentUser.email}</p><p>Your demo account and order history are stored in this browser.</p>
          <button className="secondary-button" type="button" onClick={handleLogout}>Sign out</button>
        </aside>
        <section>
          <h2 style={{ margin: '5px 0 14px', fontFamily: 'Manrope, sans-serif' }}>Your orders <span className="cart-item-category">({orders.length})</span></h2>
          {orders.length === 0
            ? <div className="account-card"><p>You haven’t placed an order yet. Your next favourite is waiting.</p><Link to="/#shop" className="text-button">Explore the shop →</Link></div>
            : orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-head"><div><strong>Order {order.id}</strong><div className="order-products">{new Date(order.createdAt).toLocaleDateString()} · {order.status}</div></div><strong>{money(order.total)}</strong></div>
                <div className="order-products">{order.items.map((item) => `${item.title} × ${item.quantity}`).join(' · ')}</div>
                <div className="order-products">Payment: {order.paymentStatus}</div>
              </article>
            ))}
        </section>
      </div>
    </div>
  );
}
