import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <Formik
            initialValues={{ email: '', password: '', role: 'user' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().required('Password is required'),
                role: Yup.string().required('Role is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                const loginUrl = values.role === 'astrologer' ? '/login/astrologer' : '/login/user';
                
                axios.post(`http://localhost:5000${loginUrl}`, values)
                    .then(response => {
                        localStorage.setItem('token', response.data.token);
                        alert('Login successful!');
                        navigate('/'); // Use navigate instead of history.push
                        setSubmitting(false);
                    })
                    .catch(error => {
                        alert('Error logging in.');
                        setSubmitting(false);
                    });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="role">Role</label>
                        <Field name="role" as="select">
                            <option value="user">User</option>
                            <option value="astrologer">Astrologer</option>
                        </Field>
                        <ErrorMessage name="role" component="div" />
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Login
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default Login;
