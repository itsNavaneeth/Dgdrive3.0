import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

const MyModalComponent = ({contract}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

    const handleShare = async () => {
        await contract.allow(address);
        setIsOpen(false);
    };

    const handleRemove = async () => {
        // Handle form submission logic here
        await contract.disallow(address);
            setIsOpen(false);
        };

  return (
    <Box p={4}>
        <Button 
            onClick={handleOpenModal}
            colorScheme="purple"
        >
            Share Files
        </Button>

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage File Access</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Account Address</FormLabel>
                <Input
                  placeholder="Enter account address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button colorScheme="red" mr={3} onClick={handleRemove}>
              Remove
            </Button>
            <Button colorScheme="green" onClick={handleShare}>
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyModalComponent;
