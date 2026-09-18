import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login, loginWithGoogle } = useContext(userContext);
  const navigate = useNavigate();
  const googleButton = useRef(null);
  const [googleReady, setGoogleReady] = useState(Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID));

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) return undefined;
    const renderGoogleButton = () => {
      if (!window.google || !googleButton.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const payload = JSON.parse(atob(response.credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
          if (loginWithGoogle(payload)) navigate('/');
        },
      });
      window.google.accounts.id.renderButton(googleButton.current, { theme: 'outline', size: 'large', width: 340 });
    };
    if (window.google) {
      renderGoogleButton();
      return undefined;
    }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = renderGoogleButton;
    script.onerror = () => setGoogleReady(false);
    document.head.appendChild(script);
    return () => script.remove();
  }, [loginWithGoogle, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values));
      if (login(values)) {
        formik.resetForm();
        navigate('/');
      }
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    }),
  });

  return (
    <div className='min-h-[92vh] dark:bg-gray-900 pt-10'>
      
    <div className="mx-auto max-w-md p-6 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md">
      <h1 className="font-bold text-2xl mb-4">Login</h1>

      <form onSubmit={formik.handleSubmit}>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
          ) : null}
        </div>

        <div>
          <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-2xl">
            Log in
          </button>
        </div>

          <div className="my-5 flex items-center gap-3 text-gray-500"><span className="h-px flex-1 bg-gray-400" />or<span className="h-px flex-1 bg-gray-400" /></div>
          {googleReady ? <div ref={googleButton} className="flex justify-center" /> : <p className="text-sm text-gray-600 dark:text-gray-300">Google login needs `VITE_GOOGLE_CLIENT_ID` in your environment.</p>}
          <p className="mt-5 text-sm">New here? <Link className="font-semibold text-blue-600" to="/signup">Create an account</Link></p>

      </form>
    </div>
    
      
    </div>
  );
}
