import { useContext, useState } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { AuthContext } from "./AuthProvider";

export default function UpdateCardModal({ show, handleClose, lessonId, originalCardTitle, originalCardContent }) {
    const [newCardTitle, setNewCardTitle] = useState(originalCardTitle);
    const [newCardContent, setNewCardContent] = useState(originalCardContent);
    const [newFile, setNewFile] = useState(null);

    const { currentUser, updateCard, deleteCard } = useContext(AuthContext);
    const userId = currentUser?.uid;

    const handleUpdate = async () => {
        if (!userId) return;
        await updateCard (userId, lessonId, newCardTitle, newCardContent, newFile);
        handleClose();
        setNewCardTitle(originalCardTitle);
        setNewCardContent(originalCardContent);
        setNewFile(null);
    };

    const handleDelete = async () => {
        if (!userId) return;
        await deleteCard(lessonId);
        handleClose();
    };

    const handleNewFileChange = (e) => {
        setNewFile(e.target.files[0]);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="cardTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                defaultValue={originalCardTitle}
                                as="textarea"
                                rows={1}
                                onChange={(e) => setNewCardTitle(e.target.value)}
                            />
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                defaultValue={originalCardContent}
                                as="textarea"
                                rows={3}
                                onChange={(e) => setNewCardContent(e.target.value)}
                            />
                            <br />
                            <Form.Control type="file" onChange={handleNewFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    <Button variant="secondary" onClick={handleUpdate}>Update</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}