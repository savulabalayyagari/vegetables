import * as React from 'react';

function App() {
  
  const [searchText, setSearchText] = React.useState('');

 
  React.useEffect(() => {
    localStorage.setItem('searchText', searchText);
    const currentCount = parseInt(localStorage.getItem('searchCount') || '0', 10);
    
    if (searchText !== '') {
      localStorage.setItem('searchCount', currentCount + 1);
    }
  }, [searchText]);

  
  React.useEffect(() => {
    if (!localStorage.getItem('firstRender')) {
      localStorage.setItem('firstRender', new Date().toISOString());
    }
  }, []);

  const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <List lis={filteredProducts} />
    </>
  );
}

function Search({ searchText, setSearchText }) {
  const handleChange = (e) => setSearchText(e.target.value);

  return (
    <div>
      <h2>Fruits & Vegetables</h2>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
      />
      <label>
        <input type="checkbox" />{' '}
        Only show products in stock
      </label>
      <hr />
    </div>
  );
}

function List({ lis }) {
  return (
    <ul>
      {lis.map((item) => (
        <Item key={item.name} item={item} />
      ))}
    </ul>
  );
}

function Item({ item }) {
  return (
    <li>
      <span>{item.stocked ? '✅' : '❌'}</span>
      <span> {item.name} </span>
      <span> {item.price} </span>
      <span> {item.category}</span>
    </li>
  );
}

export default App;



