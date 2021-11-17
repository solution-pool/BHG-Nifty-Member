import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

console.log(Form)
const Profile = () => {
    return(
        <Container>
            <Row className="avatar">
                <h1>Nifty Profile</h1>
                <p>
                    Information collected will be used to <br />
                    communicate and collaborate on projects.
                </p>
            </Row>
            <Row className="content">
                <Form>
                    <Row>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label>Create Username</Form.Label>
                                <Form.Control type="text" placeholder="Use Wallet Address(default)" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label>Create Password</Form.Label>
                                <Form.Control type="text" placeholder="Create Password" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formStatus">
                                <Form.Label>Profile Status</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formHeld">
                                <Form.Label>Nodestone(s) Held</Form.Label>
                                <Form.Control type="text" placeholder="Nodestone(s) Held" />
                            </Form.Group>
                        </Col>
                        <Col lg="12" md="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formHeld">
                                <Form.Label>Nodestone(s) Held</Form.Label>
                                <Container>
                                    <Row>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Artist" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Musician" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Web Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Project Manager" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Business Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Game Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Marketing/Promotion" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Data Analyst" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Collector" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Smart Contracts" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="AI" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Social Media Manager" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Photographer" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Discord Mod" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Other" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form.Group>
                        </Col>
                        <Col lg="4" className="main-col">
                            <Form.Group className="mb-4">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Bio" />
                            </Form.Group>
                        </Col>
                        <Col lg="4" className="main-col">
                            <Form.Group className="mb-4">
                                <Form.Label style={{visibility:'hidden'}}>Bio</Form.Label>
                                <div>
                                    <Button className="light">Choose File(s)</Button>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col lg="4" className="main-col">
                            <Form.Group className="mb-4">
                                <Form.Label style={{visibility:'hidden'}}>Bio</Form.Label>
                                <div>
                                    <Button className="light">Submit</Button>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    );
}

export default Profile;