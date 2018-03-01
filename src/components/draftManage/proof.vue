<style scoped lang="less">
.proof-box{
  padding:0 20px;
}
  .proof-ul{
    > li{
      padding: 10px 0;
      display: flex;
    }
  }
  .proof-label{
    width: 80px;
  }
  .proof-item{
    flex: 1;
    p:not(:last-child){
      padding-bottom: 20px;
    }
  }
  .upload-list{
    width: 500px;
    height: 215px;
    text-align: center;
    line-height: 215px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-bottom: 20px;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
.upload-list-cover{
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,.6);
}
.upload-list:hover .upload-list-cover{
  display: block;
}
.upload-list-cover i{
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  margin: 0 10px;
  vertical-align: middle;
}
  .upload-box{
    width: 150px;
    height: 80px;
    line-height: 80px;
    i{
      vertical-align: middle;
    }
  }
  .select-options{
    > li{
      min-height: 32px;
      margin-bottom: 10px;
      border-bottom: 1px solid #dddee1;
      border-radius: 4px;
      width: 500px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > i{
        display: none;
        color: #00cc66;
        padding: 0 8px;
      }
      &:target{
        color: green;
      }
    }
  }
.radioClass{
  display:none;
}
.radioClass:checked + i{
  display:inline-block;
}
.radioClass:hover + i{
  display:inline-block;
}
  .link-url-box{
    width: 580px;
    margin-bottom: 10px;
    > i{
      vertical-align: middle;
      padding: 0 5px;
      color: #ed3f14;
      cursor: pointer;
    }
  }
  .name-address{
    width: 500px;
    display: inline-block;
    vertical-align: middle;
    padding: 10px;
    border: 1px dashed #999999;
    border-radius: 5px;
  }
</style>
<template>
  <div id="proof">
    <div class="com-settings-header">
      <h4>提案佐证</h4>
    </div>
    <div class="proof-box">
      <ul class="proof-ul">
        <li>
          <div class="proof-label">
            <span style="display:inline-block;height: 32px;line-height: 32px;">提案选项：</span>
          </div>
          <div class="proof-item">
            <ul class="select-options">
              <li v-for="(item,index) in proposalInfo.optionList">
                <div v-if="proposalInfo.status == 8" style="display: flex;justify-content: space-between;width: 100%;align-items: center">
                  <div style="width: 100%">{{item.content}}</div>
                  <Icon v-if="item.status == 1"  type="checkmark" style="color: #00cc66;padding: 0 8px;vertical-align: middle"></Icon>
                </div>
                <template v-else>
                  <label style="width: 100%;cursor: pointer" :for="'selectOpt'+index">{{item.content}}</label><input :value="item.id" v-model="checkedId" name="optionRadio" type="radio" class="radioClass" :id="'selectOpt'+index"/>
                  <Icon type="checkmark"></Icon>
                </template>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <div class="proof-label">
            佐证地址：
          </div>
          <div class="proof-item">
            <template v-for="(item,index) in linkList">
              <div class="link-url-box">
                <div class="name-address">
                  <Input v-model="item.name" style="margin-bottom: 10px" placeholder="请输入佐证名称"></Input>
                  <Input icon="link" v-model="item.link" placeholder="请输入佐证地址"></Input>
                </div>
                <Icon type="minus-circled" size="20" @click.native="delLinkUrl(index)"></Icon>
              </div>
            </template>
            <div>
              <Button type="dashed" style="width: 500px" icon="plus-round" @click="addLink">新增</Button>
            </div>
          </div>
        </li>
        <li>
          <div class="proof-label">
            佐证图片：
          </div>
          <div class="proof-item">
            <div class="upload-list" v-for="(item,index) in uploadList">
              <template v-if="item.status === 'finished'">
                <img :src="item.url">
                <div class="upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>

            <Upload
              ref="upload"
              :show-upload-list="false"
              :data="{proposalId: proposalInfo.id}"
              :headers="uploadHeaders"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="5120"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              multiple
              type="drag"
              :action="uploadUrl"
              style="display: inline-block;width:150px;">
              <div class="upload-box">
                <Icon type="android-upload" size="30"></Icon>
              </div>
            </Upload>
            <div>
              <span>上传图片({{uploadList.length}}/5)</span>
            </div>
          </div>
        </li>
        <li>
          <div class="proof-label">
            佐证说明：
          </div>
          <div class="proof-item">
            <Input v-model="proposalInfo.evidenceInfo.remark" type="textarea" :rows="4" :autosize="{minRows: 4,maxRows: 10}" :maxlength='1000' placeholder="请输入..." style="width: 500px"></Input>
          </div>
        </li>
        <li>
          <div class="proof-label">

          </div>
          <div class="proof-item">
            <div style="text-align: center;padding: 20px 0;width: 500px">
              <Button type="primary" style="width: 300px" @click="submitProof">保存佐证</Button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Modal title="查看图片" v-model="visible">
      <img style="width: 100%" :src="imgUrl">
    </Modal>
  </div>
