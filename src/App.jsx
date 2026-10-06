import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import UserContext from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import Error from './components/Error';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import WishList from './components/WishList';
import Checkout from './components/Checkout';
import AboutPage from './components/AboutPage';
import Store from './redux/Store';

function CartPersistence() {
  const items = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    localStorage.setItem('secureCartItems', JSON.stringify(items));
    localStorage.setItem('secureCartWishlist', JSON.stringify(wishlistItems));
  }, [items, wishlistItems]);

  return null;
}

export default function App() {
  useEffect(() => {
    const appId = import.meta.env.VITE_DEVREV_APP_ID?.trim();
    if (!appId) return;

    const initializePlug = () => {
      if (!window.plugSDK || window.__secureCartDevRevInitialized) return;
      try {
        window.plugSDK.init({ app_id: appId });
        window.__secureCartDevRevInitialized = true;
      } catch (error) {
        console.error('DevRev Plug initialization failed.', error);
      }
    };

    if (window.plugSDK) {
      initializePlug();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://plug-platform.devrev.ai/static/plug.js';
    script.async = true;
    script.onload = initializePlug;
    script.onerror = () => console.error('DevRev Plug could not be loaded.');
    document.head.appendChild(script);
  }, []);

  return (
    <UserContext>
      <Provider store={Store}>
        <CartPersistence />
        <BrowserRouter>
          <div className="app-shell">
            <Header />
            <main className="app-main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/productdetails/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    </UserContext>
  );
}