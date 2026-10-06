import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { userContext } from './user-context';

const USERS_KEY = 'secureCartUsers';

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readCurrentUser() {
  const saved = localStorage.getItem('secureCartCurrentUser');
  if (saved) return readJson('secureCartCurrentUser', {});
  const oldSaved = localStorage.getItem('currentUser');
  if (oldSaved && oldSaved !== 'null') {
    try {
      const oldUser = JSON.parse(atob(oldSaved));
      return { id: oldUser.id, username: oldUser.username || oldUser.name?.firstname, email: oldUser.email };
    } catch {
      return {};
    }
  }
  return {};
}

function toBase64(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)));
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

async function hashPassword(password, salt) {
  if (!globalThis.crypto?.subtle) throw new Error('Password protection needs a secure browser context (localhost or HTTPS).');
  const encodedSalt = salt || toBase64(crypto.getRandomValues(new Uint8Array(16)));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: fromBase64(encodedSalt), iterations: 120000, hash: 'SHA-256' }, key, 256);
  return { salt: encodedSalt, passwordHash: toBase64(hash) };
}

function getPublicUser(user) {
  return { id: user.id, username: user.username, email: user.email };
}

export default function UserContext({ children }) {
  const [currentUser, setCurrentUser] = useState(readCurrentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(readCurrentUser().id));

  const login = async ({ email, password }) => {
    const savedUsers = readJson(USERS_KEY, []);
    const users = Array.isArray(savedUsers) ? savedUsers : [];
    const user = users.find((item) => item?.email?.toLowerCase() === email.trim().toLowerCase());
    if (!user) return { success: false, error: 'We couldn’t find an account with that email and password.' };

    try {
      let valid = false;
      if (user.passwordHash && user.salt) {
        valid = (await hashPassword(password, user.salt)).passwordHash === user.passwordHash;
      } else if (user.password) {
        valid = user.password === password;
        if (valid) {
          const securedPassword = await hashPassword(password);
          Object.assign(user, securedPassword);
          delete user.password;
          localStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }
      if (!valid) return { success: false, error: 'We couldn’t find an account with that email and password.' };
      const publicUser = getPublicUser(user);
      localStorage.setItem('secureCartCurrentUser', JSON.stringify(publicUser));
      localStorage.setItem('login', 'true');
      setCurrentUser(publicUser);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'We couldn’t sign you in. Please try again.' };
    }
  };

  const createAccount = async ({ name, email, password }) => {
    const savedUsers = readJson(USERS_KEY, []);
    const users = Array.isArray(savedUsers) ? savedUsers : [];
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((user) => user?.email?.toLowerCase() === normalizedEmail)) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }

    try {
      const securedPassword = await hashPassword(password);
      const user = { id: `local-${crypto.randomUUID()}`, username: name.trim(), email: normalizedEmail, ...securedPassword };
      localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
      const publicUser = getPublicUser(user);
      localStorage.setItem('secureCartCurrentUser', JSON.stringify(publicUser));
      localStorage.setItem('login', 'true');
      setCurrentUser(publicUser);
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message || 'We couldn’t create your account. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('secureCartCurrentUser');
    localStorage.removeItem('currentUser');
    localStorage.setItem('login', 'false');
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const value = useMemo(() => ({ isLoggedIn, currentUser, setIsLoggedIn, login, createAccount, logout }), [isLoggedIn, currentUser]);
  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

UserContext.propTypes = {
  children: PropTypes.node.isRequired,
};
