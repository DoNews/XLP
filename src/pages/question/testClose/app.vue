<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
      <div>
        <div class="questionRules">
        感谢您的参与~
        </div>
      </div>
      <x-button type="warn" class="submit" @click.native="close">关闭</x-button>
      </div>
  </div>

</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  components: {
    XButton,
    Popup
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      this.$wechat.closeWindow()
    }
  }

}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.questionRules {
  height: 30px;
  line-height: 30px;
  margin: 30px auto;
  text-align: center;
  font-size: 18px;
  color: #231816;
  font-weight: 600;
  font-family: 'Comic Sans MS","\5E7C\5706","\9ED1\4F53",sans-serif';
}

.testOrder {
  margin-top: -3px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 3px;
  background-color: #bf1e2e;
  vertical-align: middle;
  line-height: 22px;
  text-align: center;
  color: #fff;
  font-family: 'Comic Sans MS","\5E7C\5706","\9ED1\4F53",sans-serif';
  font-weight: bolder;
}

.weui-btn_primary {
  background-color: #bf1e2e !important;
  color: #ffffff !important;
  font-size: 18px !important;
}

button.weui-btn, input.weui-btn {
  font-size: 16px !important;
}

.weui-btn_primary {
  background-color: #bf1e2e !important;
  color: #ffffff !important;
  font-size: 18px !important;
}

.banImg {
  background: url('./img/banner.png') no-repeat center;
  background-size: cover;
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
  margin: 70px auto 30px;
  background: #bf1e2e;
  height: 45px;
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
