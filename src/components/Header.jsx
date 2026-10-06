import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userContext } from '../context/user-context';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, currentUser } = useContext(userContext);
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <>
      <div className="announcement-bar"><span>Thoughtful finds, delivered with care</span><span>Free shipping on orders over $50</span></div>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand-mark" onClick={closeMenu} aria-label="SecureCart home">
            <img src="/images/securecart-logo.png" className="brand-logo" alt="" />secure<span>Cart</span>
          </Link>
          <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            {menuOpen ? '✕' : '☰'}
          </button>
          <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>Discover</NavLink>
            <a className="nav-link" href="/#shop" onClick={closeMenu}>Shop</a>
            <NavLink to="/wishlist" className={linkClass} onClick={closeMenu}>Saved</NavLink>
            {isLoggedIn
              ? <NavLink to="/profile" className={linkClass} onClick={closeMenu}>{currentUser.username || currentUser.name?.firstname || 'Account'}</NavLink>
              : <NavLink to="/login" className={linkClass} onClick={closeMenu}>Sign in</NavLink>}
            <Link to="/cart" className="cart-link" onClick={closeMenu} aria-label={`Cart with ${cartCount} items`}>
              <span className="cart-icon" aria-hidden="true">♧</span><span>Cart</span><span className="cart-count">{cartCount}</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
