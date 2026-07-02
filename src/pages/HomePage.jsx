import { getAuth } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../components/AuthProvider";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function HomePage() {
    const auth = getAuth();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        navigate("/login");
    }

    const handleLogout = () => {
        auth.signOut();
        navigate("/login");
    };

    return (
        <>
            <Container>
                <Row>
                    <SideBar onLogout={handleLogout} />
                </Row>
            </Container>
        </>
    );
}