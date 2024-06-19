import React from "react";
import {
  useDisclosure,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { BsArrowUpRight } from "react-icons/bs";
import { MapWrapper } from "./Map";

const MapFullScreen = ({ addressPoints }) => {
  const finalRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box ref={finalRef} tabIndex={0}></Box>
      <Text
        colorScheme="teal"
        type="submit"
        _hover={{ opacity: "0.9" }}
        bg="white"
        cursor="pointer"
        color="brand.red"
        alignSelf="end"
        marginRight={{ base: "22px", md: "0" }}
        onClick={onOpen}
        zIndex={100}
        pos="absolute"
        right="10px"
        top="10px"
        padding="7px"
        boxShadow="0 0 5px black"
      >
        <BsArrowUpRight fill="black" />
      </Text>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="full"
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="sm">
          <ModalHeader>Maximum Retention</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <MapWrapper height="90vh" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MapFullScreen;
