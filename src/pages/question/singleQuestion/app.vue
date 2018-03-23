<template>
  <div>
      <div class="questionRules">问题录入规则 <span>!</span>	  </div> 
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
        <x-textarea :max="100" placeholder="请输入您的题干(必填)" :height="200" :rows="8" :cols="30" @on-change="onChange" aria-required="true"></x-textarea>
      </group>
      <div class="questionTitle">请您录入选项（请在正确答案后打✔√）：</div>
      <group>
          <x-input title="医生姓名" v-model="name"  placeholder="请输入您的姓名(必填)" is-type="china-name"></x-input>
      </group>
      <group>
          <x-input title="手机号码" v-model="phone" placeholder="请输入您的手机号码(必填)" keyboard="number" is-type="china-mobile"></x-input>
      </group>
      <x-button type="warn" class="submit" @click.native="handleSubmit">提交认证</x-button>
      <div>
        <popup v-model="sucShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">恭喜您的认证成功！</h2>
              <p class="certifyP">请五分钟后重新进入公众号,</p>
              <p class="certifyP">获取最新菜单！</p>
            </group>
            <div style="padding:0 15%;box-sizing:border-box">
              <x-button type="primary" @click.native="sucShowPro" >项目介绍</x-button>
              <x-button @click.native="sucShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
      <div>
        <popup v-model="defShow" height="100%" is-transparent>
          <div style="width:80%;background-color:#fff;height:300px;margin:30% auto 0;border-radius:5px;text-align:center">
            <group>
              <h2 class="certifyT">您的认证失败！</h2>
              <p class="certifyP">请重新输入您的姓名和手机号 </p>
              <p class="certifyP">如有问题请联系医学推广专员 </p>
            </group>
            <div style="padding:0 15%;">
              <x-button type="primary" @click.native="defShowClo">重新认证</x-button>
              <x-button @click.native="defShowClo">关闭</x-button>
            </div>
          </div>
        </popup>
      </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import Vue from 'vue'
import { XTextarea, Selector, Popup, Cell, XButton, AlertPlugin, XInput, Group, ToastPlugin, LoadingPlugin, WechatPlugin, ConfirmPlugin } from 'vux' // 引用vux使用单引号
import { post } from 'common/service/http.base'
import { createOId, getOId } from 'common/js/utils'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
export default {
  components: {
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
      defShow: false,
      sucShow: false,
      name: '',
      phone: '',
      qsAreaList: [{ key: 1, value: '心衰' }, { key: 2, value: '血脂' }],
      qsType1List: [{ key: 1, value: '基础理论' }, { key: 2, value: '推荐指南' }],
      qsType2List: [{ key: 1, value: '基础理论' }, { key: 2, value: '推荐指南' }, { key: 3, value: '学科发展' }, { key: 4, value: '治疗方法' }],
      qsPutList: [{ key: 1, value: '单选' }, { key: 2, value: '多选' }],
      qsAreaListS: null,
      qsType1ListS: null,
      qsType2ListS: null,
      qsPutListS: null
    }
  },
  methods: {
    onChange(val) {
      console.log(val)
    },
    sucShowPro() {
      this.sucShow = false
      location.href = './Success.html'
    },
    sucShowClo() {
      this.sucShow = false
      this.name = ''
      this.phone = ''
    },
    defShowClo() {
      this.defShow = false
      this.name = ''
      this.phone = ''
    },
    handleSubmit() {
      if (!this.name) {
        this.$vux.alert.show({
          title: '请输入您的姓名',
          onShow() {
          },
          onHide() {
          }
        })
        return
      }
      if (!this.phone) {
        this.$vux.alert.show({
          title: '请输入您的姓名',
          onShow() {
          },
          onHide() {
          }
        })
        return
      }
      this.submit()
    },
    submit() {
      let url = '/api/post/auth'
      let params = {
        name: this.name,
        phone: this.password,
        openid: getOId(this)
      }
      this.$vux.loading.show({
        text: '认证中...'
      })
      post(url, params).then(res => {
        // console.log(res)
        this.$vux.loading.hide()
        if (res.data.ret === 0) {
          // this.$vux.toast.text('认证成功~', 'middle')
          // location.href = './Success.html'
          this.sucShow = true
          return
        }
        this.defShow = false
        this.$vux.toast.text('认证失败~', 'middle')
      }, e => {
        this.$vux.loading.hide()
        // this.$vux.toast.text('提交失败，请重新提交~', 'middle')
        this.sucShow = true
      })
    }
  },
  created() {
    createOId(this)
    getOId(this)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/reset.styl';
@import '~common/stylus/variable.styl';

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
  font-size: 18px;
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
  width: 90% !important;
  margin: 90px auto 0;
  background: #bf1e2e;
  height: 45px;
  border-radius: 1px !important;
  font-size: 16px !important;
}
</style>
