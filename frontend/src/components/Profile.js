import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

const handleSubmit = (e) => {
    e.preventDefault()
}

const Profile = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [held, setHeld] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [bio, setBio] = useState('')
    const [inputFile, setInputFile] = useState(null);

    const changeUsername = (e) => {
        setUsername(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changeStatus = (e) => {
        setStatus(e.target.value)
    }

    const changeHeld = (e) => {
        setHeld(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changeRole = (e) => {
        setRole(e.target.value)
    }

    const changeBio = (e) => {
        setBio(e.target.value)
    }

    
    const changeInterest = (e, field) => {
        console.log(e, field)
        // setInterest()
    }

    useEffect(() => {
      setInputFile(document.getElementById("input-file"));
    }, []);
  
    const handleUpload = () => {
      inputFile?.click();
    };

    const handleSubmit = () => {
        
    }

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
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formUsername">
                                <Form.Label>Create Username</Form.Label>
                                <Form.Control type="text" placeholder="Use Wallet Address(default)" value={username} onChange={changeUsername} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formPassword">
                                <Form.Label>Create Password</Form.Label>
                                <Form.Control type="password" placeholder="Create Password" value={password} onChange={changePassword} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formStatus">
                                <Form.Label>Profile Status</Form.Label>
                                <Form.Control type="text" placeholder="" value={status} onChange={changeStatus} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Email" value={email} onChange={changeEmail} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role" value={role} onChange={changeRole} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formHeld">
                                <Form.Label>Nodestone(s) Held</Form.Label>
                                <Form.Control type="text" placeholder="Nodestone(s) Held" value={held} onChange={changeHeld} />
                            </Form.Group>
                        </Col>
                        <Col lg="12" md="12" className="main-col">
                            <Form.Group controlId="formHeld">
                                <Form.Label>Expertise/Interest(check all that apply)</Form.Label>
                                <Container className="checkbox-panel">
                                    <Row>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Artist" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Musician" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Web Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Project Manager" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Business Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Game Dev" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Marketing/Promotion" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Data Analyst" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Collector" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Smart Contracts" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="AI" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Social Media Manager" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Photographer" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3">
                                                <Form.Check type="checkbox" label="Discord Mod" />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
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
                                <Form.Control className="footer-element" as="textarea" rows={3} placeholder="Bio" value={bio} onChange={changeBio} />
                            </Form.Group>
                        </Col>
                        <Col lg="4" className="main-col">
                            <Form.Group className="mb-4">
                                <Form.Label style={{visibility:'hidden'}}>Bio</Form.Label>
                                <div className="footer-element file-panel">
                                    <input id="input-file" className="d-none" type="file" />
                                    <Button variant="light" type="file" onClick={handleUpload}>Choose File(s)</Button>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col lg="4" className="main-col">
                            <Form.Group className="mb-4">
                                <Form.Label style={{visibility:'hidden'}}>Bio</Form.Label>
                                <div className="footer-element submit-panel">
                                    <Button variant="secondary" type="submit">Submit</Button>
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