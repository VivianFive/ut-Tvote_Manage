<style scoped>

</style>
<template>
  <div id="comment">
    <div class="filter-container">
      <Form>
        <FormItem>
          <div class="filter-header">
            <div class="date-filter">
              <span style="padding: 10px 12px 10px 0">提交时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data)=>{statePrams.startTime = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span> 至 </span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data) => {statePrams.endTime = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="search-filter">
              <Input v-model="statePrams.name" placeholder="用户名/评论关键字/提案名称" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="状态：" :inline="true" :label-width="72">
          <RadioGroup type="button" v-model="stateRadio" @on-change="filterHandle">
            <Radio label="all">全部</Radio>
            <Radio label="0">屏蔽</Radio>
            <Radio label="1">展示</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <Table border stripe :columns="commentTitle" :data="commentDataList"></Table>
    <div style="margin-top: 20px;padding-bottom: 200px;">
      <div style="float: right">
      <Page :current.sync="currentPageNum" :total="pageTotal" show-total show-elevator show-sizer @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) =>pageChange(n,0)"></Page>
      </div>
    </div>

  </div>
</template>
<script>
  import {commentList,commentStatusHide,commentStatusCancleHide,commentTop,commentCancleTop} from '@/api';
    export default {
      data () {
        return {
          stateRadio: 'all',//点击选择
          statePrams:{
            name:'', //搜索条件
            status:'',//条件
            offset: 0,
            limit: 10,
            startTime:'',
            endTime:'',
          },
          commentDataList:[],//列表数据
          pageTotal: 0,//总页数
          currentPageNum:1, //当前页数
          commentTitle: [
            {
              title:'序号',
              key:'num',
              type:'index',
              width:'80'
            },
            {
              title:'用户名（ID）',
              key:'proposalTitle',
              render:(h,params)=>{
                return params.row.userBaseDTO.nikeName+'('+params.row.userBaseDTO.mobile+')'
              }
            },
            {
              title:'提案名称（ID）',
              key:'proposalTitle',
              render:(h,params) =>{
                return params.row.proposalTitle+'('+params.row.proposalId+')'
              }
            },
            {
              title:'提交时间',
              key:'intervalTime'
            },
            {
              title:'评论内容',
              key:'content',
              width: '30%',
              render:(h,params) => {
                return params.row.content.length > 50 ? h('Tooltip',{
                  props: {placement:'top'}
                  },[h('span',{style:{"cursor":"pointer"}},params.row.content.slice(0,50)+'。。。'),h('div',{slot:'content',style:{"white-space":"normal"}},params.row.content)]) : params.row.content
              }
            },
            {
              title:'状态',
              key:'status',
              width:'80',
              render:(h,params) => {
                if(params.row.status == 1){
                  return h('span',{
                    style:{
                      color:'#19be6b',
                    }
                  },'展示')
                }else{
                  return h('span',{
                    style:{
                      color:'red'
                    }
                  },'屏蔽')
                }
              }            },
            {
              title:'操作',
              key:'edit',
              width: 130,
              render:(h,params) =>{
                return h('div',[
                  h('a',{
                    style:{
                      color:params.row.status == 1 ? 'red' : '#19be6b',
                      marginRight: '20px'
                    },
                    attrs:{
                      href:'javascript:;'
                    },
                    on:{
                      click: () => {
                        this.updateStatus(params.row)
                      }
                    }
                  },params.row.status == 1 ? '屏蔽':'展示'),
                  h('a',{
                    style:{
                      color:params.row.top == 1 ? '#777777' : '#2d8cf0',
                    },
                    attrs:{
                      href:'javascript:;'
                    },
                    on:{
                      click: () => {
                        this.updateTop(params.row)
                      }
                    }
                  },params.row.top == 1 ? '取消置顶':'置顶')
                ])
              }
            }
          ],
        }
      },
      created (){
        this.$Spin.show();
        this.getCommentDataList().then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
      },
      methods:{
        updateStatus(row) {
          console.log(row);
          if(row.status == 1){
            commentStatusHide({
              id:row.id,
            }).then(res => {
              row.status = 0;
            })
          }else{
            commentStatusCancleHide({
              id:row.id,
            }).then(res => {
              row.status = 1;
            })
          }
        },
        updateTop(row) {
          if(row.top == 1){
            commentCancleTop({id:row.id}).then(res => row.top = 0);
          }else{
            commentTop({id:row.id}).then(res => row.top = 1)
          }
        },
        getCommentDataList(){
          this.stateRadio !='all' ? (this.statePrams.status = this.stateRadio) : this.statePrams.status = '';
          return commentList(this.statePrams).then(res => {
            this.commentDataList = res.data.rows;
            this.pageTotal = res.data.total;
          });
        },
        //过滤查询
        filterHandle () {
          //重置页码
          this.statePrams.offset = 0;
          this.statePrams.limit = 10;
          this.currentPageNum = 1;
          this.getCommentDataList();
        },
        //分页
        pageChange(n,t){
          t ? this.statePrams.offset = n-1 : this.statePrams.limit = n;
          this.statePrams.offset = this.statePrams.offset * this.statePrams.limit;
          this.getCommentDataList();
        },
      }
    }
</script>
