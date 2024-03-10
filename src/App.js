import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Homepage } from './Components/homepage'
import { Calendar } from './Components/calendar'

function App() {
  return (
    <Router>
     <div className="container">
       <div className="columns">
         <div className="column is-half is-offset-one-quarter">
           <Routes>
             <Route exact path="/" element={<Homepage />} />

             <Route path="/calendar" element={<Calendar />} />

           </Routes>
         </div>
       </div>
     </div>
   </Router>
  );
}

export default App;
