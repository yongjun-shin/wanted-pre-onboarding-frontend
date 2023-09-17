import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header.js';
import { Home } from './pages/home.js';
import { Signin } from './pages/signin.js';
import { Signup } from './pages/siginup.js';
import { Todo } from './pages/todo.js';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/todo" element={<Todo />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
