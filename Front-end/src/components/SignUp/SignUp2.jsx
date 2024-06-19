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
import { Doulbe } from "@components/InputComponents";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export const Label = ({ name }) => {
  return <label>{name}</label>;
};

export const SignUp2 = ({
  submit,
  errors,
  register,
  isSubmitting,
  isDirty,
}) => {
  const year = new Date().getFullYear();

  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);

    return date;
  }
  const maxDate = subtractYears(new Date(), 18).toLocaleDateString("en-CA");

  return (
    <form
      w={100}
      onSubmit={submit}
      style={{ display: "flex", flexDirection: "column", gap: "30px" }}
    >
      <Heading
        as="h5"
        fontSize={"16px"}
        fontWeight="500"
        color={"brand.purple"}
        textAlign={"center"}
        mb={3}
      >
        Please Fill Up The Following Personal Details
      </Heading>
      <Doulbe>
        <FormControl isInvalid={errors.driver_name}>
          <Label name="Name" />
          <Input
            id="name"
            {...register("driver_name", {
              required: "This is required",
              minLength: {
                value: 1,
              },
            })}
            borderColor={errors?.driver_name ? "red" : "gray"}
            _hover={{
              borderColor: errors?.driver_name ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.driver_name ? "red" : "auto",
            }}
          />
        </FormControl>
        <FormControl isInvalid={errors.driver_dob}>
          <Label name="Date Of Birth" />
          <Input
            type="date"
            id="dob"
            max={maxDate}
            defaultValue={maxDate}
            {...register("driver_dob", {
              required: true,
            })}
            borderColor={errors?.driver_dob ? "red" : "gray"}
            _hover={{
              borderColor: errors?.driver_dob ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.driver_dob ? "red" : "auto",
            }}
          />
        </FormControl>
      </Doulbe>
      <FormControl isInvalid={errors.driver_email}>
        <Label name="Email" />
        <Input
          id="email"
          {...register("driver_email", {
            required: "This is required",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Invalid email address",
            },
            minLength: {
              value: 1,
            },
          })}
          borderColor={errors?.driver_email ? "red" : "gray"}
          _hover={{
            borderColor: errors?.driver_email ? "red" : "gray",
          }}
          _focus={{
            borderColor: errors?.driver_email ? "red" : "auto",
          }}
        />
      </FormControl>
      <Doulbe>
        <FormControl isInvalid={errors.driver_phone}>
          <Label name="Phone" />
          <Input
            id="phone"
            {...register("driver_phone", {
              required: "This is required",
              minLength: {
                value: 10,
              },
              maxLength: {
                value: 10,
              },
            })}
            borderColor={errors?.driver_phone ? "red" : "gray"}
            _hover={{
              borderColor: errors?.driver_phone ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.driver_phone ? "red" : "auto",
            }}
          />
        </FormControl>
        <FormControl isInvalid={errors.driver_upi}>
          <Label name="UPI" />
          <Input
            type="text"
            id="upi"
            {...register("driver_upi", {
              required: "This is required",
              pattern: {
                value: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
              },
            })}
            borderColor={errors?.driver_upi ? "red" : "gray"}
            _hover={{
              borderColor: errors?.driver_upi ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.driver_upi ? "red" : "auto",
            }}
          />
        </FormControl>
      </Doulbe>

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
