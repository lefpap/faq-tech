import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Question from "../components/Question";

function HomePage() {
  return (
    <Container as={`section`} className="my-5">
      <Row className="justify-content-center">
        <Col lg={8} xs={12}>
          <Question
            title="First Question"
            body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis laborum incidunt optio illum.
             Tempore totam porro culpa, quasi praesentium mollitia, hic quidem vel odit aperiam quod reiciendis,
             nobis accusamus doloribus? Est, quae! Ut praesentium veniam eius voluptatibus iste dicta qui temporibus 
             inventore totam earum? Aperiam totam, laborum exercitationem reprehenderit perspiciatis ipsa.
             Illum consequuntur laudantium at possimus? Commodi nulla earum obcaecati."
            user="Lefteris P."
            date="2 days ago"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
