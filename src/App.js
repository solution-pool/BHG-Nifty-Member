import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Profile from './components/Profile';
import Web3 from 'web3';
import { PROJECT_URL } from './config/server';
// import 
import { useEffect, useState } from 'react';

function App() {
  const [walletAddress, setAddress] = useState('')

  useEffect( async () => {
      await walletConnect()
  }, [walletAddress[0]])

  const walletConnect = async () => {
      if(window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
          setAddress(await window.web3.eth.getAccounts())
      } else if(window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
          setAddress(await window.web3.eth.getAccounts())
      } else {
          window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
      }
  }
  return (
    <div className="App">
      <Header connect={walletConnect} address={walletAddress[0]} projectUrl={PROJECT_URL} />
      <Profile address={walletAddress[0]} projectUrl={PROJECT_URL} />
    </div>
  );
}

export default App;
