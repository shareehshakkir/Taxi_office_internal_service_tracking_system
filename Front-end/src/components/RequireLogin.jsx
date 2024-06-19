import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

export const RequireLogin = ({ children, role }) => {
  const auth = useAuth();
  const path = useLocation();
  const toast = useToast();
  const admin = path.pathname.includes("admin");
  if (auth?.user) {
    if (auth?.user.admin != true && role == "admin") {
      toast({
        position: "top-center",
        title: `Invalid Login Account`,
        status: "error",
        isClosable: true,
      });
      auth.logout();
      return <Navigate to="/admin/login" replace={true} />;
    }
    if (auth?.user.admin != false && role == "driver") {
      toast({
        position: "top-center",
        title: `Invalid Login Account`,
        status: "error",
        isClosable: true,
      });
      auth.logout();
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  }
  if (!auth.user) {
    return <Navigate to={admin ? "/admin/login" : "/login"} replace={true} />;
  }
  return children;
};
