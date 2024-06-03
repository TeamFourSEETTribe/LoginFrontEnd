import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import dayjs from "dayjs";
import "./AstrologerRegister.css"; // Import the CSS file

const AstrologerRegister = () => {
  return (
    <div className="form-container">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          mobile_number: "",
          aadhar_number: "",
          dob: "",
          gender: "",
          experience_years: "",
          languages_known: "",
          skills: "",
          email: "",
          profile_photo: null,
          district: "",
          pin_code: "",
          rate_per_min: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={Yup.object({
          first_name: Yup.string().required("First name is required"),
          last_name: Yup.string().required("Last name is required"),
          mobile_number: Yup.string()
            .matches(
              /^[9876]\d{9}$/,
              "Mobile number must start with 9, 8, 7, or 6 and be 10 digits long"
            )
            .required("Mobile number is required"),
          aadhar_number: Yup.string()
            .matches(/^\d{16}$/, "Aadhar number must be exactly 12 digits")
            .required("Aadhar number is required"),
          dob: Yup.date()
            .required("Date of birth is required")
            .test("age", "You must be at least 18 years old", (value) => {
              return dayjs().diff(dayjs(value), "year") >= 18;
            }),
          gender: Yup.string().required("Gender is required"),
          experience_years: Yup.number().required(
            "Experience in years is required"
          ),
          languages_known: Yup.string().required("Languages known is required"),
          skills: Yup.string().required("Skills are required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          profile_photo: Yup.mixed()
            .required("Profile photo is required")
            .test("fileSize", "File size is too large", (value) => {
              return value && value.size <= 3000000; // 3 MB
            })
            .test("fileFormat", "Unsupported format", (value) => {
              return (
                value &&
                ["image/jpg", "image/jpeg", "image/png"].includes(value.type)
              );
            }),
          district: Yup.string().required("District is required"),
          pin_code: Yup.string()
            .matches(/^\d{6}$/, "pin code should be exactly 6 digit")
            .required("pin code is required"),
          rate_per_min: Yup.number().required("Rate per minute is required"),
          password: Yup.string().required("Password is required"),
          confirm_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          const formData = new FormData();
          for (let key in values) {
            formData.append(key, values[key]);
          }

          axios
            .post("http://localhost:5000/register/astrologer", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              alert("Astrologer registered successfully!");
              setSubmitting(false);
            })
            .catch((error) => {
              alert("Error registering astrologer: " + error.response.data);
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
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
              <label htmlFor="mobile_number">Mobile Number</label>
              <Field name="mobile_number" type="text" />
              <ErrorMessage name="mobile_number" component="div" />
            </div>
            <div>
              <label htmlFor="aadhar_number">Aadhar Number</label>
              <Field name="aadhar_number" type="text" />
              <ErrorMessage name="aadhar_number" component="div" />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth</label>
              <Field name="dob" type="date" />
              <ErrorMessage name="dob" component="div" />
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
              <label htmlFor="experience_years">Experience in Years</label>
              <Field name="experience_years" type="number" />
              <ErrorMessage name="experience_years" component="div" />
            </div>
            <div>
              <label htmlFor="languages_known">Languages Known</label>
              <Field name="languages_known" type="text" />
              <ErrorMessage name="languages_known" component="div" />
            </div>
            <div>
              <label htmlFor="skills">Skills</label>
              <Field name="skills" type="text" />
              <ErrorMessage name="skills" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="profile_photo">Profile Photo</label>
              <input
                name="profile_photo"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                onChange={(event) => {
                  setFieldValue("profile_photo", event.currentTarget.files[0]);
                }}
              />
              <ErrorMessage name="profile_photo" component="div" />
            </div>
            <div>
              <label htmlFor="district">District</label>
              <Field name="district" as="select">
                <option value="">Select District</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Raigad">Raigad</option>
              </Field>
              <ErrorMessage name="district" component="div" />
            </div>
            <div>
              <label htmlFor="pin_code">Pin Code</label>
              <Field name="pin_code" type="text" />
              <ErrorMessage name="pin_code" component="div" />
            </div>
            <div>
              <label htmlFor="rate_per_min">Rate per Minute</label>
              <Field name="rate_per_min" type="number" />
              <ErrorMessage name="rate_per_min" component="div" />
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
    </div>
  );
};

export default AstrologerRegister;
