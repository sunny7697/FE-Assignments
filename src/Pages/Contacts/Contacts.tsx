import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { Button } from '../../Components';
import ContactsGrid from './components/ContactsGrid';
import { IContact } from '../../Common/module';

const StyledContacts = styled.section`
  margin: 1rem;
  .contacts {
    &-cta {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &-icons {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
    }

    &-btns {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
`;

interface IContactsProps {
  contactsList: IContact[];
  setContactsList: Function;
}

const Contacts: React.FC<IContactsProps> = ({
  contactsList,
  setContactsList,
}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const onClickSearchIcon = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <StyledContacts>
      <div className='contacts-cta'>
        <div className='contacts-btns'>
          <div className='contacts-cta-icons'>
            <Link to='/add'>
              <AiOutlinePlus
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </Link>
            <Button type='link' onClick={onClickSearchIcon}>
              <AiOutlineSearch
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <ContactsGrid
          contactsList={contactsList}
          setContactsList={setContactsList}
          showSearchBar={showSearchBar}
        />
      </div>
    </StyledContacts>
  );
};

export default Contacts;
