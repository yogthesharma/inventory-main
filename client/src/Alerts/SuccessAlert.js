import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Alerts = (prop) => {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="success">
        <Alert.Heading>Success!!</Alert.Heading>
        <p>{prop.mainErr}</p>
      </Alert>
    );
  }
};

export default Alerts;
