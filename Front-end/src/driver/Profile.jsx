import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { Table } from "@components/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "@hooks/useData";
import { Box, Flex, Button, Text, Input } from "@chakra-ui/react";
import { InputField, SelectField } from "@components/InputComponents";
import { Avatar } from "@chakra-ui/react";
import { Doulbe } from "@components/InputComponents";
import { DateComponent } from "../components/InputComponents";
import { useAuth } from "../context/AuthContext";
import EditProfileDetails from "./EditProfileDetails";
import UpdatePassword from "./UpdatePassword";

export const Profile = () => {
  const { user } = useAuth();
  const {
    isLoading: profileLoading,
    error: profileErr,
    data: profile,
  } = useData("personal_data", `api/driver/${user?.driver_id}/me `);

  const { isLoading, error, data } = useData("taxi", `api/viewtaxi `);

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box w="100%">
      <Breadcrumb />
      <Box
        w="100%"
        h="86vh"
        display="flex"
        justifyContent="center"
        py={3}
        overflowY="auto"
      >
        <Flex
          gap="20px"
          w="min(992px,100%)"
          mt="10px"
          direction={"column"}
          alignItems="center"
          pr={"10px"}
        >
          <Avatar
            size="2xl"
            // name={data?.name}
            src="https://bit.ly/broken-link"
          />
          <Doulbe>
            <InputField
              label="ID"
              width="90%"
              status={true}
              value={user?.driver_id}
            />
            <InputField
              label="Name"
              width="90%"
              status={true}
              value={profile?.driver_name}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Email"
              width="90%"
              status={true}
              value={profile?.driver_email}
            />
            <DateComponent
              label="Date Of Birth"
              width="90%"
              value={profile?.driver_dob}
              status={true}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="UPI ID"
              width="90%"
              value={profile?.driver_upi}
              status={true}
            />
            <InputField
              label="Phone"
              width="90%"
              value={profile?.driver_phone}
              status={true}
            />
          </Doulbe>
          <EditProfileDetails defaultDetails={profile} />
          {/* Taxi Details */}
          <Text fontWeight="900">Taxi Details</Text>
          <Doulbe>
            <InputField
              label="Taxi Number"
              width="90%"
              value={data?.taxi_num}
            />
            <DateComponent
              label="Test Date"
              width="90%"
              value={data?.taxi_test_date}
            />
          </Doulbe>
          <Doulbe>
            <DateComponent
              label="Pollution Validity"
              width="90%"
              value={data?.taxi_pollution_validity}
            />
            <DateComponent
              label="Insurance"
              width="90%"
              value={data?.taxi_insurance}
            />
          </Doulbe>
          <Doulbe>
            <SelectField
              label="Taxi Manufacturer"
              width="90%"
              manufacturer={true}
              value={data?.taxi_manufacturer}
            />
            <SelectField
              label="Taxi Type"
              width="90%"
              value={data?.taxi_type}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Taxi model"
              width="100%"
              value={data?.taxi_model}
            />
          </Doulbe>
          {/*
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
          >
            Update
          </Button>
           */}
          {/* Password Details */}'<Text fontWeight="900">Password</Text>
          <Flex alignItems="center">
            <Text fontWeight="900">Update your password if required</Text>
            <UpdatePassword />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
