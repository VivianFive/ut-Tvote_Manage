<style scoped>
  #account-tkc-chart{
    width: 100%;
    height: 400px;
  }
</style>
<template>
  <div id="infoChartTable">
    <div class="account-tkc">
      <div class="com-settings-header">
        <h4>账户Tkc图</h4>
      </div>
      <div>
        <RadioGroup v-model="userChartTime" type="button"  @on-change="userChartDetail">
          <Radio label="2">日</Radio>
          <Radio label="1">月</Radio>
        </RadioGroup>
      </div>
      <div id="account-tkc-chart">

      </div>
    </div>
    <div class="account-stream">
      <div class="com-settings-header">
        <h4>账户流水信息</h4>
      </div>
      <div class="account-stream-box">
        <Table border stripe :columns="columns" :data="streamData" :show-header="false"></Table>
        <div style="margin-top: 20px;padding-bottom: 150px;">
          <div style="float: right">
            <Page :total="pageTotal" show-elevator show-sizer @on-change="(n) => userAccountDetail(n,1)" @on-page-size-change="(n) => userAccountDetail(n,0)" ></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import {useEchatData,userAccountDetail} from '@/api';
  export default {
    props: {
      userId: {
        type: [Number, String]
      }
    },
    data () {
      return {
        offset: 0,
        limit: 10,
        pageTotal: 0,
        chart: null,
        userInfoChart:{}, //图标数据
        userChartTime:2,
        columns: [
          {
            title: '序号',
            key: 'name',
            type:'index',
            width:'60px'
          },
          {
            title: '订单编号',
            key: 'code'
          },
          {
            title: '提案节点',
            key: 'change_name'
          },
          {
            title: '收益',
            key: 'change_money',
            render:(h,params) =>{
              if(params.row.after_available - params.row.before_available >= 0){
                return h('span',{
                  style:{
                    color:'#259B24',
                  }
                },'+'+params.row.change_money)
              }else{
                return h('span',{
                  style:{
                    color:'red',
                  }
                },'-'+params.row.change_money)
              }
            },
          },
          {
            title: '时间',
            key: 'complete_date'
          },
          {
            title: '账户余额',
            key: 'after_available'
          },
        ],
        streamData: []
      }
    },
    created (){
      this.$Spin.show();
      Promise.all([this.userChartDetail(), this.userAccountDetail()]).then(() => this.$Spin.hide()).catch(() => this.$Spin.hide());
    },
    beforeDestroy() {
      if(this.chart){
        this.chart.dispose();
        this.chart = null;
      }
    },
    methods: {
      userChartDetail(){
        return useEchatData({
          userId:this.userId,
          type:this.userChartTime,
        }).then(res => {
          this.userInfoChart = res.data;
          if(this.chart){
            this.setChartOption();
          }else {
            this.chart = echarts.init(document.getElementById('account-tkc-chart'));
            this.setChartOption();
          }
        });
      },
      userAccountDetail(n=10,t){
        if(t){
          this.offset = n-1;
        }else{
          this.limit = n;
        }
        return userAccountDetail({
          offset: this.offset*this.limit,
          limit:this.limit,
          userId: this.userId
        }).then(res => {
          this.streamData = res.data.rows;
          this.pageTotal = res.data.total;
        });
      },
      setChartOption() {
        this.chart.setOption({
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['充值','投入','提现']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : this.userInfoChart.day || this.userInfoChart.month,
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'充值',
              type:'bar',
              data:this.userInfoChart.recharge,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            },
            {
              name:'投入',
              type:'bar',
              data:this.userInfoChart.proposal,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            },
            {
              name:'提现',
              type:'bar',
              data:this.userInfoChart.withdraw,
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              }
            }]
        })
      }
    }
  }
</script>
