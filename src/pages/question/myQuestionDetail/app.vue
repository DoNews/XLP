<template>
  <div class="padd">
      <div class="questionRules" @click='rules'>问题录入规则 <span>!</span>	  </div> 
      <div class="questionForm">
        <group>
          <selector placeholder="问题领域" v-model="qsAreaListS" title="问题领域:" name="area" :options="qsAreaList"></selector>
        </group>
         <group>
          <selector placeholder="问题种类" v-model="qsType1ListS" title="问题种类:" name="type" :options="qsType1List" ></selector>
        </group>
         <group>
          <selector placeholder="出题题型" v-model="qsPutListS" title="出题题型:" name="typesub" :options="qsPutList" @on-change="onTypeChange"></selector>
        </group>
      </div>
      <div class="questionTitle">您录入的题干</div>
      <group>
        <x-textarea :max="100" disabled placeholder="心血管药物治疗" v-model="titleArea" :height="180" aria-required="true"></x-textarea>
      </group>
      <div class="questionTitle">您录入的选项（打√的为正确答案）：</div>
      <div>
      <div class="inputBox" v-for="(item, index) in reqs"  :key="index">
        <input type="text" v-model="item.title" :class="item.isright ? 'inputtext checkedinput':'inputtext'" placeholder="您录入的答案" />
        <p :class="item.isright ? 'inputcheckbox checked':'inputcheckbox'" @click="turn($event)" v-bind:id="index">√</p>
		  </div>
  
      </div>
      <x-button type="warn" class="submit" @click.native="handleSubmit">关闭</x-button>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { Checklist, XTextarea, Selector, Popup, Cell, XButton, AlertPlugin, XInput, Group, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
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
      fivesucShow: false,
      lurusucShow: false,
      lurudefShow: false,
      qsAreaList: {},
      qsType1List: [],
      titleArea: '',
      qsPutList: {},
      qsAreaListS: null,
      qsType1ListS: null,
      qsType2ListS: null,
      qsPutListS: null,
      reqs: [{ 'title': '', 'isright': true }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }, { 'title': '', 'isright': false }]
    }
  },
  mounted() {
    this.getQsTypeList()
  },
  methods: {
    rules() {
      location.href = './questionRules.html'
    },
    handleSubmit() {
      this.$wechat.closeWindow()
    }
  },
  created() {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';
@import '~common/stylus/variable.styl';

.checkedinput {
  color: #bf1e2e;
}

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
  height: 18px;
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
  background: #bf1e2e;
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
