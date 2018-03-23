export const mixin = {
  methods: {
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
    linkTo(url) {
      console.log(url)
      location.href = url
    }
  }
}
