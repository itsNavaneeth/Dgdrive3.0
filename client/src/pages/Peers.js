import { useState, useEffect } from "react";
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
    Tooltip,
    Stack,
    Flex,
    SimpleGrid
} from "@chakra-ui/react";
import CardPeer from "../components/CardPeer";

const Peers = ({ contract, account }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [peers, setPeers] = useState([]);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };

    const handleShare = async () => {
        await contract.allow(address);
        setIsOpen(false);
    };

    const showPeers = async () => {
        let dataArray2;
        dataArray2 = await contract.displayPeers(account);
        setPeers(dataArray2);
        // console.log(peers)
    };

    const handleRemove = async () => {
        // Handle form submission logic here
        await contract.disallow(address);
        setIsOpen(false);
    };

    useEffect(() => {
        showPeers();
    }, [])

    return (
        <Box p={4}>
            <Tooltip label="Click to Share your drive">
                <Button
                    onClick={handleOpenModal}
                    colorScheme="purple"
                >
                    Share Files
                </Button>
            </Tooltip>

            <Button
                mx="4"
                onClick={showPeers}
                colorScheme="yellow"
            >
                Peers
            </Button>
            <SimpleGrid
                columns={{ base: 1, xl: 2 }}
                spacing={'10'}
                mx={'auto'}>
                {
                    peers?.map((peer, index) => {
                        return (
                            <>

                                <CardPeer peer={peer} />
                            </>
                        )
                    })
                }
            </SimpleGrid>

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
                                {/* <Input
                                    placeholder="Enter account name"
                                    value={name}
                                    onChange={handleNameChange}
                                /> */}
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
        </Box >
    );
};

export default Peers;
