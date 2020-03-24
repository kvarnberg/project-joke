import React from "react";
import "../App.css";
import firebase from "firebase";
import { JokeInput } from "./JokeInput";

function Jokes() {
  const [jokes, setJokes] = React.useState([]);
  const [newJokeContent, setNewJokeContent] = React.useState("");
  const user = localStorage.user;

  React.useEffect(() => {
    const db = firebase.firestore();
    return db
      .collection("users")
      .doc(user)
      .collection("savedjokes")
      .onSnapshot(snapshot => {
        const jokesData = [];
        snapshot.forEach(doc => jokesData.push({ ...doc.data(), id: doc.id }));
        setJokes(jokesData);
      });
  }, [user]);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(user)
      .collection("savedjokes")
      .add({ content: newJokeContent });
  };

  return (
    <ul>
      <input
        value={newJokeContent}
        onChange={e => setNewJokeContent(e.target.value)}
      />
      <button onClick={onCreate}>Add</button>
      {jokes.map(joke => (
        <li key={joke.id}>
          <JokeInput joke={joke} />
        </li>
      ))}
    </ul>
  );
}

export default Jokes;
