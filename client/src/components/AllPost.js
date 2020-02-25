import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { getAllPosts } from "../actions/postActions";
import { Box, Grid, Image, Text, Avatar } from "@chakra-ui/core";

function AllPost() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.post);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
    <Box className="container">
      <Text fontSize="30px" mb={10} mt={5} fontWeight={500} textAlign="center">
        All Recommendation Lists
      </Text>
      {posts.map(item => (
        <Link key={item._id} to={`/post/${item._id}`}>
          <Box
            boxShadow="0 6px 15px rgba(0,0,0,0.09)"
            backgroundColor="white"
            cursor="pointer"
            mb={50}
          >
            <Grid templateColumns="120px 1fr" gap={10}>
              <Image src={item && item.list[0].image_url} />
              <Box>
                <Text fontSize="3xl" fontWeight={300}>
                  {item.title}
                </Text>
                <Text>{item.description}</Text>
                <Grid templateColumns="50px 120px" mt={10} float="right">
                  <Avatar src={item?.user?.avatar} width={10} height={10} />
                  {item?.user?.name}
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Link>
      ))}
    </Box>
  );
}

export default AllPost;
