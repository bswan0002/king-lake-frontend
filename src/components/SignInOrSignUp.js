import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignInOrSignUp = ({ formType, handleSubmit }) => {
  let history = useHistory();
  return (
    <Container className="mt-4">
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
          history.push("/");
        }}
        style={{ padding: "5px" }}
      >
        <h2>{formType}</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="nav-search"
            name="email"
            type="email"
            placeholder="Email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="nav-search"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};
export default SignInOrSignUp;
