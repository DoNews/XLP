export function urlSearch(href) {
  let name, value
  let str = href // 取得整个地址栏
  let num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数
  let arr = str.split('&') // 各个参数放到数组里
  let json = {}
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      json[name] = value
    }
  }
  return json
}

export function queryUrl (key) {
  let name, value
  let str = location.href // 取得整个地址栏
  let num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数
  let arr = str.split('&') // 各个参数放到数组里
  let json = {}
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      json[name] = value
    }
  }
  return json[key]
}

export function resize(selector) {
  let height = document.querySelector('body').offsetHeight
  window.onresize = () => {
    let wrapperEle = document.querySelector(selector)
    wrapperEle.style.height = height + 'px'
  }
}
