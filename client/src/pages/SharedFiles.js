import { Box, FormControl, FormLabel, Input, Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';


function SharedFiles({ contract, account, provider }) {
  const [dataArray, setDataArray] = useState([]);
  const toast = useToast();
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
      toast({
        title: "Permission Error",
        description: "You dont have access",
        status: "error",
        position: 'top',
        duration: 5000,
        isClosable: true,
      })
    }
  }
  // end of blockchain code

  // useEffect(() => {
  //   getdata();
  // }, [])

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
          // color='white'
          // bgGradient='linear(to-r, red.500, yellow.500)'
          // _hover={{
          //   bgGradient: 'linear(to right, #cc2b5e, #753a88)',
          // }}
          >
            Get Data
          </Button>
        </FormControl>
      </Box >

      <Center>
        <Heading fontSize="lg" color="grey.100" fontWeight="bold" py={3}>
          Shared With Me
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

export default SharedFiles;