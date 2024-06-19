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
      onClick={() => navigate(`/received_rides/${id}`)}
    >
      View
    </Text>
  );
};

const Accept_Reject = ({ row }) => {
  const id = row.values.rideId;
  const status = row.values.status;
  const { mutate } = useAcceptRide();

  return status != "requested" ? (
    "-"
  ) : (
    <>
      <Modal
        title="Accept"
        color="#EA0000"
        hColor="#FB4C4C"
        handler={() => {
          const data = { status: "canceled" };
          let endpoint = `api/rides/${id}/update-status/`;
          mutate({ id, data, endpoint });
        }}
      >
        <CloseIcon color="brand.red" />
      </Modal>
      <Modal
        title="Accept"
        color="#6E2594"
        hColor="#8344a5"
        handler={() => {
          const data = { status: "accepted" };
          let endpoint = `api/rides/${id}/update-status/`;
          mutate({ id, data, endpoint });
        }}
      >
        <CheckIcon color="brand.green" />
      </Modal>
    </>
  );
};

const COLUMNS = [
  {
    Header: "Ride ID",
    accessor: "rideId",
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
    Header: "Accept/Reject",
    accessor: "accet_or_reject",
    Cell: Accept_Reject,
  },
  {
    Header: "View",
    accessor: "view",
    Cell: ViewButton,
  },
];

export const RideRequests = () => {
  const { isLoading, error, data } = useData("req_rides", "api/received", {
    refetchInterval: 1000,
  });
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
