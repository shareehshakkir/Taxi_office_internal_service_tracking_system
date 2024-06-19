import React from "react";
import { Breadcrumb } from "@components/Breadcrumb";
import { Table } from "@components/Table";
import { useAcceptRide, useData } from "@hooks/useData";
import { Modal } from "@components/Modals/Modal";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import { TableHolder } from "@components/TableHolder/TableHolder";



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
    Header: "To",
    accessor: "destination",
  },

  {
    Header: "Status",
    accessor: "status",
  },
];

export const AdminCanceled = () => {
  const { isLoading, error, data } = useData(
    "all_canceled_req",
    "api/allcancelledrides"
  );

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Breadcrumb />
      <TableHolder>
        <Table columns={COLUMNS} data={data} width="60vw"/>
      </TableHolder>
    </div>
  );
};
