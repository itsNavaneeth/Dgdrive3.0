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
import accountList from "../constants/accountList";

const Peers = ({ contract, account }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [peers, setPeers] = useState([]);

    const [array4, setArray4] = useState([]);


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
        console.log(peers);

        const array1 = Object.entries(accountList).map(([user, id]) => ([user, id]));
        console.log(array1);
        // const array1 = [
        //     ["user 0", "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],
        //     ["user 1", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"],
        //     ["user 2", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"],
        //     ["user 3", "0x90F79bf6EB2c4f870365E785982E1f101E93b906"],
        //     ["user 4", "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"],
        //     ["user 5", "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"],
        //     ["user 6", "0x976EA74026E726554dB657fA54763abd0C3a0aa9"],
        //     ["user 7", "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"],
        //     ["user 8", "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"],
        //     ["user 9", "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"]
        // ];

        // const array2 = [
        //     ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8', true, 'user: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 'access: true'],
        //     ['0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', false, 'user: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC', 'access: false']
        // ];

        const array3 = [];
        array1.forEach(item1 => {
            let access = false;
            peers.forEach(item2 => {
                if (item1[1] === item2[0]) {
                    access = true;
                    return;
                }
            });
            array3.push({
                user: item1[0],
                id: item1[1],
                access: access
            });
        });

        setArray4(array3)

        console.log("array3: ", array3);

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
                    array4?.map((user, index) => {
                        console.log("hiiiiii")
                        return (
                            <>
                                <CardPeer peer={user} contract={contract} account={account} />
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
