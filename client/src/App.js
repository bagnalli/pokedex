import "./App.css";
import { NavBar } from "./components/NavBar";
import { Pokemon } from "./components/Pokemon";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Pokemon />
    </div>
  );
}

export default App;
