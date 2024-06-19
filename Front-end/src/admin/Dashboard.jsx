import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { CardHolder } from "@components/Card/CardHolder";
import { useAuth } from "@context/AuthContext";
import { BsCalendarDate } from "react-icons/bs";
import { AiOutlineRise } from "react-icons/ai";
import { useData } from "../hooks/useData";
import { Text, Flex, Grid, Heading } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Row = ({ heading, count, price }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="95%"
      textTransform={"capitalize"}
    >
      <Heading as="h5" size="sm" textTransform="capitalize">
        {heading.replace("_", " ")}
      </Heading>
      <Text>{price ? <>&#8377;{count}</> : count}</Text>
    </Flex>
  );
};

export const optionsearning = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 100,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Past 4 Days Earnings",
    },
  },
};

export const optionsride = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      ticks: {
        stepSize: 100,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Past 4 Days Rides",
    },
  },
};

export const AdminDashboard = () => {
  const { isLoading, error, data, isSuccess } = useData(
    "admin_dashboard",
    `api/admindashboard`
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

  if (isSuccess) {
    let driver = Object.values(data?.drivers);
    const cardData = [
      {
        icon: BsCalendarDate,
        title: "Max Rides",
        number: ` ${data?.max_rides_day}`,
      },

      {
        icon: AiOutlineRise,
        title: "Most Rides",
        number: `${data?.max_rides_driver.driver_name}`,
      },
    ];
    const earnings = {
      labels: Object.keys(data?.daily_totals).map((item, index) => item),
      datasets: [
        {
          label: "Earings",
          data: Object.values(data?.daily_totals).map(
            (item, index) => item?.total_earnings
          ),
          backgroundColor: ["#D2FF28", "#C84C09", "#5C80BC", "#FF8811"],
        },
      ],
    };
    const rides = {
      labels: Object.keys(data?.daily_totals).map((item, index) => item),
      datasets: [
        {
          label: "Rides",
          data: Object.values(data?.daily_totals).map(
            (item, index) => item.total_rides
          ),
          backgroundColor: ["#5C80BC", "#D2FF28", "#C84C09", "#FF8811"],
        },
      ],
    };
    return (
      <>
        <Breadcrumb />
        <Grid
          w={{ md: "auto", lg: "90vw" }}
          overflowY={"scroll"}
          height={"calc(100vh - 180px)"}
          gridTemplateAreas={{
            base: `"card card"
          "details details"
          "history history"`,
            lg: `"card card"
          "details details"
          "history history"`,
            xl: `"card history"
          "details history"`,
          }}
          justifyItems={"center"}
          alignItems={"center"}
          paddingBottom={2}
        >
          <CardHolder cardData={cardData} />
          <Flex
            w={{ base: "90%", md: "80%", lg: "85%", xl: "95%", "2xl": "79%" }}
            marginLeft={{ base: 0, "2xl": "30px" }}
            alignItems="center"
            justifyContent="center"
            flexDir="column"
            gap="15px"
            bg="white"
            borderRadius="7px"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            padding={4}
            gridArea={"history"}
          >
            <Line options={optionsearning} data={earnings} />
            <Line options={optionsride} data={rides} />
          </Flex>
          <Flex
            gridArea={"details"}
            w={{ base: "75vw", md: "600px" }}
            h={{ base: "300px", lg: "auto" }}
            my={{ base: "30px", xl: "auto" }}
          >
            <Flex w="100%" direction={{ base: "column", md: "row" }}>
              <Flex
                bg="white"
                mt="5px"
                justifyContent="center"
                alignItems="center"
                borderRadius="md"
                flexDir="column"
                gap="20px"
                py={{ base: "30px", xl: "auto" }}
                w="100%"
              >
                <Heading
                  as="h3"
                  fontSize={["25px"]}
                  fontWeight="light"
                  color="brand.purple"
                >
                  Maximum Rides Driver
                </Heading>
                <Flex direction="column" gap="24px" w="90%" alignItems="center">
                  <Row
                    heading="Driver Name"
                    count={data?.max_rides_driver.driver_name}
                  />

                  <Row
                    heading="Total Rides"
                    count={data?.max_rides_driver.total_rides}
                  />
                  <Row
                    heading="Total Earnings"
                    count={data?.max_rides_driver.total_earnings}
                    price={true}
                  />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Grid>
      </>
    );
  }
};
