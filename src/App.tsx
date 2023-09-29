import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Header, Modal } from './Components';
import Contacts from './Pages/Contacts';
import AddContact from './Pages/AddContact';
import useContactsList from './Custom-Hooks/graphql-query/useContactsList';

import './App.css';

function App() {
  const [contactsList, setContactsList] = useState<any>();
  const contactListPayload = useContactsList();

  useEffect(() => {
    if (Array.isArray(contactsList)) {
      localStorage.setItem('regularContacts', JSON.stringify(contactsList));
    }
  }, [contactsList]);

  useEffect(() => {
    if (
      !contactListPayload.loading &&
      !contactListPayload.error &&
      contactListPayload.data &&
      (!contactsList || contactsList?.length === 0)
    ) {
      setContactsList(contactListPayload?.data?.list);
    }
  }, [contactListPayload, contactsList]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <Contacts
              contactsList={contactsList}
              setContactsList={setContactsList}
            />
          }
        />
        <Route
          path='/add'
          element={
            <AddContact
              contactsList={contactsList}
              setContactsList={setContactsList}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
