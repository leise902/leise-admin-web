import lodash from 'lodash'

var moment = require('moment')

let formatter = {

}

formatter.dateFormat = function (date) {
  date = date || new Date()
  return moment(date).format('yyyy-MM-dd')
}

formatter.dateTimeFormat = function (date, format) {
  date = date || new Date()
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

formatter.dateCustomFormat = function (date, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss'
  date = date || new Date()
  return moment(date).format(format)
}

formatter.formatSelectList = (list = [], valueNames = [], labelNames = []) => {
  let result = []
  list.forEach(item => {
    result.push({
      value: join(item, valueNames),
      label: join(item, labelNames)
    })
  })
  return result
}

formatter.formatCascaderList = (list = [], valueNames = [], labelNames = []) => {
  let data = lodash.cloneDeep(list)
  if (!valueNames || !labelNames || valueNames.length !== labelNames.length) {
    return []
  }

  const loop = (data, valueNames, labelNames, level) => {
    let map = {}
    let groups = []
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      let valueName = valueNames[level]
      let labelName = labelNames[level]
      let value = join(item, valueName)
      let label = join(item, labelName)
      if (!map[value]) {
        groups.push({
          value: value,
          label: label,
          children: item[valueNames[level + 1]] ? [item] : []
        })
        map[value] = value
      } else {
        for (let j = 0; j < groups.length; j++) {
          let group = groups[j]
          if (group.value === value) {
            group.children.push(item)
            break
          }
        }
      }
    }

    if (level < valueNames.length) {
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i]
        if (group.children) {
          let childrenGroup = loop(group.children, valueNames, labelNames, level + 1)
          group.children = childrenGroup || []
        }
      }
    }

    return groups
  }

  let result = loop(data, valueNames, labelNames, 0)
  return result
}

const join = (item, names) => {
  let value = null
  if (Array.isArray(names)) {
    let values = []
    names.forEach(name => {
      values.push(item[name])
    })
    value = values.join('--')
  } else {
    value = item[names]
  }

  return value
}

export default formatter
