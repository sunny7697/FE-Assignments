import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './Components';
import Contacts from './Pages/Contacts';
import AddContact from './Pages/AddContact';

import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Contacts />} />
        <Route path='/add' element={<AddContact />} />
      </Routes>
    </Router>
  );
}

export default App;
