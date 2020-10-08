import React, { useEffect, useState } from "react";
import { FormControl, Input, IconButton, Link } from "@material-ui/core";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";

import "./App.css";
import Message from "./Message";
import db from "./firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  const handleSignIn = () => {
    setUsername(prompt("Please enter your name"));
  };
  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2019/10/Messenger_Logo_Color_RGB.png?w=100&h=100"
        alt=""
      />
      <h1>
        Messenger Clone{" "}
        <span role="img" aria-labelledby="img">
          🚀🚀🚀
        </span>
      </h1>
      <h1>
        Hello,{" "}
        {username || (
          <span className="app_signIn" onClick={handleSignIn}>
            <u>Sign in</u>
          </span>
        )}
      </h1>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__formInput"
            placeholder="Enter a message..."
            color="secondary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__formIconButton"
            disabled={!input || !username}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove className="app__messages">
        {messages.map(({ id, message }) => (
          <Message key={id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
