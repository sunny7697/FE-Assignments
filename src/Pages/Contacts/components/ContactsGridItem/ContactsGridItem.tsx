import styled from '@emotion/styled';
import React, { useState } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BsChevronRight } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { Button, Modal } from '../../../../Components';

const StyledContactList = styled.li`
  border-bottom: 1px solid var(--grey);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 1rem;
  padding-bottom: 0.5rem;

  .grid-item-icons {
    display: flex;
    gap: 1rem;
    span {
      cursor: pointer;
      padding: 0.2rem;
      display: flex;
      align-items: center;
    }

    span:hover {
      background-color: #e0e0e0;
    }
  }

  .grid-item-container {
    background-color: transparent;
    /* border: 1px solid grey; */
    display: flex;
    flex-direction: column;
  }

  .grid-item-title {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 0 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    .title-user {
      display: flex;
      gap: 1rem;
    }
  }

  .right-icon {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .grid-item-content {
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transition: max-height 0.3s ease, padding 0.5s ease;
  }

  .visible {
    max-height: 1000px;
    padding: 0.5rem 0 1rem 5rem;
    transition: max-height 3s ease, padding 0.5s ease;
  }
`;

const ContactsGridItem: React.FC<any> = ({
  contact,
  index,
  onDeleteClick,
  onStarClick,
  favorite = false,
}) => {
  const [openItems, setOpenItem] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const onClickCollapseBtn = (index: number) => {
    let updatedOpenItem = { ...openItems };
    if (openItems[index]) {
      delete updatedOpenItem[index];
    } else {
      updatedOpenItem = { ...updatedOpenItem, [index]: true };
    }

    setOpenItem(updatedOpenItem);
  };
  return (
    <StyledContactList key={contact.id} style={{ display: 'flex' }}>
      <div className='grid-item-container'>
        <div
          className='grid-item-title'
          onClick={() => onClickCollapseBtn(index)}
        >
          <span className='title-user'>
            {<FaUserCircle />}
            <span className='title-name'>
              {contact.first_name} {contact.last_name}
            </span>
          </span>
          <div role='button' className='grid-item-icons'>
            <span
              onClick={(e) => {
                e.stopPropagation();
                favorite ? onStarClick(contact) : onStarClick(contact.id);
              }}
              style={{ color: 'black' }}
            >
              {favorite ? <AiFillStar /> : <AiOutlineStar />}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
            >
              <RiDeleteBin6Line />
            </span>
            <span className='right-icon'>
              <BsChevronRight />
            </span>
          </div>
        </div>
        <ul className={`grid-item-content ${openItems[index] && 'visible'}`}>
          {contact.phones?.map((phone: any, index: number) => (
            <li key={index}>{phone.number}</li>
          ))}
        </ul>
      </div>
      {showModal && (
        <Modal isOpen>
          <div className='modal-delete'>
            <h3>Do you want to delete this contact?</h3>
            <div className='modal-btns'>
              <Button onClick={() => onDeleteClick(contact.id)}>Yes</Button>
              <Button onClick={() => setShowModal(false)}>No</Button>
            </div>
          </div>
        </Modal>
      )}
    </StyledContactList>
  );
};

export default ContactsGridItem;
