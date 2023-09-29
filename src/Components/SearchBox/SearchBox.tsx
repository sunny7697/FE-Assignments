/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import useClickOutside from '../../Custom-Hooks/useClickOutside';
import useDebounce from '../../Custom-Hooks/useDebounce';
import styled from '@emotion/styled';
import Input from '../Input';

interface ISearchData {
  value: string;
  id: number;
}

interface ISearchBox {
  data?: ISearchData[];
  label?: string;
}

const StyledSearchBox = styled.div<ISearchBox>`
  display: flex;
  flex-direction: column;
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
  }

  ul.search-results li {
    padding: 0.4rem 0.8rem;
    cursor: pointer;
  }

  ul.search-results li.selected {
    background-color: lightblue;
  }
`;

const SearchBox: React.FC<ISearchBox> = ({ data = [], label }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<ISearchData[]>(data);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const searchResultsRef = useRef<HTMLUListElement>(null);
  const containerRef = useClickOutside(() => setIsFocused(false));
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedQuery = useDebounce(searchTerm);

  const debouncedResults = (query: string) => {
    const filteredOptions = data?.filter((item) =>
      item?.value?.toLowerCase().includes(query?.toLowerCase())
    );
    setFilteredData(filteredOptions || []);
  };

  useEffect(() => {
    debouncedResults(debouncedQuery);
  }, [debouncedQuery]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleItemClick = (item: string) => {
    setIsFocused(false);
    setSearchTerm(item);
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
    } else if (event.key === 'Enter' && selectedItemIndex !== -1) {
      event.preventDefault();
      setSearchTerm(filteredData[selectedItemIndex].value);
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
              onClick={() => handleItemClick(item.value)}
              className={index === selectedItemIndex ? 'selected' : ''}
            >
              {item.value}
            </li>
          ))}
        </ul>
      )}
    </StyledSearchBox>
  );
};

export default SearchBox;
