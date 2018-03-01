<style scoped>
  .model-content{
    padding: 0 20px;
  }
  .ul-content > li{
    padding: 5px 0;
  }
</style>
<template>
  <div id="enterpriseContainer">
    <div class="filter-container">
      <Form>
        <FormItem>
          <div class="filter-header">
            <div class="date-filter">
              <span style="padding: 10px 12px 10px 0">提交时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data)=>{statePrams.start = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span> 至 </span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(data) => {statePrams.end = data}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="search-filter">
              <Input v-model="statePrams.keyword" placeholder="用户ID、企业全称、企业简称" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
      </Form>
    </div>

    <Table border stripe :columns="tableColumns" :data="tableData"></Table>
    <div style="margin-top: 20px;padding-bottom: 200px;">
      <div style="float: right">
        <Page :current.sync="currentPageNum" :total="pageTotal" show-total show-elevator show-sizer @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) =>pageChange(n,0)"></Page>
      </div>
    </div>

    <!--modal-->
    <Modal v-model="infoModal" width="500" :mask-closable="false" class-name="vertical-center-modal">
      <p slot="header" style="color:#f60;text-align:center">
        <span>企业审核详情</span>
      </p>
      <div>
        <div class="com-settings-header">
          <h4>申请信息</h4>
        </div>
        <ul class="model-content ul-content">
          <li>提交人ID：{{modalInfo.userId}}</li>
          <li>提交时间：{{modalInfo.createTime | timeFormat}}</li>
          <li>企业logo：<img style="width: 50px;height: 50px;vertical-align: middle" :src="modalInfo.logo" alt=""></li>
          <li>企业全称：{{modalInfo.name}}</li>
          <li>企业简称：{{modalInfo.shortName}}</li>
        </ul>
        <div class="com-settings-header">
          <h4>审核信息</h4>
        </div>
        <div class="model-content">
          <Timeline>
            <template v-for="(record, index) in auditEnterpriseRecord">
              <TimelineItem>
                <p class="time">{{ record.status | statusMap }} {{record.createTime | timeFormat}}</p>
                <p style="color: #999999">{{record.remark}}</p>
              </TimelineItem>
            </template>
          </Timeline>
        </div>
        <template v-if="modalInfo.status == 0">
          <div class="com-settings-header">
            <h4>审核</h4>
          </div>
          <div class="audit-content model-content">
            <RadioGroup v-model="auditData.status" vertical>
              <Radio label="2">
                <span>审核通过</span>
              </Radio>
              <Radio label="3">
                <span>审核未通过</span>
              </Radio>
            </RadioGroup>
            <Input v-if="auditData.status == 3" :maxlength="300" v-model="auditData.remark" type="textarea" :rows="4" placeholder="请输入未通过原因，最多300字"></Input>
          </div>
        </template>
      </div>
      <div slot="footer">
        <Button v-if="modalInfo.status == 0" type="primary" size="large" long @click="submitAudit">提交审核</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import { enterpriseAuditList, auditEnterprise, auditRecord } from '@/api';
  import moment from 'moment'
  export default {
    data () {
      return {
        infoModal: false,
        modalInfo: {},
        auditData:{
          status: '3',
          remark: ''
        },
        auditEnterpriseRecord: [],
        statePrams:{
          keyword:'', //搜索条件
          status: this.audit,//条件
          offset: 0,
          limit: 10,
          start:'',
          end:'',
        },
        tableData:[],//列表数据
        pageTotal: 0,//总页数
        currentPageNum:1, //当前页数
        tableColumns: [
          {
            title:'序号',
            key:'num',
            type:'index',
            width:'80'
          },
          {
            title:'用户名（ID）',
            key:'userId'
          },
          {
            title:'企业logo',
            key:'logo',
            render: (h,p) => h('img',{attrs: {src: p.row.logo}, style: {width: '60px', height: '60px'}})
          },
          {
            title:'企业全称',
            key:'name'
          },
          {
            title:'企业简称',
            key:'shortName'
          },
          {
            title: '提交时间',
            key: 'createTime',
            render: (h,p) => moment(p.row.createTime).format('YYYY-MM-DD HH:mm')
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
                },'已审核')
              }else{
                return h('span',{
                  style:{
                    color:'red'
                  }
                },'待审核')
              }
            }            },
          {
            title:'操作',
            key:'edit',
            width: 130,
            render: (h,p) => h('a',{attrs:{href: 'javascript:;'}, on:{'click': () => this.showModal(p.row)}}, p.row.status == '0' ? '审核' : '查看详情')
          }
        ],
      }
    },
    props: {
      audit: {
        type: Number
      }
    },
    created (){
      this.getEnterpriseAuditList();
    },
    filters: {
      statusMap(v) {
        let tempMap = {'1': '提交审核', '2': '审核通过', '3': '审核失败'};
        return tempMap[v];
      }
    },
    methods:{
      getEnterpriseAuditList(){
        return enterpriseAuditList(this.statePrams).then(res => {
          this.tableData = res.data.rows;
          this.pageTotal = res.data.total;
        });
      },
      //过滤查询
      filterHandle () {
        //重置页码
        this.statePrams.offset = 0;
        this.statePrams.limit = 10;
        this.currentPageNum = 1;
        this.getEnterpriseAuditList();
      },
      //分页
      pageChange(n,t){
        t ? this.statePrams.offset = n-1 : this.statePrams.limit = n;
        this.statePrams.offset = this.statePrams.offset * this.statePrams.limit;
        this.getEnterpriseAuditList();
      },
      // 操作
      showModal(row) {
        this.infoModal = true;
        this.modalInfo = row;
        auditRecord({id: this.modalInfo.id}).then(res => {
          this.auditEnterpriseRecord = res.data;
        })
      },
      // 提交审核
      submitAudit() {
        auditEnterprise({...this.auditData, id: this.modalInfo.id}).then(res => {
          this.$Message.success('审核成功！');
          this.infoModal = false;
          this.tableData.splice(this.tableData.findIndex(e => e.id === this.modalInfo.id), 1)
        });
      }
    }
  }
</script>
