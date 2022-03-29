const validateValue = (value) => {
  switch (true) {
    case value === 'true':
      return true;
    case value === 'false':
      return false;
    case value === '':
      return value;
    case value === 'null':
      return null;
    case !Number.isNaN(Number(value)):
      return Number(value);
    default:
      return value;
  }
};

const isValidKey = (key) => key !== '__proto__' && key !== 'constructor' && key !== 'prototype';

const parse = (data, object) => {
  const obj = object ?? {};
  let previousNode = '';

  const callback = (acc, property, _i, arr) => {
    if (property.startsWith('[')) {
      const nodes = property.slice(1).split('.');
      if (nodes.length > 1) {
        const key = nodes.shift() || previousNode;
        if (!isValidKey(key)) {
          arr.splice(1);
          return acc;
        }
        obj[key] = {
          ...obj[key],
          ...parse([`[${nodes.join('.')}`, ...arr.slice(1)].join('\n'), obj[key]),
        };
        arr.splice(1);

        return key;
      }
      const key = property.slice(1, property.length - 1);
      if (!isValidKey(key)) {
        arr.splice(1);
        return acc;
      }
      obj[key] = obj[key] ?? {};

      return key;
    }
    const [key, value] = property.split('=');
    if (!isValidKey(key)) {
      return acc;
    }
    const trimmedKey = key.trim();
    const trimmedValue = value.trim();

    obj[acc][trimmedKey] = obj[acc][trimmedKey] ?? '';
    obj[acc][trimmedKey] = validateValue(trimmedValue);
    previousNode = acc;

    return acc;
  };

  data
    .split('\n')
    .filter((line) => line !== '' && !line.startsWith(';'))
    .reduce((acc, line) => {
      if (line.startsWith('[')) {
        acc[acc.length] = [line];
        return acc;
      }
      acc[acc.length - 1].push(line);
      return acc;
    }, [])
    .forEach((leaf) => leaf.reduce(callback, ''));

  return obj;
};

export default parse;
