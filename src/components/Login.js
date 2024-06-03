import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Login</h2>
        <Formik
          initialValues={{ email: '', password: '', role: 'user' }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
            role: Yup.string().required('Role is required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const loginUrl = values.role === 'astrologer' ? '/login/astrologer' : '/login/user';

            axios
              .post(`http://localhost:5000${loginUrl}`, values)
              .then((response) => {
                localStorage.setItem('token', response.data.token);
                alert('Login successful!');
                navigate('/');
                setSubmitting(false);
              })
              .catch((error) => {
                alert('Error logging in.');
                setSubmitting(false);
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field name="email" type="email" placeholder="Enter your email" className="form-input" />
                <ErrorMessage name="email" component="div" className="error-text" />
              </div>
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field name="password" type="password" placeholder="Enter your password" className="form-input" />
                <ErrorMessage name="password" component="div" className="error-text" />
              </div>
              <div className="form-field">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <Field name="role" as="select" className="form-select">
                  <option value="user">User</option>
                  <option value="astrologer">Astrologer</option>
                </Field>
                <ErrorMessage name="role" component="div" className="error-text" />
              </div>
              <button type="submit" disabled={isSubmitting} className="form-button">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="register-link">
          Don't have an account? Register here
          <Link to="/register/user">
            <button className="register-button">Register as User</button>
          </Link>
          <Link to="/register/astrologer">
            <button className="register-button">Register as Astrologer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

