import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { fallbackImageForCategory } from '../fallbackProducts';

export default function ShowProduct({ data }) {
  const dispatch = useDispatch();
  const rating = Number(data.rating?.rate || 0);

  return (
    <article className="product-card">
      <Link to={`/productdetails/${data.id}`} aria-label={`View ${data.title}`}>
        <div className="product-image-wrap">
          <span className="product-category">{data.category}</span>
          <img className="product-image" src={data.image} alt={data.title} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImageForCategory(data.category); }} />
        </div>
      </Link>
      <div className="product-info">
        <Link to={`/productdetails/${data.id}`}><h3 className="product-title">{data.title}</h3></Link>
        <p className="product-rating"><span aria-label={`${rating} out of 5 stars`}>★ {rating.toFixed(1)}</span> <span>({data.rating?.count || 0} reviews)</span></p>
        <div className="product-bottom">
          <span className="product-price">${Number(data.price).toFixed(2)}</span>
          <button className="quick-add" type="button" aria-label={`Add ${data.title} to cart`} onClick={() => dispatch(addToCart(data))}>+</button>
        </div>
      </div>
    </article>
  );
}

ShowProduct.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number,
    }),
  }).isRequired,
};
