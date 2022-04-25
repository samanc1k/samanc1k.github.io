import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import './App.css'


export default function App() {
  return (
    <Router>
   
       <Navigation/>

        <Routes>
          <Route path="/" element={<NotesList />}/>
          <Route path="/edit/:id" element={<CreateNote />}/>
          <Route path="/create" element={<CreateNote />}/>
          <Route path="/user" element={<CreateUser />}/>

        </Routes>

    </Router>
  );
}











// import React from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
// import Navigation from './components/Navigation';
// import NotesList from './components/NotesList';

//  function App() {
//   return (
//     <Router>
//       <Navigation/>
    
//         <Route  path='/' element={NotesList}/>
//         <Route />
//         <Route />
//         <Route />
      
//     </Router>
//   )
// }


// export default App;
