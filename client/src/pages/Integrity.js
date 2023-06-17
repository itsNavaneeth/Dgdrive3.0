import React, { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { create } from 'ipfs-http-client'
import axios from 'axios'
import {
    Button,
    AspectRatio,
    Box,
    BoxProps,
    Container,
    forwardRef,
    Heading,
    Input,
    Stack,
    Text,
    Center,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Link,
    Spinner,
    useToast,
    Grid,
    GridItem,
} from '@chakra-ui/react'

import { SmallAddIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from "framer-motion";


function Integrity({ contract, account, provider }) {
    const client = create({ url: "http://143.110.246.230:5001/api/v0" });
    const toast = useToast()

    const controls = useAnimation();
    const startAnimation = () => controls.start("hover");
    const stopAnimation = () => controls.stop();
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);

    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [files1, setFiles1] = useState([]);
    const [files2, setFiles2] = useState([]);
    const [error, setError] = useState(null);
    const [fileName1, setFileName1] = useState("No file selected");
    const [fileName2, setFileName2] = useState("No file selected");
    const [file1CID, setFile1CID] = useState("");
    const [file2CID, setFile2CID] = useState("");

    const handleIntegrity = () => {
        if (file1CID === "" || file2CID === "") {
            toast({
                position: 'bottom',
                title: 'Please upload both files and check.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        else if (file1CID === file2CID) {
            toast({
                position: 'bottom',
                title: 'File Integrity is maintained.',
                description: 'File 1 and File 2 hashes are verified.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } else {
            toast({
                position: 'bottom',
                title: 'File has been tampered with!!',
                description: 'File 1 and File 2 hashes do not match.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleFileUpload1 = (event) => {
        setFile1(event.target.files[0]);
        setFileName1(event.target.files[0].name);
    };

    const handleFileUpload2 = (event) => {
        setFile2(event.target.files[0]);
        setFileName2(event.target.files[0].name);
    };

    const handleUpload1 = async () => {
        setIsLoading1(true);

        const formData = new FormData();
        formData.append('file', file1);
        console.log('Upload', file1)

        try {
            const response = await axios.post('http://143.110.246.230:5001/api/v0/add', formData);
            console.log('File uploaded successfully:', response.data);
            // setFiles([...files, fileMetadata]);
            setError(null);
            setIsLoading1(false);
            const name = response.data.Name;
            const cid = response.data.Hash;
            const size = response.data.Size;
            const fileMetadata = { name, cid };
            setFiles1([fileMetadata]);
            const fileHash = `http://143.110.246.230:8080/ipfs/${cid}`;
            setFile1CID(response.data.Hash)
            // contract.add(account, name, fileHash);

            toast({
                position: 'top',
                title: 'File Uploaded Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            // console.log('Error uploading file:', error);
            setIsLoading1(false);
            setError(error.message);
        }
    };

    const handleUpload2 = async () => {
        setIsLoading2(true);

        const formData = new FormData();
        formData.append('file', file2);
        console.log('Upload', file2)

        try {
            const response = await axios.post('http://143.110.246.230:5001/api/v0/add', formData);
            console.log('File uploaded successfully:', response.data);
            // setFiles([...files, fileMetadata]);
            setError(null);
            setIsLoading2(false);
            const name = response.data.Name;
            const cid = response.data.Hash;
            const size = response.data.Size;
            const fileMetadata = { name, cid };
            setFiles2([fileMetadata]);
            const fileHash = `http://143.110.246.230:8080/ipfs/${cid}`;
            setFile2CID(response.data.Hash)
            // contract.add(account, name, fileHash);

            toast({
                position: 'top',
                title: 'File Uploaded Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            // console.log('Error uploading file:', error);
            setIsLoading2(false);
            setError(error.message);
        }
    };

    return (
        <>
            <Box>
                <Grid templateColumns='repeat(2, 1fr)' gap={1}>
                    <GridItem w='100%' h='100%'>
                        <Container>
                            <Center>
                                <Text
                                    fontSize="lg"
                                    fontWeight="bold"
                                    mb="8"
                                >
                                    Upload Original File
                                </Text>
                            </Center>
                            <Center>
                                <Text
                                    fontSize="sm"
                                    mb="8"
                                >
                                    Instruction: Please upload the original file you want to compare.
                                </Text>
                            </Center>

                            <Stack spacing={4} direction='row' align='center' justify='center' cursor={'pointer'}>
                                <AspectRatio width="64" ratio={1}>
                                    <Box
                                        borderColor="gray.300"
                                        borderStyle="dashed"
                                        borderWidth="2px"
                                        rounded="md"
                                        shadow="sm"
                                        role="group"
                                        transition="all 150ms ease-in-out"
                                        _hover={{
                                            shadow: "md"
                                        }}
                                        as={motion.div}
                                        initial="rest"
                                        animate="rest"
                                        whileHover="hover"
                                    >
                                        <Box position="relative" height="100%" width="100%">
                                            <Box
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                height="100%"
                                                width="100%"
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <Stack
                                                    height="100%"
                                                    width="100%"
                                                    display="flex"
                                                    alignItems="center"
                                                    justify="center"
                                                    spacing="4"
                                                >
                                                    <Stack p="8" textAlign="center" spacing="1">
                                                        <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                                            Upload your file here
                                                        </Heading>
                                                        <Text fontWeight="light">or click to upload</Text>
                                                        <Text fontWeight="medium">{fileName1}</Text>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                            <Input
                                                type="file"
                                                height="100%"
                                                width="100%"
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                opacity="0"
                                                aria-hidden="true"
                                                // accept="image/*"
                                                onDragEnter={startAnimation}
                                                onDragLeave={stopAnimation}
                                                onChange={handleFileUpload1}
                                            />
                                        </Box>
                                    </Box>
                                </AspectRatio>
                            </Stack>
                            <Stack spacing={4} py={4} direction='row' align='center' justify='center'>
                                <Button
                                    leftIcon={isLoading1 ? <Spinner /> : <SmallAddIcon />}
                                    isDisabled={isLoading1 || file1 === null}
                                    onClick={handleUpload1} colorScheme='teal'
                                    color='white'
                                    bgGradient='linear(to-r, teal.500, green.500)'
                                    _hover={{
                                        bgGradient: 'linear(to-r, red.500, yellow.500)',
                                    }}
                                >
                                    Upload File
                                </Button>

                            </Stack>

                            <Stack spacing={4} direction='row' align='center' justify='center'>
                                <div>
                                    {error && <p>Error: {error}</p>}
                                    <TableContainer
                                        // add horizonatal margin
                                        mx={4}
                                        my={4}
                                    >
                                        <Table variant='simple' size={"sm"}>
                                            <Thead >
                                                <Tr fontSize={"2xl"}>
                                                    <Th>Name</Th>
                                                    <Th>CID</Th>
                                                </Tr>
                                            </Thead>

                                            <Tbody>
                                                {files1 &&
                                                    files1.map((file, index) => (
                                                        <Tr key={index}>
                                                            <Td>{file.name}</Td>
                                                            <Td>
                                                                <Link
                                                                    href={`http://143.110.246.230:8080/ipfs/${file.cid}`}
                                                                    isExternal
                                                                >
                                                                    {file.cid}
                                                                </Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                }
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Stack >

                        </Container>
                    </GridItem>
                    <GridItem w='100%' h='10'>
                        <Container>
                            <Center>
                                <Text
                                    fontSize="lg"
                                    fontWeight="bold"
                                    mb="4"
                                >
                                    Upload a File for Comparison
                                </Text>
                            </Center>

                            <Center>
                                <Text
                                    fontSize="sm"
                                    // fontWeight="normal"
                                    mb="8"
                                >
                                    Instruction: Please upload a file that you want to compare with the original file. It can be the same file or a potentially modified version.
                                </Text>
                            </Center>

                            <Stack spacing={4} direction='row' align='center' justify='center' cursor={'pointer'}>
                                <AspectRatio width="64" ratio={1}>
                                    <Box
                                        borderColor="gray.300"
                                        borderStyle="dashed"
                                        borderWidth="2px"
                                        rounded="md"
                                        shadow="sm"
                                        role="group"
                                        transition="all 150ms ease-in-out"
                                        _hover={{
                                            shadow: "md"
                                        }}
                                        as={motion.div}
                                        initial="rest"
                                        animate="rest"
                                        whileHover="hover"
                                    >
                                        <Box position="relative" height="100%" width="100%">
                                            <Box
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                height="100%"
                                                width="100%"
                                                display="flex"
                                                flexDirection="column"
                                            >
                                                <Stack
                                                    height="100%"
                                                    width="100%"
                                                    display="flex"
                                                    alignItems="center"
                                                    justify="center"
                                                    spacing="4"
                                                >
                                                    <Stack p="8" textAlign="center" spacing="1">
                                                        <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                                            Upload your file here
                                                        </Heading>
                                                        <Text fontWeight="light">or click to upload</Text>
                                                        <Text fontWeight="medium">{fileName2}</Text>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                            <Input
                                                type="file"
                                                height="100%"
                                                width="100%"
                                                position="absolute"
                                                top="0"
                                                left="0"
                                                opacity="0"
                                                aria-hidden="true"
                                                // accept="image/*"
                                                onDragEnter={startAnimation}
                                                onDragLeave={stopAnimation}
                                                onChange={handleFileUpload2}
                                            />
                                        </Box>
                                    </Box>
                                </AspectRatio>
                            </Stack>
                            <Stack spacing={4} py={4} direction='row' align='center' justify='center'>
                                <Button
                                    leftIcon={isLoading2 ? <Spinner /> : <SmallAddIcon />}
                                    isDisabled={isLoading2 || file2 === null}
                                    onClick={handleUpload2} colorScheme='teal'
                                    color='white'
                                    bgGradient='linear(to-r, teal.500, green.500)'
                                    _hover={{
                                        bgGradient: 'linear(to-r, red.500, yellow.500)',
                                    }}
                                >
                                    Upload File
                                </Button>

                            </Stack>

                            <Stack spacing={4} direction='row' align='center' justify='center'>
                                <div>
                                    {error && <p>Error: {error}</p>}
                                    <TableContainer
                                        // add horizonatal margin
                                        mx={4}
                                        my={4}
                                    >
                                        <Table variant='simple' size={"sm"}>
                                            <Thead >
                                                <Tr fontSize={"2xl"}>
                                                    <Th>Name</Th>
                                                    <Th>CID</Th>
                                                </Tr>
                                            </Thead>

                                            <Tbody>
                                                {files2 &&
                                                    files2.map((file, index) => (
                                                        <Tr key={index}>
                                                            <Td>{file.name}</Td>
                                                            <Td>
                                                                <Link
                                                                    href={`http://143.110.246.230:8080/ipfs/${file.cid}`}
                                                                    isExternal
                                                                >
                                                                    {file.cid}
                                                                </Link>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                }
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Stack >

                        </Container>
                    </GridItem>
                </Grid>
            </Box>
            <Box marginTop={8}>
                <Container>
                    <Center>
                        <Button
                            onClick={handleIntegrity} colorScheme='teal'
                            color='black'
                        >
                            Check Integrity
                        </Button>
                    </Center>
                </Container>
            </Box>
        </>
    );
}

export default Integrity;