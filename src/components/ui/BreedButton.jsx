import PropTypes from "prop-types";

const BreedButton = ({ pair, handleButtonClick }) => (
  <button
    onClick={() => handleButtonClick(pair)}
    className="rounded-lg text-white bg-blue-500 py-3 px-7 text-sm font-medium focus:outline-none hover:bg-blue-500/80 data-[focus]:outline-1 data-[focus]:outline-white"
  >
    {pair}
  </button>
);

BreedButton.propTypes = {
  pair: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default BreedButton;
