import React from "react";
import { Flex, Heading, Text, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Card = ({ icon, title, number }) => {
  const path=useLocation();
  const admin=path.pathname.includes("admin")
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      gap="15px"
      w="275px"
      height={["225px", "275px"]}
      bg="white"
      borderRadius="7px"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
    >
      <Flex
        w={50}
        h={50}
        borderRadius="50%"
        bg="brand.purple"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={icon} w={30} h={30} color="white" />
      </Flex>

      <Heading as="h3" size="sm">
        {title}
      </Heading>

      <Text dangerouslySetInnerHTML={{ __html: number }} fontSize="30px" fontWeight="bolder"  textTransform={"capitalize"}></Text>
      {admin?"":<Link to={title.toLowerCase()}>
        <Button
          h="35px"
          w="140px"
          bg="brand.purple"
          _hover={{ bg: "purple.700" }}
          color="white"
        >
          View
        </Button>
      </Link>}
    </Flex>
  );
};
