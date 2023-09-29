import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useContactsList from '../../../../Custom-Hooks/graphql-query/useContactsList';
import { useDeleteContact } from '../../../../Custom-Hooks/graphql-mutation/useDeleteContact';
import { getIndexToInsertContact } from '../../../../Common/Utils';
import ContactsGridItem from '../ContactsGridItem';

const StyledContactsGrid = styled.div``;

const ContactsGrid: React.FC = () => {
  const [contactsList, setContactsList] = useState<any>([]);
  const [favContactsList, setFavContactsList] = useState<any>([]);
  const [displayedContacts, setDisplayedContacts] = useState<any>([]);
  const [pageNum, setPageNum] = useState(1);
  const contactListPayload = useContactsList();
  const { executeDeleteContact, loading } = useDeleteContact();

  useEffect(() => {
    updateDisplayedContacts(pageNum);
  }, [pageNum, contactsList]);

  useEffect(() => {
    if (
      !contactListPayload.loading &&
      !contactListPayload.error &&
      contactListPayload.data &&
      contactsList.length === 0
    ) {
      setContactsList(contactListPayload.data?.list);
    }
  }, [contactListPayload, contactsList]);

  const updateDisplayedContacts = (pageNum: number) => {
    const contactsToDisplay: any[] = [];
    let count = 0;
    for (
      let i = (pageNum - 1) * 10;
      i < contactsList?.length && count < 10;
      i += 1
    ) {
      contactsToDisplay.push(contactsList[i]);
      count += 1;
    }

    setDisplayedContacts(contactsToDisplay);
  };

  const markContactFav = (id: number) => {
    setFavContactsList((prev: any) => [
      ...prev,
      displayedContacts?.find((contact: any) => contact.id === id),
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

  const unmarkFavContact = (contact: any) => {
    removeContactFromFavList(contact.id);
    const indexToInsert = getIndexToInsertContact(contactsList, contact);
    setContactsList((prevList: any) => [
      ...prevList.slice(0, indexToInsert),
      contact,
      ...prevList.slice(indexToInsert),
    ]);
  };

  const deleteFavContact = async (id: number) => {
    const res = await executeDeleteContact(id);
    if (!res.data) return;
    setFavContactsList((prevList: any) =>
      prevList.filter((contact: any) => contact.id !== id)
    );
  };

  const deleteRegContact = async (id: number) => {
    const res = await executeDeleteContact(id);

    if (!res.data) return;
    setContactsList((prevList: any) =>
      prevList.filter((contact: any) => contact.id !== id)
    );
  };

  const renderContacts = () => {
    return (
      <>
        {favContactsList?.length !== 0 && (
          <div style={{ margin: '2rem 0 3rem 0' }}>
            <h3>Favorite Contacts ({favContactsList?.length})</h3>
            <ul>
              {favContactsList?.map((contact: any, index: number) => (
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
            <h3>Regular Contacts ({contactsList?.length})</h3>
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
      </>
    );
  };

  return <StyledContactsGrid>{renderContacts()}</StyledContactsGrid>;
};

export default ContactsGrid;
