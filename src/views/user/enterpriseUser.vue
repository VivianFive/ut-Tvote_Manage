<style scoped>

</style>
<template>
  <div id="enterprise-user-container">
    <div class="filter-container">
      <Form>
        <FormItem>
          <Input v-model="parameterList.name" placeholder="用户ID" style="width: 300px"></Input>
          <Button type="primary" @click="filterHandle">查询</Button>
        </FormItem>
        <FormItem label="状态：">
          <RadioGroup type="button" v-model="disabledRadio" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <Radio label="0">禁用</Radio>
            <Radio label="1">正常</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <Table border stripe highlight-row ref="currentRowTable" :columns="columns" :data="userTableList"></Table>
    <div style="margin:20px 0 200px">
      <div style="float: right">
        <Page :current.sync="currentPageNum" :total="pageTotal" show-total show-elevator show-sizer @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) =>pageChange(n,0)"></Page>
      </div>
    </div>
    <!--启用禁用-->
    <Modal v-model="disabledModal" width="360">
      <p slot="header" style="color:#f90;text-align:center">
        <Icon type="help-circled"></Icon>
        <span>确认操作</span>
      </p>
      <div style="text-align:center">
        <div v-if="currentRow.disabled == 0">
          <Input v-model="disabledReason" type="textarea" :maxlength="200" :rows="4" placeholder="请输入禁用原因..."></Input>
        </div>
        <div v-else>
          确认启用该用户？
        </div>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="submitOperate">确认</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import {enterpriseList,changeEnterpriseStatus} from '@/api';
  export default {
    data () {
      return {
        pageTotal:0,//总页数
        currentPageNum:1, //当前页数
        disabledRadio: 'all',//选择状态
        disabledModal: false, // 禁用modal
        disabledReason: '', // 禁用原因
        currentRow: '', // 当前row
        modal_loading: false,
        parameterList:{ //参数
          offset:0,//当前页
          limit:10,//每页条数
          userId:'',//搜索
          disabled:'',
        },
        columns: [
          {
            title:'序号',
            key:'num',
            type:'index',
            width:'80'
          },
          {
            title:'用户ID',
            key:'userId'
          },
          {
            title: '充值TKC',
            key: 'recharge'
          },
          /*{
            title: '投入TKC',
            key: 'launchNum'
          },*/
          {
            title: '提现TKC',
            key: 'withdraw'
          },
          {
            title: '当前余额',
            key: 'balance'
          },
          {
            title: '企业全称',
            key: 'name'
          },
          {
            title: '发起提案',
            key: 'launchNum'
          },
          {
            title: '参投提案',
            key: 'voteNum'
          },
          {
            title: '状态',
            key: 'disabled',
            width:'80',
            render:(h,params) =>{
              if(params.row.disabled == 0){
                return h('span',{
                  style:{
                    color:'#259B24'
                  }
                },'正常')
              }else{
                return h('span',{
                  style:{
                    color:'red',
                  }
                },'禁用')
              }
            }
          },
          {
            title: '操作',
            key: 'id',
            render: (h,params) => {
              return h('div',[
                h('span',{
                  style:{
                    color:params.row.disabled == 0 ? 'red':'#19be6b',
                    cursor: 'pointer'
                  },
                  props:{
                    type:'text'
                  },
                  on:{
                    click: () =>{
                      this.userUpdateStatus(params.row);
                    }
                  },
                },params.row.disabled == 0 ? '禁用':'启用')
              ]);
            }
          },{
            title: '查看',
            key: 'id',
            render: (h,params) => {
              return h('a',{
                attrs: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => this.toEnterpriseInfo(params.row)
                }
              },'查看详情')
            }
          }
        ],
        userTableList: [],//用户管理列表

      }
    },
    created () {
      this.$Spin.show();
      this.userIndexList();
//      this.userIndexList().then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
    },
    methods: {
      userIndexList(){
        this.disabledRadio != 'all' ? (this.parameterList.disabled = this.disabledRadio):this.parameterList.disabled='';
        return enterpriseList(this.parameterList).then(res => {
          this.userTableList  = res.data.rows;
          this.pageTotal = res.data.total;
        })
      },
      userUpdateStatus(row){
        this.disabledModal = true;
        this.currentRow = row;
      },
      //分页
      pageChange(n,t){
        t ? this.parameterList.offset = n-1 : this.parameterList.limit = n;
        this.parameterList.offset = this.parameterList.offset * this.parameterList.limit;
        this.userIndexList();
      },
      //过滤查询
      filterHandle () {
        //重置页码
        this.parameterList.offset = 0;
        this.parameterList.limit = 10;
        this.currentPageNum = 1;
        this.userIndexList();
      },
      toEnterpriseInfo(row) {
        localStorage.setItem('eInfo', JSON.stringify(row));
        this.$router.push('/user/enterpriseInfo?userId='+ row.id)
      },
      submitOperate() {
        if (this.currentRow.disabled == 0 && !this.disabledReason){
          this.$Message.error('请输入禁用原因！');
          return;
        }
        changeEnterpriseStatus({
          id: this.currentRow.id,
          disabled: this.currentRow.disabled == 0 ? 1 : 0,
          reason: this.disabledReason
        }).then(res => {
          this.currentRow.disabled = this.currentRow.disabled == 0 ? 1 : 0;
          this.currentRow.disabled == 1 && (this.currentRow.reason = this.disabledReason);
          this.disabledModal = false;
        })
      }
    }
  }
</script>
