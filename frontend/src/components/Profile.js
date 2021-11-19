import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { SERVER_URL } from '../config/server'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Profile = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [held, setHeld] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [bio, setBio] = useState('')
    const [inputFile, setInputFile] = useState(null);
    const [file, setFile] = useState(null);
    const [interest, setInterest] = useState({})
    const [formData, setForm] = useState({})
    const [fileUploadButtonLabel, setButtonLabel] = useState('Choose File')

    const form  = useRef(null)
    const alert = useRef(null) 

    const changeUsername = (e) => {
        setUsername(e.target.value)
        formData.username = e.target.value
        setForm(formData)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
        formData.password = e.target.value
        setForm(formData)
    }

    const changeStatus = (e) => {
        setStatus(e.target.value)
        formData.status = e.target.value
        setForm(formData)
    }

    const changeHeld = (e) => {
        setHeld(e.target.value)
        formData.held = e.target.value
        setForm(formData)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
        formData.email = e.target.value
        setForm(formData)
    }

    const changeRole = (e) => {
        setRole(e.target.value)
        formData.role = e.target.value
        setForm(formData)
    }

    const changeBio = (e) => {
        setBio(e.target.value)
        formData.bio = e.target.value
        setForm(formData)
    }

    const changeInterest = (e) => {
        const value = e.target.value
        const checked = e.target.checked

        if(checked) {
            interest[value] = true
        } else {
            interest[value] = false
        }

        setInterest(interest)
        formData['interest']  = interest
        setForm(formData)
    }

    const changeFile = (e) => {
        setFile(e.target.files[0])
        formData.file = file
        setForm(formData)
        setButtonLabel(e.target.files[0].name)
    }

    useEffect(() => {
      setInputFile(document.getElementById("input-file"));
    }, []);
  
    const handleUpload = () => {
      inputFile?.click();
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        let postData = new FormData(form.current);
        
        let jsonOfInteret = JSON.stringify(interest)
        postData.append('username', username)
        postData.append('password', password)
        postData.append('status', status)
        postData.append('held', held)
        postData.append('email', email)
        postData.append('role', role)
        postData.append('interest', jsonOfInteret)
        postData.append('bio', bio)

        if(file) {
            postData.append('fileName', file.name)
        }

        for(let p of postData) {
            if(p[1] ===  undefined) {
                window.scrollTo(0, 0)
                NotificationManager.error('An error occurred while typing data. Please reload the page and try again.', 'Error', 5000)
                return
            }
        }
        
        axios.post(SERVER_URL, postData ).then((res) => {
            reset()
            window.scrollTo(0, 0)
            NotificationManager.success('The data saved successfully.', 'Success', 5000)
        }).catch((err) => {
            window.scrollTo(0, 0)
            NotificationManager.error('The server connection failed. Please make sure if you are connected to the server correctly.', 'Error', 5000)
        })
    }

    const reset = () => {
        setUsername('')
        setPassword('')
        setStatus('')
        setHeld('')
        setEmail('')
        setRole('')
        setBio('')
        setInputFile(document.getElementById("input-file"));
        setFile(null);
        setInterest({})
        setForm({})
        setButtonLabel('Choose File');

        let interests = document.getElementsByClassName('form-check-input')

        for(let i = 0; i < interests.length; i ++ ) {
            interests[i].checked = false
        }
    }

    return(
        <Container>
            <NotificationContainer />
            <Row className="avatar">
                <h1>Nifty Profile</h1>
                <p>
                    Information collected will be used to <br />
                    communicate and collaborate on projects.
                </p>
            </Row>
            <Row className="content">
                <Form onSubmit={handleSubmit} ref={form} encType="multipart/form-data">
                    <Row>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formUsername">
                                <Form.Label>Create Username</Form.Label>
                                <Form.Control type="text" placeholder="Use Wallet Address(default)" defaultValue={props.address ? props.address : ''} onChange={changeUsername} required />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formPassword">
                                <Form.Label>Create Password</Form.Label>
                                <Form.Control type="password" placeholder="Create Password" value={password} onChange={changePassword} required />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formStatus">
                                <Form.Label>Profile Status</Form.Label>
                                <Form.Control type="text" placeholder="" value={status} onChange={changeStatus} required />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" value={email} onChange={changeEmail} required />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control type="text" placeholder="Role" value={role} onChange={changeRole} required />
                            </Form.Group>
                        </Col>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formHeld">
                                <Form.Label>Nodestone(s) Held</Form.Label>
                                <Form.Control type="text" placeholder="Nodestone(s) Held" value={held} onChange={changeHeld} required/>
                            </Form.Group>
                        </Col>
                        <Col lg="12" md="12" className="main-col">
                            <Form.Group controlId="formHeld">
                                <Form.Label>Expertise/Interest(check all that apply)</Form.Label>
                                <Container className="checkbox-panel">
                                    <Row>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestArtist">
                                                <Form.Check type="checkbox" label="Artist" className="interest" value="A" onChange={changeInterest} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestMusician">
                                                <Form.Check type="checkbox" label="Musician" className="interest" value="B" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestWeb">
                                                <Form.Check type="checkbox" label="Web Dev" className="interest" value="C" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestProject">
                                                <Form.Check type="checkbox" label="Project Manager" className="interest" value="D" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestBusiness">
                                                <Form.Check type="checkbox" label="Business Dev" className="interest" value="E" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestGame">
                                                <Form.Check type="checkbox" label="Game Dev" className="interest" value="F" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestMarketing">
                                                <Form.Check type="checkbox" label="Marketing/Promotion" className="interest" value="G" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestData">
                                                <Form.Check type="checkbox" label="Data Analyst" className="interest" value="H" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestCollector">
                                                <Form.Check type="checkbox" label="Collector" className="interest" value="I" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestSmart">
                                                <Form.Check type="checkbox" label="Smart Contracts" className="interest" value="J" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestAI">
                                                <Form.Check type="checkbox" label="AI" className="interest" value="K" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestSocial">
                                                <Form.Check type="checkbox" label="Social Media Manager" className="interest" value="L" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestPhotographer">
                                                <Form.Check type="checkbox" label="Photographer" className="interest" value="M" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestDiscord">
                                                <Form.Check type="checkbox" label="Discord Mod" className="interest" value="N" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestOther">
                                                <Form.Check type="checkbox" label="Other" className="interest" value="O" onChange={changeInterest}  />
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
                                    <input id="input-file" type="file" name="file" className="d-none" onChange={changeFile} />
                                    <Button variant="light" id="file-upload-button" onClick={handleUpload}>{fileUploadButtonLabel}</Button>
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