import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userContext } from '../context/UserContext';

export default function Signup() {
  const { createAccount } = useContext(userContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '', confirmPassword: '' },
    validationSchema: Yup.object({
      name: Yup.string().min(2, 'Enter your name').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Use at least 6 characters').required('Required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (createAccount(values)) {
        resetForm();
        navigate('/');
      }
    },
  });

  const fieldError = (field) => formik.touched[field] && formik.errors[field]
    ? <p className="text-red-500 text-sm mt-1">{formik.errors[field]}</p>
    : null;

  return (
    <div className="min-h-[92vh] dark:bg-gray-900 pt-10">
      <div className="mx-auto max-w-md p-6 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md">
        <h1 className="font-bold text-2xl mb-4">Create an account</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className="mt-1 mb-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {fieldError('name')}

          <label htmlFor="email" className="block mt-4">Email</label>
          <input id="email" name="email" type="email" className="mt-1 mb-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {fieldError('email')}

          <label htmlFor="password" className="block mt-4">Password</label>
          <input id="password" name="password" type="password" className="mt-1 mb-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {fieldError('password')}

          <label htmlFor="confirmPassword" className="block mt-4">Confirm password</label>
          <input id="confirmPassword" name="confirmPassword" type="password" className="mt-1 mb-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {fieldError('confirmPassword')}

          <button type="submit" className="mt-5 bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-2xl">Create account</button>
        </form>
        <p className="mt-5 text-sm">Already have an account? <Link className="font-semibold text-blue-600" to="/login">Log in</Link></p>
      </div>
    </div>
  );
}
