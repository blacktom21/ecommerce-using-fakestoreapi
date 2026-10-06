export default function AboutPage() {
  return (
    <div className="page-container">
      <span className="eyebrow">A little about us</span>
      <h1 className="page-title">Good finds, thoughtfully brought together.</h1>
      <div className="account-card" style={{ maxWidth: 760 }}>
        <p>SecureCart is a friendly storefront for discovering everyday essentials, thoughtful gifts, and small things that make a day better.</p>
        <p>We believe shopping should feel simple: clear prices, an easy-to-use cart, delivery details in one place, and an order history you can find again.</p>
        <div className="payment-demo"><span aria-hidden="true">✓</span><div><strong>About this version</strong><br />SecureCart is a browser-based demo storefront. Accounts, saved items, carts, and orders stay in your current browser. Checkout is simulated; no real payment is processed.</div></div>
      </div>
    </div>
  );
}
