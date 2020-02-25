import React from "react";
import { Box, Image, Text, Grid, Button } from "@chakra-ui/core";

function SimpleCard({ anime, haveDeleteButton, deleteAction }) {
  return (
    <Box
      overflow="hidden"
      backgroundColor="white"
      boxShadow="0 6px 15px rgba(0,0,0,0.09)"
      cursor="pointer"
    >
      <Grid templateColumns="200px 1fr">
        <Image src={anime.image_url} paddingRight="2em" />
        <Box paddingRight="2em">
          <Text mt={2} fontSize="lg" fontWeight="semiBold" lineHeight="short">
            {anime.title}
          </Text>
          {anime.episodes && <Text mt={2}>Episodes: {anime.episodes}</Text>}
          {anime.score && (
            <Text fontSize="sm">
              <b>MAL Score: </b>
              {anime.score}
            </Text>
          )}
          {haveDeleteButton && (
            <Button
              onClick={() => deleteAction(anime.mal_id)}
              variant="outline"
              variantColor="red"
            >
              Delete
            </Button>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

export default SimpleCard;
