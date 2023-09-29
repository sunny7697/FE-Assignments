import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';
import { Button, SearchBox } from '../../Components';
import ContactsGrid from './components/ContactsGrid';

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
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Contacts: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const onClickSearchIcon = () => {
    setShowSearchBar((prev) => !prev);
  };

  return (
    <StyledContacts>
      <div className='contacts-cta'>
        <div className='contacts-btns'>
          <Button type='primary' size='small'>
            Select Multiple
          </Button>

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
        {showSearchBar && (
          <div className='contacts-searchbox'>
            <SearchBox label='Search Contact' />
          </div>
        )}
      </div>
      <div>
        <ContactsGrid />
      </div>
    </StyledContacts>
  );
};

export default Contacts;
