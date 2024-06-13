import styled from "styled-components";
import { ImSearch } from "react-icons/im";

const SearchComponent = () => {
    return (
        <Search type="button">
            <ImSearch />
        </Search>
    );
}

const Search = styled.button`
    color: white;
    outline: unset;
    background-color: ${({ theme }) => theme.contentBg};
    color: ${({ theme }) => theme.text};

    &:hover {
        border-color: ${({ theme }) => theme.iconsColor};
    }

    &:focus, &:focus-visible {
        outline: unset;
    }
`;

// const SearchInput = styled.input`
//     border-radius: 0.5rem;
//     border: 1px solid black;
//     height: 25px;
//     width: 25%;
//     padding: 0 0.5rem;
// `;

export default SearchComponent;