import React, { useContext, useState } from "react";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const LoginBody = ({ title }) => {
  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  let errormsg = "";
  const onSubmit = async (values) => {
    try {
      errormsg = await login(values, title);
      errormsg &&
        toast({
          position: "top-center",
          title: `${errormsg}`,
          status: "error",
          isClosable: true,
        });
    } catch (error) {
      error &&
        toast({
          position: "top-center",
          title: `Error occured`,
          status: "error",
          isClosable: true,
        });
    }
  };
  return (
    <Container
      as="section"
      maxW="100vw"
      m={0}
      px={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Flex w={[0, 0, "50%"]} h="100vh"></Flex>
      <Flex
        w={["100%", "100%", "50%"]}
        h="100vh"
        backgroundImage="url('/bg.png')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        objectFit="cover"
        pos="fixed"
        left="0"
        top={0}
        zIndex={0}
        opacity={[0.5, 0.5, 1]}
      ></Flex>
      <Flex
        background={["white", "white", "transparent"]}
        borderRadius={["md", "lg"]}
        w={["90%", "80%", "50%"]}
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        zIndex={1}
        py={10}
        px={5}
      >
        <Heading
          as="h4"
          fontSize={["18px", "20px", "22px"]}
          fontWeight="500"
          mb={10}
        >
          {title} Login
        </Heading>

        <form
          w={100}
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "30px" }}
        >
          <FormControl isInvalid={errors.name}>
            <Input
              id="name"
              placeholder="username/email"
              {...register("name", {
                required: "This is required",
                minLength: { value: 1, message: "Minimum length should be 1" },
              })}
              borderColor="gray"
              _hover={{ borderColor: "grey" }}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              type="password"
              id="password"
              placeholder="password"
              {...register("password", {
                required: "This is required",
                minLength: { value: 1, message: "Minimum length should be 1" },
              })}
              borderColor="gray"
              _hover={{ borderColor: "grey" }}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
            bg="brand.purple"
            _hover={{ bg: "purple.700" }}
            color="white"
            paddingX="25px"
            w="150px"
            alignSelf="center"
          >
            Submit
          </Button>
        </form>
        <Flex mt={8} fontSize={["16px", "18px"]}>
          New User?{" "}
          <Link to="/signup">
            <Text
              color="blue"
              transition="0.2s ease"
              _hover={{ color: "blue.500" }}
            >
              &nbsp;Sign Up
            </Text>
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};
