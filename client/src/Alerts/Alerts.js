import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Alerts = (prop) => {
  const [show, setShow] = useState(true);
  if (show) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>{prop.mainErr}</p>
      </Alert>
    );
  }
};

export default Alerts;
