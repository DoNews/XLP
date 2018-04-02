<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
        <div class="qsitem">
          <div class="questionRules">
            <span class="testOrder">{{curIndex+1}}</span><span>{{queslist.is_Double ? '(多选)':'(单选)'}}{{queslist.title}}</span>
          </div>
          <div class="qsAnswerList"  v-for="(item, index) in queslist.item"  :key="index">
            <!--  && curCheck !== -1 -->
              <div class="qsAnswer" :class="{checked:item.isChecked,bgimg:item.isright && showTrue}"  
                  @click="checked(index, item.isright,$event)" 
                  v-bind:id="index" >{{item.result}}</div>
          </div>
        </div>
        <x-button type="warn" :disabled = 'showTrue' class="submit" @click.native="showTrues">点击查看正确答案</x-button>
        <x-button type="warn" class="submit" @click.native="submit">{{curIndex==2?'提交':'下一题'}}</x-button>
      </div>
  </div>

</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Popup, XButton, AlertPlugin, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { post } from 'common/service/http.base'
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
      // sinordou: true,
      queslist: [],
      curIndex: 0,
      curCheck: [],
      qsData: {},
      sum_ok: 0,
      showTrue: false
    }
  },
  created() {
    this.checkOpenId()
    this.getQuestion()
  },
  methods: {
    // 绑定类名
    showTrues() {
      if (this.curCheck.length === 0) {
        this.$vux.toast.show({
          text: '请选择后再查看',
          type: 'warn'
        })
        return
      }
      if (this.queslist.is_Double) {
        let tag = true
        this.queslist.item.forEach(item => {
          if (item.isright && !item.isChecked) {
            tag = false
          }
        })
        if (tag) {
          this.sum_ok++
        }
      }
      this.showTrue = true
    },
    checked(index, isright, $event) {
      if (this.showTrue) {
        this.$vux.toast.show({
          text: '您已完成该题',
          type: 'warn'
        })
        return
      }
      if (!this.queslist.is_Double) {
        // 单选
        if (this.curCheck.length === 0) {
          this.curCheck.push(index)
          let item = this.queslist.item[index]
          item.isChecked = true
          this.$set(this.queslist.item, index, item)
          if (isright) {
            this.sum_ok++
          }
          return
        }
        this.$vux.toast.show({
          text: '单选题',
          type: 'warn'
        })
      } else {
        // 多选
        this.curCheck.push(index)
        let item = this.queslist.item[index]
        item.isChecked = true
        this.$set(this.queslist.item, index, item)
      }
    },
    getQuestion() {
      let url = '/api/startgames/'
      let params = {
        openid: localStorage.getItem('openid')
      }
      this.$vux.loading.show({
        text: '请稍候...'
      })
      post(url, params).then(res => {
        this.$vux.loading.hide()
        let that = this
        if (res.data.status === -1) {
          this.$vux.alert.show({
            title: '每人每天只能参与一次小测试',
            onHide() {
              that.$wechat.closeWindow()
            }
          })
          return false
        }
        this.qsData = res.data
        let ques = res.data.data[this.curIndex]
        ques.item.forEach(item => {
          item.isChecked = false
        })
        this.queslist = ques
        // console.log(this.qsData.data)
      }, e => {
        this.$vux.loading.hide()
        this.$vux.alert.show({
          title: '加载超时'
        })
      })
    },
    submit() {
      // this.showTrue = false
      let checkLen = document.querySelectorAll('div.checked').length
      if (checkLen === 0) {
        this.$vux.alert.show({
          title: '必须选择答案才能提交'
        })
        return
      }
      if (this.curIndex < this.qsData.data.length - 1) {
        this.curIndex++
        this.queslist = this.qsData.data[this.curIndex]
        this.queslist.item.forEach(item => {
          item.isChecked = false
        })
        this.curCheck = []
        this.showTrue = false
      } else {
        let url = '/api/commit/'
        let params = {
          openid: localStorage.getItem('openid'),
          sum: this.qsData.data.length,
          sum_ok: this.sum_ok
        }
        // console.log('答题数：' + this.sum)
        // console.log('正确题数' + this.sum_ok)
        post(url, params).then(res => {
          if (res.data.status === 0) {
            location.href = './testClose.html'
          } else {
            this.$vux.alert.show({
              title: res.data.umsg
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';

.checked {
  border: 2px solid #bf1e2e;
}

.bgimg {
  background: url('./img/gou.png') left 10px top 10px no-repeat;
  color: #bf1e2e !important;
  background-size: 29px 19px;
}

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
  line-height: 1.5;
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
  margin: 70px auto 30px;
  background: #bf1e2e !important;
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
