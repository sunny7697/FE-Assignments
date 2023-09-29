/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import useClickOutside from '../../Custom-Hooks/useClickOutside';
import useDebounce from '../../Custom-Hooks/useDebounce';
import styled from '@emotion/styled';
import Input from '../Input';
import { IContact } from '../../Common/module';

interface ISearchBox {
  data?: IContact[];
  label?: string;
  filteredData?: IContact[];
  setFilteredData?: Function;
}

const StyledSearchBox = styled.div<ISearchBox>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 2rem;
  input {
    padding: 8px;
    font-size: 16px;
  }

  ul.search-results {
    list-style: none;
    padding: 0;
    margin: 0.4rem 0;
    max-height: 20rem;
    overflow-y: auto;
    position: absolute;
    top: 4.3rem;
    background-color: white;
    width: 100%;
    border: 1px solid var(--grey);
  }

  ul.search-results li {
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }

  ul.search-results li.selected {
    background-color: lightblue;
  }
`;

const SearchBox: React.FC<ISearchBox> = ({
  data = [],
  filteredData = [],
  setFilteredData = () => {},
  label,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredData, setFilteredData] = useState<IContact[]>(data);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const containerRef = useClickOutside(() => setIsFocused(false));
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(searchTerm);

  const debouncedResults = (query: string) => {
    const filteredOptions = data?.filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`;
      const phoneNumberMatches = item.phones.some((phone) =>
        phone.number.includes(query)
      );
      return (
        fullName.toLowerCase().includes(query.toLowerCase()) ||
        phoneNumberMatches
      );
    });
    setFilteredData(filteredOptions || []);
  };

  useEffect(() => {
    setFilteredData(data);
    debouncedResults(debouncedQuery);
  }, [debouncedQuery, data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item: IContact) => {
    setIsFocused(false);
    setSearchTerm(item.first_name); // You can customize how you want to display the selected item
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp' && filteredData.length !== 0) {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1
      );
    } else if (event.key === 'ArrowDown' && filteredData.length !== 0) {
      event.preventDefault();
      setSelectedItemIndex((prevIndex) =>
        prevIndex < filteredData.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedItemIndex !== -1) {
        setSearchTerm(filteredData[selectedItemIndex].first_name);
      }
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  useEffect(() => {
    // Scroll the selected item into view
    if (
      filteredData.length !== 0 &&
      searchResultsRef.current &&
      selectedItemIndex !== -1
    ) {
      const selectedItem = searchResultsRef.current.childNodes[
        selectedItemIndex
      ] as HTMLElement;
      selectedItem.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedItemIndex]);

  const showNumber = (item: IContact) => {
    if (
      item.first_name.toLowerCase().includes(debouncedQuery) ||
      item.last_name.toLowerCase().includes(debouncedQuery)
    ) {
      return item.phones[0];
    }
    const number = item.phones.find((phone) =>
      phone.number.includes(debouncedQuery)
    );
    return number;
  };

  return (
    <StyledSearchBox ref={containerRef}>
      <Input
        type='text'
        label={label}
        value={searchTerm}
        ref={inputRef}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
      />
      {isFocused && filteredData.length > 0 && (
        <ul className='search-results' ref={searchResultsRef}>
          {filteredData.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={index === selectedItemIndex ? 'selected' : ''}
            >
              <div>{`${item.first_name} ${item.last_name}`}</div>
              <div>{showNumber(item)?.number}</div>
            </li>
          ))}
        </ul>
      )}
    </StyledSearchBox>
  );
};

export default SearchBox;
