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
import { LoginHeader } from "../components/LoginHeader";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNewDriver, useNewDriverAccount } from "../hooks/useData";
import { SignUp2 } from "../components/SignUp/SignUp2";
import { SignUp1 } from "../components/SignUp/SignUp1";
import { SignUp3 } from "../components/SignUp/SignUp3";

export const SignUp = () => {
  const [accessToken, setAccessToken] = useState();

  const [firstStep, setFirstStep] = useState(false);
  const [secondStep, setSecondStep] = useState(false);

  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: postReq } = useNewDriver();
  const {
    mutateAsync: postReqWithAccess,
    isError,
    error,
  } = useNewDriverAccount();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
    watch,
    reset,
    control,
  } = useForm();

  const onSubmit1 = async (data) => {
    let endpoint = "authapi/signup/";
    const response = await postReq({ endpoint, data });
    if (response?.status == 200) {
      toast({
        position: "top-center",
        title: `User Created`,
        status: "success",
        isClosable: true,
      });
      setAccessToken(response?.access);
      setFirstStep(true);
      reset();
    }
    else if (response?.status == 403) {
      toast({
        position: "top-center",
        title: `${Object.values(response.errors)}`,
        status: "error",
        isClosable: true,
      });
    }
  };

  const onSubmit2 = async (data) => {
    let endpoint = "api/createdriver";
    const response = await postReqWithAccess({ endpoint, data, accessToken });
    if (response?.err == "Error Occured.") {
      toast({
        position: "top-center",
        title: `${Object.values(response.issues)}`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        position: "top-center",
        title: `Updated User Details`,
        status: "success",
        isClosable: true,
      });
      setSecondStep(true);
    }
  };

  const onSubmit3 = async (data) => {
    let endpoint = "api/createtaxi";
    const response = await postReqWithAccess({ endpoint, data, accessToken });
    if (response?.err == "Error Occured.") {
      toast({
        position: "top-center",
        title: `${Object.values(response.issues)[0]}`,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        position: "top-center",
        title: `Updated Taxi Details`,
        status: "success",
        isClosable: true,
      });
      navigate("/login")
    }
  };
  return (
    <>
      <LoginHeader />

      <Container
        as="section"
        maxW="100vw"
        m={0}
        px={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          background={["white", "white", "transparent"]}
          borderRadius={["md", "lg"]}
          w={"100%"}
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          zIndex={1}
          py={10}
          px={5}
          h="85vh"
        >
          <Heading
            as="h4"
            fontSize={["18px", "20px", "22px"]}
            fontWeight="500"
            mb={10}
          >
            Driver Sign Up
          </Heading>

          {accessToken ? (
            secondStep ? (
              <SignUp3
                submit={handleSubmit(onSubmit3)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                watch={watch}
              />
            ) : (
              <SignUp2
                submit={handleSubmit(onSubmit2)}
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                watch={watch}
                isDirty={isDirty}
                control={control}
              />
            )
          ) : (
            <SignUp1
              submit={handleSubmit(onSubmit1)}
              register={register}
              errors={errors}
              isSubmitting={isSubmitting}
              watch={watch}
            />
          )}
        </Flex>
      </Container>
    </>
  );
};
