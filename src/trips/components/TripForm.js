import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const TripForm = ({ trip, handleSubmit, handleChange, cancelPath, maxLength }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Group controlId="destination">
      <Form.Label>Trip Title</Form.Label>
      <Form.Control
        type="text"
        required
        maxLength="30"
        placeholder="Destination"
        name="destination"
        onChange={handleChange}
        value={trip.destination}
      />
    </Form.Group>
    <Form.Group controlId="transportation">
      <Form.Label>Transportation Costs</Form.Label>
      <Form.Control
        type="number"
        required
        min="0"
        max="9999"
        placeholder="$$"
        name="transportation"
        onChange={handleChange}
        value={trip.transportation}
      />
    </Form.Group>
    <Form.Group controlId="lodging">
      <Form.Label>Lodging Costs</Form.Label>
      <Form.Control
        type="number"
        required
        min="0"
        max="9999"
        placeholder="$$"
        name="lodging"
        onChange={handleChange}
        value={trip.lodging}
      />
    </Form.Group>
    <Form.Group controlId="costs">
      <Form.Label>Other Expenses</Form.Label>
      <Form.Control
        type="number"
        required
        min={0}
        max={9999}
        placeholder="$$"
        name="costs"
        onChange={handleChange}
        value={trip.costs}
      />
    </Form.Group>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Link to={cancelPath}>
      <Button>Go Back</Button>
    </Link>
  </Form>
)

export default TripForm
