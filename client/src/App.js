import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
// styling module
import "./style.css";

import NavBar from "./Component/Nav/NavBar";
import Dashboard from "./Component/Dashboard/Dashboard";
import ItemForm from "./Component/ItemForm.js/ItemForm";
import ItemDash from "./Component/ItemDash/ItemDash";
import Doc from "./Component/Documentation/Doc";

// definining the context variable
export const ItemContext = React.createContext();
export const UniqueId = React.createContext();
const App = () => {
  const [data, setData] = useState();
  const [uid, setUid] = useState("random");

  useEffect(() => {
    const base = process.env.baseURL || "http://localhost:5000/";
    const dataFetch = () => {
      axios
        .get(`${base}item/data`)
        .then((res) => {
          setData(res.data.items);
        })
        // .catch((err) => console.log(err.response.data));
    };
    dataFetch();
    console.log(base);
  }, []);
  return (
    <div>
      <ItemContext.Provider value={{ data, setData }}>
        <UniqueId.Provider value={{ uid, setUid }}>
          <Router>
            <NavBar />
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/item/form" component={ItemForm} exact />
              <Route path="/item/dash" component={ItemDash} exact />
              <Route path="/documentation" component={Doc} exact />
            </Switch>
          </Router>
        </UniqueId.Provider>
      </ItemContext.Provider>
    </div>
  );
};

export default App;
