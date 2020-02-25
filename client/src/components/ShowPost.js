import React from "react";
import { useSelector } from "react-redux";
import SimpleCard from "./SimpleCard";
import { Box, Grid, Avatar, Text } from "@chakra-ui/core";

function ShowPost({ post }) {
  const { user } = useSelector(state => state.auth);
  <Grid>
    <Box>
      <Avatar src={user.avatar} />
      <Text fontSize="20px">
        <b>{user.name}</b>
      </Text>
    </Box>
    <Box>
      <Text fontSize="29px">
        <b>Title</b>
      </Text>
      <Text>{post.title}</Text>
      <Text fontSize="29px">
        <b>Description</b>
      </Text>
      <Text>{post.description}</Text>
      <Text fontSize="29px">
        <b>Recommendations</b>
      </Text>
      <Text>
        {post.list.map(item => (
          <SimpleCard anime={item} key={item.mal_id} />
        ))}
      </Text>
    </Box>
  </Grid>;
}
export default ShowPost();
