import { Button, Card, Row, Col, Container } from 'react-bootstrap';
import beginnerImg from '../assets/beginnerImg.jpg';


export default function ClassCards() {
    return (
        <Container className="my-4" id="classes">
        <h2 className="mb-4">Our Classes</h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="shadow h-100">
              <Card.Img variant="top" src={beginnerImg} alt="Beginner Pilates" />
              <Card.Body className="text-center">
                <Card.Title>Beginner Pilates</Card.Title>
                <Card.Text>Perfect for newcomers to build core strength.</Card.Text>
                <Button variant="light" className="w-100">Book Class</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
}