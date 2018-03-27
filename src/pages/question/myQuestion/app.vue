<template>
  <div class="padd">
    <div class="myProgress">
      我的进度
    </div>
    <div class="proBg"><span style="float:left;color:#bf1e2e">已完成：{{num}}题</span><span  style="float:right">总题数：{{total}}题</span></div>
    <div class="myQuestionList">
      录入的问题
    </div>
    <div class="qsList">
        <div class="qsItem">
          <div class="itemTitle"> <span class="fillTime">填写时间 ：20180302</span><span class="questionnaire">问卷1</span></div>
          <div class="itemCon">录入题干：心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？</div>
        </div>
        <div class="qsItem">
          <div class="itemTitle"> <span class="fillTime">填写时间 ：20180302</span><span class="questionnaire">问卷1</span></div>
          <div class="itemCon">录入题干：心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？</div>
        </div>
        <div class="qsItem">
          <div class="itemTitle"> <span class="fillTime">填写时间 ：20180302</span><span class="questionnaire">问卷1</span></div>
          <div class="itemCon">录入题干：心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？心内科目前国内哪个医院最强？</div>
        </div>
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
  },
  created: {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.myProgress {
  color: #231816;
  font-size: 16px;
  height: 15px;
  line-height: 15px;
  margin: 7px 0 10px 0;
  padding-left: 10px;
  border-left: 3px solid #bf1e2e;
  box-sizing: border-box;
  font-weight: bold;
}

.myQuestionList {
  color: #231816;
  font-size: 16px;
  height: 15px;
  line-height: 15px;
  margin: 0px 0 15px 0;
  padding-left: 10px;
  border-left: 3px solid #bf1e2e;
  box-sizing: border-box;
  font-weight: bold;
}

.proBg {
  background-color: #f5f5f5;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 5px;
  font-size: 12px;
  margin-bottom: 25px;
  font-weight: bold;
}

.qsItem {
  border-bottom: 1px solid #ccc;
  box-sizing: border-box;
}

.itemTitle {
  margin: 10px 0;
  height: 25px;
  line-height: 30px;
  display: flex;
}

.fillTime {
  flex: 0 0 80%;
  font-size: 14px;
  color: #231816;
}

.questionnaire {
  flex: 0 0 55px;
  height: 20px;
  background-color: #c22b3a;
  border-radius: 3px;
  margin: 5px 0;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: #fff;
}

.itemCon {
  font-size: 14px;
  color: #7b7b7b;
  margin: 10px 0;
  box-sizing: border-box;
  line-height: 20px;
}
</style>
