import { useEffect, useState } from "react";
import "./App.css";
import { app } from "./api";
import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    app.getHello().then(res => {
      console.log('vtzac demo:', res._data);
    }).catch(err => {
      console.error('vtzac demo error:', err);
    });
  }, []);

  return (
    <Layout>
      <h1>Helloword</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Layout>
  );
}

export default App;