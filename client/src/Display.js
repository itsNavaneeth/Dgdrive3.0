import { useState } from "react";
import { Button, Center, Heading, Link, Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

// import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
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
            <a href={item} key={i} target="_blank">
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
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
