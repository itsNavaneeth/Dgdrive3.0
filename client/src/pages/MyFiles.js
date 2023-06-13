import {
  Box,
  Button,
  Input,
  Center,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';

function MyFiles({ contract, account, provider }) {
  const [dataArray, setDataArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const toast = useToast();

  const handleDownload = async (name, dlink) => {
    const response = await fetch(`${dlink}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // blockchain code
  const [address, setAddress] = useState('');
  
  const getdata = async () => {
    let dataArray2;

    try {
      if (address) {
        dataArray2 = await contract.display(address);
      } else {
        dataArray2 = await contract.display(account);
      }

      setDataArray(dataArray2);
    } catch (e) {
      toast({
        title: 'Permission Error',
        description: 'You dont have access',
        status: 'warning',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const filtered = dataArray.filter(([string1]) =>
      string1.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArray(filtered);
  }, [dataArray, searchQuery]);

  return (
    <>
      <Box p={4}>
        <Input
          placeholder="Search for file names !!!!"
          onChange={(e) => setSearchQuery(e.target.value)}
          mb={4}
        />

        <Button colorScheme="cyan" mt={4} onClick={getdata}>
          Refresh
        </Button>
      </Box>

      <Center>
        <Heading fontSize="lg" color="gray.700" fontWeight="bold" py={3}>
          Blockchain List
        </Heading>
      </Center>

      {/* blockchain table */}
      <TableContainer mx={4} my={4}>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr fontSize="2xl">
              <Th>Name</Th>
              <Th>CID</Th>
              <Th>Check File</Th>
              <Th>Download</Th>
            </Tr>
          </Thead>

          <Tbody>
            {filteredArray.map(([string1, string2], index) => (
              <Tr key={index}>
                <Td>{string1}</Td>
                <Td>
                  <Link href={`${string2}`} isExternal>
                    {string2}
                  </Link>
                </Td>
                <Td>
                  <Button
                    as={Link}
                    href={`${string2}`}
                    colorScheme="teal"
                    size="sm"
                    target="_blank"
                  >
                    Check File
                  </Button>
                </Td>
                <Td>
                  <Button
                    onClick={() => handleDownload(string1, string2)}
                    colorScheme="blue"
                    size="sm"
                  >
                    Download
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default MyFiles;
