import React, { useState } from "react";
import Login from "./Login";
import Messages from "./Messages";
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";


// const userName = 'User ' + parseInt(Math.random() * 10)
function App() {

  // const [myname, setMyname] = useState("");
  // const user1 =(name)=> {
  //    setMyname(name);
  // }

  return <Login></Login>;
};

export default App;

// user1={user1}
// name={myname}