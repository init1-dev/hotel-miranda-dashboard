import styled, { keyframes } from "styled-components";
import { ImSearch } from "react-icons/im";
import { useState } from "react";

const SearchComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleIconClick = () => {
        setIsOpen(prev => !prev);
    };
    
    return (
        <SearchContainer>
            <SearchInput
                type="text"
                $isOpen={isOpen}
                placeholder="Search.."
                // value={value}
                // onChange={onChange}
                // placeholder={placeholder}
            />
            <SearchIcon onClick={handleIconClick} />
        </SearchContainer>
    );
}

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
`;

const expand = keyframes`
    from {
        transform: scaleX(0);
        opacity: 0;
    }
    to {
        transform: scaleX(1);
        opacity: 1;
    }
`;

const collapse = keyframes`
    from {
        transform: scaleX(1);
        opacity: 1;
    }
    to {
        transform: scaleX(0);
        opacity: 0;
    }
`;

const SearchInput = styled.input<{$isOpen: boolean}>`
    width: ${(props) => (props.$isOpen ? '100%' : '0')};
    padding: ${(props) => (props.$isOpen ? '10px 42px 10px 20px' : '10px 0')};
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    transform-origin: right center;
    transition: width 0.3s ease, opacity 0.3s ease;
    animation: ${(props) => (props.$isOpen ? expand : collapse)} 0.3s forwards;
    &:focus {
        border-color: #007BFF;
    }
`;

const SearchIcon = styled(ImSearch)`
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    font-size: 20px;
    color: #aaa;
    cursor: pointer;
`;

export default SearchComponent;