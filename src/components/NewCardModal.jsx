import { useState, useContext } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from "./AuthProvider";

export default function NewCardModal({ show, handleClose }) {
    const [cardTitle, setCardTitle] = useState("");
    const [cardContent, setCardContent] = useState("");
    const [file, setFile] = useState(null);
    const { currentUser, saveCard } = useContext(AuthContext);
    const userId = currentUser?.uid;

    const handleSave = () => {
        if (userId) {
            saveCard(cardTitle, cardContent, file);
            handleClose();
            setCardTitle("");
            setCardContent("");
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new class</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="cardTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={cardTitle}
                            onChange={(e) => setCardTitle(e.target.value)}
                            type="text"
                            placeholder="e.g. Advanced Flow"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="cardContent">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={cardContent}
                            onChange={(e) => setCardContent(e.target.value)}
                            placeholder="Describe the class"
                        />
                    </Form.Group>
                    <Form.Group controlId="cardImage">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}