/**
 * Wait certain ticks
 * @param tick Unit as ms
 * @returns {Promise}
 */
export const sleep = async (tick) =>
  new Promise((resolve) => setTimeout(resolve, tick))

/**
 * Convert query string into kv object
 * @param queryStr Url query string
 * @returns {Object}
 */
export const getQuery = (queryStr) => {
  const query = {}
  for (const queryItem of queryStr.split('&')) {
    const [key, value] = queryItem.split('=')
    query[key] = value
  }
  return query
}

/**
 * Clear given kv pares in browser url query string
 * @param clearList KV pares, if empty clear all
 */
export const clearQuery = (clearList = []) => {
  const path = window.location.origin + window.location.pathname
  let query = getQuery(window.location.search.substring(1))
  if (clearList.length === 0) {
    query = {}
  } else {
    for (const clearKey of clearList) {
      delete query[clearKey]
    }
  }
  let search = ''
  for (const key of Object.keys(query)) {
    search += `;${key}=${query[key]}`
  }

  const url = path + (search.length > 0 ? '?' + search.substring(1) : '')
  window.history.pushState({}, 0, url)
}

/**
 * fix decimal count
 * @param value
 * @param count
 * @returns {number}
 */
export const toFixed = (value, count) => parseFloat(value.toFixed(count))

/**
 * parse decimal to percentage
 * @param value
 * @returns {string}
 */
export const decimal2Percentage = (value) =>
  toFixed(parseFloat(value) * 100, 2) + '%'

/**
 * percentage value
 * @param value
 * @returns {`${string}%`}
 */
export const percentage = (value) => `${value}%`

export const toFixedLocalString = (value, fixedNumber = 2) => {
  const float = parseFloat(value)
  if (isNaN(float)) return value
  const str = float.toFixed(fixedNumber)
  const arr = str.split('')
  const startIndex = arr.length - 3 - (fixedNumber === 0 ? 0 : fixedNumber + 1)
  for (let i = startIndex; i > 0; i -= 3) {
    arr.splice(i, 0, ',')
  }
  return arr.join('')
}

/**
 * Validate input value is number
 * @param value
 * @returns {boolean}
 */
export const validateNumber = (value) => !isNaN(parseFloat(value))

/**
 * Validate input value is valid date
 * @param value input value
 * @param startDate Valid period start date
 * @param equalStart Is start date contained
 * @param endDate Valid period end date
 * @param equalEnd Is end date contained
 * @returns {boolean}
 */
export const validateDate = (
  value,
  startDate,
  equalStart,
  endDate,
  equalEnd
) => {
  let valid = true
  if (startDate) {
    valid =
      valid &&
      (equalStart
        ? getDate(value) >= getDate(startDate)
        : getDate(value) > getDate(startDate))
  }

  if (endDate) {
    valid =
      valid &&
      (equalEnd
        ? getDate(value) <= getDate(endDate)
        : getDate(value) < getDate(endDate))
  }

  return valid
}

/**
 * Validate input value is with certain fixed decimal
 * @param value Input value
 * @param fixed Decimal count
 * @returns {boolean}
 */
export const validateFixedNumber = (value, fixed) =>
  !isNaN(parseFloat(value)) && value === toFixed(value, fixed)

/**
 * Validate input value is Email format
 * @param value
 * @returns {boolean}
 */
export const validateEmail = (value) =>
  /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)

/**
 * Get data from store, if store ie empty load from remote.
 * @param store Target Pinia store
 * @param key Data key
 * @param remoteFunction Remote load function
 * @returns {Promise<*>}
 */
export const getStoreData = async (store, key, remoteFunction) => {
  // if store data is undefined, store at initial state.
  // then set store data to null and load from remote
  if (store[key] === undefined) {
    try {
      store[key] = null
      store[key] = await remoteFunction()
    } catch (e) {
      // if remote has uncaught error, then set store data to initial state.
      console.error(e)
      store[key] = undefined
    }
  }
  // if store data is null, then other threads is loading data from remote.
  // wait certain time to until data loaded. Mean to save http resource
  while (store[key] === null) {
    await sleep(100)
  }
  return store[key]
}

/**
 * Pat a 0 to left if input string length is 1
 * @param str
 * @returns {string}
 */
export const patLeft0 = (str) => {
  const s = `0${str}`
  return s.substring(s.length - 2)
}

/**
 * Format date as input format.
 * @param date input date
 * @param format date format, default as 'yyyy-MM-dd hh:mm:ss'
 * @returns {string|*}
 */
export const dateFormatter = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  try {
    const _date = new Date(date)
    const meta = [
      ['yyyy', _date.getFullYear()],
      ['yy', _date.getFullYear().toString().substring(2)],
      ['MM', patLeft0(_date.getMonth() + 1)],
      ['M', _date.getMonth() + 1],
      ['dd', patLeft0(_date.getDate())],
      ['d', _date.getDate()],
      ['hh', patLeft0(_date.getHours())],
      ['h', _date.getHours()],
      ['mm', patLeft0(_date.getMinutes())],
      ['m', _date.getMinutes()],
      ['ss', patLeft0(_date.getSeconds())],
      ['s', _date.getSeconds()],
    ]

    for (const [key, value] of meta) {
      format = format.replace(key, value)
    }

    return format
  } catch (e) {
    return date
  }
}

/**
 * Get 00:00:00 time date by given date
 * @param date
 * @returns {Date}
 */
export const getDate = (date) => {
  const _date = new Date(date)
  return new Date(_date.getFullYear(), _date.getMonth(), _date.getDate())
}

/**
 * Deep copy
 * @param d input data
 * @returns {any}
 */
export const copy = (d) => JSON.parse(JSON.stringify(d))
