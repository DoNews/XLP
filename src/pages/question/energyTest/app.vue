<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
        <div class="ruleCon">
          <div class="ruleTitle">能量小测试说明</div>	  
          <div class="ruleItem">感谢你的参与，测测你的能量掌握值吧！ </div>
          <div class="ruleItem">（以下测试题也会在知识竞赛测试中随即产生）</div>
        </div>
        <x-button type="warn" class="submit" @click.native="startTtest">开始答题</x-button>
        <x-button @click.native="confirmClo">关闭</x-button>
        <div>
          <popup v-model="confirmShow" height="100%" is-transparent>
            <div class="confirmCon">
              <div>
                <p class="certifyP">您确定要退出吗？</p>
                <p class="certifyP">可能会错过很多精彩内容哦~</p>
              </div>
              <div style="padding:30px 20% 0;">
                <x-button type="primary" @click.native="conShowClo">继续答题</x-button>
                <x-button @click.native="defShowClo">狠心退出</x-button>
              </div>
            </div>
          </popup>
        </div>
      </div>
  </div>

</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { get } from 'common/service/http.base'
import { Auth } from 'common/js/mixin'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  mixins: [Auth],
  components: {
    XButton,
    Popup
  },
  data() {
    return {
      confirmShow: false
    }
  },
  created() {
    this.checkOpenId()
  },
  methods: {
    startTtest() {
      location.href = './testOne.html'
    },
    confirmClo() {
      this.confirmShow = true
    },
    conShowClo() {
      this.confirmShow = false
    },
    defShowClo() {
      let url = '/api/modify/'
      let params = {
        openid: localStorage.getItem('openid')
      }
      get(url, params).then(res => {
        this.$vux.loading.hide()
        if (res.data.status === 0) {
          this.$vux.alert.show({
            title: '今日不再进入能量小测试~~'
          })
          return
        } else if (res.data.status === -1) {
          this.$vux.alert.show({
            title: res.data.umsg
          })
        }
        return false
      }, e => {
        this.$vux.alert.show({
          title: '您已经答满三道题',
          onShow() {
          },
          onHide() {
          }
        })
        this.$vux.loading.hide()
      })
      this.confirmShow = false
      this.$wechat.closeWindow()
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.confirmCon {
  width: 80%;
  background-color: #fff;
  height: 250px;
  margin: 30% auto 0;
  border-radius: 5px;
  text-align: center;
  padding-top: 30px;
}

.weui-btn_primary {
  background-color: #bf1e2e !important;
  color: #ffffff !important;
  font-size: 18px !important;
}

button.weui-btn, input.weui-btn {
  font-size: 16px !important;
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

.ruleCon {
  text-align: center;
}

.ruleTitle {
  color: #231816;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 15px auto;
  letter-spacing: 1px;
}

.ruleItem {
  letter-spacing: 1px;
  color: #7a7a7a;
  font-size: 14px;
  font-weight: 400;
  padding: 1px 7px;
  box-sizing: border-box;
  line-height: 21px;
}

.weui-btn_primary {
  background-color: #bf1e2e !important;
  color: #ffffff !important;
  font-size: 18px !important;
  height: 40px !important;
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
}

.submit {
  margin: 35px auto 30px;
  background: #bf1e2e;
  height: 40px;
  border-radius: 1px !important;
  font-size: 16px !important;
}

.weui-btn_default {
  color: #fff !important;
  background-color: #ccc !important;
  border: none !important;
  border-radius: 0 !important;
}
</style>
