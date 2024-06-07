const debounce = (func, delay) => {
    let timeoutId;
    const debouncedFunction = (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
    // Method to cancel the debounced function
    debouncedFunction.cancel = () => {
      clearTimeout(timeoutId);
    };
    return debouncedFunction;
  };


  export default debounce