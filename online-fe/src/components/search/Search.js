import { useState } from "react";
import { MainInput } from "../../utils";
const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <MainInput
        type={"text"}
        placeholder="Search"
        handleChange={handleChange}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
