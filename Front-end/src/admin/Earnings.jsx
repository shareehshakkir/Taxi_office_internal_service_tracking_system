import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "@context/AuthContext";
import { useData } from "@hooks/useData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { TableHolder } from "../components/TableHolder/TableHolder";
import { Table } from "@components/Table";

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

export const AdminEarnings = () => {
  const { user } = useAuth();
  const id = user?.driver_id;

  const { isLoading, error, data } = useData(
    "all_earnings",
    `api/earningsadmin`
  );
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
  console.log(data);

  const COLUMNS = [
    {
      Header: "Ride ID",
      accessor: "driver_id",
    },
    {
      Header: "Driver Name",
      accessor: "driver_name",
    },
    {
      Header: "Total Rides",
      accessor: (data) => <>{data.total_rides}</>,
    },
    {
      Header: "Total Earnings",
      accessor: (data) => <>&#8377; {data.total_earnings}</>,
    },
    {
      Header: "Total Paid",
      accessor: (data) => <>&#8377; {data.total_paid}</>,
    },
    {
      Header: "Total Pending",
      accessor: (data) => <>&#8377; {data.total_pending}</>,
    },
  ];
  let total_rides = 0;
  let total_earnings = 0;
  let total_paid = 0;
  let total_pending = 0;

  data.map((item) => {
    total_earnings += item.total_earnings;
  });
  data.map((item) => {
    total_rides += item.total_rides;
  });
  data.map((item) => {
    total_paid += item.total_paid;
  });
  data.map((item) => {
    total_pending += item.total_pending;
  });

  const chartData = {
    labels: ["total_pending", "total paid"],
    datasets: [
      {
        label: "Rs",
        data: [total_pending, total_paid],
        backgroundColor: ["#FFCB14", "#19E32D"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Breadcrumb />
      <Flex direction={{ base: "column", "2xl": "row" }} overflow="auto">
        <TableHolder>
          <Table columns={COLUMNS} data={data} />
        </TableHolder>
        <Flex flexDir={{base:"column",md:"row"}} justifyContent="space-evenly" alignItems="center" h={{base:"700",md:"500px","2xl":"fit-content"}}>
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
            order={{ base: 0 }}
            marginLeft={{ base: "0", md: "30px" }}
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
              <Row
                heading="Total Earnings"
                count={total_earnings}
                price={true}
              />
              <Row heading="Total Paid" count={total_paid} price={true} />
              <Row heading="Total Pending" count={total_pending} price={true} />
            </Flex>
          </Flex>
          <Flex w={300} marginLeft={{ base: "0", md: "30px" }}>
            <Pie data={chartData} />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
