import { ChakraProvider } from '@chakra-ui/react';
import { ethers } from "ethers";
import React, { useEffect, useState } from 'react';
import './App.css';
import FileList from './FileList';
import Navbar from './Navbar';
import UploadFile from './UploadFile';
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Display from './Display';
import { useDisclosure,extendTheme} from '@chakra-ui/react';
// import Modal from './Modal';
import Share from './Share';

function App() {
  const [account, setAccount] = useState("");
  const [Accounts , setAccounts] = useState([]); 
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const prov = new ethers.providers.Web3Provider(window.ethereum);

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
        console.error("Metamask is not installed");
        alert("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);


  return (
    // 2. Wrap ChakraProvider at the root of your app
    <ChakraProvider theme={extendTheme({
      config:{
      useSystemColorMode: false,
      initialColorMode: "dark"
      }
  })}>
      <Navbar
      />
      <UploadFile
        account={account}
        provider={provider}
        contract={contract}
      />

      <Share contract={contract}/>
      <Display contract={contract} account={account}></Display>

      <FileList
        provider={provider}
        contract={contract}
        account={account}
      />
    </ChakraProvider>
  );
}

export default App;
