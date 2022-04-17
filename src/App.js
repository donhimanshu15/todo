
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import History from './views/History';
import Layoutcomp from './views/Layoutcomp';
import Tablecom from './views/Tablecom';

function App() {
  return (
    <div className="App">
     
      <Router>
       
        <div className='main'>
          <div className='sidebar'>
            <Layoutcomp/>
          </div>
          <div className='content'>
            <Routes>
              <Route exact path="/" element={<Tablecom/>}/>

              <Route exact path="/history" element={<History/>} />

            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
