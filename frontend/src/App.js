import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <Header />
      <Profile />
    </div>
  );
}

export default App;
