import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPostById } from "../actions/postActions";
import Spinner from "./Spinner";
import Card from "./Card";
import { Box, Avatar, Image, Grid, Button, Text } from "@chakra-ui/core";

function Post({ match }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostById(match.params.id));
  }, [dispatch]);
  const { post, loading } = useSelector(state => state.post);
  console.log(post);
  return loading ? (
    <Spinner />
  ) : (
    <Box mt={20}>
      <Box className="container">
        <Text fontSize="3xl" fontWeight="600">
          <Avatar src={post?.user?.avatar} mr={5} />
          {post.title}
        </Text>
        <Text fontSize="xl" mb={10} lineHeight="1.5rem">
          {post.description}
        </Text>
        <Box>
          <Button mr={10} mb={10}>
            Edit List
          </Button>
          <Button mb={10} variant="outline" variantColor="red">
            Delete
          </Button>
        </Box>
        <Grid templateColumns="1fr 1fr" gap={6}>
          {post?.list?.map(item => (
            <Card key={item.mal_id} mb={10} anime={item} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Post;
