<style scoped lang="less">
  .base-msg{
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }
  .base-msg-item{
    width: 50%;
    margin: 10px 0;
  }
  .base-msg-label{
    display: inline-block;
    width: 90px;
  }
  .draft-info{
    padding: 0 20px;
  }
  .info-item-box{
    display: flex;
    padding: 10px 0;
    p{
      flex: 1;
    }
  }
  .info-item-label{
    width: 80px;
  }
  .rule-list{
    flex: 1;
  }
  .rule-list > p:not(:last-child){
    padding-bottom: 20px;
  }
  .draft-rules{
    padding: 0 20px;
  }
  .rules-edit-box{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    div{
      width: 80px;
      margin-left: 5px;
    }
  }
  .options-ul > li{
    margin-bottom: 10px;
    i{
      vertical-align: middle;
      color: #ed3f14;
      padding-left: 5px;
      cursor: pointer;
    }
  }
  .option-item:not(:last-child){
    margin-right: 10px;
  }
  .surface-plot{
    width: 135px;
    height: 100px;
    overflow: hidden;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .preview-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(0,0,0,.6);
    justify-content: center;
    align-items: center;
    i{
      color: #fff;
      font-size: 30px;
      cursor: pointer;
      margin: 0 10px;
    }
  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    /*bottom: 0;*/
    /*left: 0;*/
    right: 0;
    padding: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    background: rgba(0,0,0,.6);
    justify-content: center;
    align-items: center;
    i{
      color: #fff;
      font-size: 30px;
      cursor: pointer;
      margin: 0 10px;
    }
  }
  .surface-plot:hover .upload-list-cover{
    display: flex;
  }
  .surface-plot:hover .preview-list-cover{
    display: flex;
  }
  .tool-bar {
    border: 1px solid #ccc;
  }
  .text-area{
    height: 800px;
    border: 1px solid #ccc;
  }
  .preview-mask{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
    .preview-modal{
      width: 414px;
      margin: 0 auto;
      position: absolute;
      outline: 0;
      background: #fff;
      border-radius: 4px;
      padding: 0 15px;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
    }

  .preview-head{
    text-align: center;
    margin: 0 -15px;
    border-bottom: 1px solid #eee;
    height: 35px;
    line-height: 35px;
  }
  .preview-body{
    padding: 15px 0;
    height: 700px;
    overflow: auto;
    font-size: 10px;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  .preview-cover{
    overflow: hidden;
    line-height: 0;
    > img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
  .preview-title{
    font-weight: bolder;
    font-size: 15px;
    .margin15
  }
  .preview-desc{
    background: #fafafa;
    padding: 8px;
    color: #bbb;
    .margin15
  }
  .margin15{
    margin-top: 15px;
  }
  .vote-date{
    .margin15
  }
  .vote-info{
    color: #bbb;
    > p{
      display: flex;
      >span{
        flex: auto;
      }
    }
    >div{
      display: flex;
      >div{
        flex: auto;
      }
    }
    .margin15
  }
  .pro-options{
    >span{
      font-size: 12px;
      border-bottom: 1px solid #000;
      padding: 3px 0;
      display: inline-block;
    }
    li {
      margin-top: 5px;
    }
    margin-top: 10px;
  }
  .preview-content{
    margin-top: 20px;
  }
  .option-progress{
    display: inline-block;
    height: 5px;
    background: #000000;
    border-radius: 5px;
  }
  .model-img{
    position: relative;
    line-height: 0;
    img,video{
      width: 100%;
    }
    > img{
      object-fit: cover;
    }
    > input {
      position: absolute;
      z-index: -9999;
    }
  }
  .pro-content{
    display: flex;
  }
  .pro-model{
    width: 375px;
    padding: 15px;
    border: 1px dashed #999999;
    border-radius: 5px;
    position: relative;
  }
  .editStyle{
    background: #F5F7F7;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .model-box > div:not(:first-child){
    margin-bottom: 15px;
  }
  .name-address{
    vertical-align: middle;
    padding: 10px;
    border: 1px dashed #999999;
    border-radius: 5px;
    margin: 5px 0 20px;
  }
  .img-box{
    position: relative;
  }
  .img-box:hover{
    .img-cover{
      display: flex;
    }
  }
  .img-cover{
    cursor: pointer;
    > input{
      position: absolute;
      z-index: -9999;
    }
    > label{
      color: white;
    }
  }
  .emptyType{
    width: 100%;
    height: 260px;
    background: #eee;
    text-align: center;
    line-height: 260px;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
</style>
<template>
  <div id="infoAndEidt">
      <div style="text-align: right">
        <Icon type="eye" size="30" style="cursor: pointer;margin: 0 10px;" @click.native="previewVisible = !previewVisible">a</Icon>
        <Icon type="ios-compose" size="30" style="cursor: pointer"  @click.native="isEdit = !isEdit"></Icon>
      </div>
    <div class="com-settings-header">
      <h4>提案基本信息</h4>
    </div>
    <div class="base-msg">
      <div class="base-msg-item">
        <span class="base-msg-label">提案发起人：</span>
        {{draftInfo.userPhone}}
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">提案ID：</span>
        {{draftInfo.id}}
      </div>
      <div class="base-msg-item" v-if="draftInfo.userEnterprise">
        <span class="base-msg-label">企业全称：</span>
        {{draftInfo.userEnterprise.name}}
      </div>
      <!--<div class="base-msg-item">
        <span class="base-msg-label">投票持续时间：</span>
        <span v-if="isEdit">{{draftInfo.duration}}小时</span>
        <div v-else style="display: inline-block;width: 200px;vertical-align:middle">
          <Input v-model="draftInfo.duration"><span slot="append">小时</span></Input>
        </div>
      </div>-->
      <div class="base-msg-item">
        <span class="base-msg-label">创建时间：</span>
        {{draftInfo.createTime | formatTimestamp}}
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">创建费用：</span>
        {{draftInfo.payAmount}} Tkc
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">开始时间：</span>
        <span v-if="isEdit">{{draftInfo.startTime | formatTimestamp}}</span>
        <DatePicker v-else type="datetime" placeholder="选择日期" style="width: 200px" :value="draftInfo.startTime | formatTimestamp" @on-change="(date) => {draftInfo.startTime = date}" format="yyyy-MM-dd HH:mm"></DatePicker>
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">当前状态：</span>
        {{draftInfo.statusName}}
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">结束时间：</span>
        <span v-if="isEdit">{{draftInfo.endTime | formatTimestamp}}</span>
        <DatePicker v-else type="datetime" placeholder="选择日期" style="width: 200px" :value="draftInfo.endTime | formatTimestamp" @on-change="(date) => {draftInfo.endTime = date}" format="yyyy-MM-dd HH:mm"></DatePicker>
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">提案类型：</span>
        <span v-if="isEdit">{{draftInfo.type == 1 ? '群体智能' : '全民公决'}}</span>
        <Select v-else style="width:200px" v-model="draftInfo.type">
          <Option value='0'>全民公决</Option>
          <Option value='1'>群体智能</Option>
        </Select>
      </div>
      <div class="base-msg-item" v-if="draftInfo.preheatBeginTime">
        <span class="base-msg-label">预热开始时间：</span>
        {{draftInfo.preheatBeginTime | formatTimestamp}}
      </div>
      <div class="base-msg-item">
        <span class="base-msg-label">当前投票信息：</span>
        <span class="option-item" v-for="(item,index) in draftInfo.optionList">{{item.content+'('+item.totalTicket+')'}}</span>
      </div>
      <div class="base-msg-item" v-if="draftInfo.preheatEndTime">
        <span class="base-msg-label">预热结束时间：</span>
        {{draftInfo.preheatEndTime | formatTimestamp}}
      </div>

    </div>

    <div class="com-settings-header">
      <h4>提案详情</h4>
    </div>
    <!--======================提案详情=========================-->
    <div class="pro-content">
      <div class="draft-info">
        <div class="info-item-box">
          <div class="info-item-label">提案名称：</div>
          <p v-if="isEdit">{{draftInfo.title}}</p>
          <Input v-else  style="width: 300px" v-model="draftInfo.title"></Input>
        </div>
        <div class="info-item-box">
          <div class="info-item-label">提案简介：</div>
          <p v-if="isEdit">{{draftInfo.summary}}</p>
          <Input v-else style="width:300px;" v-model="draftInfo.summary"></Input>
        </div>
        <div class="info-item-box">
          <div class="info-item-label">提案封面：</div>
          <div style="display: flex;align-items: center">
            <div class="surface-plot">
              <img :src="draftInfo.image"/>
              <div class="preview-list-cover">
                <Icon type="ios-eye-outline" @click.native="visible = true"></Icon>
              </div>
            </div>
            <div style="margin-left: 20px" v-if="!isEdit">
              <Upload :action="uploadUrl"
                      :show-upload-list="false"
                      :on-success="handleSuccess"
                      :headers="uploadHeaders"
                      :before-upload="handleBeforeUpload"
                      style="display: inline-block;width:58px;text-align: center" >
                <div style="width: 58px;height:58px;line-height: 58px;border: 1px dashed #000;border-radius: 3px;cursor: pointer">
                  <Icon type="camera" size="20"></Icon>
                </div>
              </Upload>
            </div>
          </div>
        </div>
        <div class="info-item-box">
          <div class="info-item-label">提案内容：</div>
          <!--=======旧版编辑器=======-->
          <div v-show="hideEdit" style="width: 375px; margin-right: 15px">
            <p v-if="isEdit" v-html="draftInfo.content"></p>
            <div v-show="!isEdit" class="editor" id="w-editor" style="min-height: 600px;">
              <div id="editorDiv" style="height: 600px"></div>
            </div>
          </div>
          <!--================新版编辑=====================-->
          <div class="pro-model">
            <Spin fix v-if="uploadSpin">
              <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
              <div>上传中...</div>
            </Spin>
            <div :class="['model-box', isEdit ? '' : 'editStyle']" v-for="(item,i) in contentList">
              <div style="text-align: right" v-if="!isEdit">
                <Icon type="close-circled" style="cursor: pointer" size="20" @click.native="delContentBlock(i)"></Icon>
              </div>
              <div class="model-img img-box">
                <img style="object-fit: cover;" v-if="item.type == 1" :src="item.file" alt="">
                <video v-else-if="item.type == 2" :id="'video'+i" :src="item.file" crossorigin="anonymous" controls></video>
                <div class="emptyType" v-else><span><Icon type="android-upload" style="vertical-align: middle" size="40"></Icon></span></div>
                <div class="upload-list-cover img-cover" v-if="!isEdit">
                  <label :for="'fileInput'+i" ><Icon type="android-upload" style="vertical-align: middle"></Icon>上传图片/视频</label>
                  <input type="file" :id="'fileInput'+i" @change="(e) => fileChange(e, item, i)">
                </div>
              </div>
              <div class="model-origin">
                <span v-if="isEdit" style="color: #7D7F80"><Icon type="arrow-up-b" v-if="item.origin" size="20" style="vertical-align: middle"></Icon> {{item.origin}}</span>
                <Input v-else placeholder="图片/视频来源" v-model="item.origin" style="width: 300px"></Input>
              </div>
              <div class="model-content">
            <p v-if="isEdit" style="white-space: pre-line;word-wrap: break-word;">
              {{item.content}}
            </p>
                <Input v-else type="textarea" :rows="4" v-model="item.content" placeholder="请输入提案的介绍内容"></Input>
              </div>
            </div>
            <div class="addModel" style="text-align: right" v-if="!isEdit">
              <span style="cursor: pointer" @click="addContent"><Icon type="plus-circled"></Icon> 增加内容({{contentList.length}}/3)</span>
            </div>
            <h3 v-if="linkList.length > 0 && (linkList[0]['name'] || !isEdit)">相关链接：</h3>
            <div class="link" v-for="(item,i) in linkList" >
              <a style="display:inline-block;padding: 10px 0" v-if="isEdit" :href="item.linkUrl" target="_blank">{{item.name}}</a>
              <div  v-else class="name-address" style="display: flex;align-items: center">
                <div>
                  <Input style="margin-bottom: 10px" v-model="item.name" placeholder="请输入链接名称，最多15个字"></Input>
                  <Input icon="link" v-model="item.linkUrl" placeholder="请输入链接地址"></Input>
                </div>
                <Icon type="minus-circled" style="color: red;cursor: pointer;padding-left:3px" size="18" @click.native="delLinkBlock(i)"></Icon>
              </div>
            </div>
            <div class="addModel" style="text-align: right"  v-if="!isEdit">
              <span style="cursor: pointer" @click="addLink"><Icon type="plus-circled"></Icon> 增加链接({{linkList.length}}/3)</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="com-settings-header">
      <h4>提案规则</h4>
    </div>
    <div class="draft-rules">
      <div class="info-item-box">
        <div class="info-item-label">提案选项：</div>
        <div class="rule-list">
          <p v-for="(item,index) in draftInfo.optionList" >{{item.content}}</p>
        </div>
        <!--<div class="rule-list" v-if="isEdit">
          <p v-for="(item,index) in draftInfo.optionList">{{item.content}}</p>
        </div>
        <div class="rule-list" v-else>
          <ul class="options-ul">
            <li v-for="(item,index) in draftInfo.optionList">
              <Input style="width: 300px" v-model="item.content"></Input>
              <Icon type="minus-circled" size="20" @click.native="delOption(index)"></Icon>
            </li>
            <li>
              <Button type="dashed" style="width: 300px" icon="plus-round" @click="addOption">新增</Button>
            </li>
          </ul>
        </div>-->
      </div>
      <div class="info-item-box">
        <div class="info-item-label">参投规则：</div>
        <div class="rule-list">
          <p v-if="isEdit">提案生效 ≥ {{draftInfo.effectiveTicket}} 票；</p>
          <div v-else class="rules-edit-box">提案生效 ≥<div><Input v-model="draftInfo.effectiveTicket"><span slot="append">票</span></Input></div></div>
          <p v-if="isEdit">参投上限，每人最多 {{draftInfo.userTicketLimit}} 票；</p>
          <div v-else  class="rules-edit-box">参投上限，每人最多<div><Input v-model="draftInfo.userTicketLimit"><span slot="append">票</span></Input></div></div>
          <p v-if="isEdit">每票 {{draftInfo.ticketTkc}} Tkc；</p>
          <div v-else  class="rules-edit-box">每票<div><Input v-model="draftInfo.ticketTkc"><span slot="append">Tkc</span></Input></div></div>
        </div>
      </div>
    </div>
    <div v-if="!isEdit" style="text-align: center;padding: 20px 0">
      <Button type="primary" style="width: 300px" @click="saveProposal" :disabled="uploadSpin">保存编辑</Button>
    </div>
    <!--大图预览-->
    <Modal title="查看图片" v-model="visible">
      <img :src="draftInfo.image" v-if="visible" style="width: 100%">
    </Modal>
    <!--预览-->
    <div class="preview-mask" v-if="previewVisible">
      <div class="ivu-modal-mask"  @click="previewVisible = !previewVisible"></div>
      <div class="preview-modal">
          <div class="preview-head">
            提案详情
          </div>
          <div class="preview-body">
            <div class="preview-cover">
              <img :src="draftInfo.image" alt="">
            </div>
            <div class="preview-title">
              {{draftInfo.title}}
            </div>
            <div class="preview-desc">
              {{draftInfo.summary}}
            </div>
            <div class="vote-date">
              提案投票期：{{draftInfo.startTime | formatTime2 }} - {{ draftInfo.endTime | formatTime2 }}
            </div>
            <div class="vote-info">
              <p>
                <span>1TKC/票</span>
                <span>最低生效：1票</span>
                <span>每人限投：99999票</span>
              </p>
              <div>
                <div>
                  <Progress :percent="draftInfo.ticketRatio|proProgress" :stroke-width="5" status="active"></Progress>
                </div>
                <span>
                  <Icon type="stats-bars"></Icon>
                  {{draftInfo.totalTicket}}票
                </span>
              </div>
            </div>
            <div class="pro-options">
              <span>提案选项</span>
              <ul>
                <li v-for="(item,index) in draftInfo.optionList">
                  <p>{{index + 1 + '、'}}{{ item.content }}</p>
                  <div style="display: flex;align-items: center;padding: 3px 0">
                    <span class="option-progress" :style="{'width': optionProgress(item.totalTicket)}"></span>
                    <span style="display: inline-block;padding: 0 5px;white-space: nowrap">{{ item.totalTicket }}票</span>
                  </div>
                </li>
              </ul>
            </div>
            <!--预览内容-->
            <div class="preview-content">
              <!--内容遍历-->
              <div class="model-box" v-for="(item,i) in draftInfo.contentList">
                <div class="model-img img-box">
                  <img v-if="item.type == 1" :src="item.file" alt="">
                  <video v-else-if="item.type == 2" :src="item.file" controls></video>
                </div>
                <div class="model-origin" v-if="item.origin">
                  <span style="color: #7D7F80"><Icon type="arrow-up-b" size="20" style="vertical-align: middle"></Icon> {{item.origin}}</span>
                </div>
                <div class="model-content" v-if="item.content">
                  <p  style="white-space: pre-line;word-wrap: break-word;">
                    {{item.content}}
                  </p>
                </div>
              </div>
              <!--链接遍历-->
              <h3 v-if="linkList.length > 0 && (linkList[0]['name'] || isEdit)">相关链接：</h3>
              <div class="link" v-for="(item,i) in draftInfo.linkList" >
                <a style="display:inline-block;padding: 5px 0" :href="item.linkUrl" target="_blank">{{item.name}}</a>
              </div>
            </div>
          </div>
        </div>
    </div>
    <!--<video id="hiddenVideo" src=""  crossorigin="anonymous" controls></video>-->
  </div>
</template>
<script>
    import WangEditor from 'wangeditor';
    import axios from 'axios';
    import { proposalInfo,saveProposal, fileUpload } from '@/api'
    import moment from 'moment'
    let editor, editorMenu = [
      'source',
      '|',
      'bold',
      'underline',
      'italic',
      'strikethrough',
      'eraser',
      'forecolor',
      'bgcolor',
      '|',
      'quote',
      'fontfamily',
      'fontsize',
      'head',
      'unorderlist',
      'orderlist',
      'alignleft',
      'aligncenter',
      'alignright',
      '|',
      'link',
      'unlink',
      'table',
      'emotion',
      '|',
      'img',
      'video',
      'insertcode',
      '|',
      'undo',
      'redo',
      'fullscreen'
    ];
    let contentMap = {
      file: '', //路径
      content: '', //内容
      type: '', // 类型
      origin: '', //来源
      width: 200,
      height: 100,
      num: '' //排序号
    };
    let linkMap = {
      linkUrl: '', // 链接
      name: '', // 名称
    };
    export default {
      data() {
        return {
          uploadUrl: process.env.BASE_API+'/file-upload', //上传地址
          uploadHeaders: {
            'cas-client-st': localStorage.getItem('tx-st')
          },
          isEdit: true, //编辑开关
          editor: null, //编辑器对象
          draftInfo: {}, //提案详情
          uploadSpin: false,
          visible: false,
          previewVisible: false,
          contentList: [],
          linkList: [],
          hideEdit: false
        }
      },
      props: {
        draftId: {
          type: [String, Number]
        }
      },
      filters: {
        formatTimestamp (v) {
          return v ? moment(v).format("YYYY-MM-DD HH:mm") : " "
        },
        formatTime2 (v) {
          return v ? moment(v).format("YYYY.MM.DD HH:mm") : " "
        },
        proProgress (v) {
          return v > 1 ? 100 : v * 100
        }
      },
      created () {
        this.$Spin.show();
        this.getProposalInfo().then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
      },
      mounted () {
        let _this = this;
        editor = new WangEditor('editorDiv');
        editor.config.zindex = 99;
        editor.config.menus = editorMenu;
        editor.config.uploadImgUrl = process.env.BASE_API+'/v1/proposal/upload-url?proposalId='+this.draftId;
        editor.config.uploadHeaders = {
          'cas-client-st': localStorage.getItem('tx-st')
        };
        editor.config.uploadImgFileName = 'file';
        editor.config.customAlert = function (info) {
          // info 是需要提示的内容
          _this.$Message.error('上传图片发生错误')
        };
        // 自定义load事件
        editor.config.uploadImgFns.onload =  (resultText, xhr) => {
          // resultText 服务器端返回的text
          // xhr 是 xmlHttpRequest 对象，IE8、9中不支持
          let res = JSON.parse(resultText);
          if(res.code === 200) {
            if(res.data instanceof Array){
              res.data.forEach(url => {
                editor.command(null, 'insertHtml', '<img src="' + url + '" style="max-width:100%;"/>');
              })
            }
          }else {
            this.$Message.error(res.message);
          }
        };
        editor.create();
      },
      beforeDestroy () {
        editor.destroy();
        editor = null;
      },
      methods: {
        getProposalInfo () {
          return proposalInfo({id: this.draftId}).then(res => {
            this.draftInfo = res.data;
            this.draftInfo.type += '';
            // 内容和链接
            this.contentList = res.data.contentList.length === 0 ? [{...contentMap}] : res.data.contentList;
//            this.linkList = res.data.linkList.length === 0 ? [{...linkMap}] : res.data.linkList;
            this.linkList = res.data.linkList;
            //
            this.hideEdit = !(res.data.contentList.length > 0);
            editor.$txt.html(res.data.content);
            //向父级传递提案信息
            this.$emit('proposalMsg', res.data)
          });
        },
        addOption () {
          let { optionList } = this.draftInfo;
          if (!optionList[optionList.length-1].content){
            this.$Message.error('请填写前一选项');
            return;
          }
          if (optionList.length == 5){
            this.$Message.error('提案选项不能超过5条');
            return;
          }
          optionList.push({
            content: ''
          })
        },
        delOption (index) {
          let { optionList } = this.draftInfo;
          if(optionList.length == 2) {
            this.$Message.error('提案选项不能少于2条');
            return
          }
          optionList.splice(index,1)
        },
        saveProposal () {
          // 判断内容是否填写完整
          const contentFull = this.contentList.some(item => !item.file);
          if (contentFull) {
            this.$Message.warning('图片或者视频信息为空！');
            return;
          }
          let {id, type, title, summary, image, ticketTkc, userTicketLimit, duration, optionList, content, effectiveTicket,startTime, endTime} = this.draftInfo;
          if(!startTime){
            this.$Message.error('请选择提案开始时间！');
            return
          }
          if(!endTime){
            this.$Message.error('请选择提案结束时间！');
            return
          }
          let proposalInfo = {
            id: id, //id
            proposalType: type, //提案类型
            title: title, //提案名称
            summary: summary, //提案简介
            image: image,
            ticketTkc: ticketTkc, //每票tkc数
            userTicketLimit: userTicketLimit, //每人最多票数
            duration: duration || '', //投票持续时间
            options: JSON.stringify(optionList), //提案选项
            // content: editor.$txt.html(), //提案内容
            contentList: JSON.stringify(this.contentList), // 提案内容
            linkList: JSON.stringify(this.linkList),  // 链接
            startTime: moment(startTime).format('YYYY/MM/DD HH:mm'),//开始时间
            endTime: moment(endTime).format('YYYY/MM/DD HH:mm'),
            effectiveTicket: effectiveTicket //生效票数
          };
          saveProposal(proposalInfo).then(res => {
            this.$Message.success('修改成功！');
            this.draftInfo.content = editor.$txt.html(); //更新提案内容
            this.isEdit = true;
          })
        },
        optionProgress(v) {
          return v == 0 ? '0%' : v / this.draftInfo.totalTicket * 100 + '%'
        },
        addLink() {
          const linkLength = this.linkList.length;
          if (linkLength === 3) {
            this.$Message.warning('相关链接不能超过3个！');
            return;
          }
          // 判断内容是否填写完整
          /*const lastLink = this.contentList[linkLength-1];
          if (!lastLink.linkUrl || !lastLink.name) {
            this.$Message.warning('请填写完整内容再添加！');
            return;
          }*/
          this.linkList.push({...linkMap})
        },
        addContent() {
          const contentLength = this.contentList.length;
          if (contentLength === 3) {
            this.$Message.warning('内容不能超过3个！');
            return;
          }
          // 判断内容是否填写完整
          /*const lastContent = this.contentList[contentLength-1];
          if (!lastContent.content || !lastContent.file || !lastContent.origin) {
            this.$Message.warning('请填写完整内容再添加！');
            return;
          }*/

          this.contentList.push({...contentMap});
        },
        fileChange(e,item,i){
          const files = e.target.files[0];
          if (!files) {
            return;
          }
          const imgReg = /^image\//;
          const videoReg = /^video\//;
          if (!imgReg.test(files.type) && !videoReg.test(files.type)) {
            this.$Message.error('请上传图片或视频！');
            return
          }
          /*if (videoReg.test(files.type) && item.file){
            const video = document.getElementById('video'+i);
            const canvas = document.createElement("canvas");
            const canvasFill = canvas.getContext('2d');
            canvas.width = video.offsetWidth;
            canvas.height = video.offsetHeight;
            canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((b) => {
              this.uploadVideoImg(b).then(url => item.videoImage = url);
            }, 'jpg');
          }*/
          const formData = new FormData();
          formData.append('file', files);
          this.uploadSpin = true;
          axios.post(process.env.BASE_API+'/file-upload', formData, {
            headers: {
              'cas-client-st': localStorage.getItem('tx-st')
            }
          }).then(res => {
            this.uploadSpin = false;
            item.file = res.data.data.url;
            console.log(imgReg.test(files.type));
            if(imgReg.test(files.type)) {
              item.type = 1;
            }else {
              item.type = 2;
              this.$nextTick(() => {
                const video = document.getElementById('video'+i);
                video.addEventListener('canplay', () => {
                  const canvas = document.createElement("canvas");
                  const canvasFill = canvas.getContext('2d');
                  canvas.width = video.offsetWidth;
                  canvas.height = video.offsetHeight;
                  canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
                  canvas.toBlob((b) => {
                    this.uploadVideoImg(b).then(url => item.videoImage = url);
                  }, 'jpg');
                });
              });
            }
          }).catch(err => {this.uploadSpin = false;});
        },
        handleSuccess(response, file, fileList) {
          if(response.code == 200){
            this.draftInfo.image = response.data.url;
          }
        },
        handleBeforeUpload(file) {
          const imgReg = /^image\//;
          if (!imgReg.test(file.type)) {
            this.$Message.error('文件格式不正确！');
            return false;
          }
        },
        delContentBlock(i) {
          if (this.contentList === 1) {
            this.$Message.error('至少包含一块相关内容！');
            return
          }
          this.contentList.splice(i,1);
        },
        delLinkBlock(i) {
          this.linkList.splice(i,1);
        },
        uploadVideoImg(f) {
          let formData = new FormData();
          formData.append('file', f, 'img.jpg');
          return axios.post(process.env.BASE_API+'/file-upload', formData, {
            headers: {
              'cas-client-st': localStorage.getItem('tx-st')
            }
          }).then(res => {
            return res.data.data.url;
          })
        }
      },
      watch: {
        // 控制相关链接标题显示隐藏
        isEdit: {
          immediate: true,
          handler(v) {
            if(v){
              if(this.linkList.length > 0) {
                let tempName = this.linkList[0]['name'];
                !tempName && (this.linkList = [])
              }
            }else {
              this.linkList.length === 0 && (this.linkList = [{...linkMap}])
            }
          }
        }
      }
    }
</script>
