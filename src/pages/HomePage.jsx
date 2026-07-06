import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Button, Card, Col, Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ClassCards from "../components/ClassCards";
import NewCardModal from "../components/NewCardModal";

export default function HomePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser, lessons } = useContext(AuthContext);
    const [showNewCardModal, setShowNewCardModal] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/login");
        }
    }, [currentUser, navigate]);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    const handleSchedule = async () => {
        navigate('/schedule');
    }

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
                        <Nav.Link>Schedule</Nav.Link>
                        <Nav.Link>Pricing</Nav.Link>
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
            <h2 style={{ marginLeft: "50px" }}>Our Classes</h2>
            <Container className="my-4">
                <div className="row" style={{ margin: "0 -5px" }}>
                    {lessons.map((lesson) => (
                        <ClassCards key={lesson.id} lesson={lesson} />
                    ))}

                    <Col md={6} lg={4} className="mb-0" style={{ padding: "0 5px" }}>
                        <Card
                            className="shadow h-100 d-flex align-items-center justify-content-center"
                            style={{ minHeight: "220px", cursor: "pointer", borderStyle: "dashed", borderWidth: "2px", marginBottom: "10px" }}
                            onClick={() => setShowNewCardModal(true)}
                        >
                            <Card.Body className="text-center">
                                <div className="display-1 text-muted">+</div>
                                <p className="mt-2 mb-0">Add another class</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>
            </Container>

            <NewCardModal
                show={showNewCardModal}
                handleClose={() => setShowNewCardModal(false)}
            />
        </div>
    );
}

/* Todo:
1. Add button for making class cards
2. Make sure user's home page cannot add cards
3. Show class schedule
4. When user clicks "Book Now" button, open a form modal
*/