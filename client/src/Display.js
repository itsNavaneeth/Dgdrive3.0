import { Box, FormControl, FormLabel, Input, Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Web3Storage } from 'web3.storage';


function FileList({ contract, account, provider }) {
  const [dataArray, setDataArray] = useState([]);

  // blockchain code
  const [address, setAddress] = useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const getdata = async () => {
    let dataArray2;

    try {
      if (address) {
        dataArray2 = await contract.display(address);
        setDataArray(dataArray2);
        console.log("da: ", dataArray2);
      } else {
        dataArray2 = await contract.display(account);
        setDataArray(dataArray2);
      }
    } catch (e) {
      // alert("You don't have access");
      console.log("Display Error: ", e)
    }
  }
  // end of blockchain code

  return (
    <>
      <Box p={4}>
        {/* add a formcotnrol  */}
        <FormControl>
          <FormLabel>Account Address</FormLabel>
          <Input
            size={"md"}
            placeholder="Enter account address"
            value={address}
            onChange={handleAddressChange}
          />
          <Button
            colorScheme="yellow"
            mt={4}
            onClick={getdata}
          >
            Get Data
          </Button>
        </FormControl>
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
    </>
  );
}

export default FileList;