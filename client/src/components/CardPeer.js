import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';

import { MdCancel, MdCheckCircle } from 'react-icons/md';

export default function CardPeer({ peer, contract, account }) {

    const handleAllow = async () => {
        await contract.allow(peer.id);
    };

    const handleRemove = async () => {
        // Handle form submission logic here
        await contract.disallow(peer.id);
    };



    // console.log(peer)
    return (
        <Center py={6}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                mx={2}
            >

                <Box p={6}>
                    <Stack spacing={0} align={'center'}>
                        <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
                            {peer?.user}
                            {peer?.id === account ? " (Me)" : ""}
                        </Heading>
                        <Text color={'gray.500'} fontSize={'sm'}>{peer?.id}</Text>
                    </Stack>

                    <Stack spacing={2} direction={["column", "row"]} marginTop="20px">
                        {/* has access */}
                        <Button
                            leftIcon={peer.access ? < MdCheckCircle /> : <MdCancel />}
                            size={"md"}
                            // mt={8}
                            // color="white"
                            colorScheme={peer?.id === account ? "whatsapp" : (peer.access ? "whatsapp" : "red")}
                            rounded={'md'}>
                            {
                                peer?.id === account ? "Has access" : (peer.access ? "Has access" : "No access")
                            }
                        </Button>

                        {/* remove access */}
                        <Button
                            // leftIcon={peer.access ? < MdCheckCircle /> : <MdCancel />}
                            onClick={handleRemove}
                            size={"md"}
                            variant='outline'
                            isDisabled={peer?.id === account ? true : false}
                            // mt={8}
                            // color="white"
                            colorScheme="yellow"
                            rounded={'md'}>
                            Remove
                        </Button>

                        {/* give access */}
                        <Button
                            // leftIcon={peer.access ? < MdCheckCircle /> : <MdCancel />}
                            onClick={handleAllow}
                            size={"md"}
                            variant='outline'
                            isDisabled={peer?.id === account ? true : false}
                            // mt={8}
                            // color="white"
                            colorScheme="blue"
                            rounded={'md'}>
                            Allow
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Center >
    );
}