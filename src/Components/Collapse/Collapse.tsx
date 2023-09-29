import React, { useState, ReactNode } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import styled from '@emotion/styled';

interface ICollapse {
  accordian?: boolean;
  data: { title: string; content: string | ReactNode }[];
}

const StyledCollapse = styled.div`
  .collapse-single {
    background-color: transparent;
    display: flex;
    flex-direction: column;
  }

  .collapse-title {
    display: flex;
    justify-content: space-between;
    background-color: #ebe9fb;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .collapse-title:hover {
    background-color: #dcd9f6;
  }

  .collapse-title-icon {
    display: flex;
    align-items: center;
    transition: transform 0.3s ease;
  }

  .rotate {
    transform: rotate(90deg);
  }

  .collapse-content {
    max-height: 0;
    overflow: hidden;
    padding: 0;
    transition: max-height 0.3s ease, padding 0.5s ease;
  }

  .visible {
    max-height: 1000px;
    padding: 10px;
    transition: max-height 3s ease, padding 0.5s ease;
  }
`;

const Collapse: React.FC<ICollapse> = ({ accordian = false, data }) => {
  const [openItems, setOpenItem] = useState<any>({});

  const onClickCollapseBtn = (index: number) => {
    let updatedOpenItem = { ...openItems };
    if (openItems[index]) {
      delete updatedOpenItem[index];
    } else {
      updatedOpenItem = accordian
        ? { [index]: true }
        : { ...updatedOpenItem, [index]: true };
    }

    setOpenItem(updatedOpenItem);
  };

  const renderCollapse = () => (
    <StyledCollapse>
      {data.map((item, index) => (
        <div className='collapse-container' key={index}>
          <div className='collapse-single'>
            <div
              className='collapse-title'
              role='button'
              onClick={() => onClickCollapseBtn(index)}
            >
              <span className='collapse-title-text'>{item.title} </span>
              <span
                className={`collapse-title-icon ${
                  openItems[index] && 'rotate'
                }`}
              >
                <BsChevronRight />
              </span>
            </div>

            <div
              className={`collapse-content ${openItems[index] && 'visible'}`}
            >
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </StyledCollapse>
  );

  return renderCollapse();
};

export default Collapse;
