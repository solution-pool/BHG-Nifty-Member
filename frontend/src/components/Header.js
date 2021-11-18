// import 
import { useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import Web3 from 'web3';

const Header = () => {
    const [walletConnectFlag, setFlag] = useState(false)

    const walletConnect = async () => {
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            setFlag(true)
        } else if(window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            setFlag(true)
        } else {
            window.alert('Non-Ethereum browser detected. Your should consider trying MetaMask!')
            setFlag(false)
        }
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#">Nifty</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="https://twitter.com">
                            <i className="fab fa-twitter"></i>
                        </Nav.Link>
                        <Nav.Link href="https://discord.com">
                            <i className="fab fa-discord"></i>
                        </Nav.Link>
                        <Nav.Link href="https://opensea.io">
                            <img src={require('../assets/img/logo.svg').default} />
                        </Nav.Link>
                    </Nav>
                    <Nav>
                    {!walletConnectFlag ? (
                        <Nav.Link>
                            <Button variant="light" id="connect-wallet" onClick={walletConnect}>Connect Wallet</Button>
                        </Nav.Link>
                    ) : ('')}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;