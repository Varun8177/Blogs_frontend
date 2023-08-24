import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Router from "./components/Router";

function App() {
  return (
    <div className="App space-y-9">
      <Navbar />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
