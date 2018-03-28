<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
        <div class="qsitem">
          <div class="questionRules">
            <span class="testOrder">{{curIndex+1}}</span><span>{{queslist[curIndex].title}}</span>
          </div>
          <div class="qsAnswerList"  v-for="(item, index) in queslist[curIndex].item"  :key="index">
              <div class="qsAnswer">{{item.result}}</div>
          </div>
        </div>
        <x-button type="warn" class="submit" @click.native="submit">{{curIndex==2?'提交':'下一题'}}</x-button>
      </div>
  </div>

</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { post } from 'common/service/http.base'
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
      qsData: {},
      queslist: [
        {title: '第一题?', pk: 4, item: [{result: '我是答案1', isright: false}, {result: '我是答案2', isright: false}, {result: '我是答案3', isright: false}, {result: '我是答案4', isright: false}]},
        {title: '第二题?', pk: 4, item: [{result: '我是答案1', isright: false}, {result: '我是答案2', isright: false}, {result: '我是答案3', isright: false}, {result: '我是答案4', isright: false}]},
        {title: '第三题?', pk: 4, item: [{result: '我是答案1', isright: false}, {result: '我是答案2', isright: false}, {result: '我是答案3', isright: false}, {result: '我是答案4', isright: false}]}
      ],
      curIndex: 0
    }
  },
  mounted() {
    // this.getQuestion()
  },
  methods: {
    getQuestion() {
      let url = '/api/startgames/'
      let params = {
        openid: localStorage.getItem('openid')
      }
      this.$vux.loading.show({
        text: '请稍候...'
      })
      post(url, params).then(res => {
        console.log(res)
        this.$vux.loading.hide()
        if (res.data.status === 0) {
          this.queslist = res.data
          this.qsData = this.queslist[this.curIndex][0]
        } else {
          this.$vux.alert.show({
            title: res.data.umsg
          })
        }
      }, e => {
        this.$vux.loading.hide()
        // this.$vux.alert.show({
        //   title: '您已经答满三道题'
        // })
      })
    },
    submit() {
      // if('是否选则答案') {
      //   // 否
      //   alert('请选择答案')
      //   return
      // }
      if (this.curIndex < 2) {
        this.curIndex++
        // return
      }
      // post
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.qsAnswer {
  color: #231816;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  font-weight: bold;
  background-color: #f5f5f5;
  text-align: center;
  margin: 15px 0;
}

.questionRules {
  height: 45px;
  line-height: 45px;
  text-align: left;
  padding-left: 10px;
  font-size: 16px;
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
