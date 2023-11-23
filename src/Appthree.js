import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {

  const [items, setItems] = useState([]);
  

  function handleAddItem(item) {
    setItems((items) => [...items, item])
  }


  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => (
        item.id !== id
    )))
  }


  function handleToggleItem(id) {
    setItems((items) => items.map((item) => (
      item.id === id ? {...item, packed: !item.packed} : item
    )))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem}  />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo">Far Away</h1>;
}

function Form({onAddItem}) {

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;


    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    }


    onAddItem(newItem);
    console.log(newItem);

    setDescription("");
    setQuantity("");

  }


  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
        <select value={quantity} onChange={(e) =>setQuantity(Number(e.target.value))}>
          {Array.from({length: 20}, (_, i) => i +1).map((num) =>
            <option  value={num} key={num}>{num}</option>
          )}
        </select>
      <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList({items,  onDeleteItem, onToggleItem}) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id}  onDeleteItem={ onDeleteItem} onToggleItem={onToggleItem} />
        ))}
      </ul>

      
    </div>
  );
}

function Item({ item,  onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() =>  onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length
  const percentage = Math.round((numPacked / numItems) * 100)

  if(!items.length) return (
    <em className="stats"> "Start add items to your list for your trip"</em>
  )

  return (
     <footer className="stats">
      <em>

       {percentage === 100 ? "you have everything what you need ane ready to trip" :
       ` You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
        </em>
     </footer>
  )
}