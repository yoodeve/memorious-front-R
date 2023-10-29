export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return { value };
};
