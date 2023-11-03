import "./App.scss";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Lastest from "./components/Lastest";

function App() {
  return (
    <div>
      <Navbar />
      <Lastest />
      <Home />
    </div>
  );
}

export default App;
