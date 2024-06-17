import styled, { keyframes } from "styled-components";
import { ImSearch } from "react-icons/im";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";

interface SearchComponentProps {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
}

const SearchComponent = ({
    query,
    setQuery
}: SearchComponentProps) => {
    const [isOpen, setIsOpen] = useState(query === '' ? false : true);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleIconClick = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        if(isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearchReset = () => {
        if(query !== ''){
            setQuery('');
            setIsOpen(false);
        }
    }

    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setQuery(inputValue);
    };
    
    return (
        <StyledSearchComponent>
            <ClearIcon $isOpen={isOpen} $query={query} onClick={() => handleSearchReset()}/>

            <InputContainer>
                <SearchInput
                    ref={searchInputRef}
                    type="text"
                    $isOpen={isOpen}
                    value={query}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Search.."
                />
                <SearchIcon onClick={handleIconClick} />
            </InputContainer>
        </StyledSearchComponent>
    );
}

const StyledSearchComponent = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const InputContainer = styled.div`
    position: relative;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
`;

const ClearIcon = styled(AiOutlineClear)<{$isOpen: boolean, $query: string}>`
    display: ${(props) => (props.$isOpen && props.$query !== '' ? 'block' : 'none')};
    font-size: 22px;
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