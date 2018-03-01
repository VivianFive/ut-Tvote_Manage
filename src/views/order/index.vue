<style scoped lang="less" type="text/less">
  #orderContainer{
    padding-bottom: 100px;
  }
  .table-ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    >li{
      width: 50%;
      /*height: 40px;*/
      /*line-height: 40px;*/
      padding: 20px 0;
    }
  }
  .info-label{
    display: inline-block;
    width: 60px;
  }
  .info-title{
    padding: 5px 0;
    font-weight: bolder;
    border-bottom: 1px solid #f2f2f2;
    font-size: 13px;
  }
  .draft-info-box .info-label{
    display: inline-block;
    width: 100px;
  }
  .other-info > li{
    height: 40px;
    line-height:40px;
  }
  .optionListLi{
    display: flex;
    line-height: normal;
  }
  .ProposalOption{
    padding: 5px 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #999999;
    /*border-radius: 5px;*/
  }
</style>
<template>
  <div id="orderContainer">
    <div class="filter-container">
      <Form>
        <FormItem>
          <div class="filter-header">
            <div class="date-filter">
              <span style="padding: 10px 12px 10px 0">创建时间：</span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {listParams.startTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
              <span> 至 </span>
              <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {listParams.endTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            </div>
            <div class="search-filter">
              <Input v-model="listParams.name" placeholder="用户ID/订单编号/提案名称" style="width: 250px"></Input>
              <Button type="primary" @click="filterHandle">查询</Button>
            </div>
          </div>
        </FormItem>
        <FormItem label="收支：" :label-width=73 :inline="true">
          <RadioGroup type="button" v-model="stateRadio" @on-change="stateChange">
            <Radio label="all">全部</Radio>
            <Radio label="1">收入</Radio>
            <Radio label="0">支出</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="行为：" :label-width=73>
          <RadioGroup type="button" v-model="actionRadio" @on-change="actionsChange">
            <Radio label="all">全部</Radio>
            <template v-for="(item,index) in actionsList">
              <Radio :label="item.value">{{item.name}}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
      </Form>
    </div>
    <Table border stripe :loading="loading" :columns="columns" :data="orderList.rows"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :current.sync="currentPageNum" :total="orderList.total" @on-change="(n) => pageChange(n,1)" @on-page-size-change="(n) => pageChange(n,0)" :page-size-opts="[10,20,30]" show-elevator show-sizer></Page>
      </div>
    </div>
    <!--详情modal-->
    <Modal
      v-model="infoModal"
      title="订单详情" width="700">
      <div class="base-msg-box">
        <h4 class="info-title">基本信息</h4>
        <ul class="table-ul">
          <li>
          <span class="info-label">
            订单编号：
          </span>
            {{ orderInfo.code }}
          </li>
          <li>
          <span class="info-label">
            收支：
          </span>
            {{orderInfo.orderState}}
          </li>
          <li>
          <span class="info-label">
            时间：
          </span>
            {{formatCreateTime}}
          </li>
          <li>
          <span class="info-label">
            行为：
          </span>
            {{orderInfo.orderType}}
          </li>
          <li>
          <span class="info-label">
            Tkc：
          </span>
            {{orderInfo.payTkc}}
          </li>
          <li>
          <span class="info-label">
            用户：
          </span>
            {{orderInfo.phone}}
          </li>
        </ul>
      </div>
      <div v-if="proposalInfo" class="draft-info-box">
        <h4 class="info-title">提案详情</h4>
        <ul class="table-ul">
          <li>
          <span class="info-label">
            提案名称（ID）：
          </span>
            {{orderInfo.proposalName}}
          </li>
          <li>
          <span class="info-label">
            提案结束时间：
          </span>
            {{proposalInfo.endTime}}
          </li>
          <li :hidden="orderInfo.type == 4 || orderInfo.type == 7">
          <span class="info-label">
            参投票数：
          </span>
            {{orderInfo.ticket}}
          </li>
          <li class="optionListLi">
            <p class="info-label">
              {{orderInfo.type == 4 || orderInfo.type == 7 ? '提案选项：' : '参投项：'}}
            </p>
            <div style="flex: 1">
              <p class="ProposalOption" v-for="(item,index) in proposalInfo.list" :key="index">{{item}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div slot="footer" style="border: none"></div>
    </Modal>
  </div>
</template>

<script>
  import { statusType,orderList,orderDetail } from '@/api'
  import executeSpin from '@/mixins/globalSpin'
  import moment from 'moment'
  export default {
    name: 'OrderIndex',
    mixins: [ executeSpin ],
    data () {
      return {
        loading: false,
        actionRadio: 'all', //行为radio
        stateRadio: 'all',  //状态radio
        infoModal: false, //详情modal
        orderList:{}, //列表数据
        actionsList: [], //行为列表
        actionAndState: {},
        proposalInfo: null, //提案详情
        orderInfo: {}, //订单详情
        currentPageNum: 1, //当前页码
        listParams: {
          name: '', //关键字
          type: '', //订单行为
          balanceStatus: '', //订单状态
          startTime: '', //开始时间
          endTime: '', //结束时间
          offset: 0, //页数
          limit: 10 //每页条数
        },
        //配置列
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 70
          },{
            key: 'code',
            title: '订单编号'
          },{
            key: 'phone',
            title: '用户（ID）'
          },{
            key: 'proposalName',
            title: '提案名称（ID）'
          },{
            key: 'createTime',
            title: '创建时间',
            render: (h,param) => moment(param.row.createTime).format("YYYY-MM-DD HH:mm")
          },{
            key: 'ticket',
            title: '参投票数'
          },{
            key: 'payTkc',
            title: 'Tkc数'
          },{
            key: 'orderState',
            title: '收支'
          },{
            key: 'orderType',
            title: '行为'
          },{
            key: 'id',
            title: '操作',
            width: 100,
            render: (h,params) => {
              return h('a',{
                attrs: {
                  href: 'javascript:;'
                },
                on: {
                  click: () => this.viewInfo(params.row)
                }
              },'查看详情')
            }
          }
        ]
      }
    },
    created(){
      this.executeSpin([this.getActionState(), this.getOrderList()]);
    },
    computed: {
      formatCreateTime () {
        return moment(this.orderInfo.createTime).format("YYYY-MM-DD HH:mm")
      }
    },
    methods: {
      getOrderList () {
        this.actionRadio !== 'all' ? (this.listParams.type = this.actionRadio) : this.listParams.type = '';
        this.stateRadio !== 'all' ? (this.listParams.balanceStatus = this.stateRadio) : this.listParams.balanceStatus = '';
        return orderList(this.listParams).then(res => this.orderList = res.data);
      },
      getActionState () {
        return statusType().then(res => {
          this.actionAndState = res.data;
          this.actionsList = [...res.data.typeList];
        });
      },
      pageChange (n,t) {
        t ? this.listParams.offset = n-1  : this.listParams.limit = n;
        this.listParams.offset = this.listParams.offset * this.listParams.limit;
        this.getOrderList();
      },
      //选择状态
      stateChange () {
        this.resetPage();
        this.filterActions();
        this.actionRadio = 'all';
        this.getOrderList();
      },
      //选择行为
      actionsChange (a) {
        this.resetPage();
        this.filterActions();
        this.getOrderList();
      },
      //过滤查询
      filterHandle () {
        //重置页码
        this.resetPage();
        this.getOrderList();
      },
      //过滤行为
      filterActions () {
        if(this.stateRadio === '1'){
          this.actionsList = this.actionAndState.typeList.filter(e => this.actionAndState.incomeTypeList.includes(e.value));
        }else if(this.stateRadio === 'all') {
          this.actionsList = [...this.actionAndState.typeList];
        }else {
          this.actionsList = this.actionAndState.typeList.filter(e => this.actionAndState.expendTypeList.includes(e.value))
        }
      },
      //重置页码
      resetPage () {
        this.listParams.offset = 0;
        this.listParams.limit = 10;
        this.currentPageNum = 1;
      },
      //查看详情
      viewInfo (row) {
        let infoParams;
        this.orderInfo = row;
        if(row.type > 2){
          infoParams = {
            proposalId: row.id, //提案id
            type: row.type, //订单类型
            userId: row.userId, //用户id
            code: row.code //订单编号
          };
          orderDetail(infoParams).then(res => {
            this.proposalInfo = res.data;
            this.infoModal = true;
          });
        }else {
          this.infoModal = true;
        }
      }
    }
  }
</script>
