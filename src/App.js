import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import carrion_crawler from "./kitties/carrion_crawler.jpg";
import cockatrice from "./kitties/cockatrice.jpg";
import imp from "./kitties/imp.jpg";
import quasit from "./kitties/quasit.jpg";

function App() {
  const monsters = [
    {
      name: "Carrion Crawler",
      src: carrion_crawler,
      price: 1000,
      quantity: 1,
    },
    {
      name: "Cockatrice",
      src: cockatrice,
      price: 3000,
      quantity: 1,
    },
    {
      name: "Imp",
      src: imp,
      price: 300,
      quantity: 1,
    },
    {
      name: "Quasit",
      src: quasit,
      price: 500,
      quantity: 1,
    },
  ];

  const [cart, setCart] = React.useState([]);

  const sendToCart = (index) => {
    setCart([...cart, monsters[index]]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/cart">
            <ShoppingCart onAddedToCart={cart} />
          </Route>
          <Route path="/Shop">
            <ShopItems onMonsters={monsters} onAdd={sendToCart} />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the monster store!</h1>
    </div>
  );
};

const ShopItems = (props) => {
  const monsters = props.onMonsters;

  const addToCart = (index) => {
    props.onAdd(index);
  };

  return (
    <div className="monsterContainer">
      {monsters.map(({ src, name, price }, index) => (
        <div className="monsters" key={name}>
          <img src={src} alt={name}></img>
          <p>
            {name}, {price}gp
          </p>
          <button onClick={() => addToCart(index)}>Add to cart</button>
        </div>
      ))}
    </div>
  );
};

const ShoppingCart = (props) => {
  const monsters = props.onAddedToCart;

  const [cart, setCart] = React.useState(monsters);

  const [cost, setCost] = React.useState(0);

  const FindCost = () => {
    let foo = 0

    for (let i = 0; i < monsters.length; i++) {
      foo += monsters[i].price*monsters[i].quantity
      setCost(foo)
    }

    return (
      <div>{cost}</div>
    )

  };


  const moreMonsters = (num, index) => {
    monsters[index].quantity = num;
    setCart(monsters);
    console.log(monsters[index]);
  };

  return (
    <div>
      <h1>View your selected kitties here!</h1>
      <FindCost />
      {/* {cost} */}

      {cart.map(({ src, name, quantity, price }, index) => (
        <div className="monsters" key={index}>
          <img src={src} alt={name}></img>
          <p>
            {name}, {quantity}, {price}gp
          </p>
          <input
            type="number"
            min="1"
            max="5"
            value={quantity}
            onChange={(event) => moreMonsters(event.target.value, index)}
          ></input>
        </div>
      ))}
    </div>
  );
};

export default App;
