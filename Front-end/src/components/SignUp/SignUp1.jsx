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
import { useAuth } from "@context/AuthContext";


export const SignUp1 = ({submit,errors,register,isSubmitting,watch}) => {
  
  return (
    <form
      w={100}
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: "30px" }}
    >
      <FormControl isInvalid={errors.username}>
        <Input
          id="username"
          placeholder="Username/Email"
          {...register("username", {
            required: "This is required",
            minLength: {
              value: 1,
              message: "Minimum length should be 1",
            },
          })}
          borderColor="gray"
          _hover={{ borderColor: "grey" }}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password}>
        <Input
          type="password"
          id="password"
          placeholder="Password"
          {...register("password", {
            required: "This is required",
            minLength: {
              value: 1,
              message: "Minimum length should be 1",
            },
          })}
          borderColor="gray"
          _hover={{ borderColor: "grey" }}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.confirm_password}>
        <Input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            validate: (val) => {
              if (watch("password") != val) {
                return "Your passwords do no match";
              }
            },
            required: "This is required",

            minLength: {
              value: 1,
              message: "Minimum length should be 1",
            },
          })}
          borderColor={errors?.confirm_password ? "red" : "gray"}
          _hover={{
            borderColor: errors?.confirm_password ? "red" : "gray",
          }}
          _focus={{
            borderColor: errors?.confirm_password ? "red" : "theme.blue",
          }}
        />
        <FormErrorMessage>
          {errors.confirm_password && errors.confirm_password.message}
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
        Next
      </Button>
    </form>
  );
};
