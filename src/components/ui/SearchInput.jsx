import PropTypes from "prop-types";

const SearchInput = ({ setQuery }) => (
  <input
    onChange={(event) => setQuery(event.target.value)} // Update query state on input change
    type="text"
    placeholder="Search..."
    className="w-full p-3 rounded-lg shadow-sm"
  />
);

SearchInput.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default SearchInput;
