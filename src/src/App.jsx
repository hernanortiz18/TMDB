import { useState } from "react";
import "./App.scss";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="formComponent">
      <form action="">
        <label htmlFor="name" className="singUp">
          Name
        </label>
        <input type="text" id="nameInput" />
        <br />
        <label htmlFor="lastName" className="singUp">
          Last Name
        </label>
        <input type="text" id="lastNameInput" />
        <br />
        <label htmlFor="email" className="singUp">
          Email
        </label>
        <input type="text" id="emailInput" />
        <br />
        <label htmlFor="password" className="singUp">
          Password
        </label>
        <input type="password" id="passwordInput" />
        <br />
        <input type="submit" value="confirm" />
      </form>
    </div>
  );
}

export default App;
