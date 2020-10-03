import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

import "./Message.css";

function Message({ text, username }) {
  return (
    <Card className="message__card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {username}: {text}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Message;
