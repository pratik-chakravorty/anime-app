import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import * as Yup from "yup";
import {
  Input,
  Button,
  Text,
  FormControl,
  Alert,
  AlertIcon,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/core";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string().min(
    "5",
    "Passwords must be 5 or more than 5 characters"
  )
});

function Login() {
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
          email: "",
          password: ""
        }}
        validationSchema={loginSchema}
        onSubmit={(values, actions) => {
          dispatch(login(values));
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form-container">
            <Text fontSize="3xl" textAlign="center">
              <b>Login</b>
            </Text>
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

            <Button
              variant="outline"
              type="submit"
              variantColor="teal"
              marginTop={6}
              isLoading={props.isSubmitting}
            >
              Login
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default Login;
