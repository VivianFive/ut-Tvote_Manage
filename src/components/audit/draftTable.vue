<style>

</style>
<template>
  <div id="draftTable">
    <Table border :data="tableData.rows" :columns="tableColumns" stripe></Table>
  </div>
</template>
<script>
  import moment from 'moment'
    export default {
      data () {
        return {
          pageTotal: 100,
          tableColumns: [{
            title: '序号',
            type: 'index',
            width: 60
          },{
            title: '提案 ID',
            key: 'id'
          },{
            title: '发起用户（ID）',
            key: 'userPhone'
          },{
            title: '提案名称',
            key: 'title'
          },{
            title: '提案简介',
            key: 'summary',
            render:(h,params) => {
              return params.row.summary.length > 20 ? h('Tooltip',{
                props: {placement:'top'}
              },[h('span',{style:{"cursor":"pointer"}},params.row.summary.slice(0,20)+'...'),h('div',{slot:'content',style:{"white-space":"normal"}},params.row.summary)]) : params.row.summary
            }
          },{
            title: this.tableType == 'done' ? '审核时间' : '提交时间',
            key: 'auditTime',
            render: (h,par) => this.tableType == 'done' ? moment(par.row.auditTime).format('YYYY-MM-DD HH:mm:ss') : moment(par.row.updateTime).format('YYYY-MM-DD HH:mm:ss')
          },{
            title: '提案类型',
            key: 'typeName'
          },{
            title: '状态',
            key: 'statusName',
            render: (h,param) => {
              if(param.row.status == 1){
                return h('span',{
                  style: {
                    color: '#f90'
                  }
                },'待审核')
              }else if(param.row.status == 2){
                return h('span',{
                  style: {
                    color: '#ed3f14'
                  }
                },'不通过')
              }else {
                return h('span',{
                  style: {
                    color: '#19be6b'
                  }
                },'通过')
              }
            }
          },{
            title: '操作',
            key: 'id',
            render: (h,param) => {
              return h('router-link',{
                props: {
                  to: this.tableType == 'done' ? '/audit/draftInfo?draftId='+  param.row.id : '/audit/draftAudit?draftId='+  param.row.id
                }
              },this.tableType == 'done' ? '查看详情' : '审核')
            }
          }]
        }
      },
      props: {
        tableData: {
          type: Object
        },
        tableType: {
          type: String
        }
      },
      methods: {

      }
    }
</script>
