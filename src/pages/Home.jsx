import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import  { useEffect, useState } from "react";
import {fetchBreedImages,fetchBreeds} from "../services/Api";
import SearchInput from "../components/ui/SearchInput";
import BreedButton from "../components/ui/BreedButton";
import BreedImage from "../components/ui/BreedImage";
import Loading from "../components/ui/Loading";
import Debounce from "../utils/Debounce";

const Home = () => {
  const [data, setData] = useState([]); // Holds the dog breed data
  const [images, setImages] = useState([]); // Holds the images for the selected breed
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const [error, setError] = useState(null); // Holds any error that occurs during data fetching
  const [query, setQuery] = useState(""); // Holds the search query
  const [filteredPairs, setFilteredPairs] = useState([]); // Holds the filtered breed pairs

  useEffect(() => {
    axios
      fetchBreeds()
      .then((breeds) => {
        setData(breeds); // Setting the fetched data
        setLoading(false); // Updating loading state
      })
      .catch((error) => {
        setError(error); // Handling any errors that occur during fetching
        setLoading(false); // Updating loading state
      });
  }, []); // Run this effect only once when component mounts

  const handleButtonClick = (value) => {
    let str = value;
    let words = str.split(" ");
    let reversedWords = words.reverse();
    let reversedString = reversedWords.join(" ");
    const stringWithHyphens = reversedString.replace(/\s/g, "/");
    setQuery(stringWithHyphens); // Set the query to trigger image fetching
  };

  useEffect(() => {
    if (query !== '') {
      fetchBreedImages(query)
        .then((images) => setImages(images))
        .catch((error) => console.error('Error fetching images:', error));
    }
  }, [query]);

  useEffect(() => {
    const handleSearch = () => {
      const filtered = Object.entries(data)
        .flatMap(([breed, subBreeds]) => {
          if (subBreeds.length > 0) {
            return subBreeds.map((subBreed) => `${subBreed} ${breed}`);
          } else {
            return breed;
          }
        })
        .filter((pair) => pair.toLowerCase().includes(query.toLowerCase()));
      setFilteredPairs(filtered); // Updating filtered pairs state
    };

    const debouncedSearch = Debounce(handleSearch, 300);
    debouncedSearch();

    return () => {
      debouncedSearch.cancel(); // Cancel any pending debounce on cleanup
    };
  }, [query, data]); // Run effect when query or data changes

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="flex items-center justify-center min-h-screen py-16">
      <div className="w-full md:mx-16 mx-4 bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white text-center">Find Your Breed</h2>
          <div className="flex flex-wrap justify-center py-4">
          {images.map((image) => (
            <BreedImage key={uuidv4()} image={image} />
          ))}
        </div>
        </div>
        <div className="lg:px-64 md:px-32 px-6">
          <SearchInput setQuery={setQuery} />
        </div>
        <div className="p-6 grid lg:grid-cols-8 gap-4 md:grid-cols-4 sm:grid-cols-2">
          {filteredPairs.map((pair) => (
            <BreedButton key={uuidv4()} pair={pair} handleButtonClick={handleButtonClick} />
          ))}
        </div>
       
      </div>
    </section>
  );
};

export default Home;
