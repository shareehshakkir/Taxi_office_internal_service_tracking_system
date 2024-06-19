import React from "react";
import { Link, Flex, Text } from "@chakra-ui/react";
import { NavLink as _Link } from "react-router-dom";
import { useNavContext } from "../../context/NavbarContext";

export const NavItem = ({ icon, title, size, link, handler }) => {
  const { toggle, toggleFn } = useNavContext();
  return (
    <Flex direction="column" p="0 10px">
      <Link
        as={_Link}
        transition="0.3s ease-in-out"
        to={link}
        display="flex"
        alignItems="center"
        justifyContent={{ base: "start", md: !size && "center" }}
        h={30}
        p="20px 5px"
        m="8px 0"
        borderRadius="md"
        color="black"
        fontSize=".9rem"
        border="1px solid transparent"
        _hover={{ borderColor: "black" }}
        onClick={toggle ? toggleFn : handler}
      >
        <Flex alignItems="center" justifyContent="center" h="100%">
          <Flex
            m={{ base: "10px", md: !size && "0 10px" }}
            fontSize="1.2rem"
            transition="0.2s ease"
          >
            {icon}
          </Flex>
          <Text display={{ base: "flex", md: "none" }}>{title}</Text>
          <Text display={{ base: "none", md: "flex" }}>{size && title}</Text>
        </Flex>
      </Link>
    </Flex>
  );
};
