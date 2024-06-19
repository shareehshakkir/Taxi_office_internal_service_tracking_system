import React, { useState } from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { useParams } from "react-router-dom";
import { useData, useUpdateStatus } from "../hooks/useData";
import { Box, Input, Heading, Flex, Select, Button } from "@chakra-ui/react";
import { InputField } from "@components/InputComponents";
import { useToast } from "@chakra-ui/react";

export const AdminViewRideRequests = () => {
  let { id } = useParams();

  const { isLoading, error, data } = useData("ride data", `api/rides/${id}`);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  const getDate = (rec_date) => {
    const date = new Date(rec_date);
    let time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    if (rec_date != null) {
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${time}`;
    } else {
      return "-";
    }
  };
  const start_time = getDate(data?.starting_time);
  const reach_time = getDate(data?.reachedtime);

  return (
    <>
      <Breadcrumb />
      <Box mt="20px" height={"100%"}>
        <Heading as="h3" size="md">
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
          <Flex
            w="100%"
            gap="40px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputField label="ID" width="90%" status={true} value={id} />
            <InputField
              label="Passenger"
              width="90%"
              status={true}
              value={data?.passenger_name}
            />
          </Flex>
          <Flex
            w="100%"
            gap="40px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputField
              label="From"
              width="90%"
              status={true}
              value={data?.start_from}
            />
            <InputField
              label="To"
              width="90%"
              status={true}
              value={data?.destination}
            />
          </Flex>
          {data?.start_from && (
            <Flex
              w="100%"
              gap="40px"
              flexDirection={{ base: "column", md: "row" }}
            >
              <InputField
                label="Start Time"
                width="90%"
                status={true}
                value={start_time}
              />
              <InputField
                label="Expected Time"
                width="90%"
                status={true}
                value={reach_time}
              />
            </Flex>
          )}
          <Flex
            w="100%"
            gap="40px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputField
              label="Status"
              width="90%"
              status={true}
              value={data?.status}
              select={true}
            />
            <InputField
              label="Interested in car pooled rides"
              width="90%"
              status={true}
              value={data?.carpool == false ? "No" : "Yes"}
            />
          </Flex>
          <Flex
            w="100%"
            gap="40px"
            flexDirection={{ base: "column", md: "row" }}
          >
            <InputField
              label="Expected Driver Pay"
              width="90%"
              status={true}
              value={data?.expectedDriverPay}
            />
            <InputField
              label="Percentage of car pooled ride"
              width="90%"
              status={true}
              value={`${data?.carpoolPercent} %`}
            />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
