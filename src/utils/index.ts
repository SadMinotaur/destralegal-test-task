export const debounceFunction = () => {
  let func: NodeJS.Timeout;
  return (f: () => void, ms = 1000): void => {
    clearTimeout(func);
    func = setTimeout(f, ms);
  };
};

export const leadingCallPromise = () => {
  let flag = false;
  return <T>(f: Promise<T>): void => {
    if (!flag) {
      flag = true;
      f.then(() => {
        flag = false;
      });
    }
  };
};
