import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userContext } from '../context/user-context';
import { clearWishlist } from '../redux/wishlistSlice';
import ShowProduct from './ShowProduct';

export default function WishList() {
  const { currentUser } = useContext(userContext);
  const dispatch = useDispatch();
  const userId = currentUser.id || 'guest';
  const items = useSelector((state) => state.wishlist.items.filter((item) => item.userId === userId));

  return (
    <div className="page-container">
      <span className="eyebrow">Saved for later</span>
      <div className="section-heading"><div><h1 className="page-title">Your favourites</h1><p>Little things you’ve had your eye on.</p></div>{items.length > 0 && <button className="text-button" type="button" onClick={() => dispatch(clearWishlist(userId))}>Clear saved items</button>}</div>
      {items.length === 0
        ? <div className="empty-state"><h2>Make a little wish list.</h2><p>Save things you love and come back to them whenever you like.</p><Link to="/#shop" className="primary-button">Explore the shop <span aria-hidden="true">→</span></Link></div>
        : <div className="product-grid">{items.map((item) => <ShowProduct data={item} key={item.id} />)}</div>}
    </div>
  );
}
