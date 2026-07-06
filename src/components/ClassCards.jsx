import { Image, Button, Card, Col } from 'react-bootstrap';
import beginnerImg from '../assets/beginnerImg.jpg';
import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import NewCardModal from './NewCardModal';
import UpdateCardModal from './UpdateCardModal';

export default function ClassCards({ lesson }) {
    const { title, content, id: lessonId, imageUrl } = lesson;
    const { currentUser, deleteCard } = useContext(AuthContext);
    const userId = currentUser?.uid;

    const [showNewCardModal, setShowNewCardModal] = useState(false);
    const handleCloseNewModal = () => setShowNewCardModal(false);
    const handleShowNewModal = () => setShowNewCardModal(true);

    const [showUpdateCardModal, setShowUpdateCardModal] = useState(false);
    const handleShowUpdateModal = () => setShowUpdateCardModal(true);
    const handleCloseUpdateModal = () => setShowUpdateCardModal(false);

    const handleDelete = () => {
        deleteCard(lessonId);
    };

    return (
        <Col md={6} lg={4} className="mb-0" style={{ padding: "0 5px" }}>
            <div 
                style={{
                    border: "1px solid #ccc",
                    padding: "12px",
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "10px"
                }}
            >
                {imageUrl && <Image src={imageUrl} style={{ width: "100%", borderRadius: "4px" }}/>}
                <h4 className='my-2'>{title}</h4>
                <p>{content}</p>
                <Button variant='secondary' style={{ width: "100%" }}>Book a class</Button>
                <Button variant='outline-secondary' className='mt-2' style={{ width: "100%" }} onClick={handleShowUpdateModal}>Edit class</Button>
            </div>

            <NewCardModal
                show={showNewCardModal}
                handleClose={handleCloseNewModal}
            />

            <UpdateCardModal
                show={showUpdateCardModal}
                handleClose={handleCloseUpdateModal}
                lessonId={lessonId}
                originalCardTitle={title}
                originalCardContent={content}
            />
        </Col>
    );
}