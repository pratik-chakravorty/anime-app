import React from "react";
import { Spinner, Box } from "@chakra-ui/core";

function Spin() {
  return (
    <Box display="flex" justifyContent="center" mt={20} alignItems="center">
      <Spinner size="xl" />
    </Box>
  );
}

export default Spin;
