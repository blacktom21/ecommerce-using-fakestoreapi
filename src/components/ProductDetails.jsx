import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
import { userContext } from '../context/user-context';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishlistSlice';
import fallbackProducts, { fallbackImageForCategory } from '../fallbackProducts';

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useContext(userContext);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const loadProduct = async () => {
      setProduct(null);
      setError('');
      try {
        const response = await fetch(`${REACT_APP_PRODUCT_DETAILS_API}${id}`, { signal: controller.signal });
        if (!response.ok) throw new Error('We couldn’t find that item.');
        const result = await response.json();
        if (!result?.id) throw new Error('We couldn’t find that item.');
        setProduct(result);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          const fallbackProduct = fallbackProducts.find((item) => String(item.id) === id);
          if (fallbackProduct) setProduct(fallbackProduct);
          else setError(fetchError.message || 'Product details could not be loaded.');
        }
      }
    };
    loadProduct();
    return () => controller.abort();
  }, [id]);

  if (error) return <div className="page-container"><div className="empty-state"><h2>Product unavailable</h2><p>{error}</p><Link to="/#shop" className="primary-button">Back to the shop</Link></div></div>;
  if (!product) return <div className="loading-state" role="status"><div className="loading-dots" />Loading product…</div>;

  const addItem = () => {
    dispatch(addToCart(product));
    setNotice('Added to your cart.');
  };
  const saveItem = () => {
    dispatch(addToWishlist({ product, userId: currentUser.id || 'guest' }));
    setNotice('Saved to your favourites.');
  };

  return (
    <div className="product-detail">
      <div className="detail-image-box"><img src={product.image} alt={product.title} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImageForCategory(product.category); }} /></div>
      <div className="detail-copy">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="product-rating"><span>★ {Number(product.rating?.rate || 0).toFixed(1)}</span> <span>({product.rating?.count || 0} shopper reviews)</span></p>
        <p>{product.description}</p>
        <p className="product-price">${Number(product.price).toFixed(2)}</p>
        {notice && <p className="payment-demo" role="status">{notice} <Link to="/cart">View cart →</Link></p>}
        <div className="detail-actions">
          <button className="primary-button" type="button" onClick={addItem}>Add to cart <span aria-hidden="true">＋</span></button>
          <button className="secondary-button" type="button" onClick={saveItem}>♡ Save for later</button>
        </div>
        <p className="secure-note" style={{ textAlign: 'left' }}>Free shipping on orders over $50 · Easy demo checkout</p>
      </div>
    </div>
  );
}
