import React from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Table } from "@components/Table";
import { useNavigate } from "react-router-dom";
import { useDelete, useUpdateStatus, useData } from "../hooks/useData";
import { TableHolder } from "../components/TableHolder/TableHolder";

import { Modal } from "../components/Modals/Modal";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import { BiToggleLeft, BiToggleRight } from "react-icons/bi";
import { useToast, Text } from "@chakra-ui/react";

const ViewButton = ({ row }) => {
  const navigate = useNavigate();

  const id = row.values.driver_id;
  return (
    <Text
      color="brand.purple"
      cursor="pointer"
      onClick={() => navigate(`/admin/cars_and_drivers/${id}`)}
    >
      View
    </Text>
  );
};

const Disable_Enable = ({ row }) => {
  const toast = useToast();
  const id = row.values.driver_id;
  const availability = row.values.availability;
  const status = row.values.driver_status;
  const { mutateAsync } = useUpdateStatus();

  return (
    <>
      <Modal
        title="Accept"
        color="#EA0000"
        hColor="#FB4C4C"
        handler={async () => {
          const data = { action: status == "available" ? "disable" : "enable" };
          let endpoint = `api/admin/drivers/${id}/delete-or-disable/`;
          const response = await mutateAsync({ id, data, endpoint });
          if (response?.err) {
            toast({
              position: "top-right",
              title: `${response.err.message}`,
              status: "error",
              isClosable: true,
            });
          } else {
            toast({
              position: "top-right",
              title: `${response.message}`,
              status: "success",
              isClosable: true,
            });
          }
        }}
      >
        {status == "unavailable" ? (
          <BiToggleLeft size={25} />
        ) : (
          <BiToggleRight color="brand.green" size={25} />
        )}
      </Modal>
    </>
  );
};

const DeleteUser = ({ row }) => {
  const toast = useToast();
  const id = row.values.driver_id;
  const availability = row.values.driver_status;
  const { onClose } = useDisclosure();
  const { mutateAsync } = useUpdateStatus();

  return (
    <>
      <Modal
        title="Confirm Rejection"
        color="#6E2594"
        hColor="#8344a5"
        let
        endpoint=""
        handler={async () => {
          const data = { action: "delete" };
          let endpoint = `api/admin/drivers/${id}/delete-or-disable/`;
          try {
            const response = await mutateAsync({ id, data, endpoint });
            toast({
              position: "top-right",
              title: `${response}`,
              status: "success",
              isClosable: true,
            });
          } catch (e) {
            toast({
              position: "top-right",
              title: `Error Occured`,
              status: "error",
              isClosable: true,
            });
          }
        }}
        disable={availability == "available" ? true : false}
      >
        <DeleteIcon color="brand.red" />
      </Modal>
    </>
  );
};
const COLUMNS = [
  {
    Header: "Driver ID",
    accessor: "driver_id",
  },
  {
    Header: "Driver Name",
    accessor: "driver_name",
  },
  {
    Header: "Taxi Number",
    accessor: "taxi_num",
  },
  {
    Header: "Total Rides",
    accessor: "total_rides",
  },
  {
    Header: "Current Status",
    accessor: "driver_status",
  },
  {
    Header: "Disable/Enable",
    accessor: "status",
    Cell: Disable_Enable,
  },
  {
    Header: "Delete",
    accessor: "delete",
    Cell: DeleteUser,
  },
  {
    Header: "Earnings",
    accessor: (data) => <>&#8377; {data?.total_earning}</>,
  },
  {
    Header: "View",
    accessor: "view",
    Cell: ViewButton,
  },
];

export const CarsAndDrivers = () => {
  const { isLoading, error, data, isSuccess } = useData(
    "driver_Details",
    "api/admin/drivers/list/",
    { refetchInterval: 1000 }
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <div>
      <Breadcrumb />
      <TableHolder>
        <Table columns={COLUMNS} data={data?.drivers} />
      </TableHolder>
    </div>
  );
};
