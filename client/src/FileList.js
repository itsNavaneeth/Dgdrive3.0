import { Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';


function FileList({ contract, account, provider }) {
    const [files, setFiles] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataArray, setDataArray] = useState([]);

    // blockchain code
    const [data, setData] = useState("");
    const getdata = async () => {
        let dataArray2;
        console.log(account)
        dataArray2 = await contract.display(account);
        setDataArray(dataArray2)
        try {
            console.log(dataArray);

            // if (Otheraddress) {
            //     dataArray = await contract.display(Otheraddress);
            //     console.log(dataArray);
            // } else {
            //     dataArray = await contract.display(account);
            // }

        } catch (e) {
            alert("You don't have access");
        }
    };
    // end of blockchain code

    const handleDownload = async (file) => {
        const response = await fetch(`https://ipfs.io/ipfs/${file.cid}/${file.name}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
    };

    const fetchFiles = async () => {
        setIsLoading(true);
        try {
            const storage = new Web3Storage({ token: process.env.REACT_APP_WEB3_STORAGE_TOKEN });
            const list = await storage.list();
            const items = [];
            for await (const item of list) {
                items.push(item);
            }
            setFiles(items);
            console.log(files)
            setIsLoading(false);
            console.log(files)
            setError(null);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchFiles();
    }, []);

    return (
        <div>
            <Center>
                <Button onClick={getdata} colorScheme='teal' mx={3}>
                    Refresh Blockchain List
                </Button>
                <Button onClick={fetchFiles} colorScheme='teal' mx={3}>
                    Refresh All List
                </Button>
            </Center>
            <Center>
                <Heading fontSize="lg" color="gray.700" fontWeight="bold" py={3}>
                    Blockchain List
                </Heading>
            </Center>

            {/* blockchain table */}
            <TableContainer
                // add horizonatal margin
                mx={4}
                my={4}
            >
                <Table variant='striped' size={"sm"}>
                    <Thead >
                        <Tr fontSize={"2xl"}>
                            <Th>Name</Th>
                            <Th>CID</Th>
                            <Th>Check File</Th>

                        </Tr>
                    </Thead>

                    <Tbody>
                        {
                            dataArray?.map(([string1, string2]) => (
                                <Tr>
                                    <Td>{string1}</Td>
                                    <Td>
                                        <Link
                                            href={`${string2}`}
                                            isExternal
                                        >
                                            {string2}
                                        </Link>
                                    </Td>
                                    <Td>
                                        {/* button which routes to href={`https://ipfs.io/ipfs/${file.cid}`} */}
                                        <Button
                                            as={Link}
                                            href={`${string2}`}
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

            <Center>
                <Heading fontSize="lg" color="gray.700" fontWeight="bold" py={3}>
                    All files list
                </Heading>
            </Center>

            <TableContainer
                // add horizonatal margin
                mx={4}
                my={4}
            >
                <Table variant='striped' size={"sm"}>
                    <Thead >
                        <Tr fontSize={"2xl"}>
                            <Th>Name</Th>
                            <Th>CID</Th>
                            <Th>Size</Th>
                            <Th>Timestamp</Th>
                            <Th>Check File</Th>

                        </Tr>
                    </Thead>

                    <Tbody>
                        {isLoading ? (
                            <>
                                <Tr>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                </Tr>
                                <Tr>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                </Tr>
                                <Tr>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                </Tr>
                                <Tr>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                    <Td><Skeleton height='20px' /></Td>
                                </Tr>
                            </>
                        )
                            : null
                        }
                        {!isLoading &&
                            files?.map((file, index) => (
                                <Tr key={index}>
                                    <Td>{file.name}</Td>
                                    <Td>
                                        <Link
                                            href={`https://ipfs.io/ipfs/${file.cid}`}
                                            isExternal
                                        >
                                            {file.cid}
                                        </Link>
                                    </Td>
                                    <Td>{(file.dagSize / (1024 * 1024)).toFixed(2)} MB</Td>
                                    <Td>{new Date(file.created).toLocaleString()}</Td>
                                    <Td>
                                        {/* button which routes to href={`https://ipfs.io/ipfs/${file.cid}`} */}
                                        <Button
                                            as={Link}
                                            href={`https://ipfs.io/ipfs/${file.cid}/${file.name}`}
                                            colorScheme='teal'
                                            size={"sm"}
                                            target="_blank"
                                        >
                                            Check File
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => handleDownload(file)}
                                            colorScheme='blue'
                                            size='sm'
                                        >
                                            Download
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default FileList;