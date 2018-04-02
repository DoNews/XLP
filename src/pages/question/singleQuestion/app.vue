<template>
  <div class="padd">
      <div class="questionRules" @click='rules'>问题录入规则 <span>!</span>	  </div> 
      <div class="questionForm">
        <group>
          <selector placeholder="问题领域" v-model="qsAreaListS" title="请选择问题领域:" name="area" :options="qsAreaList"></selector>
        </group>
         <group>
          <selector placeholder="请选择问题种类" v-model="qsType1ListS" title="请选择问题种类:" name="type" :options="qsType1List" ></selector>
        </group>
         <group>
          <selector placeholder="请选择出题题型" v-model="qsPutListS" title="请选择出题题型:" name="typesub" :options="qsPutList" @on-change="onTypeChange"></selector>
        </group>
      </div>
      <div class="questionTitle">请您录入题干</div>
      <group>
        <x-textarea :max="100" placeholder="请输入您的题干(必填)" v-model="titleArea" :height="180"  @on-blur="onBlur" aria-required="true"></x-textarea>
      </group>
      <div class="questionTitle">请您录入选项（请在正确答案后打√）：</div>
      <div>
      <div class="inputBox" v-for="(item, index) in reqs"  :key="index">
        <input type="text" v-model="item.title" class="inputtext" :placeholder="index>1?'请录入您的答案(选填)':'请录入您的答案(必填)'" />
        <p :class="item.isright ? 'inputcheckbox checked':'inputcheckbox'" @click="turn($event)" v-bind:id="index">√</p>
		  </div>
      </div>
      <x-button type="warn" class="submit" @click.native="handleSubmit">提交</x-button>
      <div>
        <popup v-model="lurusucShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">恭喜您提交成功！</h2>
              <p class="certifyP">您可选择继续录入或关闭</p>
              <p class="certifyP" v-show="showTips"> 首次点击关闭，进入能量小测试</p>
            </group>
            <div style="padding:0 15%;box-sizing:border-box">
              <x-button type="primary" @click.native="sucShowPro" >继续录入</x-button>
              <x-button @click.native="sucShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
      <!-- 第五题成功提交后的弹框 -->
      <div>
        <popup v-model="fivesucShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:230px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">恭喜您提交成功！</h2>
              <p class="certifyP">您已完成今天的任务</p>
             
            </group>
            <div style="padding:0 15%;box-sizing:border-box">
              <x-button @click.native="fiveClo" class="fiveClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
      <div>
        <popup v-model="lurudefShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">提交失败</h2>
              <p class="certifyP">请重新检查内容后再次提交 </p>
            </group>
            <div style="padding:20px 15% 0; ">
              <x-button type="primary" @click.native="defShowClo">重新录入</x-button>
              <x-button @click.native="defShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Checklist, XTextarea, Selector, Popup, Cell, XButton, AlertPlugin, XInput, Group, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { get, post } from 'common/service/http.base'
