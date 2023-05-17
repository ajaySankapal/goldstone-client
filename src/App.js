import './App.css';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import User from './components/User';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/:id" element={<UpdateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
