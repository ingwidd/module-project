import { Button, Col } from "react-bootstrap";
import IconButton from "./IconButton";
import { useState } from "react";

export default function SideBar({ handleLogout }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Col sm={2}
            className="d-flex flex-column justify-content-start align-items-start bg-light"
            style={{ position: "sticky", top: 0 }}
        >
            <IconButton className="bi bi-house" text="Home"isTop />
            <IconButton className="bi bi-bell" text="Notifications" />
            <IconButton className="bi bi-person" text="Profile" />
            <IconButton className="bi bi-box-arrow-right" text="Logout" onClick={handleLogout} />
        </Col>
    )
}