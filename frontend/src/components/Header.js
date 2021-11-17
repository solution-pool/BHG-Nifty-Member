// import 
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';

const Header = () => {
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
                        <Nav.Link>
                            <Button variant="light" id="connect-wallet">Connect Wallet</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;