import React, { useRef } from "react";
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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUpdateStatus } from "@hooks/useData";

export const Label = ({ name }) => {
  return <label>{name}</label>;
};

const EditProfileDetails = ({ defaultDetails }) => {
  const toast = useToast();
  const default_reset = {
    driver_name: defaultDetails?.driver_name,
    driver_email: defaultDetails?.driver_email,
    driver_dob: defaultDetails?.driver_dob,
    driver_upi: defaultDetails?.driver_upi,
    driver_phone: defaultDetails?.driver_phone,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const { mutateAsync } = useUpdateStatus();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    defaultValues: default_reset,
  });

  const year = new Date().getFullYear();
  function subtractYears(date, years) {
    date.setFullYear(date.getFullYear() - years);
    return date;
  }

  const maxDate = subtractYears(new Date(), 18).toLocaleDateString("en-CA");

  const onSubmit = async () => {
    const editedFields = Object.keys(dirtyFields);
    const data = {};
    editedFields.map((name) => {
      data[name] = getValues(name);
    });
    let endpoint = `api/api/update-driver-profile/`;
    try {
      const response = await mutateAsync({ data, endpoint });
      toast({
        position: "top-right",
        title: `${response?.message}`,
        status: "success",
        isClosable: true,
      });
      onClose(close);
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
      <Box ref={finalRef} tabIndex={-1}></Box>
      <Button
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
        mt={4}
        onClick={onOpen}
      >
        Edit
      </Button>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          reset(default_reset);
          close();
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
                    reset(default_reset);
                    onClose(close);
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

export default EditProfileDetails;
