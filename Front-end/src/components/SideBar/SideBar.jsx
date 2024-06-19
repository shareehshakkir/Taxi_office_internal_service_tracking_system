import { Box, Flex, Button, useBoolean, Spacer } from "@chakra-ui/react";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon, Icon } from "@chakra-ui/icons";
import { NavItem } from "@components";

import { BsFillGridFill, BsCurrencyDollar } from "react-icons/bs";
import { RiUserReceived2Fill } from "react-icons/ri";
import { AiFillCar } from "react-icons/ai";
import { GrCompliance } from "react-icons/gr";
import { MdModeOfTravel } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { useNavContext } from "@context/NavbarContext";

export const SideBar = () => {
  const { toggle } = useNavContext();
  //true ==> big
  const [size, setSize] = useBoolean(window.innerWidth > "768" ? false : true);
  const path = useLocation();
  const admin = path.pathname.includes("admin");
  return (
    <Flex
      as="aside"
      zIndex={10}
      pos="absolute"
      direction="column"
      w={{ base: 200, md: size ? 200 : "70px" }}
      h="calc(100vh - 60px)"
      transition="0.2s ease"
      borderRight="1px solid var(--display-400)"
      top={{ md: "60px" }}
      backgroundColor="#F5F5F5"
      left={{ base: toggle ? "0%" : "-200px", md: "0%" }}
    >
      <Box pos="relative" top="20px">
        <NavItem
          icon={<Icon as={BsFillGridFill} />}
          title="Home"
          size={size}
          link={admin ? "/admin/" : "/"}
          handler={size ? setSize.toggle : ""}
        />

        <NavItem
          icon={<Icon as={RiUserReceived2Fill} />}
          title="Received Rides"
          size={size}
          link="received_rides"
          handler={size ? setSize.toggle : ""}
        />

        {admin ? (
          <NavItem
            icon={<Icon as={AiFillCar} />}
            title="Cars and Drivers "
            size={size}
            link="cars_and_drivers"
            handler={size ? setSize.toggle : ""}
          />
        ) : (
          <></>
        )}

        <NavItem
          icon={<Icon as={MdModeOfTravel} />}
          title="Ongoing Rides"
          size={size}
          link="ongoing_rides"
          handler={size ? setSize.toggle : ""}
        />
        <NavItem
          icon={<Icon as={GrCompliance} />}
          title="Completed Rides"
          size={size}
          link="completed_rides"
          handler={size ? setSize.toggle : ""}
        />
        <NavItem
          icon={<Icon as={ImBlocked} />}
          title="Canceled Rides"
          size={size}
          link="canceled_rides"
          handler={size ? setSize.toggle : ""}
        />
        <NavItem
          icon={<Icon as={BsCurrencyDollar} />}
          title="Earnings"
          size={size}
          link="earnings"
          handler={size ? setSize.toggle : ""}
        />
      </Box>
      <Spacer />
      <Box
        p="10px"
        pos="relative"
        bottom="0"
        transition={"0.2s ease"}
        display={{ base: "none", md: "flex" }}
      >
        <Button
          onClick={setSize.toggle}
          w="100%"
          position="relative"
          bottom="10px"
          bg="brand.purple"
          _hover={{ bg: "purple.700" }}
          color="white"
        >
          {size ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Button>
      </Box>
    </Flex>
  );
};
