<style type="text/less">

</style>
<template>
<div id="draftInfoCont">
  <!--<draft-common :proposalId="proposalId"></draft-common>-->
  <!--<info-and-edit :draftId="proposalId"></info-and-edit>-->
  <div class="com-mar-t10 com-pad-l15">
    <div class="com-settings-header com-mar-t10">
      <h4>提案参投信息</h4>
    </div>
    <Table border :columns="columns1" :data="draftTableList"></Table>
    <div style="margin-top: 20px;padding-bottom: 50px;">
      <div style="float: right">
        <Page :total="pageTotal" show-total show-elevator show-sizer @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) =>pageChange(n,0)"></Page>
      </div>
    </div>
  </div>
</div>
</template>
<script>

  import {drafrMngVoteList} from '@/api';
  import moment from 'moment'
  export default {
    components: {
      /*draftCommon,
      infoAndEdit*/
    },
    props: {
      proposalId: {
        type: String
      }
    },
    data() {
      return {
        columns1:[
          {
            title:'序号',
            key:'num',
            type:'index',
            width:'80'
          },
          {
            title:'订单编号',
            key:'code'
          },
          {
            title:'用户ID',
            key:'userPhone'
          },
          {
            title:'参投项',
            key:'optionContent'
          },
          {
            title:'参投票数',
            key:'ticket'
          },
          {
            title:'参投TKC量',
            key:'payTkc'
          },
          {
            title:'参投时间',
            key:'createTime',
            render: (h,params) => moment(params.row.createTime).format('YYYY-MM-DD HH:mm')
          },
        ],
        draftTableList:[],
        voteListParams:{
          proposalId:this.proposalId,
          offset :0,
          limit:10,
        },
        pageTotal:0,

      }
    },
    created (){
      this.draftMngVoteListFun();
    },
    methods:{
      draftMngVoteListFun(){
        drafrMngVoteList(this.voteListParams).then(res=>{
          this.draftTableList = res.data.rows;
          this.pageTotal = res.data.total;
        })
      },
      pageChange(n,t){
        t ? this.voteListParams.offset = n-1 :this.voteListParams.limit = n;
        this.voteListParams.offset = this.voteListParams.offset * this.voteListParams.limit;
        this.draftMngVoteListFun();
      }
    },
  }
</script>
