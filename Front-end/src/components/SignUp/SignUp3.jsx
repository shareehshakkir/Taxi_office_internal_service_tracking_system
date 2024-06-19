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
  Select,
} from "@chakra-ui/react";
import { Doulbe } from "@components/InputComponents";

export const Label = ({ name }) => {
  return <label>{name}</label>;
};

export const SignUp3 = ({ submit, errors, register, isSubmitting, watch }) => {
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
        Please Fill Up The Following Taxi Details
      </Heading>
      <Doulbe>
        <FormControl isInvalid={errors.taxi_number}>
          <Label name="Taxi Number" />
          <Input
            id="taxi_number"
            {...register("taxi_num", {
              required: "This is required",
              minLength: {
                value: 1,
              },
            })}
            borderColor={errors?.taxi_num ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_num ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_num ? "red" : "auto",
            }}
          />
        </FormControl>
        <FormControl isInvalid={errors.taxi_test_date}>
          <Label name="Test Date" />
          <Input
            type="date"
            id="taxi_test_date"
            {...register("taxi_test_date", {
              required: "This is required",
            })}
            borderColor={errors?.taxi_test_date ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_test_date ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_test_date ? "red" : "auto",
            }}
          />
        </FormControl>
      </Doulbe>

      <Doulbe>
        <FormControl isInvalid={errors.taxi_pollution_validity}>
          <Label name="Pollution Validity" />
          <Input
            id="taxi_pollution_validity"
            type="date"
            {...register("taxi_pollution_validity", {
              required: "This is required",
              minLength: {
                value: 1,
              },
            })}
            borderColor={errors?.taxi_pollution_validity ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_pollution_validity ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_pollution_validity ? "red" : "auto",
            }}
          />
        </FormControl>
        <FormControl isInvalid={errors.taxi_insurance}>
          <Label name="Insurance Validity" />
          <Input
            type="date"
            id="taxi_insurance"
            {...register("taxi_insurance", {
              required: "This is required",
            })}
            borderColor={errors?.taxi_insurance ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_insurance ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_insurance ? "red" : "auto",
            }}
          />
        </FormControl>
      </Doulbe>
      <Doulbe>
        <FormControl isInvalid={errors.taxi_type}>
          <Label name="Taxi Type" />
          <Select
            type="text"
            id="taxi_type"
            {...register("taxi_type", {
              required: "This is required",
              length: "20",
            })}
            borderColor={errors?.taxi_type ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_type ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_type ? "red" : "auto",
            }}
          >
            <option defaultValue="Choose" selected disabled hidden>
              Choose
            </option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MUV">MUV</option>
            <option value="Hatchback">Hatchback</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.taxi_manufacturer}>
          <Label name="Taxi Brand" />
          <Select
            id="taxi_manufacturer"
            {...register("taxi_manufacturer", {
              required: "This is required",
              minLength: "1",
            })}
            borderColor={errors?.taxi_manufacturer ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_manufacturer ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_manufacturer ? "red" : "auto",
            }}
          >
            <option defaultValue="Choose" selected disabled hidden>
              Choose
            </option>
            <option value="Suzuki">Suzuki</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Tata">Tata</option>
            <option value="Mahindra">Mahindra</option>
            <option value="Kia">Kia</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Renault">Renault</option>
            <option value="Volkswagen">Volkswagen</option>
            <option value="MG Motors">MG Motors</option>
          </Select>
        </FormControl>
      </Doulbe>
      <Doulbe>
        <FormControl isInvalid={errors.taxi_model}>
          <Label name="Taxi Model" />
          <Input
            type="text"
            id="taxi_model"
            {...register("taxi_model", {
              required: "This is required",
              length: "20",
            })}
            borderColor={errors?.taxi_model ? "red" : "gray"}
            _hover={{
              borderColor: errors?.taxi_model ? "red" : "gray",
            }}
            _focus={{
              borderColor: errors?.taxi_model ? "red" : "auto",
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
        Submit
      </Button>
    </form>
  );
};
