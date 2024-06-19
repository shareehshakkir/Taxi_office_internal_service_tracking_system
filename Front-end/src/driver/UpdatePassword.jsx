import React, { useState } from "react";
import {
  useDisclosure,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  Input,
  Flex,
  useToast,
  Text,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdateStatus } from "@hooks/useData";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const Label = ({ name }) => {
  return <label>{name}</label>;
};

const UpdatePassword = () => {
  const toast = useToast();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const finalRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync } = useUpdateStatus();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, dirtyFields, isDirty, touchedFields },
  } = useForm();

  const onSubmit = async () => {
    const data = { new_password: getValues("password") };
    let endpoint = `authapi/update-user-password/`;
    try {
      const response = await mutateAsync({ data, endpoint });
      toast({
        position: "top-right",
        title: `${response?.message}`,
        status: "success",
        isClosable: true,
      });
      onClose(close);
      reset({
        password: "",
        confirm_password: "",
      });
    } catch (e) {
      toast({
        position: "top-right",
        title: `Error Occured.Please Try Again.`,
        status: "error",
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Box ref={finalRef} tabIndex={0}></Box>
      <Text
        colorScheme="teal"
        type="submit"
        _hover={{ opacity: "0.6" }}
        cursor="pointer"
        color="brand.red"
        paddingX="25px"
        alignSelf="end"
        marginRight={{ base: "22px", md: "0" }}
        onClick={onOpen}
      >
        Update Password
      </Text>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          close();
          reset({
            password: "",
            confirm_password: "",
          });
        }}
        scrollBehavior="inside"
        size={{ base: "sm", md: "md", "2xl": "2xl" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="sm">
          <ModalHeader>Edit details</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                isInvalid={errors?.password && touchedFields.password}
              >
                <Label name="New Password" />
                <InputGroup size="md">
                  <Input
                    id="name"
                    {...register("password", {
                      required: "This is required",
                      minLength: {
                        value: 8,
                        message: "Min 8 characters required",
                      },
                    })}
                    pr="4.5rem"
                    type={show1 ? "text" : "password"}
                    borderColor={errors?.password ? "red" : "gray"}
                    _hover={{
                      borderColor: errors?.password ? "red" : "gray",
                    }}
                    _focus={{
                      borderColor: errors?.password ? "red" : "auto",
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow1(!show1)}
                    >
                      {show1 ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors?.password && (
                  <Text height="30px" color="brand.red">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <FormControl
                my="15px"
                isInvalid={
                  errors?.confirm_password && touchedFields.confirm_password
                }
              >
                <Label name="Confirm Password" />
                <InputGroup size="md">
                  <Input
                    id="confirm_password"
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
                    pr="4.5rem"
                    type={show2 ? "text" : "password"}
                    borderColor={errors?.confirm_password ? "red" : "gray"}
                    _hover={{
                      borderColor: errors?.confirm_password ? "red" : "gray",
                    }}
                    _focus={{
                      borderColor: errors?.confirm_password ? "red" : "auto",
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow2(!show2)}
                    >
                      {show2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors?.confirm_password && (
                  <Text height="30px" color="brand.red">
                    {errors?.confirm_password.message}
                  </Text>
                )}
              </FormControl>

              <Flex justifyContent="end" my="10px" gap="10px">
                <Button
                  colorScheme="teal"
                  type="reset"
                  bg="brand.purple"
                  _hover={{ bg: "purple.700" }}
                  color="white"
                  paddingX="25px"
                  w="150px"
                  py="20px"
                  alignSelf="end"
                  marginRight={{ base: "22px", md: "0" }}
                  onClick={() => {
                    onClose(close);
                    reset({
                      password: "",
                      confirm_password: "",
                    });
                  }}
                >
                  Cancel
                </Button>

                <Button
                  isDisabled={!isDirty}
                  colorScheme="teal"
                  type="submit"
                  bg="brand.purple"
                  _hover={{ bg: "purple.700" }}
                  color="white"
                  paddingX="25px"
                  w="150px"
                  py="20px"
                  alignSelf="end"
                  marginRight={{ base: "22px", md: "0" }}
                >
                  Save
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePassword;
