import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useDeleteContact } from '../../../../Custom-Hooks/graphql-mutation/useDeleteContact';
import { getIndexToInsertContact } from '../../../../Common/Utils';
import ContactsGridItem from '../ContactsGridItem';
import { SearchBox, Toast } from '../../../../Components';
import { IContact } from '../../../../Common/module';
import Pagination from '../../../../Components/Pagination';
import { TOAST_INITIAL_STATE } from '../../../../Common/Constants';

const StyledContactsGrid = styled.div``;

interface IcontactsGrid {
  contactsList: any;
  setContactsList: Function;
  showSearchBar?: boolean;
}

const ContactsGrid: React.FC<IcontactsGrid> = ({
  contactsList,
  setContactsList,
  showSearchBar,
}) => {
  const [regularContactsList, setRegularContactsList] = useState([]);
  const [favContactsList, setFavContactsList] = useState<any>(null);
  const [displayedContacts, setDisplayedContacts] = useState<any>([]);
  const [pageNum, setPageNum] = useState(1);
  const { executeDeleteContact, loading } = useDeleteContact();
  const [toast, setToast] = useState(TOAST_INITIAL_STATE);

  useEffect(() => {
    updateDisplayedContacts(pageNum);
  }, [pageNum, regularContactsList]);

  useEffect(() => {
    setRegularContactsList(contactsList);
  }, [contactsList]);

  useEffect(() => {
    const items = localStorage.getItem('favContacts');
    if (items) {
      setFavContactsList(JSON.parse(items));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(favContactsList)) {
      localStorage.setItem('favContacts', JSON.stringify(favContactsList));
    }
  }, [favContactsList]);

  const updateDisplayedContacts = (pageNum: number) => {
    const contactsToDisplay: any[] = [];
    let count = 0;
    for (
      let i = (pageNum - 1) * 10;
      i < regularContactsList?.length && count < 10;
      i += 1
    ) {
      contactsToDisplay.push(regularContactsList[i]);
      count += 1;
    }

    setDisplayedContacts(contactsToDisplay);
  };

  const markContactFav = (id: number) => {
    setFavContactsList((prev: any) => [
      ...(prev || []),
      displayedContacts?.find((contact: IContact) => contact.id === id),
    ]);
    const updatedContactList = contactsList.filter(
      (contact: any) => contact.id !== id
    );
    setContactsList(updatedContactList);
  };

  const removeContactFromFavList = (id: number) => {
    const updatedFavList = favContactsList?.filter(
      (contact: any) => contact.id !== id
    );
    setFavContactsList(updatedFavList);
  };

  const unmarkFavContact = (contact: IContact) => {
    removeContactFromFavList(contact.id);
    const indexToInsert = getIndexToInsertContact(contactsList, contact);
    setContactsList((prevList: IContact[]) => [
      ...prevList.slice(0, indexToInsert),
      contact,
      ...prevList.slice(indexToInsert),
    ]);
  };

  const deleteFavContact = async (id: number) => {
    const res = await executeDeleteContact(id);
    if (!res.data) return;
    setFavContactsList((prevList: IContact[]) =>
      prevList.filter((contact: IContact) => contact.id !== id)
    );
  };

  const deleteRegContact = async (id: number) => {
    const res = await executeDeleteContact(id);

    if (!res.data) return;
    setContactsList((prevList: IContact[]) =>
      prevList.filter((contact: IContact) => contact.id !== id)
    );

    setToast({
      message: 'Contact deleted successfully',
      open: true,
      type: 'success',
    });
  };

  if (!contactsList) return <div>Something went wrong</div>;

  const renderContacts = () => {
    return (
      <>
        {showSearchBar && (
          <div className='contacts-searchbox'>
            <SearchBox
              label='Search Regular Contact (name or phone number)'
              data={contactsList}
              filteredData={regularContactsList}
              setFilteredData={setRegularContactsList}
            />
          </div>
        )}
        {favContactsList && favContactsList?.length !== 0 && (
          <div style={{ margin: '2rem 0 3rem 0' }}>
            <h3>Favorite Contacts ({favContactsList?.length})</h3>
            <ul>
              {favContactsList?.map((contact: IContact, index: number) => (
                <ContactsGridItem
                  key={contact.id}
                  contact={contact}
                  index={index}
                  onStarClick={unmarkFavContact}
                  onDeleteClick={deleteFavContact}
                  favorite
                />
              ))}
            </ul>
          </div>
        )}
        {contactsList?.length !== 0 ? (
          <div>
            <h3>Regular Contacts ({regularContactsList?.length})</h3>
            <ul>
              {displayedContacts.map((contact: any, index: number) => (
                <ContactsGridItem
                  key={contact.id}
                  index={index}
                  contact={contact}
                  onStarClick={markContactFav}
                  onDeleteClick={deleteRegContact}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div>No Contact Found</div>
        )}
        <Pagination
          currentPage={pageNum}
          setCurrentPage={setPageNum}
          totalPages={Math.ceil((regularContactsList?.length || 0) / 10)}
        />
        {toast.open && (
          <Toast
            message={toast.message}
            onClose={() => setToast(TOAST_INITIAL_STATE)}
          />
        )}
      </>
    );
  };

  return <StyledContactsGrid>{renderContacts()}</StyledContactsGrid>;
};

export default ContactsGrid;
