import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../context/user-context';

export default function Login() {
  const { login } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState('');
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Enter a valid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setFormError('');
      const result = await login(values);
      if (result.success) navigate(location.state?.from || '/', { replace: true });
      else setFormError(result.error);
    },
  });

  return (
    <div className="auth-page">
      <section className="auth-card">
        <span className="eyebrow">Welcome back</span><h1>Good to see you.</h1>
        <p className="auth-intro">Sign in to pick up where you left off and keep an eye on your orders.</p>
        {formError && <p className="form-alert" role="alert">{formError}</p>}
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-field"><label htmlFor="email">Email address</label><input className="form-input" id="email" name="email" type="email" autoComplete="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />{formik.touched.email && formik.errors.email && <p className="form-error">{formik.errors.email}</p>}</div>
          <div className="form-field"><label htmlFor="password">Password</label><input className="form-input" id="password" name="password" type="password" autoComplete="current-password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />{formik.touched.password && formik.errors.password && <p className="form-error">{formik.errors.password}</p>}</div>
          <button className="primary-button" type="submit" disabled={formik.isSubmitting}>Sign in</button>
        </form>
        <p className="auth-switch">New to SecureCart? <Link to="/signup" state={location.state}>Create an account</Link></p>
        <p className="secure-note">Demo accounts are stored in this browser only. Use a unique password.</p>
      </section>
    </div>
  );
}
