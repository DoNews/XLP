import {
  queryUrl
} from './utils'
export const checkForm = {
  methods: {
    checkTel(tel) {
      let re = /^1(3|4|5|7|8’)\d{9}$/
      let result = re.test(tel)
      if (result) {
        return true
      } else {
        return false
      }
    },
    checkEmail(email) {
      /* eslint-disable no-useless-escape */
      let re = /\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/
      let result = re.test(email)
      if (result) {
        return true
      } else {
        return false
      }
    },
    _checkEmpty(obj) {
      for (let key in obj) {
        console.log(key, '-----', obj[key])
        if (obj[key] === '' && key !== 'openid') {
          return false
        }
      }
      return true
    },
    _checkOrder(obj) {
      for (let key in obj) {
        // console.log(key, '-----', obj[key])
        if (key !== 'img' && obj[key] === '' && key !== 'openid') {
          return false
        }
      }
      return true
    }
  }
}
export const Auth = {
  methods: {
    checkOpenId () {
      let currentUrl = location.href
      let openid = localStorage.getItem('openid')
      let queryOid = queryUrl('openid')
      if (queryOid) {
        localStorage.setItem('openid', queryOid)
        this.changeUrl()
        return true
      }
      if (!openid) {
        if (!queryOid) {
          let ymuurl = 'http://wx.yuemia.com/wechat/openid.ashx?wx=seed&type=1&Url=' + encodeURIComponent(currentUrl)
          let redUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx28fa6d8e3424b13e&redirect_uri=' + encodeURIComponent(ymuurl) + '&response_type=code&scope=snsapi_base&state=O#wechat_redirect'
          window.location.href = redUrl
        }
      } else {
        return true
      }
    },
    changeUrl () {
      let currentUrl = location.href
      // 找到 openid= 的位置
      let openidIndex = currentUrl.indexOf('openid=')
      // 找到 openid= 之后 的第一个 & 的位置
      let openidLastIndex = currentUrl.indexOf('&', openidIndex)
      // 定义新的链接为空
      let shortURL = ''
      if (openidLastIndex > -1) { // 如果 openid= 之后还有参数
        let leftStr = currentUrl.substring(0, openidIndex) // 左边截取到openid=的位置
        let rightStr = currentUrl.substring(openidLastIndex + 1) // 右边从openid=之后的第一个&的位置+1 截取后面全部的参数
        shortURL = leftStr + rightStr // 拼接新的链接
      } else {
        shortURL = currentUrl.substring(0, openidIndex - 1)
        // 如果没有后续的参数，就把openid=直到最后截取掉，注意前面需要多截取一位: &或者？
      }
      history.replaceState(null, null, shortURL)
    },
    checkAuth () {
      let url = '/api/get/auth'
      let params = {
        openid: localStorage.getItem('openid')
      }
      let that = this
      that.get(url, params).then(res => {
        console.log(res)
        if (res.data.ret === 1) {
          that.$vux.alert.show({
            content: '您还未认证，<br>请认证~',
            onShow () {},
            onHide () {
              that.linkTo('../Auth/Certify.html')
            }
          })
        }
      }, e => {
        console.log(e)
      })
    }
  }
}