import { Auth } from 'common/js/mixin'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  mixins: [Auth],
  components: {
    Checklist,
    XTextarea,
    XInput,
    Group,
    XButton,
    Selector,
    Cell,
    Popup
  },
  data() {
    return {
      showTips: true,
      totalData: {},
      fivesucShow: false,
      lurusucShow: false,
      lurudefShow: false,
      qsAreaList: [{ key: 1, value: '心衰' }, { key: 2, value: '血脂' }],
      qsType1List: [],
      titleArea: '',
      qsPutList: [{ key: 1, value: '单选' }, { key: 2, value: '多选' }],
      qsAreaListS: null,
      qsType1ListS: null,
      qsType2ListS: null,
      qsPutListS: 1,
      reqs: [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
    }
  },
  mounted() {
    this.getQsTypeList()
  },
  created() {
    this.checkOpenId()
  },
  methods: {
    getQsTypeList() {
      let url = '/api/setquestioninfo/'
      let params = {
        openid: localStorage.getItem('openid')
      }
      get(url, params).then(res => {
        if (res.status === -1) {
          this.$vux.alert(res.umsg)
          return
        }
        // 判断用户是否为vip
        // if (res.data.user_type === 1) {
        // debugger
        this.totalData = res.data
        if (this.totalData.game_count > 0) {
          this.showTips = false
          console.log(this.showTips)
        }
        console.log(this.totalData)
        let list = res.data.list
        // 置空数组，防止data内的影响
        this.qsType1List = []
        list.forEach(item => {
          for (let key in item) {
            this.qsType1List.push({
              key: key,
              // 此处的item[key]是指该key对应的value vue中的写法
              value: item[key]
            })
          }
        })
        // } else {
        //   this.qsType1List = [{ key: 1, value: '基础理论' }, { key: 2, value: '推荐指南' }]
        // }
      })
    },
    checkboxChange(a) {
      console.log(a)
    },
    // 绑定类名
    turn(e) {
      var index = e.target.getAttribute('id')
      if (e.target.getAttribute('class').indexOf('checked') >= 0) {
        this.reqs[index]['isright'] = false
      } else {
        if (this.qsPutListS === 1) {
          if (document.querySelectorAll('.inputcheckbox.checked').length >= 1) {
            this.$vux.alert.show({
              title: '单选最多选择一个正确答案哦'
            })
            return
          }
        }
        this.reqs[index]['isright'] = true
      }
    },
    // 问题规则
    rules() {
      location.href = './questionRules.html'
    },
    // 单选多选
    onTypeChange(val) {
      if (val === 2) {
        this.reqs.push({ 'title': '', 'isright': false })
      } else {
        this.reqs.splice(4, 1)
      }
    },
    // 答满五道题关闭
    fiveClo() {
      this.fivesucShow = false
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = 1
      this.reqs = [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
      this.titleArea = ''
    },
    // 题干查重
    onBlur() {
      if (!this.titleArea) {
        return false
      }
      let url = '/api/cmp/'
      let params = {
        openid: localStorage.getItem('openid'),
        qstitleArea: this.titleArea
      }
      post(url, params).then(res => {
        console.log(res)
        this.$vux.loading.hide()
        if (res.data.status === 0) {
          return
        }
        this.qstitleArea = ''
        this.$vux.alert.show({
          title: '您录入的提干与之前提交的有重复请重新录入新的提干。否则无法提交',
          onShow() {
          },
          onHide() {
          }
        })
        return false
      }, e => {
        this.$vux.loading.hide()
      })
    },
    // 成功继续录入
    sucShowPro() {
      this.lurusucShow = false
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = 1
      this.reqs = [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
      this.titleArea = ''
    },
    // 成功之后关闭
    sucShowClo() {
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = 1
      this.reqs = [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
      this.titleArea = ''
      if (this.totalData.game_count === 0) {
        location.href = './energyTest.html'
        this.lurusucShow = false
      } else {
        this.$wechat.closeWindow()
      }
    },
    // 失败时关闭
    defShowClo() {
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = 1
      this.reqs = [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
      this.titleArea = ''
      this.lurudefShow = false
    },
    handleSubmit() {
      console.log('问题区域:', this.qsAreaListS)
      console.log('问题类型:', this.qsType1ListS)
      console.log('单选或者多选:', this.qsPutListS)
      console.log('题干:', this.titleArea)
      if (!this.qsAreaListS || !this.qsType1ListS || !this.qsPutListS || !this.titleArea) {
        this.$vux.alert.show({
          title: '您有信息未录入完成,无法提交',
          onShow() {
          },
          onHide() {
          }
        })
        return false
      }
      if (this.reqs[0].title === '' || this.reqs[1].title === '') {
        this.$vux.alert.show({
          title: '您有必填题目未填写，请完全填写后提交'
        })
        return
      }
      this.submit()
    },
    submit() {
      // if (this.qsPutListS === 1) {
      if (document.querySelectorAll('.inputcheckbox.checked').length < 1) {
        this.$vux.alert.show({
          title: '必须选择一个正确答案哦'
        })
        return
      } else {
        for (let i = 0; i < this.reqs.length; i++) {
          if (this.reqs[i].isright && !this.reqs[i].title) {
            this.$vux.alert.show({
              title: '请填写正确答案的内容'
            })
          }
        }
      }
      // 以后该需求可能会改为多选题最少选择两个正确答案，这需要判断题目类型
      // } else if (this.qsPutListS === 2) {
      //   let len = document.querySelectorAll('.inputcheckbox.checked').length
      //   if (len < 2) {
      //     this.$vux.alert.show({
      //       title: '多选至少选择两个正确答案哦'
      //     })
      //     return
      //   }
      // }
      let url = '/api/putquestioninfo/'
      let params = {
        questionArea: this.qsAreaListS,
        questionType: this.qsType1ListS,
        questionTypeR: this.qsPutListS,
        qstitleArea: this.titleArea,
        questionList: JSON.stringify(this.reqs),
        openid: localStorage.getItem('openid')
      }
      console.log('params:', params)
      this.$vux.loading.show({
        text: '提交中...'
      })
      post(url, params).then(res => {
        this.$vux.loading.hide()
        if (res.data.status === 0) {
          this.lurusucShow = true
          return
        }
        if (res.data.status === -1) {
          this.$vux.alert.show({
            title: '您已完成今日任务',
            onShow() {
            },
            onHide() {
              this.$wechat.closeWindow()
            }
          })
          return false
        }
        this.lurudefShow = true
      }, e => {
        this.$vux.loading.hide()
        this.lurudefShow = true
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';
@import '~common/stylus/variable.styl';

.inputBox {
  width: 100%;
  height: 44px;
  display: flex;
  margin: 10px 0;
  justify-content: flex-start;
}

.inputcheckbox {
  width: 49px;
  height: 44px;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #bf1e2e;
  font-size: 30px;
  color: #fff;
  font-family: '宋体';
  box-sizing: border-box;
}

.inputcheckbox.checked {
  background-color: #bf1e2e;
}

.inputtext {
  width: calc(100vw - 45px);
  background-color: #f5f5f5;
  border: none;
  font-size: 16px;
  padding-left: 15px;
  outline: none;
  box-sizing: border-box;
}

// 自定义输入框和对号
.checkbox {
  width: 12%;
  height: 45px;
  float: right;
  border-radius: 0;
  outline: none;
}

.w80 {
  height: 45px;
  background: #f5f5f5;
  outline: none;
  width: 88%;
  font-size: 16px;
  padding-left: 15px;
  box-sizing: border-box;
}

.input[type='checkbox'i] {
  background-color: #f5f5f5;
  cursor: default;
  margin: 3px 0.5ex;
  padding: initial;
  border: initial;
}

// 第五题关闭按钮样式
.fiveClo {
  color: #fff !important;
  font-size: 16px !important;
  background: #bf1e2e !important;
}

// 弹框
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
  font-family: $font-family;
  margin: 15px 0;
}

.sucPop {
  width: 100%;
  height: 100%;
}

// 弹框结束
.questionTitle {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  line-height: 18px;
  font-size: 0.9rem;
  color: #231816;
  font-weight: 300;
  letter-spacing: 1px;
  padding-left: 15px;
  font-family: $font-family;
  border-left: 3px solid #bf1e2e;
  margin: 15px 0;
}

.questionRules {
  height: 45px;
  line-height: 45px;
  text-align: right;
  padding-right: 10px;
  font-size: 16px;
  color: #231816;
  font-weight: 600;
  font-family: $font-family;
}

.questionRules span {
  box-sizing: border-box;
  display: inline-block;
  height: 22px;
  width: 21px;
  border-radius: 3px;
  background-color: #bf1e2e;
  vertical-align: middle;
  line-height: 22px;
  text-align: center;
  color: #fff;
  font-family: $font-family;
  font-weight: bolder;
  margin-top: -3px;
}

.weui-select {
  padding-left: 30px;
  color: #7b7b7b;
}

.weui-select option {
  border: none !important;
  outline: none !important;
  text-align: center !important;
}

.weui-cells {
  margin: 10px auto !important;
}

.weui-cells:after {
  height: 0 !important;
}

.weui-label {
  width: 134px !important;
}

.weui-textarea {
  background: #f5f5f5 !important;
  font-family: $font-family;
}

.weui-cell {
  font-size: 16px;
  border: 1px solid rgba(222, 222, 222, 0.3);
  background: #f5f5f5;
}

.submit {
  margin: 30px auto;
  background: #bf1e2e !important;
  height: 45px;
  border-radius: 1px !important;
  font-size: 16px !important;
}

// 标题更改样式
.weui-dialog__hd {
  padding: 1.3em 0.3em 0.5em !important;
  color: #7a7a7a !important;
  line-height: 28px !important;
}

.weui-dialog__btn_primary {
  color: #FFF !important;
  background: #bf1e2e;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
