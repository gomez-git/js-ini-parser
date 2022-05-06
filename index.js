const prepareData = (data) => data
  .split('\n')
  .filter((line) => line.match(/^[^;#\s]/))
  .reduce((acc, line) => {
    if (line.startsWith('[')) {
      acc[acc.length] = [line];
    } else {
      acc[acc.length - 1].push(line);
    }
    return acc;
  }, []);

const formatValue = (value) => {
  switch (true) {
    case value === 'true':
      return true;
    case value === 'false':
      return false;
    case value === 'null':
      return null;
    case !Number.isNaN(parseInt(value, 10)):
      return Number(value);
    default:
      return value;
  }
};

const forbiddenKeys = ['constructor', '__proto__', 'prototype'];
const isForbiddenKey = (key) => forbiddenKeys.find((forbiddenKey) => forbiddenKey === key);

const parse = (data, object) => {
  const obj = object ?? {};
  let previousNode = '';

  const callback = (acc, property, _i, arr) => {
    if (property.startsWith('[')) {
      const nodes = property.slice(1).split('.');

      if (nodes.length > 1) {
        const key = nodes.shift() || previousNode;
        if (isForbiddenKey(key)) {
          arr.splice(1);
          return acc;
        }
        obj[key] = {
          ...obj[key],
          ...parse([[`[${nodes.join('.')}`, ...arr.splice(1)]], obj[key]),
        };

        return key;
      }

      const key = property.slice(1, property.length - 1);
      if (isForbiddenKey(key)) {
        arr.splice(1);
        previousNode = key;
        return acc;
      }
      obj[key] = obj[key] ?? {};

      return key;
    }

    const [key, value] = property.split('=');
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();
    if (isForbiddenKey(trimmedKey)) {
      return acc;
    }
    obj[acc][trimmedKey] = obj[acc][trimmedKey] ?? formatValue(trimmedValue);
    previousNode = acc;

    return acc;
  };

  data.forEach((leaf) => leaf.reduce(callback, ''));

  return obj;
};

export default (data) => parse(prepareData(data));
