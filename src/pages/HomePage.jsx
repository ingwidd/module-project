import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassCards from "../components/ClassCards";

export default function HomePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        navigate("/login")
    }

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    return (
        <div>
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold">
                        Pilate's Studio
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                        <Nav.Link href="#classes">Classes</Nav.Link>
                        <Nav.Link href="#schedule">Schedule</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div 
                className="text-center text-white d-flex flex-column justify-content-center align-items-center"
                style={{ 
                    backgroundColor: "#CFB595",
                    height: "70vh",
                }}
            >
                <h1 className="display-4 fw-bold">Welcome to Pilate's Studio</h1>
                <p className="lead">Find your balance. Book your class today.</p>
                <button className="btn btn-light btn-lg mt-3">Book a Class</button>
            </div>
            <br />
            <ClassCards />
        </div>
    );
}

/* Todo:
1. Add button for making class cards
2. Make sure user's home page cannot add cards
3. Show class schedule
4. When user clicks "Book Now" button, redirect them to a form
*/