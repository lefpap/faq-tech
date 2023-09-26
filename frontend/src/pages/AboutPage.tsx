import { Accordion, Col, Container, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <Container className="py-5">
      <Row>
        <Stack as={Col} gap={3} lg={6} className="py-5">
          <section>
            <h3>Purpose of the Application</h3>
            <p>
              This application, FAQTech, is designed to be a hub for tech enthusiasts, professionals, and beginners
              alike to ask questions and share knowledge. Our primary goal is to foster a community where users can seek
              answers to their tech-related queries and also contribute by answering questions based on their expertise.
              By bridging the gap between those who seek knowledge and those who wish to share it, we aim to make the
              tech world a bit more accessible to everyone.
            </p>
          </section>
          <section>
            <h3>Why to Join?</h3>
            <p>
              By signing up for FAQTech, you're not just joining a Q&A platform, you're becoming a part of a thriving
              tech community. Here are some reasons why you should sign up:
            </p>
            <ol>
              <li>
                <strong>Give and Share Knowledge:</strong>
                <br /> Answer questions that you know to help others with their problems or ask questions to get help.
              </li>
              <br />
              <li>
                <strong>Stay Updated:</strong> <br /> Get notifications on the latest answers to your questions.
              </li>
              <br />
              <li>
                <strong>Connect:</strong> <br />
                Connect with other tech enthusiasts and professionals from around the world.
              </li>
            </ol>
          </section>
        </Stack>
        <Col lg={6} className="py-5">
          <h3>Help</h3>
          <Accordion>
            <Accordion.Item as="section" eventKey="0">
              <Accordion.Header>Getting Started</Accordion.Header>
              <Accordion.Body>
                <p>If you're new to FAQTech, here's how to get started:</p>
                <ul>
                  <li>
                    <strong>With no account:</strong> <br />
                    You can view questions and answers freely. But you will not be able to ask or answer.
                  </li>
                  <li>
                    <strong>Create Account: </strong> <br />
                    Create an account to be able to ask or answer
                  </li>
                  <li>
                    <strong>Ask a Question:</strong>
                    <br />
                    Click on the 'Ask Question' button and fill in the details then submit.
                  </li>
                  <li>
                    <strong>Answer Questions:</strong>
                    <br />
                    Browse through the list of unanswered questions and share your knowledge.
                  </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item as="section" eventKey="1">
              <Accordion.Header>How to Register?</Accordion.Header>
              <Accordion.Body>
                <p>Signing up for FAQTech is a straightforward process:</p>
                <ol>
                  <li>Click on the 'Register' button located at the top right corner of the homepage.</li>
                  <br />
                  <li>Fill in the required details and add a secure password.</li>
                  <br />
                  <li>
                    You can use the{" "}
                    <Link to={"https://simplepush.io/"} target="_blank">
                      simplepush.io
                    </Link>{" "}
                    to get notifications on questions and answers to your questions.
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item as="section" eventKey="2">
              <Accordion.Header>Troubleshooting Common Issues</Accordion.Header>
              <Accordion.Body>
                <p>Facing issues? Here are some common problems and their solutions:</p>
                <ol>
                  <li>
                    <strong>Can't Log In:</strong>
                    <br /> Ensure you're using the correct username and password. If you've forgotten your password,
                    send an email to p16pap1@ionio.gr
                  </li>

                  <li>
                    <strong>Not Receiving Notifications:</strong>
                    <br />
                    Check your simplepush.io key if it is set correctly. Make sure that you have not exceed the maximum
                    notification count per month.
                  </li>
                  <li>
                    <strong>Question Not Getting Answers:</strong>
                    <br />
                    Make sure your question is clear and detailed.
                  </li>
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutPage;
