import{
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth"
import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginImage from '../assets/loginImage.jpg'
import { useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider"

export  default function LoginPage() {
    const [showModal, setShowModal] = useState(false);
    const handleShowSignUp = () => setShowModal(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext)

    const handleClose = () => setShowModal(null);

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
        const res =  await createUserWithEmailAndPassword(
            auth,
            username,
            password
        )
        console.log(res.user);
        } catch (error) {
        console.error(error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, username, password)
        } catch (error) {
            console.error("Status:", error.response?.status);
            console.error("Error data:", error.response?.data);
            console.error("Full error:", error);
        }
    };

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = async(e) => {
        e.preventDefault();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundImage: `url(${loginImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="card p-4 shadow" style={{ width: "520px" }}>
                <h3 className="text-center mb-4">Welcome to Pilate's Studio</h3>
                <form>
                <div className="mb-3">
                    <input type="email" className="form-control" id="email" placeholder="Enter email" />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mb-4" onClick={handleLogin}>
                    Login
                </button>

                <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-2 text-muted">Don't have an account?</span>
                    <hr className="flex-grow-1" />
                </div>
                <button type="button" className="btn btn-outline-secondary w-100" onClick={handleShowSignUp}>
                    Sign Up
                </button>

                </form>
            </div>

            <Modal
                show={showModal}
                onHide={handleClose}
                animation={false}
                centered
            >
                <Modal.Body>
                    <h4 className="mb-4" style={{ fontWeight: "bold", textAlign: "center" }}>Create your account</h4>
                    <Form className="d-grid gap-2 px-5" onSubmit={handleSignUp}>
                        <Form.Group className='mb-3' controlId="formBasicEmail">
                            <Form.Control
                                onChange={(e) => setUsername(e.target.value)}
                                type="email"
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group className='mb-3' controlId="formBasicPassword">
                            <Form.Control
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <button className="btn btn-primary">Sign up</button>
                        <div className="d-flex align-items-center mb-3">
                            <hr className="flex-grow-1" />
                            <span className="mx-2 text-muted">or</span>
                            <hr className="flex-grow-1" />
                        </div>
                        <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                            <i className="bi bi-google"></i> Sign up with Google
                        </Button>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
}
