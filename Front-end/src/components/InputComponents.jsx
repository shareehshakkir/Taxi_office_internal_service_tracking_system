import { Box, Input, Heading, Flex, Select, Button } from "@chakra-ui/react";
import { useState } from "react";

export const InputField = ({
  label,
  width,
  value,
  status,
  select,
  onChange,
}) => {
  return (
    <>
      <Box w={width ? width : "400px"}>
        {label && <label htmlFor="">{label}</label>}
        {select ? (
          <Select
            id=""
            name=""
            mt="5px"
            size="md"
            textTransform={"capitalize"}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            isDisabled={status}
          >
            <option defaultValue="none" selected disabled hidden>
              {value}
            </option>
            <option value="waiting">Waiting</option>
            <option value="in-progress">In-Progress</option>
            <option value="arrived">Arrived</option>
            <option value="delayed by driver">Delayed By Driver</option>
            <option value="taxi malfunction">Taxi Malfunction</option>
            <option value="delayed by user">Delayed By User</option>
          </Select>
        ) : (
          <Input id="" name="" mt="5px" isDisabled={status} value={value} />
        )}
      </Box>
    </>
  );
};

export const Doulbe = ({ children }) => {
  return (
    <Flex
      w="100%"
      gap={{ base: "25px", md: "40px" }}
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
    >
      {children}
    </Flex>
  );
};

export const DateComponent = ({ label, width, value, status, select }) => {
  const [date, setDate] = useState(value);
  return (
    <>
      <Box w={width ? width : "400px"}>
        {label && <label htmlFor="">{label}</label>}
        <Input
          id=""
          name=""
          mt="5px"
          placeholder="Select Date and Time"
          size="md"
          type="date"
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
          isDisabled={status}
        />
      </Box>
    </>
  );
};

export const SelectField = ({
  label,
  width,
  value,
  status,
  manufacturer,
  onChange,
}) => {
  return (
    <>
      <Box w={width ? width : "400px"}>
        {label && <label htmlFor="">{label}</label>}
        <Select
          id=""
          name=""
          mt="5px"
          size="md"
          textTransform={"capitalize"}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          isDisabled={status}
        >
          <option defaultValue="none" selected disabled hidden>
            {value}
          </option>
          {manufacturer ? (
            <>
              <option value="Suzuki">Suzuki</option>
              <option value="Hyundai">Hyundai</option>
              <option value="Tata">Tata</option>
              <option value="Mahindra">Mahindra</option>
              <option value="Kia">Kia</option>
              <option value="Toyota">Toyota</option>
              <option value="Honda">Honda</option>
              <option value="Renault">Renault</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="MG Motors">MG Motors</option>
            </>
          ) : (
            <>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="MUV">MUV</option>
              <option value="Hatchback">Hatchback</option>
            </>
          )}
        </Select>
      </Box>
    </>
  );
};
