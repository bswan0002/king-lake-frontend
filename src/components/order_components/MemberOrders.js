import React, { useState, Fragment } from "react";
import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import NumericInput from "react-numeric-input";
import MemberOrderList from "./MemberOrderList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MemberOrders = (props) => {
  const [formInputs, setFormInputs] = useState({
    0: { wine: props.wines[0]?.name, quantity: 1 },
  });

  const [startDate, setStartDate] = useState(new Date());

  const [fetchAgain, setFetchAgain] = useState(1);

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const wineOptions = () => {
    return props.wines.map((wine) => (
      <option key={wine.name}>{wine.name}</option>
    ));
  };

  const getPriceBy = (wineName) => {
    const thisWine = props.wines.find((wine) => wine.name === wineName);
    if (thisWine) {
      const price = thisWine.price.toFixed(2);
      return price && `$${price.slice(0, 2) + price.slice(4)}`;
    }
  };

  const createInputs = () => {
    return Object.keys(formInputs).map((key) => {
      return (
        <Form.Row key={key} className="mt-1">
          <Col xs={5}>
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
          <Col xs={3}>
            <Form.Control
              disabled
              id={`${key}`}
              name="price"
              placeholder={getPriceBy(formInputs[`${key}`]?.wine)}
            />
          </Col>
          <Col xs={3}>
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
    let formInputsCopy = { ...formInputs };
    delete formInputsCopy[e.target.id];
    let newFormInputs = {};
    for (let index = 0; index < Object.keys(formInputs).length - 1; index++) {
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
    fetch("http://localhost:3000/api/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: thisUser.id,
        wines: formInputs,
        pickup_date: startDate,
      }),
    }).then(
      setFormInputs({
        0: { wine: props.wines[0]?.name, quantity: 1 },
      }),
      setStartDate(new Date()),
      setFetchAgain(fetchAgain + 1),
      setIsCreatingOrder(false)
    );
  };

  const getTotal = () => {
    let total = 0;
    Object.keys(formInputs).forEach((index) => {
      let currentWine = props.wines.find(
        (wine) => wine.name === formInputs[index]?.wine
      );
      total += currentWine?.price * formInputs[index]?.quantity;
    });
    return total;
  };

  const currencyFormat = (amount) => {
    if (amount === 0) {
      return "$0";
    } else {
      return `$${amount.toString().slice(0, -2)}.${amount
        .toString()
        .slice(-2)}`;
    }
  };

  const discountTotal = () => {
    return props.membershipLevel === "Platinum"
      ? getTotal() * 0.2
      : getTotal() * 0.15;
  };

  const total = () => {
    return getTotal() - discountTotal();
  };

  return (
    <div>
      {isCreatingOrder ? (
        <Fragment>
          <h2>New Order for Pickup</h2>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <h4>
                For Pickup on:{" "}
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </h4>
            </Form.Row>
            <Form.Row>
              <Col xs={5}>
                <Form.Label as={"h3"}>Wine</Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Label as={"h3"}>Price per Bottle</Form.Label>
              </Col>
              <Col xs={3}>
                <Form.Label as={"h3"}>Quantity</Form.Label>
              </Col>
            </Form.Row>
            {createInputs()}
            <Form.Row className="mt-2">
              <Col xs={5}>
                <Button type="submit">Submit</Button>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <Button onClick={addInput}>Add Wine</Button>
              </Col>
              <Col xs={1} />
            </Form.Row>
            <Form.Row className="mt-2">
              Current Total: {currencyFormat(getTotal())} -{" "}
              {props.membershipLevel} Discount [
              {currencyFormat(discountTotal())}] = {currencyFormat(total())}{" "}
              (before applicable taxes)
            </Form.Row>
          </Form>
        </Fragment>
      ) : (
        <Button onClick={() => setIsCreatingOrder(true)}>New Order</Button>
      )}

      <hr />
      <MemberOrderList
        fetchUserByToken={props.fetchUserByToken}
        fetchAgain={fetchAgain}
      />
    </div>
  );
};

export default MemberOrders;
