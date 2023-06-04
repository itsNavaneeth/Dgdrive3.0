import { useState } from "react";
import { Box, Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
// import "./Display.css";
const Display = ({ contract, account }) => {
  const [address, setAddress] = useState("");
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    
    try {
      if (address) {
        dataArray = await contract.display(address);
        console.log("da: ", dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <>
            <a href={item} key={i} target="_blank" rel="noreferrer">
              <img
                key={i}
                src={`https:${item.substring(6)}`}
                alt="new"
                className="image-list"
              ></img>
            </a>

            <TableContainer
              // add horizonatal margin
              mx={4}
              my={4}
            >
              <Table variant='striped' size={"sm"}>
                <Thead >
                  <Tr fontSize={"2xl"}>
                    {/* <Th>Name</Th> */}
                    <Th>CID</Th>
                    {/* <Th>Size</Th> */}
                    {/* <Th>Timestamp</Th> */}
                    {/* <Th>Check File</Th> */}

                  </Tr>
                </Thead>

                <Tbody>
                  {
                    // files.map((file, index) => (
                    //   <Tr key={index}>
                    //     <Td>{file.name}</Td>
                    //     <Td>
                    //       <Link
                    //         href={item}
                    //         isExternal
                    //       >
                    //         {file.cid}
                    //       </Link>
                    //     </Td>
                    //     <Td>{(file.dagSize / (1024 * 1024)).toFixed(2)} MB</Td>
                    //     <Td>{new Date(file.created).toLocaleString()}</Td>
                    //     <Td>
                    //       {/* button which routes to href={`https://ipfs.io/ipfs/${file.cid}`} */}
                    //       <Button
                    //         as={Link}
                    //         href={`https://ipfs.io/ipfs/${file.cid}/${file.name}`}
                    //         colorScheme='teal'
                    //         size={"sm"}
                    //         target="_blank"
                    //       >
                    //         Check File
                    //       </Button>
                    //     </Td>
                    //   </Tr>
                    // ))
                    <Tr>
                      <Td>
                        <Link
                          href={item}
                          isExternal
                        >
                          {item}
                        </Link>
                      </Td>
                    </Tr>
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
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
    </>
  );
};
export default Display;
