import React from "react";
import { Link } from "react-router-dom";
import { Box, Image, Text, Grid } from "@chakra-ui/core";

function Card({ anime }) {
  return (
    <Link to={`/details/${anime.mal_id}`}>
      <Box
        overflow="hidden"
        backgroundColor="white"
        className="card-box"
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
          </Box>
        </Grid>
      </Box>
    </Link>
  );
}

export default Card;
