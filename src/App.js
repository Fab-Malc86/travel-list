import { useState } from "react";

const number = [4, 2, 6, 3, 1, 5]

console.log(number.sort((a, b) => b - a));


// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItem] = useState([])
  const [packed, setPacked] = useState(false)

  function handleAddItems(item) {
    setItem(items => [...items, item])
  }

  function handleDeleteItem(id) {
    setItem(items => items.filter(item => item.id !== id))
  }

  function handlePackedItem(id) {



    setItem(items => items.map((item) => item.id === id ? { ...item, packed: !item.packed } : item))
    // items.map((item) => item.id === id ? { ...item, packed: packed } : item)
  }

  return (
    <div className='app'>
      <Logo />
      <Form items={items} setItem={setItem} handleAddItems={handleAddItems} />
      <PackingList items={items} setItem={setItem} handlePackedItem={handlePackedItem} handleDeleteItem={handleDeleteItem} />
      <Stats items={items} />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far Away 🌊</h1>
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)





  function handleSubmit(e) {
    e.preventDefault()

    if (description) {
      const newItem = { description, quantity, packed: false, id: Date.now() }

      handleAddItems(newItem)

      setDescription("")
      setQuantity(1)

    }

  }



  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>Whot do you need for your 😍 trip?</h3>
      <select onChange={(e) => setQuantity(Number(e.target.value))} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>{num}</option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}

function PackingList({ items, setItem, handleDeleteItem, handlePackedItem }) {
  const [sortBy, setSortBy] = useState('input')
  let sortedItem

  if (sortBy === 'input') {
    sortedItem = items
  }

  if (sortBy === 'description') {
    sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  }

  if (sortBy === 'packed') {
    sortedItem = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))
  }

  return <div className='list'>
    <ul>
      {sortedItem.map(item => <Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} handlePackedItem={handlePackedItem} />)}
    </ul>
    <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed</option>
      </select>
      <button>Clear</button>
    </div>
  </div>
}

function Item({ item, handleDeleteItem, handlePackedItem }) {


  return <li>
    <input type="checkbox" onChange={() => handlePackedItem(item.id)}></input>
    <span style={item.packed ? { textDecoration: 'line-through' } : { textDecoration: 'none' }}>{item.quantity} {item.description}</span>
    <button onClick={() => handleDeleteItem(item.id)}>❌</button>
  </li >
}

function Stats({ items }) {
  if (!items.length) return <footer className="stats"><em>Start Adding some items to your packing list 💣</em></footer>

  const itemPacked = items.filter(item => item.packed).length
  const percentual = itemPacked ? Math.floor(itemPacked * 100 / items.length) : '0'


  return (
    <footer className='stats'>
      {percentual === 100 ?
        <em>You got everything. Ready to go!</em> :
        <em>You have {items.length} items on your list, and you alredy packed {itemPacked >= 1 ? itemPacked : 'nothing'} ({percentual} %)</em>
      }


    </footer>
  )
}