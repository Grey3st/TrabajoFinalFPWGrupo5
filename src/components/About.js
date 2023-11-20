import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import data from "../data/aboutUs.json";
import { Container } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{data[0].nombre}</Card.Title>
          <Card.Text>
            {data[0].hobby}
          </Card.Text>
          <Button variant="primary" href={data[0].link}>Link al Repositorio</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{data[1].nombre}</Card.Title>
          <Card.Text>
            {data[1].hobby}
          </Card.Text>
          <Button variant="primary" href={data[1].link}>Link al Repositorio</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{data[2].nombre}</Card.Title>
          <Card.Text>
            {data[2].hobby}
          </Card.Text>
          <Button variant="primary" href={data[2].link}>Link al Repositorio</Button>
        </Card.Body>
      </Card>

      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{data[3].nombre}</Card.Title>
          <Card.Text>
            {data[3].hobby}
          </Card.Text>
          <Button variant="primary" href={data[3].link}>Link al Repositorio</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default About;