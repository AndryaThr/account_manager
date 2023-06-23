const findInObject = (list: any[], key: string, value: any) => {
  for (let element of list) {
    if (element[key] === value) {
      return element;
    }
  }
  return null;
};

export { findInObject };
