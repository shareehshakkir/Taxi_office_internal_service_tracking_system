import React from "react";
import {
  Breadcrumb as BreadCrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const admin = location.pathname.includes("admin");
  const locations = admin
    ? location.pathname.split("/").splice(2)
    : location.pathname.split("/").splice(1);

  return (
    <BreadCrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem isCurrentPage={location.pathname == "/"}>
        <BreadcrumbLink as={Link} href={admin ? "/admin" : "/"}>Home</BreadcrumbLink>
      </BreadcrumbItem>
      {locations.map((location, index) => (
        <BreadcrumbItem
          key={index}
          isCurrentPage={index === locations.length - 1}
        >
          <BreadcrumbLink color="brand.purple"
            onClick={() => {
              index === locations.length - 1
                ? ""
                : navigate(admin?`/admin/${locations[locations.length-2]}`:`/${locations[locations.length-2]}`);
            }}
            textTransform="capitalize"
          >
            {location.replaceAll("_", " ")}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadCrumb>
  );
};
