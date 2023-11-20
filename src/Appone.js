import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1 className="logo">Far Away</h1>;
}

function Form() {
  return (
    <form className="add-form">
      <h3>What do you nedd for your trip</h3>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      hi
    </div>
  );
}


function Stats() {
  return (
    <div className="stats">
      <footer>
        You have X items on your list and you already packed 0 (0%)
      </footer>
    </div>
  );
}
