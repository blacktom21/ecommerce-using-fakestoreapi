import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../context/user-context';

export default function Signup() {
  const { createAccount } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Please enter your name').required('Name is required'),
      email: Yup.string().email('Enter a valid email address').required('Email is required'),
      password: Yup.string().min(8, 'Use at least 8 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Please confirm your password'),
    }),
    onSubmit: async (values) => {
      setFormError('');
      const result = await createAccount(values);
      if (result.success) navigate(location.state?.from || '/', { replace: true });
      else setFormError(result.error);
    },
  });

  const field = (name, label, type, autocomplete) => (
    <div className="form-field" key={name}>
      <label htmlFor={name}>{label}</label>
      <input className="form-input" id={name} name={name} type={type} autoComplete={autocomplete} value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
      {formik.touched[name] && formik.errors[name] && <p className="form-error">{formik.errors[name]}</p>}
    </div>
  );

  return (
    <div className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">A happier way to shop</span><h1>Make yourself at home.</h1>
        <p className="auth-intro">Create your free account to save favourites and keep your orders in one place.</p>
        {formError && <p className="form-alert" role="alert">{formError}</p>}
        <form onSubmit={formik.handleSubmit} noValidate>
          {field('name', 'Your name', 'text', 'name')}
          {field('email', 'Email address', 'email', 'email')}
          {field('password', 'Password', 'password', 'new-password')}
          {field('confirmPassword', 'Confirm password', 'password', 'new-password')}
          <button className="primary-button" type="submit" disabled={formik.isSubmitting}>Create my account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login" state={location.state}>Sign in</Link></p>
        <p className="secure-note">Your demo account is stored in this browser only. Passwords are protected with a browser-side hash.</p>
      </section>
    </div>
  );
}
