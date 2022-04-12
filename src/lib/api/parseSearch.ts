const parseSearch = (
  obj: { [x: string]: any },
  exceptions?: [string] | undefined
) => {
  return Object.keys(obj).reduce((search, key: string) => {
    if (exceptions?.find((el) => el === key) !== undefined)
      return { ...search, [key]: obj[key] }
    switch (typeof obj[key]) {
      case 'string':
        return { ...search, [key]: { contains: obj[key] } }

      default:
        return { ...search }
    }
  }, {})
}

export default parseSearch
