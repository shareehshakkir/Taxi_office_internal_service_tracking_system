import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@context/AuthContext";
import { useData } from "@hooks/useData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Row = ({ heading, count, price }) => {
  return (
    <Flex justifyContent="space-between" alignItems="center" w="95%">
      <Heading as="h5" size="sm" textTransform="capitalize">
        {heading.replace("_", " ")}
      </Heading>
      <Text>{price ? <>&#8377;{count}</> : count}</Text>
    </Flex>
  );
};

export const Earnings = () => {
  const { user } = useAuth();
  const id = user?.driver_id;

  const { isLoading, error, data } = useData("earnings", `api/earnings`);
  if (isLoading) {
    return (
      <>
        <Breadcrumb />
        <Text mt={6}>Loading</Text>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Breadcrumb />
        <Text mt={6}>No Data Available</Text>
      </>
    );
  }
  const { driver_id, driver_name, total_rides, total_earnings, ...details } =
    data;

  const chartData = {
    labels: Object.keys(details).map((item, key) =>
      item.replace("_", " ").toUpperCase()
    ),
    datasets: [
      {
        label: "Rs",
        data: Object.values(details),
        backgroundColor: ["#FFCB14", "#19E32D"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Breadcrumb />
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex
          bg="white"
          w="320px"
          h="300px"
          mt="5px"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          flexDir="column"
          gap="20px"
          p="15px"
        >
          <Heading
            as="h3"
            fontSize={["25px"]}
            fontWeight="light"
            color="brand.purple"
          >
            Earnings
          </Heading>
          <Flex direction="column" gap="24px" w="90%" alignItems="center">
            <Row heading="Total Rides" count={total_rides} />
            <Row heading="Total Earnings" count={total_earnings} price={true} />

            {Object.entries(details).map(([heading, count]) => (
              <Row heading={heading} count={[count]} price={true} />
            ))}
          </Flex>
        </Flex>
        <Flex w={300} h={500} marginLeft={{ base: "0", md: "30px" }}>
          <Pie data={chartData} />
        </Flex>
      </Flex>
    </>
  );
};
