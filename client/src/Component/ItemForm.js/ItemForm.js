import React, { useState } from "react";
import axios from "axios";
// getting history from react-router-dom
import { useHistory } from "react-router-dom";
// adding css component
import "./ItemForm.css";

// importing my modules
import Alerts from "../../Alerts/Alerts";
import SuccessAlert from "../../Alerts/SuccessAlert";

const ItemForm = () => {
  const [name, setName] = useState("");
  const [units, setUnits] = useState("");
  const [sellUnit, setSellUnit] = useState("");
  const [image, setImage] = useState("");
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  // init history variable
  const history = useHistory();

  // data upload items
  const [upload, setUpload] = useState(false);


  const submit = async (e) => {
    e.preventDefault();
    setUpload(true);

    // disablong the scrolling

    const body = {
      name,
      units,
      sellUnit,
      image,
    };
    const json = JSON.stringify(body);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("image", image);
    formData.append("data", json);

    await axios
      .post(`/item/post`, formData, config)
      .then((res) => {
        console.log(res.data);
        setSuccess(res.data);
        //
        if (res.data.errFlag === false) {
          history.push("/");
        }
        window.location.reload();

        //
      })
      .catch((err) => setErr(err.response.data));

    setUpload(false);
  };

  return (
    <div>
      {upload ? (
        <div className="loadingDiv">
          <h2>Wait ... Uploading Data!!</h2>{" "}
        </div>
      ) : null}
      <div className="container-fluid itemFormDiv">
        {err ? <Alerts mainErr={err.msg} /> : null}
        {success ? <SuccessAlert mainErr={success.msg} /> : null}
        <form onSubmit={submit}>
          <div className="formText">
            <label htmlFor="name">Item Name</label>
            <input
              type="text"
              name="name"
              placeholder="Add Name Of The Item Here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="formText">
            <label htmlFor="units">Units</label>
            <input
              type="number"
              name="units"
              placeholder="Add Number Of Item Here"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
            />
          </div>
          <div className="formText">
            <label htmlFor="sell">Selling Rate</label>
            <input
              type="number"
              name="sell"
              placeholder="How Many Units Of This Item Sold(per day) "
              value={sellUnit}
              onChange={(e) => setSellUnit(e.target.value)}
            />
          </div>
          <div className="file">
            <label htmlFor="file">Image (If Required) </label>
            <input
              type="file"
              name="file"
              // placeholder="How Many Units Of This Item Sold(per day) "
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className="formCheck">
            <input
              type="checkbox"
              name="name"
              placeholder="Add Name Of The Item Here"
              // onClick={setMail((val) => (val = !val))}
            />
            <label htmlFor="name">
              <p> </p> Get Notified When Stocks Run Out
            </label>
          </div>
          <input type="submit" value="Add Item" />
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
