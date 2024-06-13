import styled from "styled-components";
import { ImSearch } from "react-icons/im";

const SearchComponent = () => {
    return (
        <>
            <SearchInput type="text"/>

            <Search type="button">
                <ImSearch />
            </Search>
        </>
    );
}

const Search = styled.button`
    color: white;
    outline: unset;
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};
    box-shadow: 1px 1px 6px -4px black;

    &:hover {
        border-color: ${({ theme }) => theme.iconsColor};
    }

    &:focus, &:focus-visible {
        outline: unset;
    }
`;

const SearchInput = styled.input`
    background-color: ${({ theme }) => theme.theme === 'light' ? '#ffffff' : '#ebebeb'};
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.theme === 'light' ? 'lightgrey' : 'black'};
    box-shadow: 2px 2px 4px -4px black;
    padding: 0 0.5rem;
`;

export default SearchComponent;