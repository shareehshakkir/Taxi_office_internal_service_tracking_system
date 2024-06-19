import React from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Table } from "@components/Table";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAcceptRide, useData } from "../hooks/useData";
import { Modal } from "../components/Modals/Modal";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { TableHolder } from "../components/TableHolder/TableHolder";
import { Text } from "@chakra-ui/react";

const ViewButton = ({ row }) => {
  const navigate = useNavigate();

  const id = row.values.rideId;
  return (
    <Text
      color="brand.purple"
      cursor="pointer"
      onClick={() => navigate(`/admin/received_rides/${id}`)}
    >
      View
    </Text>
  );
};

const COLUMNS = [
  {
    Header: "Ride ID",
    accessor: "rideId",
  },
  {
    Header: "Driver Name",
    accessor: "driver_name",
  },
  {
    Header: "Passenger",
    accessor: "passenger_name",
  },
  {
    Header: "From",
    accessor: "start_from",
  },
  {
    Header: "Destination",
    accessor: "destination",
  },
  {
    Header: "Start Time",
    accessor: (data) => {
      const date = new Date(data.starting_time);
      let time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      if (data.starting_time != null) {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${time}`;
      } else {
        return "-";
      }
    },
  },
  {
    Header: "Chance Pooled Rides",
    accessor: (data) => `${data.carpoolPercent} %`,
  },
  {
    Header: "Expected Amount",
    accessor: (data) => <>&#8377; {data.expectedDriverPay}</>,
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "View",
    accessor: "view",
    Cell: ViewButton,
  },
];

export const AdminRideRequests = () => {
  const { isLoading, error, data } = useData(
    "all_req_rides",
    "api/allreceived",
    {
      refetchInterval: 1000,
    }
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Breadcrumb />
      <TableHolder>
        <Table columns={COLUMNS} data={data} />
      </TableHolder>
    </div>
  );
};
