import { createContext, useEffect, useState } from "react";

export const userContext = createContext(null);


export default function UserContext({ children }) {
  const storedLogin = localStorage.getItem('login') === 'true';
  const storedUser = localStorage.getItem('currentUser');
  const [isLoggedIn, setIsLoggedIn] = useState(storedLogin);
  const [currentUser, setCurrentUser] = useState(() => {
    if (!storedUser || storedUser === 'null') return {};
    try {
      return JSON.parse(atob(storedUser));
    } catch {
      return {};
    }
  });
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    fetch('https://fakestoreapi.com/users')
      .then((res) => res.json())
      .then((users) => setAllUsers([...users, ...localUsers]))
      .catch(() => setAllUsers(localUsers));
  }, []);

  const persistLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', btoa(JSON.stringify(user)));
    localStorage.setItem('login', 'true');
  };

  const login = (values) => {
    const user = allUsers.find(
      (item) => item.email.toLowerCase() === values.email.toLowerCase() && item.password === values.password,
    );
    if (!user) {
      swal('Unable to log in', 'The email or password is incorrect.', 'error');
      return false;
    }
    persistLogin(user);
    swal('Congratulations!', 'Login Successful', 'success');
    return true;
  };

  const createAccount = (values) => {
    const email = values.email.toLowerCase();
    if (allUsers.some((user) => user.email.toLowerCase() === email)) {
      swal('Account already exists', 'Try logging in with this email.', 'error');
      return false;
    }
    const user = { id: `local-${Date.now()}`, username: values.name, email, password: values.password };
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    localStorage.setItem('localUsers', JSON.stringify([...localUsers, user]));
    setAllUsers((users) => [...users, user]);
    persistLogin(user);
    swal('Account created', 'You are now signed in.', 'success');
    return true;
  };

  const loginWithGoogle = (profile) => {
    const existingUser = allUsers.find((user) => user.email.toLowerCase() === profile.email.toLowerCase());
    const user = existingUser || { id: `google-${profile.sub}`, googleId: profile.sub, username: profile.name, email: profile.email, image: profile.picture };
    if (!existingUser) {
      const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
      localStorage.setItem('localUsers', JSON.stringify([...localUsers, user]));
      setAllUsers((users) => [...users, user]);
    }
    persistLogin(user);
    swal('Welcome!', 'Google login successful.', 'success');
    return true;
  };

  const logout = ()=>{
    localStorage.setItem('currentUser', null);
    localStorage.setItem('login', false);
    setCurrentUser({});
    setIsLoggedIn(false);
  }


  return (
    <div>

      <userContext.Provider value={{ isLoggedIn, currentUser, setIsLoggedIn, login, createAccount, loginWithGoogle, logout, setAllUsers }}>
        {children}
      </userContext.Provider>

    </div>
  )
}
