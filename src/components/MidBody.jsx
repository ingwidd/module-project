import { Card, Row, Col } from "react-bootstrap";
import React from "react";

export default function MidBody() {
    return (
        <Row>
            <Col sm={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Reformer Foundations (Beginner)</Card.Title>
                        <Card.Text>
                            This class is designed for beginners who are new to Pilates and want to learn the fundamentals of the Reformer machine. Participants will learn proper alignment, breathing techniques, and basic exercises to build a strong foundation for their Pilates practice.
                        </Card.Text>
                        <button type="button" class="btn btn-secondary btn-sm">Book Now</button>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={6}>
                <Card>
                    <Card.Body>
                        <Card.Title>Reformer Strength (Intermediate)</Card.Title>
                        <Card.Text>
                            This class is designed for those who have some experience with Pilates and want to challenge themselves with more advanced exercises on the Reformer. Participants will focus on building strength, improving flexibility, and enhancing their overall Pilates technique.
                        </Card.Text>
                        <button type="button" class="btn btn-secondary btn-sm">Book Now</button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}