import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const UserRegister = () => {
    return (
        <Formik
            initialValues={{
                first_name: '',
                last_name: '',
                dob: '',
                city: '',
                birthplace: '',
                mobile_number: '',
                birth_time: '',
                gender: '',
                email: '',
                district: '',
                pin_code: '',
                profile_photo: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={Yup.object({
                first_name: Yup.string().required('First name is required'),
                last_name: Yup.string().required('Last name is required'),
                dob: Yup.date().required('Date of birth is required'),
                city: Yup.string().required('City is required'),
                birthplace: Yup.string().required('Birthplace is required'),
                mobile_number: Yup.string().required('Mobile number is required'),
                birth_time: Yup.string().required('Birth time is required'),
                gender: Yup.string().required('Gender is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                district: Yup.string().required('District is required'),
                pin_code: Yup.string().required('Pin code is required'),
                profile_photo: Yup.string().required('Profile photo is required'),
                password: Yup.string().required('Password is required'),
                confirm_password: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Confirm password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                axios.post('http://localhost:5000/register/user', values)
                    .then(response => {
                        alert('User registered successfully!');
                        setSubmitting(false);
                    })
                    .catch(error => {
                        alert('Error registering user.');
                        setSubmitting(false);
                    });
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                        <label htmlFor="first_name">First Name</label>
                        <Field name="first_name" type="text" />
                        <ErrorMessage name="first_name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="last_name">Last Name</label>
                        <Field name="last_name" type="text" />
                        <ErrorMessage name="last_name" component="div" />
                    </div>
                    <div>
                        <label htmlFor="dob">Date of Birth</label>
                        <Field name="dob" type="date" />
                        <ErrorMessage name="dob" component="div" />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <Field name="city" type="text" />
                        <ErrorMessage name="city" component="div" />
                    </div>
                    <div>
                        <label htmlFor="birthplace">Birthplace</label>
                        <Field name="birthplace" type="text" />
                        <ErrorMessage name="birthplace" component="div" />
                    </div>
                    <div>
                        <label htmlFor="mobile_number">Mobile Number</label>
                        <Field name="mobile_number" type="text" />
                        <ErrorMessage name="mobile_number" component="div" />
                    </div>
                    <div>
                        <label htmlFor="birth_time">Birth Time</label>
                        <Field name="birth_time" type="time" />
                        <ErrorMessage name="birth_time" component="div" />
                    </div>
                    <div>
                        <label htmlFor="gender">Gender</label>
                        <Field name="gender" as="select">
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage name="gender" component="div" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div>
                        <label htmlFor="district">District</label>
                        <Field name="district" as="select">
                            <option value="">Select District</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                        </Field>
                        <ErrorMessage name="district" component="div" />
                    </div>
                    <div>
                        <label htmlFor="pin_code">Pin Code</label>
                        <Field name="pin_code" type="text" />
                        <ErrorMessage name="pin_code" component="div" />
                    </div>
                    <div>
                        <label htmlFor="profile_photo">Profile Photo</label>
                        <Field name="profile_photo" type="text" />
                        <ErrorMessage name="profile_photo" component="div" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div>
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <Field name="confirm_password" type="password" />
                        <ErrorMessage name="confirm_password" component="div" />
                    </div>
                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default UserRegister;
