import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#">
                    <img src={require('../assets/img/nifty.svg').default} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <a href={props.projectUrl} className="back" id="collapse-back">&lt;&lt;-back to projects</a>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="https://twitter.com/nifty_io">
                            <span>Twitter</span>
                            <img src={require('../assets/img/twitter.svg').default} alt="Twitter icon" />
                        </Nav.Link>
                        <Nav.Link href="https://discord.com/invite/nifty">
                            <span>Discord</span>
                            <img src={require('../assets/img/discord.svg').default} alt="Discord icon" />
                        </Nav.Link>
                        <Nav.Link href="https://opensea.io/collection/nodestones">
                            <span>Opensea</span>
                            <img src={require('../assets/img/opensea.svg').default} alt="Opensea icon" />
                        </Nav.Link>
                        <a href={props.projectUrl} className="back" id="expand-back">&lt;&lt;-back to projects</a>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Button variant="light" id="connect-wallet" onClick={props.connect}>{props.address ? props.address : 'Connect wallet'}</Button>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;