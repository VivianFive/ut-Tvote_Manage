<style scoped lang="less">
  .supplement{
    font-size: 10px;
    color: #999;
    padding-left: 10px;
  }
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
</style>
<template>
  <div id="versionMng">
    <div style="margin:10px 0 20px">
      <Button type="primary" icon="plus-circled" @click="() => showModal()">添加版本</Button>
    </div>
    <Table :columns="columns" :data="data" border stripe></Table>
    <div style="margin: 10px;text-align: right;padding-bottom: 100px">
      <div style="display: inline-block">
        <Page :total="total" @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) => pageChange(n,0)" :page-size-opts="[10,20,30]" show-elevator show-sizer></Page>
      </div>
    </div>

    <Modal v-model="modalVisible" width="360" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon :type="isAdd ? 'plus-circled' : 'ios-compose'"></Icon>
        <span>{{isAdd ? '添加版本' : '修改版本'}}</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem prop="terminal">
            <div>选择终端</div>
            <Select v-model="formValidate.terminal" placeholder="选择终端">
              <Option value="android">Android</Option>
              <Option value="ios">Ios</Option>
              <Option value="ios-p">Ios-p</Option>
            </Select>
          </FormItem>
          <FormItem prop="version">
            <div>版本号<span class="supplement">示例：1.2.0</span></div>
            <Input v-model="formValidate.version" placeholder="填写版本号"></Input>
          </FormItem>
          <FormItem prop="force">
            <div>是否强制更新</div>
            <Select v-model="formValidate.force" placeholder="是否强制更新">
              <Option value="1">是</Option>
              <Option value="0">否</Option>
            </Select>
          </FormItem>
          <FormItem prop="type">
            <div>版本类型</div>
            <Select v-model="formValidate.type" placeholder="版本类型">
              <Option value="-1">所有版本</Option>
              <Option value="0">测试版</Option>
              <Option value="1">正式版</Option>
            </Select>
          </FormItem>
          <FormItem prop="url">
            <div>版本地址<span class="supplement">示例：http://cdn.utouu.com/apps/apk/cn.tvote.120.apk</span></div>
            <Input v-model="formValidate.url" placeholder="输入版本地址"></Input>
          </FormItem>

          <FormItem prop="content">
            <div>更新内容<span class="supplement">最多200字</span></div>
            <Input v-model="formValidate.content" :maxlength="200" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入更新内容..."></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="submitHandle">{{isAdd ? '添加' : '修改'}}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import { versionList, versionAdd, versionUpdate } from '@/api'
  import moment from 'moment'
  let versionIndex;
    export default {
      data () {
        return {
          total: 0,
          limit: 10,
          page: 0,
          modalVisible: false,
          modal_loading: false,
          isAdd: true,
          columns: [
            {
              title: '序号',
              type: 'index'
            },
            {
              title: '终端',
              key: 'terminal'
            },{
              title: '版本号',
              key: 'version'
            },{
              title: '版本类型',
              key: 'type',
              render: (h,par) => par.row.type == -1 ? '所有版本' : par.row.type == 0 ? '测试版' : '正式版'
            },{
              title: '版本地址',
              key: 'url'
            },{
              title: '更新内容',
              key: 'content',
              render: (h,par) => {
                return par.row.content.length > 50 ? h('Tooltip',{
                  props: {
                    placement: 'top'
                  }
                },[
                  h('span',{style:{"cursor":"pointer"}},par.row.content.slice(0, 50)+'...'),
                  h('div',{slot: 'content',style:{"white-space":"normal"}},par.row.content)
                ]) : par.row.content
              }
            },{
              title: '是否强制更新',
              key: 'force',
              render: (h,par) => par.row.force ? '是' : '否'
            },{
              title: '创建时间',
              key: 'createDate',
              render: (h,par) => {
                return moment(par.row.createDate).format('YYYY-MM-DD HH:mm')
              }
            },
            {
              title: '操作',
              key: 'edit',
              render: (h,par) => {
                return h('a',{
                  attrs: {
                    href: 'javascript:;'
                  },
                  on: {
                    click: () => this.showModal(par.row, par.index)
                  }
                },'编辑')
              }
            }
          ],
          data: [],
          formValidate: {
            terminal: 'android',
            version: '',
            force: '1',
            url: '',
            content: '',
            type: '0'
          },
          ruleValidate: {
            version: [
                { required: true, message: '请填写版本号', trigger: 'blur' }
              ],
            url: [
                { required: true, message: '请填写版本地址', trigger: 'blur' }
              ],
            content: [
                { required: true, message: '请填写版本更新内容', trigger: 'blur' }
              ]
            }
        }
      },
      created() {
        this.getVersionList();
      },
      methods: {
        getVersionList (){
          versionList({
            page: this.page,
            limit: this.limit,
            version: '',
            terminal: '',
            force: ''
          }).then(res => {
            this.data = res.data.rows;
            this.total = res.data.total;
          }).catch(err => {});
        },
        pageChange(n, flag) {
          flag === 1 ? this.page = n - 1 : this.limit = n;
          this.getVersionList();
        },
        showModal(row, index) {
          this.$refs['formValidate'].resetFields();
          row ? this.isAdd = false : this.isAdd = true;
          index ? versionIndex = index : versionIndex = null;
          if (row) {
            let { terminal, version, force, url, content, type, id } = row;
            this.formValidate = {
              terminal,
              version,
              force: force ? '1' : '0',
              url,
              content,
              type: type + '',
              id
            };
          }else {
            this.formValidate.id && delete this.formValidate.id;
          }
          this.modalVisible = true;
        },
        submitHandle() {
          this.$refs['formValidate'].validate((valid) => {
            if (valid) {
              let copy = Object.assign({}, this.formValidate);
              copy.force = copy.force == '1';
              this.modal_loading = true;
              if (this.isAdd) {
                versionAdd(copy).then(res => {
                  this.$Message.success('添加成功！');
                  this.data.unshift({...copy, id: res.data});
                  this.modalVisible = false;
                  this.modal_loading = false;
                }).catch(err => {
                  this.modal_loading = false;
                });
              } else {
                versionUpdate(copy).then(res => {
                  this.$Message.success('修改成功！');
                  this.data.splice(versionIndex, 1, copy);
                  this.modalVisible = false;
                  this.modal_loading = false;
                }).catch(err => {
                  this.modal_loading = false;
                });
              }
            } else {
              this.$Message.error('请填写完整信息!');
            }
          });
        }
      }
    };
</script>
