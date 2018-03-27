<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
      <div class="ruleCon">
        <div class="ruleTitle">问题录入规则</div>	  
        <div class="ruleItem">1、每位医生每录入1道题提交一次；</div>
         <div class="ruleItem"> 2、每位医生每天最多录入5道题（单选+多选）；</div>
          <div class="ruleItem"> 3、每位医生录入的问题题干，与该医生之前提交的提干，重复率达90%时无法提交；</div>
           <div class="ruleItem">4、每位医生每天提交问题后，仅首次点击关闭，进入能量小测试</div>
            <div class="ruleItem"></div>
      </div>
      <x-button type="warn" class="submit" @click.native="handleSubmit">关闭</x-button>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  components: {
    XButton
  },
  data() {
    return {
    }
  },
  methods: {
    handleSubmit() {
      history.back(-1)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.ruleTitle {
  color: #231816;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 15px auto;
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
  width: 90% !important;
  margin: 70px auto 30px;
  background: #bf1e2e;
  height: 45px;
  border-radius: 1px !important;
  font-size: 16px !important;
}
</style>
