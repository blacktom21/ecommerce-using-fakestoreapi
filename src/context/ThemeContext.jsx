import { createContext, useState } from 'react'


export const themeContext = createContext(null);
export default function ThemeContext({children}) {

    let localTheme = localStorage.getItem('darkmode');

    if(localTheme == 'false' || localTheme == null) {
      localTheme = false;
    }else{
      localTheme = true;
    }
    const [darkMode, setDarkMode] = useState(localTheme);
    const toggleTheme =   ()=>{
        localStorage.setItem('darkmode',!darkMode);
        setDarkMode(!darkMode);
    }

  return (
    
    <div>
        <themeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </themeContext.Provider>
      
    </div>
  )
}
