<template>
  <div>
      <div class="banImg"></div> 
      <div class="padd">
      <div class="ruleCon">
        <div class="ruleTitle">精准医学心血管内科训练营</div>	  
        <div class="ruleTitle">——中青年医师知识竞赛</div>
        <div class="ruleTitle">项目介绍</div>
        <div class="ruleItem">我国居民心血管病死亡率居各种疾病之首，推算全国有心血管病患者2.9亿，每5个成人中就有1人患心血管病。并随着老龄化的日益严重持续增长中；每年约有350万人死于心血管疾病，每10s就有1人死于心血管疾病。越来越多的危险因素不断被发现、发病机制被阐明，新的诊治技术不断被运用，心血管疾病的防治取得了令人瞩目的成就。</div>
        <div class="ruleItem">北京精准医学学会创立初衷为在精准医学的大框架下，促进医学各专科领域间的相互交流，提高各专科领域的诊疗水平和学术能力;搭建国际学术交流平台，促进国际学术交流。举办国内和国际高水平的学术会议，向一线医生提供继续教育培训;组织专家撰写适合群众阅读的各科疾病防治书籍或者文章，让老百姓深入了解疾病的防治重大疾病知识;让医疗机构和专家深入基层，宣传科学防治各种疾病的知识。是现在以及未来的工作重点。</div>
        <div class="ruleItem"> 为了帮助心血管医生，尤其是中青年医师更好的了解及掌握心血管领域的基础知识，由北京精准医学学会主办的“精准医学心血管内科训练营”——中青年医师知识竞赛，于2017年-2018年在全国范围内开展，该项目以编写并帮助中青年医师掌握并熟悉心血管领域所需掌握的的重点知识为目的，通过中青年医生知识竞赛的形式，帮助医生理解熟悉并掌握心血管领域的基础知识，包含基础理论，治疗方法，指南及共识的理解及运用，学科治疗前沿展示等，以达成提升青年医生在心血管领域的规范化治疗水平。</div>
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
      this.$wechat.closeWindow()
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
  text-indent: 2em;
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
  width: 90% !important;
  margin: 30px auto 30px;
  background: #bf1e2e !important;
  height: 45px;
  border-radius: 1px !important;
  font-size: 16px !important;
}
</style>
