<template>
  <div>
      <div class="banImg"></div> 
      <div>
        <group>
          <x-input title="医生姓名" v-model="name"  placeholder="请输入您的姓名(必填)"></x-input>
      </group>
      <group>
          <x-input title="手机号码" v-model="phone" placeholder="请输入您的手机号码(必填)" keyboard="number"  is-type="china-mobile"></x-input>
      </group>
      <x-button type="warn" class="submit" @click.native="handleSubmit">提交认证</x-button>
      <div>
        <popup v-model="sucShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:144px auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">恭喜您的认证成功！</h2>
              <p class="certifyP">请五分钟后重新进入公众号,</p>
              <p class="certifyP">获取最新菜单！</p>
            </group>
            <div style="padding:0 15%;box-sizing:border-box">
              <x-button type="primary" @click.native="sucShowPro" >项目介绍</x-button>
              <x-button @click.native="sucShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
      <div>
        <popup v-model="defShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:144px auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">您的认证失败！</h2>
              <p class="certifyP">请重新输入您的姓名和手机号 </p>
              <p class="certifyP">如有问题请联系医学推广专员 </p>
            </group>
            <div style="padding:0 15%;">
              <x-button type="primary" @click.native="defShowClo">重新认证</x-button>
              <x-button @click.native="defShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, Cell, XButton, AlertPlugin, XInput, Group, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { post } from 'common/service/http.base'
import { checkForm, Auth } from 'common/js/mixin'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  mixins: [checkForm, Auth],
  components: {
    XInput,
    Group,
    XButton,
    Cell,
    Popup
  },
  data() {
    return {
      defShow: false,
      sucShow: false,
      name: '',
      phone: ''
    }
  },
  created() {
    this.checkOpenId()
  },
  methods: {
    sucShowPro() {
      this.sucShow = false
      // location.href = './Success.html'
    },
    sucShowClo() {
      this.$wechat.closeWindow()
      // this.sucShow = false
      // this.name = ''
      // this.phone = ''
    },
    defShowClo() {
      this.defShow = false
      this.name = ''
      this.phone = ''
    },
    handleSubmit() {
      if (!this.name) {
        this.$vux.alert.show({
          title: '请输入您的姓名',
          onShow() {
          },
          onHide() {
          }
        })
        return
      }
      if (!this.phone) {
        this.$vux.alert.show({
          title: '请输入您的电话',
          onShow() {
          },
          onHide() {
          }
        })
        return
      }
      // if (!this.checkTel(this.phone)) {
      //   this.$vux.alert.show({
      //     title: '您输入的电话号码不正确',
      //     onShow() {
      //     },
      //     onHide() {
      //     }
      //   })
      //   return
      // }
      this.submit()
    },
    submit() {
      let url = '/api/login/'
      let params = {
        username: this.name,
        mobile: this.phone,
        openid: localStorage.getItem('openid')
      }
      this.$vux.loading.show({
        text: '认证中...'
      })
      post(url, params).then(res => {
        console.log('res' + res)
        console.log(res.data.status)
        this.$vux.loading.hide()
        if (res.data.status === 0) {
          this.sucShow = true
          return
        }
        this.defShow = true
        // this.$vux.toast.text('认证失败~', 'middle') toast方法提示
      }, e => {
        this.$vux.loading.hide()
        // this.$vux.toast.text('提交失败，请重新提交~', 'middle')
        this.defShow = true
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.weui-btn_primary {
  background-color: #bf1e2e !important;
  color: #ffffff !important;
  font-size: 18px !important;
}

.certifyT {
  font-size: 18px;
  color: #231816;
  font-weight: bolder;
  margin: 27px 0 17px 0;
}

.certifyP {
  font-size: 14px;
  color: #7b7b7b;
  font-family: 'MicroSoft YaHei';
  margin: 15px 0;
}

.sucPop {
  width: 100%;
  height: 100%;
}

.banImg {
  background: url('./img/banner.png') no-repeat center;
  background-size: 100% 100%;
  height: 180px;
  width: 100%;
}

.weui-cells {
  width: 90%;
  margin: 30px auto;
}

.weui-cell {
  border: 1px solid rgba(222, 222, 222, 0.3);
  background: #f5f5f5;
  font-size: 0.9rem !important;
}

.submit {
  width: 90% !important;
  margin: 90px auto 0;
  background: #bf1e2e !important;
  height: 45px;
  border-radius: 1px !important;
  font-size: 0.9rem !important;
}
</style>
