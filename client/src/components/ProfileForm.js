import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../actions/profileActions";
import * as Yup from "yup";
import {
  Input,
  Textarea,
  Button,
  Text,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage
} from "@chakra-ui/core";

const profileSchema = Yup.object().shape({
  aboutMe: Yup.string()
    .min("10", "Please say something about yourself (10 Characters Min)")
    .required("About Me is required"),
  location: Yup.string().required("Location is required")
});

function ProfileForm() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.profile);
  const alerts = useSelector(state => state.alerts);

  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );

  return (
    <Fragment>
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <Formik
        initialValues={{
          aboutMe: profile ? profile.aboutMe : "",
          location: profile ? profile.location : ""
        }}
        validationSchema={profileSchema}
        onSubmit={(values, actions) => {
          dispatch(createProfile(values));
          actions.setSubmitting(false);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="form-container">
            <Text fontSize="3xl" textAlign="center">
              <b>Profile</b>
            </Text>
            <Field name="aboutMe">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.aboutMe && form.touched.aboutMe}
                >
                  <FormLabel htmlFor="aboutMe">About Me</FormLabel>
                  <Textarea {...field} id="aboutMe" placeholder="About Me" />
                  <FormErrorMessage>{form.errors.aboutMe}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="location">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.location && form.touched.location}
                >
                  <FormLabel htmlFor="location">Location</FormLabel>
                  <Input {...field} id="location" placeholder="Location" />
                  <FormHelperText>For ex, Dublin, Ireland</FormHelperText>
                  <FormErrorMessage>{form.errors.location}</FormErrorMessage>
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
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}

export default ProfileForm;
