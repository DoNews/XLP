<template>
  <div class="padd">
    <div class="myProgress">
      我的进度
    </div>
    <div class="proBg"><span style="float:left;color:#bf1e2e">已完成：{{num}}题</span><span  style="float:right">总题数：50题</span></div>
    <div class="myQuestionList">
      录入的问题
    </div>
    <div class="qsList">
        <div class="qsItem" v-for="(item, index) in qsListBox"  :key="index" @click="goToDetail(item.pk)">
          <div class="itemTitle"> <span class="fillTime">填写时间 ：{{item.add_time}}</span><span class="questionnaire">问卷{{index+1}}</span></div>
          <div class="itemCon">{{item.wt}}</div>
        </div>
    </div>
  </div>

</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { get } from 'common/service/http.base'
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
      num: null,
      // 此处为模拟数据
      // qsListBox: [
      //   { add_time: '2018-09-09', wt: '我是第一套？', pk: 20 },
      //   { add_time: '2018-09-09', wt: '我是第er套？', pk: 21 },
      //   { add_time: '2018-09-09', wt: '我是第san套？', pk: 22 },
      //   { add_time: '2018-09-09', wt: '我是第si套？', pk: 23 }
      // ]
      qsListBox: []
    }
  },
  mounted() {
    this.getFullList()
  },
  methods: {
    getFullList() {
      let url = '/api/myinfo/'
      let params = {
        openid: localStorage.getItem('openid')
      }
      this.$vux.loading.show({
        text: '获取中...'
      })
      get(url, params).then(res => {
        this.$vux.loading.hide()
        this.qsListBox = res.data.data
        this.num = res.data.num
      }, e => {
        this.$vux.loading.hide()
        this.$vux.alert.show({
          title: '获取数据失败···'
        })
      })
    },
    goToDetail(pk) {
      location.href = `myQuestionDetail.html?pk=${pk}`
      // this.$router.push('/detail.html')
      console.log(pk)
    }
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
  height: 44px;
  box-sizing: border-box;
  line-height: 22px;
}
</style>
