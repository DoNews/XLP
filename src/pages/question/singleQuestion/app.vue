<template>
  <div>
      <div class="questionRules" @click='rules'>问题录入规则 <span>!</span>	  </div> 
      <div class="questionForm">
        <group>
          <selector placeholder="问题领域" v-model="qsAreaListS" title="请选择问题领域:" name="area" :options="qsAreaList" @on-change="onChange"></selector>
        </group>
         <group>
          <selector placeholder="请选择问题种类" v-model="qsType1ListS" title="请选择问题种类:" name="type" :options="qsType1List" @on-change="onChange"></selector>
        </group>
         <group>
          <selector placeholder="请选择出题题型" v-model="qsPutListS" title="请选择出题题型:" name="typesub" :options="qsPutList" @on-change="onChange"></selector>
        </group>
      </div>
      <div class="questionTitle">请您录入题干</div>
      <group>
        <x-textarea :max="100" placeholder="请输入您的题干(必填)" v-model="titleArea" :height="200" :rows="8" :cols="30"  @on-blur="onBlur" aria-required="true"></x-textarea>
      </group>
      <div class="questionTitle">请您录入选项（请在正确答案后打√）：</div>
      <div>
      <div><input type="text"   placeholder="请录入您的答案(必填)" class='w80'/> <input type="checkbox" class="checkbox" required /></div>
      <group>
        <x-input value=""  type="text" v-model="req1"  placeholder="请录入您的答案(必填)" placeholder-class=""  maxlength="140" required ></x-input>
      </group>
      <group>
        <x-input value=""  type="text" v-model="req2"   placeholder="请录入您的答案(必填)" placeholder-class=""  maxlength="140" required></x-input>
      </group>
      <group>
        <x-input value=""  type="text"  placeholder="请录入您的答案(选填)" placeholder-class=""  maxlength="140"></x-input>
      </group>
      <group>
        <x-input value=""  type="text"  placeholder="请录入您的答案(选填)" placeholder-class=""  maxlength="140"></x-input>
      </group>
      </div>
      <x-button type="warn" class="submit" @click.native="handleSubmit">提交</x-button>
      <div>
        <popup v-model="lurusucShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">恭喜您提交成功！</h2>
              <p class="certifyP">您可选择继续录入或关闭，</p>
              <p class="certifyP"> 如点击关闭，进入能量小测试,</p>
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
import { post } from 'common/service/http.base'
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
      name: '',
      phone: '',
      qsAreaList: [{ key: 1, value: '心衰' }, { key: 2, value: '血脂' }],
      qsType1List: [{ key: 1, value: '基础理论' }, { key: 2, value: '推荐指南' }],
      qsType2List: [{ key: 1, value: '基础理论' }, { key: 2, value: '推荐指南' }, { key: 3, value: '学科发展' }, { key: 4, value: '治疗方法' }],
      titleArea: '',
      qsPutList: [{ key: 1, value: '单选' }, { key: 2, value: '多选' }],
      qsAreaListS: null,
      qsType1ListS: null,
      qsType2ListS: null,
      qsPutListS: null,
      req1: '',
      req2: ''
    }
  },
  methods: {
    // 问题规则
    rules() {
      location.href = './questionRules.html'
    },
    onChange(val) {
      console.log(val)
    },
    fiveClo() {
      this.fivesucShow = false
    },
    onBlur() {
      this.$vux.alert.show({
        title: '您录入的提干与之前提交的有重复请重新录入新的提干。否则无法提交',
        onShow() {
        },
        onHide() {
        }
      })
      return false
    },
    sucShowPro() {
      this.lurusucShow = false
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = ''
      this.req1 = ''
      this.req2 = ''
      this.titleArea = ''
    },
    sucShowClo() {
      this.lurusucShow = false
      this.qsAreaListS = ''
      this.qsType1ListS = ''
      this.qsPutListS = ''
      this.req1 = ''
      this.req2 = ''
      this.titleArea = ''
    },
    defShowClo() {
      this.lurudefShow = false
    },
    handleSubmit() {
      if (!this.qsAreaListS || !this.qsType1ListS || !this.qsPutListS || !this.titleArea || !this.req1 || !this.req2) {
        this.$vux.alert.show({
          title: '您有信息未录入完成,无法提交',
          onShow() {
          },
          onHide() {
          }
        })
        return false
      }
      this.submit()
    },
    submit() {
      // console.log('录入问题')
      let url = '/api/post/auth'
      let params = {
        name: this.name,
        phone: this.password,
        openid: localStorage.getItem('openid')
      }
      this.$vux.loading.show({
        text: '上传中...'
      })
      post(url, params).then(res => {
        // console.log(res)
        this.$vux.loading.hide()
        if (res.data.ret === 0) {
          // this.$vux.toast.text('认证成功~', 'middle')
          // location.href = './Success.html'
          this.lurusucShow = true
          return
        }
        this.lurudefShow = true
        // this.$vux.toast.text('认证失败~', 'middle')
      }, e => {
        this.$vux.loading.hide()
        // this.$vux.toast.text('提交失败，请重新提交~', 'middle')
        this.lurudefShow = true
      })
    }
  },
  created() {
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';
@import '~common/stylus/variable.styl';

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
  font-size: 1rem;
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
