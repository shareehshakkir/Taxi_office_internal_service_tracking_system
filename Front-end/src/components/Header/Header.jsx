import React from "react";
import {
  Container,
  Heading,
  Spacer,
  Stack,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Text,
  Button,
  Link,
  Box,
  Flex,
} from "@chakra-ui/react";
import { VscBellDot } from "react-icons/vsc";
import { Link as _Link } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { useNavContext } from "@context/NavbarContext";
import { BsBox2Heart, BsFillTaxiFrontFill } from "react-icons/bs";

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const admin = location.pathname.includes("admin");
  const { toggle, toggleFn } = useNavContext();
  return (
    <Container
      as="header"
      maxW="100%"
      py={5}
      px="2%"
      h="60px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderBottom="1px solid #808080"
    >
      <Flex
        bg="transparent"
        height="35px"
        onClick={toggleFn}
        display={{ base: "flex", md: "none" }}
        flexDir="column"
        alignItems="center"
        justifyContent="space-evenly"
        _hover={{ bg: "none", opacity: "0.5" }}
        ml="10px"
        overflow="hidden"
      >
        <Box
          width="30px"
          height="3px"
          bg="brand.purple"
          borderRadius="md"
          transition="0.2s ease-in-out"
          transform={
            toggle ? "rotate(45deg) translateY(7px) translateX(6px)" : ""
          }
        ></Box>
        <Box
          width="30px"
          height="3px"
          bg="brand.purple"
          borderRadius="md"
          transition="0.2s .05s ease-in-out"
          transform={toggle ? "translateX(-35px)" : ""}
        ></Box>
        <Box
          width="30px"
          height="3px"
          bg="brand.purple"
          borderRadius="md"
          transition="0.2s ease-in-out"
          transform={
            toggle ? "rotate(-45deg) translateY(-8px) translateX(6px)" : ""
          }
        ></Box>
      </Flex>
      <Heading
        as="h4"
        fontSize={["22px"]}
        color="brand.yellow"
        fontFamily="Orbitron"
        fontWeight="500"
        letterSpacing="7px"
        display={{ base: "none", md: "flex" }}
      >
        TAXICABON
      </Heading>
      <Heading
        as="h4"
        fontSize={["30px"]}
        color="brand.yellow"
        fontWeight="700"
        letterSpacing="7px"
        display={{ base: "flex", md: "none" }}
        pl="5"
      >
        <BsFillTaxiFrontFill fill="#ECD444" />
      </Heading>
      <Spacer />
      <Stack direction="row" alignItems="center">
        <VscBellDot fontSize="1.2rem" />
        <Text fontSize="md" px="20px" cursor="pointer">
          Hello {auth?.user?.username}
        </Text>
        <Popover>
          <PopoverTrigger>
            <Avatar
              size="sm"
              src="https://bit.ly/broken-link"
              bg="brand.yellow"
              cursor="pointer"
            />
          </PopoverTrigger>
          <PopoverContent
            w="200px"
            mr="50px"
            py="15px"
            _focusVisible={{ outline: "none" }}
          >
            <PopoverBody
              display="flex"
              flexDir="column"
              gap="15px"
              alignItems="center"
              justifyContent="center"
            >
              {admin ? (
                ""
              ) : (
                <Link
                  as={_Link}
                  w="90%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  to="/profile"
                >
                  Profile
                </Link>
              )}
              <Button
                bg="brand.purple"
                _hover={{ bg: "purple.700" }}
                color="white"
                paddingX="25px"
                h="35px"
                fontSize="16px"
                onClick={() => {
                  auth.logout();
                }}
              >
                Log Out
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Stack>
    </Container>
  );
};
