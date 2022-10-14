import logo from './logo.svg';
import './App.css';
import AddFood from './components/addRestaurant';
import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Admin from './components/Admin';
import Editpage from './components/edit';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={AddFood}></Route>
          <Route exact path='/Admin' component={Admin}></Route>
          <Route exact path='/edit' component={Editpage}></Route>
        </Switch>
      </Router>
    
    </div>
  );
}

export default App;
