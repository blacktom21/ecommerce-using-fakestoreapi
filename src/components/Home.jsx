import { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { REACT_APP_PRODUCTS_API } from '../utils';
import { userContext } from '../context/user-context';
import ShowProduct from './ShowProduct';
import fallbackProducts, { fallbackImageForCategory } from '../fallbackProducts';

const benefits = [
  ['✦', 'Handpicked finds', 'Curated for everyday life'],
  ['↗', 'Fair, clear pricing', 'No surprises at checkout'],
  ['⌂', 'Free shipping', 'On orders over $50'],
  ['✓', 'Easy order tracking', 'All your orders in one place'],
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [catalogNotice, setCatalogNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useContext(userContext);

  const loadProducts = async (signal) => {
    setLoading(true);
    try {
      const response = await fetch(REACT_APP_PRODUCTS_API, { signal });
      if (!response.ok) throw new Error(`Product service returned ${response.status}.`);
      const result = await response.json();
      if (!Array.isArray(result)) throw new Error('The product service returned an invalid response.');
      setProducts(result);
      setCatalogNotice('');
    } catch (error) {
      if (error.name !== 'AbortError') {
        setProducts(fallbackProducts);
        setCatalogNotice('Showing our sample collection while the live catalog is unavailable.');
      }
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))], [products]);
  const visibleProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const filtered = products.filter((product) => (
      (category === 'all' || product.category === category)
      && (!term || `${product.title} ${product.category} ${product.description}`.toLowerCase().includes(term))
    ));
    if (sort === 'price-low') return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price-high') return [...filtered].sort((a, b) => b.price - a.price);
    if (sort === 'rating') return [...filtered].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    return filtered;
  }, [products, category, searchTerm, sort]);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">The brighter way to shop</span>
          <h1>Find your next <em>favourite</em> thing.</h1>
          <p>Everyday essentials and little indulgences, picked to make life feel a little more lovely.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#shop">Explore the shop <span aria-hidden="true">→</span></a>
            <Link className="text-button" to="/signup">Join SecureCart <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="hero-art" aria-label="Featured products">
          <div className="hero-orbit" />
          {products[2]?.image && <img className="hero-product" src={products[2].image} alt={products[2].title} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImageForCategory(products[2].category); }} />}
          <span className="hero-float one"><strong>Little joys</strong>for every day</span>
          <span className="hero-float two"><strong>4.8 / 5</strong>shopper-loved finds</span>
        </div>
      </section>

      <section className="benefits" aria-label="Why shop SecureCart">
        {benefits.map(([icon, title, caption]) => (
          <div className="benefit" key={title}>
            <span className="benefit-icon" aria-hidden="true">{icon}</span>
            <div><strong>{title}</strong><small>{caption}</small></div>
          </div>
        ))}
      </section>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div><span className="eyebrow">A few good things</span><h2>Made for your everyday</h2><p>Find something useful, beautiful, or simply just right.</p></div>
          <label className="search-wrap">
            <span className="sr-only">Search products</span>
            <input className="search-field" type="search" placeholder="Search the collection…" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
          </label>
        </div>
        <div className="filter-panel" aria-label="Product filters">
          <div className="filter-field">
            <label htmlFor="category-filter">Browse by</label>
            <select id="category-filter" className="filter-control" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="all">All categories</option>
              {categories.map((item) => <option value={item} key={item}>{item}</option>)}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="sort-filter">Sort by</label>
            <select id="sort-filter" className="filter-control" value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option>
            </select>
          </div>
          {(category !== 'all' || searchTerm || sort !== 'featured') && <button className="filter-clear" type="button" onClick={() => { setCategory('all'); setSearchTerm(''); setSort('featured'); }}>Clear filters</button>}
        </div>

        {catalogNotice && <div className="payment-demo" role="status" style={{ marginBottom: 20 }}>{catalogNotice}</div>}
        {loading && <div className="loading-state" role="status"><div className="loading-dots" />Finding the good stuff…</div>}
        {!loading && visibleProducts.length === 0 && <div className="empty-state"><h2>No matches just yet</h2><p>Try another search or browse all our categories.</p><button className="secondary-button" type="button" onClick={() => { setSearchTerm(''); setCategory('all'); }}>Show all products</button></div>}
        {!loading && visibleProducts.length > 0 && <div className="product-grid">{visibleProducts.map((product) => <ShowProduct data={product} key={product.id} />)}</div>}
      </section>

      <aside className="shop-perks">
        <div><span className="eyebrow">A little something extra</span><h2>Shopping should feel good.</h2></div>
        <p>Save your favourites, keep track of every order, and shop with confidence. Your next everyday favourite is just around the corner.</p>
        <Link to={isLoggedIn ? '/profile' : '/signup'} className="primary-button">{isLoggedIn ? 'View your account' : 'Create your account'} <span aria-hidden="true">→</span></Link>
      </aside>
    </div>
  );
}
