import React from "react";
import "../App.css";
import fire from "../config/Fire";

export const JokeInput = ({ joke }) => {
  const [content, setContent] = React.useState(joke.content);
  const user = localStorage.user;
  /*   const onUpdate = () => {
    const db = fire.firestore();
    db.collection("users")
      .doc(user)
      .collection("savedjokes")
      .add({ ...joke, content });
  }; */

  const onDelete = () => {
    const db = fire.firestore();
    db.collection("users")
      .doc(user)
      .collection("savedjokes")
      .doc(joke.id)
      .delete();
  };

  return (
    <>
      <h5>{content}</h5>
      <button onClick={onDelete}>Delete</button>
    </>
  );
};
