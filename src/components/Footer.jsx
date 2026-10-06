import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/user-context';

export default function Footer() {
  const { isLoggedIn, logout } = useContext(userContext);
  const navigate = useNavigate();
  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-mark"><img src="/images/securecart-logo.png" className="brand-logo" alt="" />secure<span>Cart</span></Link>
          <p>Good finds. Great prices. A little more joy in every delivery.</p>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Shop</span>
          <Link to="/#shop">All products</Link>
          <Link to="/cart">Your cart</Link>
          <Link to="/wishlist">Saved items</Link>
          <Link to="/about">About SecureCart</Link>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Your account</span>
          {isLoggedIn
            ? <><Link to="/profile">Account &amp; orders</Link><button className="footer-signout" type="button" onClick={handleSignOut}>Sign out</button></>
            : <><Link to="/login">Sign in</Link><Link to="/signup">Create account</Link></>}
        </div>
        <div className="footer-note">
          <span className="footer-heading">Shop with confidence</span>
          <p>Secure checkout demo · No payment card details collected</p>
          <p>Questions? <a href="mailto:hello@securecart.example">We’re here to help.</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} SecureCart. Made for happier shopping.</span>
        <span>Thoughtful finds, delivered.</span>
      </div>
    </footer>
  );
}
