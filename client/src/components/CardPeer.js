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

export default function CardPeer({ peer }) {
    // console.log(peer)
    return (
        <Center py={6}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                mx={4}
            >

                <Box p={6}>
                    <Stack spacing={0} align={'center'}>
                        <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
                            {peer?.user}
                        </Heading>
                        <Text color={'gray.500'}>Account Number</Text>
                    </Stack>

                    <Center>
                        <Button
                            leftIcon={peer.access ? < MdCheckCircle /> : <MdCancel />}
                            size={"md"}
                            mt={8}
                            // color="white"
                            colorScheme={peer.access ? "whatsapp" : "red"}
                            rounded={'md'}>
                            {
                                peer.access ? "Has access" : "No access"
                            }
                        </Button>
                    </Center>
                </Box>
            </Box>
        </Center >
    );
}