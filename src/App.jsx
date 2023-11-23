import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "charger", quantity: 1, packed: false },
];

export default function App() {
  const [item, setItem] = useState([]);

  function handleAddItem(item) {
    setItem((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {

    const confirmed = window.confirm("are you shure about that")

  if(confirmed) setItem([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItem} />
      <PackingList
        item={item}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList = {handleClearList}
      />
      <Stats items={item} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo">Far Away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItems(newItem);
    console.log(newItem);

    setDescription("");
    setQuantity("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Item..."
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ item, onDeleteItem, onToggleItem,  onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = item;

  if (sortBy === "description")
    sortedItems = item
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));


  if (sortBy === "packed")
    sortedItems = item.slice().sort((a, b) => Number(a.packed) - Number(b.packed));



    
  return (
    <div className="list"> 
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">sort by Item</option>
          <option value="description"> sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={ onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItem = items.length;
  const packedItem = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItem / numItem) * 100);

  if (!items.length)
    return (
      <em className="stats">Start packing your items for the adventure</em>
    );

  return (
    <div className="stats">
      <footer>
        <em>
          {percentage === 100
            ? "You already packed everything you need"
            : `You have ${numItem} items on your list, and you already packed ${packedItem} (${percentage.toFixed(
                2
              )}%)`}
        </em>
      </footer>
    </div>
  );
}
