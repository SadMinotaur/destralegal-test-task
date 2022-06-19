export const debounceFunction = () => {
  let func: NodeJS.Timeout;
  return (f: () => void, ms = 1000): void => {
    clearTimeout(func);
    func = setTimeout(f, ms);
  };
};
