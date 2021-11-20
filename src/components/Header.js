import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#">Nifty</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="https://twitter.com/nifty_io">
                            <span>Twitter</span>
                            <i className="fab fa-twitter"></i>
                        </Nav.Link>
                        <Nav.Link href="https://discord.com/nifty">
                            <span>Discord</span>
                            <i className="fab fa-discord"></i>
                        </Nav.Link>
                        <Nav.Link href="https://opensea.io/collection/node_stones">
                            <span>Opensea</span>
                            <img src={require('../assets/img/logo.svg').default} alt="Opensea icon" />
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button variant="light" id="connect-wallet" onClick={props.walletConnect}>{props.address ? props.address : 'Connect wallet'}</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;