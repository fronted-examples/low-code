export function deepCopyObject (data, hash = new WeakMap()) {
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('传入参数不是对象')
  }
  // 判断传入的待拷贝对象的引用是否存在于hash中
  if (hash.has(data)) {
    return hash.get(data)
  }
  let newData = {}
  const dataKeys = Object.keys(data)
  dataKeys.forEach(value => {
    const currentDataValue = data[value]
    // 基本数据类型的值和函数直接赋值拷贝
    if (typeof currentDataValue !== 'object' || currentDataValue === null) {
      newData[value] = currentDataValue
    } else if (Array.isArray(currentDataValue)) {
      // 实现数组的深拷贝
      newData[value] = [...currentDataValue]
    } else if (currentDataValue instanceof Set) {
      // 实现set数据的深拷贝
      newData[value] = new Set([...currentDataValue])
    } else if (currentDataValue instanceof Map) {
      // 实现map数据的深拷贝
      newData[value] = new Map([...currentDataValue])
    } else {
      // 将这个待拷贝对象的引用存于hash中
      hash.set(data, data)
      // 普通对象则递归赋值
      newData[value] = deepCopyObject(currentDataValue, hash)
    }
  })
  return newData
}

export function deepCopyArray (obj) {
  let result = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepCopyArray(obj[key]) // 递归复制
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
