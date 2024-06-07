import PropTypes from "prop-types";

const BreedImage = ({ image }) => (
  <img src={image} alt="dog breed" className="lg:w-1/4 md:1/2 1/3 rounded-lg" />
);

BreedImage.propTypes = {
  image: PropTypes.string.isRequired,
};

export default BreedImage;
