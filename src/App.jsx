import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/shared/Header";

function App() {
  return (
    <div className="min-h-screen flex flex-col space-y-10">
      <div className="mb-20">
        <Header></Header>
      </div>
      <main className="flex-1 px-2">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default App;
