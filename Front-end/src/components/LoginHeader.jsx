import React from "react";
import { Container, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const LoginHeader = () => {
  return (
    <Container
      as="header"
      maxW={{
        base: "container.sm",
        md: "container.md",
        lg: "container.lg",
        xl: "container.xl",
      }}
      py={5}
      h="80px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Heading
        as="h4"
        fontSize={["22px", "25px", "30px"]}
        color="brand.yellow"
        fontWeight="500"
      >
        LOGO/BRAND
      </Heading>
      <Spacer />
      <Button
        as={Link}
        to="/login"
        bg="brand.purple"
        _hover={{ bg: "purple.700",color:"white" }}
        color="white"
        paddingX="25px"
      >
        Sign In
      </Button>
    </Container>
  );
};
