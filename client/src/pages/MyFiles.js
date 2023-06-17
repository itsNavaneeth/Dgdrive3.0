import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  IconButton,
  Link,
  Table,
  TableContainer,
  Tbody,
  Text,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { BsQrCodeScan, BsDownload } from 'react-icons/bs';
import { MdDownload } from 'react-icons/md';
import { AiFillFolderOpen } from 'react-icons/ai';

function MyFiles({ contract, account, provider }) {
  const [dataArray, setDataArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArray, setFilteredArray] = useState([]);
  const toast = useToast();

  const [value, setValue] = useState('http://143.110.246.230:8080/ipfs/QmWwh4srLWFG1vnbFcgdAUH3ngZAisEepp6ky4wnKphGwd');
  const [modalName, setModalName] = useState('')
  let imageSize = 64;
  const qrCodeSize = 256;
  const qrCodePadding = 20;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = (name, url) => {
    setValue(url);
    setModalName(name);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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
        <Heading fontSize="lg" color="grey.100" fontWeight="bold" py={3}>
          My Files
        </Heading>
      </Center>

      {/* modal */}

      <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalName}</ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              <Center>
                <Box bg={"white"}
                  padding={6}
                >
                  <QRCode
                    value={value} size={qrCodeSize}
                    //increase complexity of QR code
                    level={'L'}
                    style={{ borderRadius: '0%', marginTop: 'auto' }}
                    //color
                    fgColor={'#000000'}
                  />
                </Box>
              </Center>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Center>
              <Button colorScheme="yellow" mr={3} onClick={handleCloseModal}>
                Cancel
              </Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* end of modal */}

      {/* blockchain table */}
      <TableContainer mx={4} my={4}>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr fontSize="2xl">
              <Th>Name</Th>
              <Th>CID</Th>
              <Th>QR Code</Th>
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
                  {/* <Center> */}
                  <IconButton aria-label='QR Code'
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleOpenModal(string1, string2)}
                    icon={<BsQrCodeScan />} />
                  {/* </Center> */}
                  {/* <Button
                    colorScheme="teal"
                    size="sm"
                    onClick={() => handleOpenModal(string1, string2)}
                  >
                    QR Code
                  </Button> */}
                </Td>
                <Td>
                  <IconButton aria-label='QR Code'
                    as={Link}
                    href={`${string2}`}
                    colorScheme="teal"
                    size="sm"
                    target="_blank"
                    icon={<AiFillFolderOpen />} />
                  {/* <Button
                    as={Link}
                    href={`${string2}`}
                    colorScheme="teal"
                    size="sm"
                    target="_blank"
                  >
                    Check File
                  </Button> */}
                </Td>
                <Td>
                  {/* <Center> */}
                  <IconButton aria-label='QR Code'
                    onClick={() => handleDownload(string1, string2)}
                    colorScheme="purple"
                    size="sm"
                    icon={<MdDownload />} />
                  {/* </Center> */}
                  {/* <Button
                    onClick={() => handleDownload(string1, string2)}
                    colorScheme="blue"
                    size="sm"
                  >
                    Download
                  </Button> */}
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
