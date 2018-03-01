<style type="text/less">
  .draftCommon-info-box {
    display: flex;
    display: -webkit-flex; /* Safari */
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-left: 15px;
  }

  .draftCommon-info-box .boxInfo {
    margin-top: 10px;
    width: 33.3%;
  }

  .draftCommon-info-boxDetail {
    align-items: flex-start;
    display: flex;
  }
  .draftCommon-info-free{
    flex: 1;
  }
  .boxDetail-width{
    width: 300px;
  }
  .draftOver {
    display: inline-block;
    width: 140px;
    height: 100px;
    overflow: hidden;
  }
  .draftOver img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .draftRule {
    display: inline-block;
    width: 100px;
  }
  .boxInfo span:first-child{
    display:inline-block;
    width: 110px;
  }
  .boxInfo span:nth-of-type(2){
    display:inline-block;
    width: 200px;
  }
  .draft-content-info img{
    /*width:350px;
    height: 146px;*/
    margin-top: 10px;
  }
  .com-mar-t10 {
    margin-top: 10px;
  }
  .com-mar-l10 {
    margin-left: 10px;
  }

  .com-mar-l15 {
     margin-left: 15px;
   }
  .com-mar-r15 {
    margin-right: 15px;
  }
  .com-mar-b10 {
    margin-bottom: 10px;
  }
  .com-pad-l15{
    padding-left: 15px;
  }
  .com-justify-between{
    display: flex;
    justify-content: space-between;
  }
  .com-wrap{
    display: flex;
    flex-wrap:wrap ;
    -webkit-box-pack: justify;
  }
  /*按钮中间布局*/
  .com-btn-distribution{
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }
  .draftRule-title{
    display: inline-block;
    width: 80px;
  }
</style>
<template>
  <!--提案详情公共部分-->
  <div id="draftCommon">
    <div class="draftCommon-info">
      <div class="com-settings-header">
        <h4>提案基本信息</h4>
      </div>
      <div class="draftCommon-info-box">
        <div class="boxInfo"><span>提案名称：</span><span>{{draftInfoList.title}}</span></div>
        <div class="boxInfo"><span>提案结束时间：</span><span>{{draftInfoList.endTime}}</span></div>
        <div class="boxInfo"><span>提案ID：</span><span>{{draftInfoList.id}}</span></div>
        <div class="boxInfo"><span>提案类型：</span><span>{{draftInfoList.typeName}}</span></div>
        <div class="boxInfo"><span>提案开始时间：</span><span>{{draftInfoList.startTime}}</span></div>
        <div class="boxInfo"><span>当前状态：</span><span>{{draftInfoList.statusName}}</span></div>
        <div class="boxInfo"><span>当前投票信息：</span>
          <label v-for="item in this.draftInfoList.optionList" class="com-mar-r15">{{item.content}}（{{item.totalTicket}}）</label>
        </div>
      </div>
    </div>
    <div class="draftCommon-detail">
      <div class="com-settings-header com-mar-t10">
        <h4>提案详情</h4>
      </div>
      <div class="com-mar-t10 filter-header com-pad-l15">
        <div class="com-mar-b10">
          <div class="draftCommon-info-boxDetail boxDetail-width ">
            <span class="draftRule-title">提案封面：</span>
            <div class="draftOver"><img :src="draftInfoList.image"/></div>
          </div>
        </div>
        <div class="draftCommon-info-free">
          <div>
            <span class="draftRule-title com-mar-b10">投票规则：</span>
            <label v-for="item in this.draftInfoList.optionList" class="com-mar-r15">{{item.content}}</label>
          </div>
          <div>
            <span class="draftRule-title">提案选项：</span>
            <span> 提案生效≥{{draftInfoList.effectiveTicket}}票，每人最多{{draftInfoList.duration}}票，每票{{draftInfoList.ticketTkc}}TKC;</span>
          </div>
        </div>
      </div>
      <div class="com-mar-t10 com-pad-l15">
        <div class="draftCommon-info-boxDetail">
          <span class="draftRule-title">提案简介：</span>
          <div class="draftCommon-info-free">{{draftInfoList.summary}}</div>
        </div>
      </div>
      <div class="com-mar-t10 com-pad-l15">
        <div class="draftCommon-info-boxDetail">
          <span class="draftRule-title  com-mar-t10">提案内容：</span>
          <div class="draftCommon-info-free" v-html="draftInfoList.content">
         <!-- <div class="draft-content-info">
            <img :src="require('@/assets/images/zhanweiL.jpg')"/>
            <div class="com-mar-t10">复活甲的房间肯德基防空洞荆防颗粒的接口复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接</div>
          </div>
          <div class="draft-content-info">
            <img :src="require('@/assets/images/zhanweiL.jpg')"/>
            <div class="com-mar-t10">复活甲的房间肯德基防空洞荆防颗粒的接口复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接复活甲的房间肯德基防空洞荆防颗粒的接</div>
          </div>-->
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  import {drafrMngDetail} from '@/api';
  export default {
    data() {
      return {
        draftInfoList: {
        }

      }
    },
    props: {
      proposalId:{
        type:String,
      },
    },
    created () {
      this.drafrMngDetailCommon();
      console.info(this.proposalId);
    },
    methods: {
      drafrMngDetailCommon(){
        drafrMngDetail({proposalId:this.proposalId}).then(res => {
          console.log(res);
          this.draftInfoList = res.data;
        })
      },

    }
  }
</script>
