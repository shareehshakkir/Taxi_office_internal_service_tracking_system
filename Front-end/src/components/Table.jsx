import React from "react";
import { useTable } from "react-table";
import { Table as TableC, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Table = ({ columns, data, width }) => {
  const tableInstance = useTable({
    columns,
    data,
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  const navigate = useNavigate();

  return (
    <>
      <TableC
        display={{ base: "none", md: "inline-table" }}
        {...getTableProps()}
        sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
        w={width}
        pr="10px"
        pb="10px"
      >
        <Thead pos="sticky" top="0px">
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <Tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...columnProps } = column.getHeaderProps();
                  return (
                    <Th
                      key={key}
                      {...columnProps}
                      bg="brand.purple"
                      color="white"
                      h="50px"
                    >
                      {column.render("Header")}
                    </Th>
                  );
                })}
              </Tr>
            );
          })}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <Td key={key} {...restCellProps}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </TableC>

      <Flex
        display={{ base: "flex", md: "none" }}
        flexDir="column"
        {...getTableProps()}
        sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
        w="100%"
        pb="10px"
      >
        <Flex display="flex" flexDir="column" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <Card flexDir="column" margin="10px" key={key} {...restRowProps}>
                <CardBody>
                  {row.cells.map((cell) => {
                    const { key, ...restCellProps } = cell.getCellProps();
                    return (
                      <>
                        <Flex
                          p="5px 0"
                          alignItems="center"
                          key={key}
                          justifyContent="space-between"
                          {...restCellProps}
                        >
                          <Text>{cell.column.Header}</Text>
                          <Text>{cell.render("Cell")}</Text>
                        </Flex>
                      </>
                    );
                  })}
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </>
  );
};
