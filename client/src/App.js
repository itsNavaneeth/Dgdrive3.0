import { ChakraProvider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { ethers } from "ethers";
import React, { useEffect, useState, useNavigation } from 'react';
import './App.css';
import FileList from './FileList';
import Navbar from './Navbar';
// import UploadFile from './UploadFile';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Display from './Display';
import Layout from './Layout';
import { Route, Routes } from "react-router-dom";


import { useDisclosure, extendTheme } from '@chakra-ui/react';
// import Modal from './Modal';
import Share from './Share';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import UploadFile from './pages/UploadFile';
import MyFiles from './pages/MyFiles';
import SharedFiles from './pages/SharedFiles';
import Peers from './pages/Peers';
import About from './pages/About';
import Integrity from './pages/Integrity';

function App() {
  const [account, setAccount] = useState("");
  const [Accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // console.log(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        toast({
          title: "No provider found",
          description: "Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!",
          status: "error",
          position: 'top',
          duration: 5000,
          isClosable: true,
        });
      }
    };
    provider && loadProvider();
  }, []);


  return (
    // 2. Wrap ChakraProvider at the root of your app

    <ChakraProvider theme={extendTheme({
      config: {
        useSystemColorMode: false,
        initialColorMode: "dark"
      }
    })}>
      <Routes>
        <Route path="/" element={<Navbar account={account} />}>
          <Route path="upload" element={<UploadFile account={account} provider={provider} contract={contract} />} />
          <Route path="" element={<Dashboard />} />
          <Route path="my-files" element={<MyFiles contract={contract} account={account} />} />
          <Route path="shared-files" element={<SharedFiles contract={contract} account={account} />} />
          <Route path="my-peers" element={<Peers contract={contract} account={account} />} />
          <Route path="file-integrity" element={<Integrity account={account} provider={provider} contract={contract} />} />
          <Route path="about" element={<About />} />
        </Route>

      </Routes>
    </ChakraProvider>
  );
}

export default App;
