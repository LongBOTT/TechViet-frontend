import * as React from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

interface SearchBoxProps {
  placeholder: string;
  onSearch: (query: string) => void;
  resetSearch: boolean; // Add a prop for resetting the search box
}

// Custom styles for the search box
const StyledSearchBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ccc",
  borderRadius: "5px",
  width: "100%",
  height: "40px",
  backgroundColor: "rgba(255,255,255)",
  padding: "0px 10px",
  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flex: 1,
  marginLeft: "10px",
  fontSize: "16px",
  padding: "0",
  "& input": {
    padding: "10px 0",
  },
}));

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  onSearch,
  resetSearch,
}) => {
  const [query, setQuery] = React.useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  React.useEffect(() => {
    if (resetSearch) {
      setQuery(""); // Reset the search box value when resetSearch is triggered
    }
  }, [resetSearch]);

  return (
    <StyledSearchBox>
      <IconButton onClick={handleSearchClick}>
        <SearchIcon sx={{ color: "#555" }} />
      </IconButton>
      <StyledInputBase
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        inputProps={{ "aria-label": placeholder }}
      />
    </StyledSearchBox>
  );
};

export default SearchBox;
