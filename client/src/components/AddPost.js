import React, { useState } from "react";
import uuid from "uuid";
import { Formik, Field } from "formik";
import SearchInput from "./SearchInput";
import SimpleCard from "./SimpleCard";
import { setAlert } from "../actions/alertAction";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { setListAlert, addPost } from "../actions/postActions";
import {
  Input,
  Button,
  Text,
  Grid,
  Alert,
  AlertIcon,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage
} from "@chakra-ui/core";

const postSchema = Yup.object().shape({
  title: Yup.string()
    .min("6", "Please enter a title with 6 or more characters")
    .required("Title is required"),
  description: Yup.string()
    .min("10", "Please enter a description with more than 10 characters.")
    .required("Description is required")
});

function AddPost() {
  const dispatch = useDispatch();
  const alerts = useSelector(state => state.alerts);
  const [val, setVal] = useState("");
  const [showList, setShowList] = useState([]);
  const handleSetValue = (val, props) => {
    setVal(val);
  };
  const handleAdd = props => {
    if (Object.keys(val).length > 0) {
      if (showList.some(item => item.mal_id === val.mal_id)) {
        dispatch(
          setAlert("Item already in the list", "error", { id: uuid.v4() })
        );
        return;
      }
      setShowList([...showList, val]);
    }
    //clear
    setVal("");
  };
  const handleDelete = id => {
    const filteredList = showList.filter(item => item.mal_id !== id);
    setShowList(filteredList);
  };
  const displayAlerts = alert => (
    <Alert status={alert.alertType} key={alert.id}>
      <AlertIcon />
      {alert.msg}
    </Alert>
  );
  return (
    <div className="container">
      {alerts && alerts.length > 0 && alerts.map(alert => displayAlerts(alert))}
      <Text fontSize="5xl" textAlign="center">
        Create a Recommendation List Post
      </Text>
      <Formik
        validationSchema={postSchema}
        onSubmit={(values, action) => {
          if (showList.length === 0) {
            dispatch(setListAlert());
            action.setSubmitting(false);
            return;
          }
          const finalValues = {
            ...values,
            list: showList
          };
          dispatch(addPost(finalValues));
          action.setSubmitting(false);
        }}
        initialValues={{
          title: "",
          description: ""
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name="title">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="Recommendation Title (Ex- Best Horror Animes)"
                  />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="description">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.description && form.touched.description
                  }
                >
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Tell something about the recommendation"
                  />
                  <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="recommendation">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.recommendation && form.touched.recommendation
                  }
                >
                  <FormLabel htmlFor="recommendation">Recommendation</FormLabel>
                  <Grid templateColumns="1fr 90px" gap={5}>
                    <SearchInput
                      id="recommendation"
                      value={val}
                      onChange={val => handleSetValue(val, props)}
                    />
                    <Button onClick={() => handleAdd(props)}>Add</Button>
                  </Grid>
                  <FormErrorMessage>
                    {form.errors.recommendation}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button type="submit" isLoading={props.isSubmitting}>
              Post
            </Button>
          </form>
        )}
      </Formik>
      {showList.length > 0 &&
        showList.map(item => (
          <div
            style={{ marginTop: "60px", marginBottom: "60px" }}
            key={item.mal_id}
          >
            <SimpleCard
              anime={item}
              deleteAction={id => handleDelete(id)}
              haveDeleteButton={true}
            />
          </div>
        ))}
    </div>
  );
}

export default AddPost;
