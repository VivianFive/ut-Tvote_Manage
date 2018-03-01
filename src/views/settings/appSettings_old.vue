<style scoped lang="less">
  .banner-container{
    display: flex;
    &:not(:last-child){
      margin-bottom: 20px;
    }
  }
  .preview-box{
    width: 380px;
    height: 200px;
    /*background: #999;*/
    position: relative;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
      object-fit:cover;
    }
  }
  .upload-box{
    width: 100px;
    height: 80px;
  }
  .banner-right {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    margin-left: 50px;
  }
  .set-content{
    padding: 20px 30px;
  }
  .add-click{
    margin: 20px 0 0;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
  }
  .info-label{
    display: inline-block;
    width: 130px;
  }
  .set-top-label{
    display: inline-block;
    width: 100px;
  }
  .set-top-btn{
    margin-left: 100px;
  }
  .set-top-li:not(:last-child){
    margin-bottom: 30px;
  }
  .recommend{
    padding: 10px 20px;
  }
  .upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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
  .upload-list:hover .upload-list-cover{
    display: flex;
  }
  .current-recommend{
    width: 500px;
    margin: 10px 0 30px;
  }
  .current-recommend-list{
    border-bottom: 1px solid #666;
    padding: 10px 0;
    position: relative;
    &:hover{
      &>i{
        display: inline-block;
      }
    }
  }
  .remove-commend{
    display: none;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .link-url > span{
    display: inline-block;
    width: 70px;
  }
  .editor{
    width: 800px;
  }
</style>
<template>
  <div id="appSettings">
    <!--=============================banner设置关闭==============================-->
    <!--<div class="com-settings-header">
      <h4>头图（Banner）设置</h4>
    </div>
    <div class="banner-set set-content">
      <ul>
        <li class="banner-container" v-for="(item,index) in bannerSetList">
          <div class="banner-left">
            <div class="preview-box upload-list">
              <img :src="item.image">
              <div class="upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="bannerPreview(item.image)"></Icon>
                &lt;!&ndash;<Icon type="ios-trash-outline" @click.native="bannerSetRemove(index)"></Icon>&ndash;&gt;
              </div>
            </div>
          </div>
          <div class="banner-right">
            <div class="upload-box">
              <Upload
                ref="upload"
                v-show="!item.id"
                :show-upload-list=false
                :format="['jpg','jpeg','png']"
                :max-size="5120"
                type="drag"
                :action="uploadUrl"
                :on-success="(response, file, fileList) => uploadSuccess(response, file, fileList,index)"
                :headers="uploadHeaders"
                style="display: inline-block;width:100px;">
                <div style="width: 100px;height:80px;line-height: 80px;">
                  <Icon type="ios-cloud-upload" size="30" style="vertical-align: middle"></Icon>
                </div>
              </Upload>
            </div>
            <div class="link-url">
              <span>序号：</span>
              <Input placeholder="请输入..." v-model="item.bannerOrder" style="width: 300px"></Input>
            </div>
            <div class="link-url">
              <span>跳转地址：</span>
              <Input placeholder="请输入..." v-model="item.proposalId" style="width: 300px"></Input>
            </div>
            <div class="action-btn">
              <Button type="success" @click="bannerSetSave(index)">保存</Button>
              <Button type="error" @click="bannerSetRemove(index)">移除</Button>
            </div>
          </div>
        </li>
      </ul>
      <div class="add-click" @click="addBannerSet">
        <Icon type="android-add-circle" size="16" /> 点击添加 ({{bannerSetList.length}}/5)
      </div>
    </div>-->
    <div class="com-settings-header">
      <h4>置顶设置</h4>
    </div>
    <div class="set-content set-top">
      <ul>
        <li class="set-top-li">
          <div class="set-top-head">
            <span class="set-top-label">
              全民公决：
            </span>
            <Input style="width: 150px" v-model="topSet.referendum"/>
              <Button type="primary"  @click="proposalDetailHandle(topSet.referendum,'referendum')">查询</Button>
          </div>
          <proposal-result :result="referendumResult"></proposal-result>
          <div v-if="referendumResult" class="set-top-btn">
            <Button type="primary" @click="setTop(referendumResult.id, referendumResult.typeValue)">确定</Button>
            <Button type="error" v-if="referendumResult.top" @click="removeTop(referendumResult.id, referendumResult.typeValue)">移除</Button>
          </div>
        </li>
        <!--===============================群体智能============================-->
        <li class="set-top-li">
          <div class="set-top-head">
            <span class="set-top-label">
              群体智能：
            </span>
            <Input style="width: 150px"  v-model="topSet.intelligence"/>
            <Button type="primary" @click="proposalDetailHandle(topSet.intelligence,'intelligence')">查询</Button>
          </div>
          <proposal-result :result="intelligenceResult"></proposal-result>
          <div v-if="intelligenceResult" class="set-top-btn">
            <Button type="primary"  @click="setTop(intelligenceResult.id, intelligenceResult.typeValue)">确定</Button>
            <Button type="error" v-if="intelligenceResult.top" @click="removeTop(intelligenceResult.id, intelligenceResult.typeValue)">移除</Button>
          </div>
        </li>
      </ul>
    </div>
    <div class="com-settings-header">
      <h4>热门推荐</h4>
    </div>

    <div class="recommend">
      <div class="current-recommend">
        <Card>
          <p slot="title">当前热门提案：</p>
          <p v-for="(item,index) in hotProposals" class="current-recommend-list">
            {{item.title+' (ID：'+item.id+')'}}
            <Icon type="close-round" class="remove-commend" @click.native="removeHotProposal(item.id)"></Icon>
          </p>
        </Card>
      </div>
      <div>
        <span class="set-top-label">
          请输入提案ID：
        </span>
        <Input style="width: 200px" v-model="recommendId"/>
        <Button type="primary" @click="proposalDetailHandle(recommendId,'recommend')">查询</Button>
      </div>
      <proposal-result :result="hotProposalResult"></proposal-result>
      <div v-if="hotProposalResult" class="set-top-btn">
        <Button type="primary"  @click="hotProposal(hotProposalResult.id)">确定</Button>
        <Button type="error" v-if="hotProposalResult.hot" @click="removeHotProposal(hotProposalResult.id)">移除</Button>
      </div>
      <!--<div class="add-click">
        <Icon type="android-add-circle" size="16"/> 点击添加 (1/5)
      </div>-->
    </div>

    <div class="com-settings-header">
      <h4>公告设置</h4>
    </div>
    <Tabs>
      <TabPane label="简体公告" icon="ios-sunny">
        <div class="editor">
          <div id="note-editor" style="height: 350px"></div>
        </div>
      </TabPane>
      <TabPane label="繁体公告" icon="ios-moon">
        <div class="editor">
          <div id="note-complex-editor" style="height: 350px"></div>
        </div>
      </TabPane>
    </Tabs>


    <div class="com-settings-header">
      <h4>发起提案提醒</h4>
    </div>
    <Tabs>
      <TabPane label="简体发起提案提醒" icon="ios-sunny">
        <div class="editor">
          <div id="remind-editor" style="height: 300px"></div>
        </div>
      </TabPane>
      <TabPane label="繁体发起提案提醒" icon="ios-moon">
        <div class="editor">
          <div id="remind-complex-editor" style="height: 350px"></div>
        </div>
      </TabPane>
    </Tabs>

    <div style="text-align: center;padding: 20px 0">
      <Button type="primary" style="width: 300px" @click="saveNoticeRemind">保存公告设置和发起提案提醒</Button>
    </div>
    <!--大图预览-->
    <Modal title="查看图片" v-model="visible">
      <img :src="previewImg" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
  import {getAppSettingData,deleteBanner,updateBanner,proposalDetail,topProposal,removeTopProposal,hotProposal,removeHotProposal,updatePlatformConfig} from '@/api'
  import proposalResult from '@/components/settings/proposalResult'
  import WangEditor from 'wangeditor'
  let placeholderImg = require('@/assets/images/zhanweiL.jpg');
  let noteEditor, noteComplexEditor, remindEditor, remindComplexEditor, editMenu = [
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
    export default {
      data () {
        return {
          visible: false,
          previewImg: '', //看大图url
          uploadHeaders: {
            'cas-client-st': localStorage.getItem('tx-st')
          },
          uploadUrl: process.env.BASE_API+'/v1/app-setting/add-banner', //上传banner地址
          bannerSetList: [], //banner设置list
          topSet: {}, //置顶设置
          hotProposals: [], //热门推荐
          referendumResult: null, //全民公决查询结果
          intelligenceResult: null, //群体智能查询结果
          hotProposalResult: null, //热门推荐查询结果
          recommendId: ''
        }
      },
      components: {
        proposalResult
      },
      /*created() {
        getAppSettingData().then(res => {
            this.bannerSetList = res.data.bannerList;
            this.topSet = res.data.topProposalIds;
            this.hotProposals = res.data.hotProposals;
        });
      },*/
      methods: {
        //添加banner图设置
        addBannerSet () {
          if(this.bannerSetList.length < 5) {
            this.bannerSetList.push({image: placeholderImg});
          }else{
            this.$Message.error('最多设置5张banner图')
          }
        },
        //上传banner成功
        uploadSuccess (response, file, fileList,index) {
          this.$set(this.bannerSetList,index,response.data)
        },
        //保存banner图设置
        bannerSetSave (index) {
          let par = this.bannerSetList[index];
          if(!par.proposalId){
            this.$Message.error('请输入跳转地址！');
            return
          }
          updateBanner({
            proposalId: par.proposalId,
            id: par.id,
            order: par.bannerOrder
          }).then(res => {
              this.$Message.success('保存成功！')
          })
        },
        //移除banner图设置
        bannerSetRemove (index) {
          if(this.bannerSetList[index].id){
            //移除请求
            this.$Modal.confirm({
              title: '操作确认',
              content: '确定删除该条banner？',
              onOk: () => {
                deleteBanner({id: this.bannerSetList[index].id}).then(res => {
                  this.bannerSetList.splice(index,1)
                })
              },
              onCancel: () => {

              }
            });
          }else{
            this.bannerSetList.splice(index,1)
          }
        },
        //获取提案详情
        proposalDetailHandle (pid,type) {
          if(!pid){
            this.$Message.error('请输入提案id');
            return
          }
          proposalDetail({id:pid}).then(res => {
            if(Object.keys(res.data).length === 0){
              this.$Message.error('无该提案信息！');
              type === 'referendum' ? this.referendumResult = null : type === 'intelligence' ? this.intelligenceResult = null : this.hotProposalResult = null;
              return;
            }
            if(res.data.type == type.toUpperCase()){
              if(res.data.type == 'REFERENDUM'){
                this.referendumResult = res.data
              }else if(res.data.type == 'INTELLIGENCE') {
                this.intelligenceResult = res.data
              }
            }else if(type == 'recommend'){
              this.hotProposalResult = res.data
            }else {
              this.$Message.error('类型不正确！');
              return
            }
          })
        },
        //查看大图
        bannerPreview (url) {
          this.previewImg = url;
          this.visible = true;
        },
        //置顶设置
        setTop (id, type) {
          topProposal({
            proposalId: id,
            topType: type
          }).then(res => {
              this.$Message.success('置顶成功！');
              type ? this.intelligenceResult.top = 1 : this.referendumResult.top = 1
          })
        },
        //移除置顶
        removeTop (id,type) {
          removeTopProposal({proposalId:id}).then(res => {
            type ? this.intelligenceResult = null : this.referendumResult = null
          })
        },
        //提案加入热门推荐
        hotProposal (id) {
          if(this.hotProposals.length === 6){
            this.$Message.error('最多设置6个推荐！');
            return
          }
          hotProposal({proposalId:id}).then(res => {
            this.$Message.success('设置推荐成功！');
            this.hotProposals.push(this.hotProposalResult);
            //更新热门推荐列表

          })
        },
        //提案移除热门推荐
        removeHotProposal (id) {
          this.$Modal.confirm({
            title: '操作确认',
            content: '确定删除该条热门推荐？',
            onOk: () => {
              removeHotProposal({proposalId:id}).then(res => {
                this.hotProposalResult = null;
                let r_index;
                this.hotProposals.forEach((e,i) => {
                  e.id == id && (r_index = i)
                });
                this.hotProposals.splice(r_index,1);
              });
            },
            onCancel: () => {

            }
          });
        },
        //保存公告和提醒
        saveNoticeRemind () {
          let noticeHtml = noteEditor.$txt.html(),
              noticeComplexHtml = noteComplexEditor.$txt.html(),
              remindHtml = remindEditor.$txt.html(),
              remindComplexHtml = remindComplexEditor.$txt.html();
          updatePlatformConfig({
            sysconfigDTOs: JSON.stringify([
              {"name": "STRING_APP_NOTICE", "value": noticeHtml},
              {"name": "ZH_HANT_STRING_APP_NOTICE", "value": noticeComplexHtml},
              {"name": "STRING_PROPOSAL_REMIND", "value": remindHtml},
              {"name": "ZH_HANT_STRING_PROPOSAL_REMIND", "value": remindComplexHtml}
            ])
          }).then(res => {this.$Message.success('保存成功！')})
        }
      },
      mounted () {
        this.$Spin.show();
        //公告editor简体
        noteEditor = new WangEditor('note-editor');
        noteEditor.config.menus = editMenu;
        noteEditor.config.zindex = 100;
        noteEditor.create();
        //公告editor繁体
        noteComplexEditor = new WangEditor('note-complex-editor');
        noteComplexEditor.config.menus = editMenu;
        noteComplexEditor.config.zindex = 100;
        noteComplexEditor.create();
        //提醒editor简体
        remindEditor = new WangEditor('remind-editor');
        remindEditor.config.menus = editMenu;
        remindEditor.config.zIndex = 100;
        remindEditor.create();
        //提醒editor繁体
        remindComplexEditor = new WangEditor('remind-complex-editor');
        remindComplexEditor.config.menus = editMenu;
        remindComplexEditor.config.zIndex = 100;
        remindComplexEditor.create();

        getAppSettingData().then(res => {
          this.bannerSetList = res.data.bannerList;
          this.topSet = res.data.topProposalIds;
          this.hotProposals = res.data.hotProposals;
          //填充富文本内容
          noteEditor.$txt.html(res.data.appSysConfig.STRING_APP_NOTICE);
          noteComplexEditor.$txt.html(res.data.appSysConfig.ZH_HANT_STRING_APP_NOTICE);
          remindEditor.$txt.html( res.data.appSysConfig.STRING_PROPOSAL_REMIND);
          remindComplexEditor.$txt.html( res.data.appSysConfig.ZH_HANT_STRING_PROPOSAL_REMIND);
          setTimeout(() => this.$Spin.hide(),500)
        }).catch(() => this.$Spin.hide())
      },
      computed: {
        referendumProgress () {
          return this.referendumResult.ticketRatio > 1 ? 100 : this.referendumResult.ticketRatio*100
        },
        intelligenceProgress () {
          return this.intelligenceResult.ticketRatio > 1 ? 100 : this.intelligenceResult.ticketRatio*100
        }
      }
    }
</script>
