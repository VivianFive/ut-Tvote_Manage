<style type="text/less" scope>

  /*上传*/
 .demo-upload-list{
   display: inline-block;
   width: 60px;
   height: 60px;
   text-align: center;
   line-height: 60px;
   border: 1px solid transparent;
   border-radius: 4px;
   overflow: hidden;
   background: #fff;
   position: relative;
   box-shadow: 0 1px 1px rgba(0,0,0,.2);
   margin-right: 4px;
 }
 .demo-upload-list img{
   width: 100%;
   height: 100%;
 }
 .demo-upload-list-cover{
   display: none;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   background: rgba(0,0,0,.6);
 }
 .demo-upload-list:hover .demo-upload-list-cover{
   display: block;
 }
 .demo-upload-list-cover i{
   color: #fff;
   font-size: 20px;
   cursor: pointer;
   margin: 0 2px;
 }
</style>
<template>
<div id="groupCapacityCont">
  <draft-common></draft-common>
  <!--提案参投信息-->
  <div class="com-mar-t10">
    <div class="com-settings-header com-mar-t10">
      <h4>提案参投信息</h4>
    </div>
    <Table border :columns="columns1" :data="draftTableList"></Table>
  </div>
  <!--提案佐证-->
  <div class="com-mar-t10">
    <div class="com-settings-header com-mar-t10">
      <h4>提案佐证</h4>
    </div>
    <div class="com-pad-l15">
      <div class="draftCommon-info-boxDetail">
        <span style="width: 80px;">提案选项：</span>
        <RadioGroup v-model="draftSelsect" type="button" size="small">
          <Radio label="WE"></Radio>
          <Radio label="IG"></Radio>
          <Radio label="OMG"></Radio>
        </RadioGroup>
      </div>
      <div class="com-mar-t10">
        <div class="draftCommon-info-boxDetail">
        <span style="width: 80px;">佐证地址：</span>
        <Input placeholder="请输入..." style="width: 300px;"></Input><Icon type="plus" size="18" />
      </div>
      </div>
      <div class="com-mar-t10 ">
        <div class="draftCommon-info-boxDetail">
          <span style="width: 80px;">佐证图片：</span>

            <!--<img :src="require('@/assets/images/zhanweiL.jpg')"
                                      style="width: 100%;height: 100%;"/>-->


<!--上传-->
        <div class="demo-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
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
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>



        </div>
        <!--上传-->
      </div>
      <div class="com-mar-t10">
        <div class="draftCommon-info-boxDetail">
          <span style="width: 80px;">佐证说明：</span>
          <Input v-model="draftText" type="textarea" :autosize="true" placeholder="请输入..."></Input>
        </div>
      </div>
    </div>

  </div>
  <div class="com-btn-distribution">
    <Button type="ghost">取消</Button>
    <Button type="ghost">提交</Button>
  </div>
</div>
</template>
<script>
  import draftCommon from '@/components/draftCommonHeader'
  export default {
    components: {draftCommon},
    data() {
      return {
        columns1:[
          {
            title:'订单编号',
            key:'orderNo'
          },
          {
            title:'用户ID',
            key:'userId'
          },
          {
            title:'参投项',
            key:'projectName'
          },
          {
            title:'参投票数',
            key:'pollNum'
          },
          {
            title:'参投TKC量',
            key:'TKCNum'
          },
          {
            title:'参投时间',
            key:'pollTime'
          },
        ],
        draftTableList:[{
          orderNo:'0111111',
          userId:'0002',
          projectName:'支持',
          pollNum:'7',
          TKCNum:'4545',
          pollTime:'45-1021'
        }],
        draftSelsect: 'WE',
        draftText:'',
//        上传
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    methods: {
      handleView (name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        // 因为上传过程为实例，这里模拟添加 url
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
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
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
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
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
