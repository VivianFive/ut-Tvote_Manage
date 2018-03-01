<style scoped>

</style>
<template>
  <div id="user-container">
    <div class="filter-container">
      <Form>
        <FormItem>
            <Input v-model="parameterList.name" placeholder="用户ID" style="width: 300px"></Input>
            <Button type="primary" @click="filterHandle">查询</Button>
        </FormItem>
        <FormItem label="状态：">
          <RadioGroup type="button" v-model="statusRadio" @on-change="filterHandle">
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
  </div>
</template>
<script>
  import {userList,userListUpdataState} from '@/api';
    export default {
      data () {
        return {
          pageTotal:0,//总页数
          currentPageNum:1, //当前页数
          statusRadio: 'all',//选择状态
          parameterList:{ //参数
            offset:0,//当前页
            limit:10,//每页条数
            name:'',//搜索
            state:'',
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
              key:'phone'
            },
            {
              title: '充值TKC',
              key: 'rechargeTkc'
            },
            {
              title: '投入TKC',
              key: 'costTkc'
            },
            {
              title: '提现TKC',
              key: 'withdrawTkc'
            },
            {
              title: '当前余额',
              key: 'availableTkc'
            },
            {
              title: '身份',
              key: 'userRole',
              render: (h,p) => p.row.userRole || '-'
            },
            {
              title: '发起提案',
              key: 'proposalCount'
            },
            {
              title: '参投提案',
              key: 'costCount'
            },
            {
              title: '状态',
              key: 'state',
              width:'80',
              render:(h,params) =>{
                if(params.row.state == 1){
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
              },
            },
            {
              title: '操作',
              key: 'id',
              render: (h,params) => {
                return h('div',[
                  h('span',{
                    style:{
                      color:params.row.state == 1 ? 'red':'#19be6b',
                      cursor: 'pointer'
                    },
                    props:{
                      type:'text'
                    },
                    on:{
                      click: () =>{
                        this.userUpdataStatus(params.row);
                      }
                    },
                  },params.row.state == 1 ? '禁用':'启用')
                ]);
              }
            },{
              title: '查看',
              key: 'id',
              render: (h,params) => {
                return h('router-link',{
                  props: {
                    to: '/user/userInfo?userId='+params.row.id
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
        this.userIndexList().then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
      },
      methods: {
        userIndexList(){
          this.statusRadio != 'all' ? (this.parameterList.state = this.statusRadio):this.parameterList.state='';
          return userList(this.parameterList).then(res => {
            this.userTableList  = res.data.rows;
            this.pageTotal = res.data.total;
          })
        },
        userUpdataStatus(row){
          this.$Modal.confirm({
            title: '操作确认',
            content: '确定'+ (row.state == 1 ? '禁用' : '启用')+'该用户？',
            onOk: () => {
              userListUpdataState({
                id:row.id,
                state:row.state == 1 ? 0 : 1,
              }).then(res => {
                row.state = row.state == 1 ? 0 : 1;
              })
            }
          });
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
        }
      }
    }
</script>
