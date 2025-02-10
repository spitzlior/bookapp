	import React from "react";
import ReactDOM from "react-dom";
import BookManager from "./BookManager";
import "./index.css"; // אופציונלי, אם תרצה להוסיף עיצוב

ReactDOM.render(
  <React.StrictMode>
    <BookManager />
  </React.StrictMode>,
  document.getElementById("root")
);
