import { Box, FormControl, FormLabel, Input, Hide, Show, Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';


function MyFiles({ contract, account, provider }) {
  const [dataArray, setDataArray] = useState([]);

  const handleDownload = async (name, cid) => {
    const response = await fetch(`http://143.110.246.230:8080/ipfs/${cid}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  // blockchain code
  const [address, setAddress] = useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const getdata = async () => {
    let dataArray2;

    try {
      // if (address) {
      //   dataArray2 = await contract.display(address);
      //   setDataArray(dataArray2);
      //   console.log("da: ", dataArray2);
      // } else {
      dataArray2 = await contract.display(account);
      setDataArray(dataArray2);
      console.log("fuckerrr: ", dataArray2);
      // }
    } catch (e) {
      alert("You don't have access");
    }
  }
  // end of blockchain code

  useEffect(() => {
    getdata();
  }, [])

  return (
    <>
      <Box p={4}>
        {/* add a formcotnrol  */}
        <Button
          colorScheme="cyan"
          mt={4}
          onClick={getdata}
        >
          Refresh
        </Button>
      </Box>

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
              <Th>Download</Th>

            </Tr>
          </Thead>

          <Tbody>
            {
              dataArray?.map(([string1, string2], index) => (
                <Tr key={index}>
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
                  <Td>
                    <Button
                      onClick={() => handleDownload(string1, string2)}
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
    </>
  );
}

export default MyFiles;