</template>
<script>
  import { submitProof } from '@/api'
    export default {
      data () {
        return {
//          uploadUrl: process.env.BASE_API+'/v1/proposal//upload-evidence-image', //上传地址
          uploadUrl: process.env.BASE_API+'/file-upload', //上传地址
          uploadHeaders: {
            'cas-client-st': localStorage.getItem('tx-st')
          },
          uploadList: [],
          imgUrl: '',
          visible: false,
          checkedId: '', //选项id
          defaultList: [], //处理佐证图片列表
          linkList: [] //处理佐证地址
        }
      },
      props: {
        proposalInfo: {
          type: Object
        }
      },

      created () {
        if(this.proposalInfo.evidenceInfo === null){
          this.proposalInfo.evidenceInfo = {
            imgUrlList: [],
            linkUrlList: [],
            remark: "",
            nameList: null
          };
        }
        this.defaultList = this.mapImgList();
        this.linkList = this.mpaLinkList();
        this.proposalInfo.optionList.forEach(item => item.status == '1' && (this.checkedId = item.id));
      },
      methods: {
        handleView (url) {
          this.imgUrl = url;
          this.visible = true;
        },
        handleRemove (file) {
          // 从 upload 实例删除数据
          const fileList = this.$refs.upload.fileList;
          if(fileList.length === 1){
            this.$Message.error('至少需要一个佐证图片');
            return
          }
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess (res, file) {
          file.url = res.data.url;
        },
        handleFormatError (file) {
          this.$Notice.warning({
            title: '文件格式不正确',
            desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
          });
        },
        handleMaxSize (file) {
          this.$Notice.warning({
            title: '超出文件大小限制',
            desc: '文件 ' + file.name + ' 太大，不能超过 5M。'
          });
        },
        handleBeforeUpload () {
          const check = this.uploadList.length < 5;
          if (!check) {
            this.$Notice.warning({
              title: '最多只能上传 5 张图片。'
            });
          }
          return check;
        },
        mapImgList () {
          return this.proposalInfo.evidenceInfo.imgUrlList.map(e => {
            return {"url": e}
          })
        },
        mpaLinkList () {
          let nameList = this.proposalInfo.evidenceInfo.nameList;
          return this.proposalInfo.evidenceInfo.linkUrlList.map((e,i) => {
            return {"link":e,"name":(nameList ? nameList[i] : '')};
          });
        },
        addLink () {
          if(this.linkList.length === 5){
            this.$Message.error('佐证地址不能超过5个！');
            return
          }
          this.linkList.push({
            link: ''
          })
        },
        delLinkUrl (index) {
          if(this.linkList.length === 1){
            this.$Message.error('至少需要一个佐证地址');
            return
          }
          this.linkList.splice(index,1)
        },
        //提交佐证
        submitProof () {
          if(!this.checkedId){
            this.$Message.error('请选择一个选项！');
            return
          }
          if(this.linkList.length < 1){
            this.$Message.error('至少需要一个佐证地址');
            return
          }
          if(this.$refs.upload.fileList.length < 1){
            this.$Message.error('至少需要一个佐证图片');
            return
          }
          let linkArr = [],
              linkNameArr = [],
              isFull = false,
              imgUrlArr = this.uploadList.map(e => e.url);
          this.linkList.forEach(e => {
            if(e.link && e.name){
              linkArr.push(e.link);
              linkNameArr.push(e.name);
            }else {
              isFull = true
            }
          });
          if(isFull){
            this.$Message.error('请填写完整佐证地址信息！');
            return
          }
          submitProof({
            proposalId: this.proposalInfo.id,
            optionId: this.checkedId,
            evidenceName: linkNameArr.join(','),
            linkUrls: linkArr.join(','),
            imageUrls: imgUrlArr.join(','),
            evidenceRemark: this.proposalInfo.evidenceInfo.remark,
          }).then(res => {
            this.$Message.success('保存佐证信息成功！');
            this.proposalInfo.status = 8;
          })
        }
      },
      mounted () {
        this.uploadList = this.$refs.upload.fileList;
      }
    }
</script>
