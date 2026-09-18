import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ThemeContext from './context/ThemeContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContext>
    <App />
  </ThemeContext>,
)
