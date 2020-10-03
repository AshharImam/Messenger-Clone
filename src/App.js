import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";

import "./App.css";
import Message from "./Message";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { username: "Ashhar", text: "Hello" },
    { username: "Shahmir", text: "World" },
  ]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, { username, text: input }]);
    setInput("");
  };
  return (
    <div className="App">
      <h1>
        Messenger Clone{" "}
        <span role="img" aria-labelledby="img">
          🚀🚀🚀
        </span>
      </h1>
      <h1>Hello, {username}</h1>
      <form>
        <FormControl>
          <InputLabel color="secondary">Enter a message...</InputLabel>
          <Input
            color="secondary"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            disabled={!input}
            variant="contained"
            color="secondary"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>

      {messages.map((message) => (
        <Message text={message.text} username={message.username} />
      ))}
    </div>
  );
}

export default App;
