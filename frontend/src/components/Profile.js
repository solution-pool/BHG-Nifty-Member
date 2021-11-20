import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { database, storage } from '../config/firebase'

const Profile = (props) => {
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')
    const [held, setHeld] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [bio, setBio] = useState('')
    const [inputFile, setInputFile] = useState(null);
    const [inputImage, setImageFile] = useState(null);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [interest, setInterest] = useState({})
    const [fileUploadButtonLabel, setButtonLabel] = useState('Choose File')

    const userRef = useRef(null) 
    const imageRef = useRef(null)

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

    const changeInterest = (e) => {
        const value = e.target.value
        const checked = e.target.checked

        if(checked) {
            interest[value] = true
        } else {
            interest[value] = false
        }

        setInterest(interest)
    }

    const changeFile = (e) => {
        setFile(e.target.files[0])
        setButtonLabel(e.target.files[0].name)
    }

    const changeImage = (e) => {
        setImage(e.target.files[0])
        const url = URL.createObjectURL(e.target.files[0])
        imageRef.current.src = url
    }

    useEffect(() => {
      setInputFile(document.getElementById("input-file"));
      setImageFile(document.getElementById("input-image"));
      let username = userRef.current.value
      if(username) {
            let niftyRef = database.ref('nifty')
            niftyRef.get().then( (snapshot) => {
                if(snapshot.exists) {
                    const newArry = snapshot.val()
                    if (newArry) {
                        for(let i in newArry) {
                            let oneArry = newArry[i]
                            if(oneArry.username == username) {

                                imageRef.current.src = oneArry.image ? oneArry.image : require('../assets/img/avatar.png').default
                                setPassword(oneArry.password)
                                setStatus(oneArry.status)
                                setHeld(oneArry.held)
                                setEmail(oneArry.email)
                                setRole(oneArry.role)
                                setBio(oneArry.bio)
                                setButtonLabel(oneArry.fileName ? oneArry.fileName : 'Choose file');

                                let interests = JSON.parse(oneArry.interest)
                                setInterest(interests)
                                for(let oneCheck in interests) {
                                    let checkbox = document.getElementById("checkbox_interest_" + oneCheck)
                                    checkbox.checked = interests[oneCheck]
                                }
                                break
                            }
                        }
                    }
                }
            } )
      }
    }, [props.address]);
  
    const handleUpload = () => {
        inputFile?.click();
    };

    const handleImage = () => {
        inputImage?.click()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const jsonOfInteret = JSON.stringify(interest)
        const username = userRef.current.value


        const load = {
            username : username,
            password : password,
            status : status,
            held : held,
            email : email,
            role : role,
            interest : jsonOfInteret,
            bio : bio,
            file : file
        }

        for(let p in load) {
            if(p[1] ===  undefined) {
                window.scrollTo(0, 0)
                NotificationManager.error('An error occurred while typing data. Please reload the page and try again.', 'Error', 5000)
                return
            }
        }

        let fileLink = "";
        let imageLink =  '';
        if(file){
            fileLink = await new Promise((resolve, reject) => {
            const url = "/file/" + file.name;
            storage.ref(url).put(file).then(function(snapshot) {
                storage.ref(url).getDownloadURL().then((link) => {
                    console.log("resolve.......")
                resolve(link)
                }).catch((error) => {
                    console.log("reject.......")
                reject('')
                })
            }).catch((error) => {
                console.log("catch.......")
                reject('')
            })
            })
        }

        load.file = fileLink
        load.fileName = file ? file.name : ''

        if(image) {
            imageLink = await new Promise((resolve, reject) => {
                const imageUrl = "/image/" + image.name;
                storage.ref(imageUrl).put(image).then(function(snapshot) {
                    storage.ref(imageUrl).getDownloadURL().then((link) => {
                        console.log("resolve.......")
                    resolve(link)
                    }).catch((error) => {
                        console.log("reject.......")
                    reject('')
                    })
                }).catch((error) => {
                    console.log("catch.......")
                    reject('')
                })
            })
        }

        load.image = imageLink
        load.imageName = image ? image.name : ''

        let updateFlag = false
        let niftyRef = database.ref('nifty')
            await niftyRef.get().then( (snapshot) => {
                if(snapshot.exists) {
                    const newArry = snapshot.val()
                    if (newArry) {
                        for(let i in newArry) {
                            let oneArry = newArry[i]
                            if(oneArry.username == username) {
                                updateFlag = true
                                if(!file) {
                                    load.file = oneArry.file ? oneArry.file : ''
                                    load.fileName = oneArry.fileName ? oneArry.fileName : ''
                                } 
                                
                                if(!image) {
                                    load.image = oneArry.image ? oneArry.image : ''
                                    load.fileName = oneArry.fileName ? oneArry.fileName : ''
                                }

                                let updates = {}
                                updates['nifty/' + i] = load

                                database.ref().update(updates).then(function(){
                                    window.scrollTo(0, 0)
                                    NotificationManager.success('The data saved successfully.', 'Success', 5000)
                                }).catch(function(error) {
                                    window.scrollTo(0, 0)
                                    NotificationManager.error('The server connection failed. Please make sure if you are connected to the server correctly.', 'Error', 5000)
                                });

                                break
                            }
                        }
                    }
                }
            } )

            if(!updateFlag) {
                const userListRef   = database.ref('nifty')
                const newUserRef    = userListRef.push()
                newUserRef.set(load)  
                window.scrollTo(0, 0)
                NotificationManager.success('The data saved successfully.', 'Success', 5000)
            }
  
        reset()
    }

    const reset = () => {
        setPassword('')
        setStatus('')
        setHeld('')
        setEmail('')
        setRole('')
        setBio('')
        setInputFile(document.getElementById("input-file"));
        setFile(null);
        setInterest({})
        setButtonLabel('Choose File');

        imageRef.current.src = require('../assets/img/avatar.png').default
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
                    <span>Information collected will be used to <br />
                    communicate and collaborate on projects.
                    </span>
                    <input id="input-image" accept="image/*" type="file" name="image" className="d-none" onChange={changeImage} />
                    <img ref={imageRef} src={require('../assets/img/avatar.png').default} onClick={handleImage}/>
                </p>
            </Row>
            <Row className="content">
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Row>
                        <Col lg="4" md="6" sm="12" className="main-col">
                            <Form.Group controlId="formUsername">
                                <Form.Label>Create Username</Form.Label>
                                <Form.Control type="text" ref={userRef} placeholder="Use Wallet Address(default)" defaultValue={props.address ? props.address : ''} required />
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
                                                <Form.Check type="checkbox" label="Artist" className="interest" id="checkbox_interest_A" value="A" onChange={changeInterest} />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestMusician">
                                                <Form.Check type="checkbox" label="Musician" className="interest" id="checkbox_interest_B" value="B" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestWeb">
                                                <Form.Check type="checkbox" label="Web Dev" className="interest" id="checkbox_interest_C" value="C" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestProject">
                                                <Form.Check type="checkbox" label="Project Manager" className="interest" id="checkbox_interest_D" value="D" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestBusiness">
                                                <Form.Check type="checkbox" label="Business Dev" className="interest" id="checkbox_interest_E" value="E" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestGame">
                                                <Form.Check type="checkbox" label="Game Dev" className="interest" id="checkbox_interest_F" value="F" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestMarketing">
                                                <Form.Check type="checkbox" label="Marketing/Promotion" className="interest" id="checkbox_interest_G" value="G" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestData">
                                                <Form.Check type="checkbox" label="Data Analyst" className="interest" id="checkbox_interest_H" value="H" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestCollector">
                                                <Form.Check type="checkbox" label="Collector" className="interest" id="checkbox_interest_I" value="I" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestSmart">
                                                <Form.Check type="checkbox" label="Smart Contracts" className="interest" id="checkbox_interest_J" value="J" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestAI">
                                                <Form.Check type="checkbox" label="AI" className="interest" id="checkbox_interest_K" value="K" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestSocial">
                                                <Form.Check type="checkbox" label="Social Media Manager" className="interest" id="checkbox_interest_L" value="L" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestPhotographer">
                                                <Form.Check type="checkbox" label="Photographer" className="interest" id="checkbox_interest_M" value="M" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestDiscord">
                                                <Form.Check type="checkbox" label="Discord Mod" className="interest" id="checkbox_interest_N" value="N" onChange={changeInterest}  />
                                            </Form.Group>
                                        </Col>
                                        <Col lg="4" md="6" sm="12" className="checkbox-col">
                                            <Form.Group className="mb-3" controlId="formInterestOther">
                                                <Form.Check type="checkbox" label="Other" className="interest" id="checkbox_interest_O" value="O" onChange={changeInterest}  />
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