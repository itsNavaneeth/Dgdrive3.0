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
    useToast
} from '@chakra-ui/react'

import { SmallAddIcon } from '@chakra-ui/icons'
import { motion, useAnimation } from "framer-motion";

const first = {
    rest: {
        rotate: "-15deg",
        scale: 0.95,
        x: "-50%",
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        x: "-70%",
        scale: 1.1,
        rotate: "-20deg",
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const second = {
    rest: {
        rotate: "15deg",
        scale: 0.95,
        x: "50%",
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        x: "70%",
        scale: 1.1,
        rotate: "20deg",
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const third = {
    rest: {
        scale: 1.1,
        filter: "grayscale(80%)",
        transition: {
            duration: 0.5,
            type: "tween",
            ease: "easeIn"
        }
    },
    hover: {
        scale: 1.3,
        filter: "grayscale(0%)",
        transition: {
            duration: 0.4,
            type: "tween",
            ease: "easeOut"
        }
    }
};

const PreviewImage = forwardRef((props, ref) => {
    return (
        <Box
            bg="white"
            top="0"
            height="100%"
            width="100%"
            position="absolute"
            borderWidth="1px"
            borderStyle="solid"
            rounded="sm"
            borderColor="gray.400"
            as={motion.div}
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundImage={`url("https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1120&q=80")`}
            {...props}
            ref={ref}
        />
    );
});


function UploadFile({ contract, account, provider }) {
    const client = create({ url: "http://143.110.246.230:5001/api/v0" });
    const toast = useToast()

    const controls = useAnimation();
    const startAnimation = () => controls.start("hover");
    const stopAnimation = () => controls.stop();
    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [fileName, setFileName] = useState("No file selected");

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
    };

    const handleUpload = async () => {
        setIsLoading(true);


        const formData = new FormData();
        formData.append('file', file);
        console.log('Upload', file)

        try {
            const response = await axios.post('http://143.110.246.230:5001/api/v0/add', formData);
            console.log('File uploaded successfully:', response.data);
            // setFiles([...files, fileMetadata]);
            setError(null);
            setIsLoading(false);
            const name = response.data.Name;
            const cid = response.data.Hash;
            const size = response.data.Size;
            const fileMetadata = { name, size, cid };
            setFiles([...files, fileMetadata]);
            const fileHash = `http://143.110.246.230:8080/ipfs/${cid}`;
            contract.add(account, name, fileHash);

            toast({
                position: 'top',
                title: 'File Uploaded Successfully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            })
        } catch (error) {
            // console.log('Error uploading file:', error);
            setIsLoading(false);
            setError(error.message);
        }



        // try {
        //     const storage = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN });
        //     const cid = await storage.put([file], { name: file.name });
        //     const fileMetadata = { name: file.name, size: file.size, cid: cid };
        //     setFiles([...files, fileMetadata]);
        //     setError(null);
        //     setIsLoading(false);
        //     const fileHash = `https://ipfs.io/ipfs/${cid}`
        //     contract.add(account, file.name, fileHash);
        //     toast({
        //         position: 'top',
        //         title: 'File Uploaded Successfully',
        //         status: 'success',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        // } catch (error) {
        //     setIsLoading(false);
        //     setError(error.message);

        // }
    };
    // let sidebarBg =
    //     "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";

    return (
        <>
            <Box
                // backgroundImage="background-body-admin.png"
                // backgroundSize="cover"
                // backgroundPosition="center"
                // bg={sidebarBg}
                // bgGradient='linear(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)'
                height="100vh"
            // opacity={0.75}
            >
                <Container
                >
                    <Center>
                        <Text
                            // display={{ base: 'flex' }}
                            fontSize="lg"
                            fontFamily="monospace"
                            fontWeight="bold"
                        >
                            Account ID:
                        </Text>
                    </Center>
                    <Center>
                        <Text
                            // display={{ base: 'flex' }}
                            fontSize="md"
                            fontFamily="monospace"
                            fontWeight="bold"
                            mb="8"
                        >
                            {account}
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
                                            <Box height="16" width="12" position="relative">
                                                <PreviewImage
                                                    variants={first}
                                                    backgroundImage="url('https://images.unsplash.com/photo-1531390658120-e06b58d826ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=389&q=80')"
                                                />
                                                <PreviewImage
                                                    variants={second}
                                                    backgroundImage="url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')"
                                                />
                                                <PreviewImage
                                                    variants={third}
                                                    backgroundImage={`url("https://images.unsplash.com/photo-1626908013351-800ddd734b8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80")`}
                                                />
                                            </Box>
                                            <Stack p="8" textAlign="center" spacing="1">
                                                <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                                    Upload your file here
                                                </Heading>
                                                <Text fontWeight="light">or click to upload</Text>
                                                <Text fontWeight="medium">{fileName}</Text>
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
                                        onChange={handleFileUpload}
                                    />
                                </Box>
                            </Box>
                        </AspectRatio>
                    </Stack>
                    <Stack spacing={4} py={4} direction='row' align='center' justify='center'>
                        <Button
                            leftIcon={isLoading ? <Spinner /> : <SmallAddIcon />}
                            isDisabled={isLoading || file === null}
                            onClick={handleUpload} colorScheme='teal'
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
                                            <Th>Size</Th>
                                            <Th>Check File</Th>
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {files &&
                                            files.map((file, index) => (
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
                                                    <Td>{(file.size / (1024 * 1024)).toFixed(2)} MB</Td>
                                                    <Td>
                                                        {/* button which routes to href={`https://ipfs.io/ipfs/${file.cid}`} */}
                                                        <Button
                                                            as={Link}
                                                            href={`http://143.110.246.230:8080/ipfs/${file.cid}`}
                                                            colorScheme='teal'
                                                            size={"sm"}
                                                            target="_blank"
                                                        >
                                                            Check File
                                                        </Button>
                                                    </Td>
                                                </Tr>
                                            ))
                                        }
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Stack >

                </Container >
            </Box >
        </>
    );
}

export default UploadFile;