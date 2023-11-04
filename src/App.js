import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from './components/ProductList';


function App() {
  return (
    <div className="App">
      <div class="container">
          <ProductList></ProductList>
      </div>
    </div>
  );
}

export default App;