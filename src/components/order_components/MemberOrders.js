import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import NumericInput from "react-numeric-input";

const MemberOrders = (props) => {
  const [formInputs, setFormInputs] = useState({
    0: { wine: props.wines[0]?.name, quantity: 1 },
  });

  const wineOptions = () => {
    return props.wines.map((wine) => (
      <option key={wine.name}>{wine.name}</option>
    ));
  };

  const createInputs = () => {
    console.log(formInputs);
    return Object.keys(formInputs).map((key) => {
      console.log(key);
      return (
        <Form.Row key={key} className="mt-1">
          <Col xs={7}>
            <Form.Control
              id={`${key}`}
              name="wine"
              as="select"
              value={formInputs[`${key}`]?.wine}
              onChange={handleChange}
            >
              {wineOptions()}
            </Form.Control>
          </Col>
          <Col xs={4}>
            <NumericInput
              className="form-control"
              id={`${key}`}
              name="quantity"
              value={formInputs[`${key}`]?.quantity}
              onChange={handleQuantityChange}
            />
          </Col>
          <Col xs={1} className="icon-col">
            <FontAwesomeIcon
              id={`${key}`}
              onClick={removeInput}
              icon={faMinusSquare}
              size="lg"
              className="x-icon"
            />
          </Col>
        </Form.Row>
      );
    });
  };
  const addInput = () => {
    setFormInputs({
      ...formInputs,
      [Object.keys(formInputs).length]: {
        wine: props.wines[0].name,
        quantity: 1,
      },
    });
  };

  const removeInput = (e) => {
    console.log(e.target.id);
    let formInputsCopy = { ...formInputs };
    delete formInputsCopy[e.target.id];
    let newFormInputs = {};
    for (let index = 0; index < Object.keys(formInputsCopy).length; index++) {
      if (index < e.target.id) {
        newFormInputs[index] = formInputsCopy[index];
      } else {
        newFormInputs[index] = formInputsCopy[index + 1];
      }
    }
    setFormInputs(newFormInputs);
  };

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.id]: {
        ...formInputs[e.target.id],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleQuantityChange = (valNum, valStr, inputElement) => {
    console.log(valNum, valStr, inputElement.id);
    setFormInputs({
      ...formInputs,
      [inputElement.id]: {
        ...formInputs[inputElement.id],
        quantity: valNum,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let thisUser = await props.fetchUserByToken();
    console.log(thisUser.id, formInputs);
    fetch("http://localhost:3000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: thisUser.id,
        wines: formInputs,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <h2>New Order for Pickup</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col xs={7}>
            <Form.Label as={"h3"}>Wine</Form.Label>
          </Col>
          <Col>
            <Form.Label as={"h3"}>Quantity</Form.Label>
          </Col>
        </Form.Row>
        {createInputs()}
        <Form.Row className="mt-1 d-flex justify-content-between">
          <Button type="submit">Submit</Button>
          <Button onClick={addInput}>Add Wine</Button>
        </Form.Row>
      </Form>
    </div>
  );
};

export default MemberOrders;
