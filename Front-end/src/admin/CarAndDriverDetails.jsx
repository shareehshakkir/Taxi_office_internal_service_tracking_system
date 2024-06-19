import React from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { Box, Input, Heading, Flex, Select, Button } from "@chakra-ui/react";
import {
  DateComponent,
  Doulbe,
  InputField,
} from "../components/InputComponents";

export const CarsAndDriversDetails = () => {
  let { id } = useParams();
  const { isLoading, error, data, isSuccess } = useData(
    "details_one",
    `api/admin/drivers/list/${id}`
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const details = data?.drivers;
  console.log(details);
  return (
    <>
      <Breadcrumb />
      <Box mt="20px" height={"100%"}>
        <Heading as="h3" size="sm">
          Details
        </Heading>
        <Flex
          gap="20px"
          maxW="1024px"
          mt="10px"
          direction={"column"}
          overflowY={"auto"}
          height={"80%"}
        >
          <Doulbe>
            <InputField
              label="Driver ID"
              width="90%"
              status={true}
              value={details?.driver_id}
            />
            <InputField
              label="Driver Name"
              width="90%"
              value={details?.driver_name}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Current Status"
              width="90%"
              value={details?.driver_status}
            />
            <InputField
              label="Contact Number"
              width="90%"
              value={details?.driver_phone}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Total Earnings"
              width="90%"
              value={details?.total_earning}
            />
            <InputField
              label="UPI ID"
              width="90%"
              value={details?.driver_upi}
            />
          </Doulbe>
          <Heading as="h4" size="sm">
            Taxi Details
          </Heading>

          <Doulbe>
            <InputField
              label="Taxi Number"
              width="90%"
              value={details?.taxi_num}
            />
            <DateComponent
              label="Test Date"
              width="90%"
              value={details?.taxi_test_date}
              status={true}
            />
          </Doulbe>
          <Doulbe>
            <DateComponent
              label="Pollution Validity"
              width="90%"
              status={true}
              value={details?.taxi_pollution_validity}
            />
            <DateComponent
              label="Insurance"
              status={true}
              width="90%"
              value={details?.taxi_insurance}
            />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Manufacturer"
              width="90%"
              value={details?.taxi_manufacturer}
            />
            <InputField label="Type" width="90%" value={details?.taxi_type} />
          </Doulbe>
          <Doulbe>
            <InputField
              label="Model"
              width={{base:"90%",md:"100%"}}
              value={details?.taxi_model}
            />
          </Doulbe>
        </Flex>
      </Box>
    </>
  );
};
