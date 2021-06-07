import { useState } from "react";
import {
  Alert,
  Col,
  Container,
  Row,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";

const Weather = () => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  const formatTitle = (title) => title.charAt(0).toUpperCase() + title.slice(1);

  const removeCard = (id) => {
    const newArray = cards.filter((item) => item.id !== id);
    setCards(newArray);
  };

  const getTempature = async (city) => {
    const { data } = await axios.get(`/api/get-temp/${city}`);
    return data.temp;
  };

  const addElement = async () => {
    const inputForm = document.getElementById("input");

    if (inputForm.value) {
      try {
        const title = formatTitle(inputForm.value);
        const temp = await getTempature(title);

        const body = `The tempature is ${temp}\xB0C.`;

        inputForm.value = "";
        setError(false);

        const newArray = cards.concat({
          id: uuidv1(),
          title: title,
          body: body,
        });

        setCards(newArray);
      } catch (err) {
        inputForm.value = "";
        setError(true);
      }
    }
  };

  return (
    <div>
      <Container className="mt-4">
        {error && (
          <Alert variant="danger">
            <strong>404 Error:</strong> City not found
          </Alert>
        )}

        <Row>
          {cards &&
            cards.map((card) => (
              <Col key={card.id} sm={12} md={4}>
                <Card className="mb-3 bg-success text-white">
                  <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.body}</Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => removeCard(card.id)}
                      className="mt-4"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}

          <Col sm={12} md={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Add City</Card.Title>
                <Card.Text>
                  <Form>
                    <Form.Group
                      as={Row}
                      className="ml-0 mr-0 mb-4"
                      controlId="test"
                    >
                      <Form.Control type="text" id="input" />
                    </Form.Group>
                  </Form>
                </Card.Text>
                <Button variant="success" onClick={() => addElement()}>
                  Submit
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Weather;
