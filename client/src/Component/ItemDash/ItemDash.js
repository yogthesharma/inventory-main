import React, { useContext, useState } from "react";
import "./ItemDash.css";
import { useHistory } from "react-router-dom";

// improting axios
import axios from "axios";

// importing bootstrap essentials
import { Card, Button } from "react-bootstrap";

// impoting context
import { ItemContext, UniqueId } from "../../App";
import { ArrayToBase64 } from "../Dashboard/Dashboard";

const ItemDash = (prop) => {
  // making history function
  const history = useHistory();

  const { data, setData } = useContext(ItemContext);
  const { uid, setUid } = useContext(UniqueId);
  const [upload, setUpload] = useState(false);

  const base = process.env.baseURL || "http://localhost:5000";

  // let specificValue = data.find((x) => x._id === uid);
  // console.log(specificValue);

  if (uid === "random") {
    history.push("/");
  }

  const moveHandler = () => {
    history.push(`/item/form`);
  };

  const deleteHandler = async () => {
    setUpload(true);
    if (uid) {
      console.log(uid);
      await axios
        .delete(
          `${base}item/delete`,

          {
            headers: {
              "Content-Type": "application/json",
            },
            data: {
              _id: uid,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          history.push("/");
          window.location.reload();
        })
        .catch((err) => console.log(err.response.data));
    } else {
      alert("Unable To Delete Item At The Moment");
    }
    setUpload(false);
  };

  if (data) {
    console.log(data);
    console.log(uid);
    let specificValue = data.find((x) => x._id === uid);
    const url =
      "data:image/jpeg;base64," + ArrayToBase64(specificValue.image.data);

    if (upload) {
      return (
        <div className="loadingDiv">
          <h2>Wait ... Deleting Item!!</h2>
        </div>
      );
    }

    return (
      <div>
        <div className="itemDash">
          <Card
            className="cardDiv container-fluid"
            style={{ minWidth: "1rem", minHeight: "1rem" }}
          >
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Img variant="top" src={url} />
              <Card.Title>{specificValue.name}</Card.Title>
              <Card.Text>
                <h7>Units Sold On Daily Basis: {specificValue.sellUnit}</h7>
                <br />
                <h7>Total Units: {specificValue.units}</h7>
                <br />
                <h7>
                  Days Remaining:{" "}
                  {Math.round(specificValue.units / specificValue.sellUnit)}{" "}
                  Days
                </h7>
              </Card.Text>
              <Button onClick={deleteHandler} variant="dark">
                Delete Item
              </Button>{" "}
              <Button onClick={moveHandler} variant="dark">
                Add Item
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
};

export default ItemDash;
