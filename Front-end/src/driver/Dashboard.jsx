import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { CardHolder } from "@components/Card/CardHolder";
import { useAuth } from "@context/AuthContext";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiUserReceived2Fill } from "react-icons/ri";
import { useData } from "../hooks/useData";
import { Text, Flex, Grid, Image } from "@chakra-ui/react";
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
import Map from "../components/Map";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

export const Dashboard = () => {
  const { isLoading, error, data, isSuccess } = useData(
    "dashboard",
    `api/dashboard`
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
    const cardData = [
      {
        icon: BsCurrencyDollar,
        title: "Earnings",
        number: `&#8377; ${data?.total_earnings}`,
      },

      {
        icon: RiUserReceived2Fill,
        title: "Received_Rides",
        number: `${data?.total_rides}`,
      },
    ];
    const earnings = {
      labels: Object.values(data?.daily_totals).map(
        (item, index) => item?.date
      ),
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
      labels: Object.values(data?.daily_totals).map((item, index) => item.date),
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
          "map map"
          "history history"`,
            lg: `"card card"
          "map map"
          "history history"`,
            xl: `"card history"
          "map history"`,
          }}
          justifyItems={"center"}
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
            gridArea={"map"}
            w={{ base: "90%", md: "80%", lg: "85%", xl: 600 }}
            h={{ base: "40vh", lg: "auto" }}
            my={{ base: "30px", xl: "auto" }}
            pos="relative"
          >
            <Map height="40vh" />
          </Flex>
        </Grid>
      </>
    );
  }
};
