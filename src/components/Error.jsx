import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="page-container">
      <div className="empty-state"><span className="eyebrow">Page not found</span><h1 className="page-title">Looks like this page wandered off.</h1><p>The address may have changed, but there’s plenty more to discover.</p><Link to="/" className="primary-button">Back to SecureCart</Link></div>
    </div>
  );
}
