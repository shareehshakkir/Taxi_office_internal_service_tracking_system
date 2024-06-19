import React from "react";
import { Box } from "@chakra-ui/react";

export const TableHolder = ({ children }) => {
  return (
    <Box h="87vh" overflowY="scroll" boxSizing="border-box" order={{base:1,"2xl":0}}>
      {children}
    </Box>
  );
};
