/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * 根据分页参数进行分页
 * @param { Number } pageNum 当前页码数
 * @param { Number } pageSize 页大小
 * @param { Array } origin 源集合
 * @returns 分页后的集合
 */
function getListByPageParams(pageNum = 1, pageSize = 10, origin = []) {
  const total = origin.length
  const data = []
  const totalSize = pageNum * pageSize
  const start = (pageNum - 1) * pageSize
  const end = totalSize > total ? total : totalSize

  for (let i = start; i < end; i++) {
    data.push(origin[i])
  }
  return data
}

module.exports = {
  param2Obj,
  getListByPageParams
}
