import React, {  useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

// importing styling
import "./Dashboard.css";

// getting context for further things
import { ItemContext, UniqueId } from "../../App";

export const ArrayToBase64 = (buffer) => {
  let binary = "";
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return window.btoa(binary);
};

const Dashboard = () => {
  const { data, setData } = useContext(ItemContext);
  const { uid, setUid } = useContext(UniqueId);
  const [upload, setUpload] = useState(true);
  console.log(uid);

  // defingin history function
  const history = useHistory();

  const trial = (index) => {
    setUid(index);
    history.push("/item/dash");
  };

  if (data) {
    return (
      <div>
        <div className="container-fluid mainContainer">
          {data
            ? data.map((val, index) => {
                let base64flag = "data:image/jpeg;base64,";
                let imageStr = ArrayToBase64(val.image.data);
                let url = base64flag + imageStr;
                const ind = index;
                return (
                  <Link key={val._id} onClick={trial.bind(this, val._id)}>
                    <div className="addedDiv">
                      <img src={url} />
                      <div className="labelDiv">{val.name}</div>
                    </div>
                  </Link>
                );
              })
            : null}

          <Link to="/item/form">
            <div className="adderDiv">
              <h1>&#x2b;</h1>
            </div>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="loadingDiv">
        <h2>Wait ... Retriving Items!!</h2>
      </div>
    );
  }
};

export default Dashboard;
