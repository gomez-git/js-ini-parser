/* eslint-disable no-param-reassign, no-use-before-define */
const forbiddenValues = /(constructor|__proto__|prototype)/;

const prepareData = (data) => data
  .split('\n')
  .filter((line) => /^[^;#\s]/.test(line))
  .reduce((acc, line) => {
    if (line.startsWith('[')) {
      acc[acc.length] = [line];
    } else {
      acc[acc.length - 1].push(line);
    }
    return acc;
  }, [])
  .filter(([property]) => !forbiddenValues.test(property))
  .map((row) => row.filter((value) => !forbiddenValues.test(value)));

const formatValue = (value) => {
  switch (true) {
    case value === 'true':
    case value === 'false':
    case value === 'null':
    case !Number.isNaN(parseInt(value, 10)):
      return JSON.parse(value);
    default:
      return value;
  }
};

const callback = (obj) => (acc, property, _i, arr) => {
  if (property.startsWith('[')) {
    const nodes = property.slice(1).split('.');

    if (nodes.length > 1) {
      const key = nodes.shift() || acc;
      obj[key] = {
        ...obj[key],
        ...parse([[`[${nodes.join('.')}`, ...arr.splice(1)]], obj[key]),
      };

      return key;
    }

    const key = property.slice(1, property.length - 1);
    obj[key] = obj[key] ?? {};

    return key;
  }

  const [key, value] = property.split('=');
  const trimmedKey = key.trim();
  const trimmedValue = value.trim();

  if (trimmedKey.endsWith('[]')) {
    const newKey = trimmedKey.slice(0, -2);
    obj[acc][newKey] = obj[acc][newKey] ?? [];
    obj[acc][newKey] = [...obj[acc][newKey], formatValue(trimmedValue)];
  } else {
    obj[acc][trimmedKey] = formatValue(trimmedValue);
  }

  return acc;
};

const parse = (data, object = {}) => {
  let previousNode = '';

  return data.reduce((obj, leaf) => {
    previousNode = leaf.reduce(callback(obj), previousNode);

    return obj;
  }, object);
};

export default (data) => parse(prepareData(data));
