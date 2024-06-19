import React from "react";
import { SideBar } from "@components";
import { Outlet } from "react-router-dom";
import { Header } from "@components";
import { Box } from "@chakra-ui/react";
import { NavbarProvider } from "../../context/NavbarContext";
export const Layout = () => {
  return (
    <NavbarProvider>
      <Header />
      <SideBar />
      <Box
        marginLeft={{ base: "auto", md: "80px" }}
        marginRight={{ base: "auto" }}
        padding={["5px", "10px"]}
        h="calc(100vh - 70px)"
        w={{ base: "90vw", md: "calc(100vw - 90px)" }}
      >
        <Outlet />
      </Box>
    </NavbarProvider>
  );
};
