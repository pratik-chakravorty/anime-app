import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/authActions";
import * as Yup from "yup";
import {
  Input,
  Button,
  Text,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/core";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min("6", "Please enter a name with 6 or more characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string().min(
    "5",
    "Passwords must be 5 or more than 5 characters"
  ),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirm is required")
});

function Register() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const alerts = useSelector(state => state.alerts);

  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: ""
        }}
        validationSchema={registerSchema}
        onSubmit={(values, actions) => {
          dispatch(register(values));
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form-container">
            <Text fontSize="3xl" textAlign="center">
              <b>Register</b>
            </Text>
            <Field name="name">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} id="name" placeholder="Name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    placeholder="Password"
                    type="password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password2">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password2 && form.touched.password2}
                >
                  <FormLabel htmlFor="password2">Confirm Password</FormLabel>
                  <Input
                    {...field}
                    id="password2"
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <FormErrorMessage>{form.errors.password2}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              variant="outline"
              type="submit"
              variantColor="teal"
              marginTop={6}
              isLoading={props.isSubmitting}
            >
              Register
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default Register;
