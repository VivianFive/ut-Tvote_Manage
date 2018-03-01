<style lang="less" type="text/less">
.base-msg-box{
  padding: 5px 50px 20px;
  table {
    width: 100%;
    td{
      height: 40px;
      width: 25%;
    }
  }
}
  #account-tkc-chart{
    width: 100%;
    height: 400px;
  }
</style>
<template>
  <div id="userInfo">
    <div class="base-msg">
      <div class="com-settings-header">
        <h4>账户基本信息</h4>
      </div>
      <div class="base-msg-box">
        <table>
          <tr>
            <td>账户ID：{{userInfoData.id}}</td>
            <!--<td>是否实名认证：是</td>-->
            <td>发起提案：{{userInfoData.proposalCount}}</td>
            <td>最后一次登录时间：{{userInfoData.loginTime}}</td>
          </tr>
          <tr>
            <td>注册时间：2017-07-21</td>
            <td>账户总资产：{{userInfoData.availableTkc}}</td>
            <td>参投提案：{{userInfoData.CostCount}}</td>
            <td>身份：{{userInfoData.userRole || ' 无'}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="account-tkc">
      <div class="com-settings-header">
        <h4>账户Tkc图</h4>
      </div>
      <div>
        <RadioGroup v-model="userEcharTime" type="button"  @on-change="useEchatDetail">
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
            <Page :total="pageTotal" show-elevator show-sizer @on-change="(n) => userAccountetail(n,1)" @on-page-size-change="(n) =>userAccountetail(n,0)" ></Page>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts';
  import {userinfoBaseDetail,useEchatData,userAccountDetail} from '@/api';
    export default {
      data () {
        return {
          offset: 0,
          limit: 10,
          pageTotal: 0,
          chart: null,
          userId: this.$route.query.userId,
          userInfoData:{},
          userInfoEchat:{}, //图标数据
          userEcharTime:2,
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
        /*this.userInfoDetail();
        this.useEchatDetail();
        this.userAccountetail();*/
        Promise.all([this.userInfoDetail(), this.useEchatDetail(), this.userAccountetail()]).then(() => this.$Spin.hide()).catch(() => this.$Spin.hide());
      },
      beforeDestroy() {
        if(this.chart){
          this.chart.dispose();
          this.chart = null;
        }
      },
      methods: {
        userInfoDetail(){
          return userinfoBaseDetail({
            userId:this.userId
          }).then(res => {
            this.userInfoData = res.data;
          })
        },
        useEchatDetail(){
          return useEchatData({
            userId:this.userId,
            type:this.userEcharTime,
          }).then(res => {
            this.userInfoEchat = res.data;
            if(this.chart){
              this.setChartOption();
            }else {
              this.chart = echarts.init(document.getElementById('account-tkc-chart'));
              this.setChartOption();
            }
          });
        },
        userAccountetail(n=10,t){
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
                data : this.userInfoEchat.day ||this.userInfoEchat.month,
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
                data:this.userInfoEchat.recharge,
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
                data:this.userInfoEchat.proposal,
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
                data:this.userInfoEchat.withdraw,
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
