<style scoped lang="less">
  .border{
    border: 1px solid #000;
  }
  .data-panel-ul{
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .data-panel {
    width: 22%;
    font-size: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .border;
  }
  .add-span {
    color: #3399ff;
    font-size: 12px;
  }
  .chart {
    margin: 20px 0 10px;
    .border;
    padding: 10px;
  }
  #tkc-chart {
    width: 100%;
    height: 400px;
  }
  .draft-top {
    margin-bottom: 20px;
  }
  .week-top{
    .border;
    padding: 10px ;
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }
  #user-chart{
    width: 100%;
    height: 400px;
  }
  .helpTxt{
    cursor: pointer;
  }
</style>
<template>
  <div id="home">
    <div class="home-head">
      <ul class="data-panel-ul">
        <li class="data-panel">
          <h4>平台总提案 <Tooltip placement="bottom">
            <Icon class="helpTxt" type="help-circled"></Icon>
            <div slot="content" style="white-space: normal">
              平台总提案：是指当前平台中全部提案的数量，其中不包含用户草稿箱中的和已删除的提案。【已结束】的提案是指投票已结束的提案，其中包括已公示和已失效的提案；【进行中】的提案是指正在投票期的提案；【预热中】的提案是指正在预热期的提案。
            </div>
          </Tooltip></h4>
          <b>{{realTimeData.proposalCount.all}}</b>
          <p>已结束：<b>{{realTimeData.proposalCount.finished}}</b> <!--<span class="add-span">{{realTimeData.proposalCount.finishedChange | valueStatus}}</span>--></p>
          <p>进行中：<b>{{realTimeData.proposalCount.running}}</b> <!--<span class="add-span">{{realTimeData.proposalCount.runningChange | valueStatus}}</span>--></p>
          <p>预热中：<b>{{realTimeData.proposalCount.finishedChange}}</b> <!--<span class="add-span">{{realTimeData.proposalCount.preheatChange | valueStatus}}</span>--></p>
        </li>
        <!--<li class="data-panel">
          <h4>TKC总量 （实时）<Icon type="help-circled"></Icon></h4>
          <b>1780,154.00 <span class="add-span">+500.00</span></b>
          <p>平台收益：<b>80,154.00</b> <span class="add-span">+17</span></p>
          <p>日 <Icon type="arrow-up-c" style="color: #259b24"/> <span class="add-span">155.00</span></p>
        </li>-->
        <li class="data-panel">
          <h4>TKC提现量-预提现/已提现 <Tooltip placement="bottom">
            <Icon class="helpTxt" type="help-circled"></Icon>
            <div slot="content" style="white-space: normal">
              TKC提现量-预提现/已提现：是指当前提现的总TKC数量。【预提现】是指用户发起提现申请，还未提现到账的TKC数量；【已提现】是指已成功提现的TKC数量
            </div>
          </Tooltip></h4>
          <p>预提现： <b>{{realTimeData.withDraw.preWithDraw}}</b> <!--<span class="add-span">{{realTimeData.withDraw.preWithDrawChange | valueStatus}}</span>--></p>
          <p>已提现： <b>{{realTimeData.withDraw.hasWithDraw}}</b> <!--<span class="add-span">{{realTimeData.withDraw.hasWithDrawChange | valueStatus}}</span>--></p>
          <!--<p>日 <Icon :type="realTimeData.withDraw.day >= 0 ? 'arrow-up-c' : 'arrow-down-c'" :style="realTimeData.withDraw.day >= 0 ? 'color: #259b24' : 'color: #e6658c'"/> <span class="add-span">{{realTimeData.withDraw.day}}</span></p>-->
        </li>
        <li class="data-panel">
          <h4>用户总量 <Tooltip placement="bottom">
            <Icon class="helpTxt" type="help-circled"></Icon>
            <div slot="content" style="white-space: normal">
              用户总量：是指当前所有登录过Tvote的用户总量；【今日新增】是指今日新登录的用户量
            </div>
          </Tooltip></h4>
          <b>{{realTimeData.userCount.count}}<!--<span class="add-span"> {{realTimeData.userCount.countChange | valueStatus}}</span>--></b>
          <p>今日新增： <b>{{realTimeData.userCount.now}}</b> <!--<span class="add-span">{{realTimeData.userCount.nowChange | valueStatus}}</span>--></p>
          <!--<p>日 <Icon :type="realTimeData.userCount.dayUpdate >= 0 ? 'arrow-up-c' : 'arrow-down-c'" :style="realTimeData.userCount.dayUpdate >= 0 ? 'color: #259b24' : 'color: #e6658c'"/> <span class="add-span">{{realTimeData.userCount.dayUpdate}}</span></p>-->
        </li>
        <li class="data-panel">
          <h4>待处理提案 <Tooltip placement="bottom">
            <Icon class="helpTxt" type="help-circled"></Icon>
            <div slot="content" style="white-space: normal">
              待处理提案：是指当前待审核和待佐证提案的数量，点击数量后，可以直接跳转到对应界面操作。
            </div>
          </Tooltip></h4>
          <p>待审核： <router-link to="/audit/draftResolution"><b style="color: #E51C23">{{realTimeData.waitProcess.waitAuidtCount}}</b></router-link></p>
          <p>待佐证： <router-link to="/draftResolution/index?status=over"><b style="color: #E51C23">{{realTimeData.waitProcess.OverCount}}</b></router-link></p>
        </li>
      </ul>
    </div>
    <div class="chart">
      <RadioGroup v-model="timeLine" type="button" @on-change="getTkcChartInfo">
        <Radio label="0">日</Radio>
        <Radio label="1">周</Radio>
        <Radio label="2">月</Radio>
      </RadioGroup>
      <div id="tkc-chart">

      </div>
    </div>
    <div class="draft-top">
      <div class="week-top">
        <Icon type="connection-bars" size="30"></Icon>
        <Select v-model="weekTop" @on-change="getProposalTop" style="width:200px;margin-left: 5px">
          <Option value="0">本周</Option>
          <Option value="1">本月</Option>
        </Select>
      </div>
      <Table border stripe :columns="columns" :data="topData"></Table>
    </div>
    <div class="chart">
      <RadioGroup v-model="userTimeLine" type="button" @on-change="getUserIncrease">
        <Radio label="0">日</Radio>
        <Radio label="1">周</Radio>
        <Radio label="2">月</Radio>
      </RadioGroup>
      <div id="user-chart"></div>
    </div>
    <div style="margin-top: 20px;height: 400px;">
      <div class="com-settings-header">
        <h4>用户活跃度</h4>
      </div>
      <p style="margin: 10px 0;">活跃用户是指进入过app的用户，统计时间段内，同一用户不累计统计</p>
      <div>
      <span style="padding: 10px 12px 10px 0">选择时间段：</span>
      <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {activeParams.startTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
      <span> 至 </span>
      <DatePicker type="datetime" placeholder="选择日期" @on-change="(date) => {activeParams.endTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
      <Button @click="userActive">查询</Button>
      </div>
      <div style="margin-top: 10px">活跃用户量：<span style="color:#2b85e4">{{activeNum}}</span></div>
    </div>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import { realTimeInfo,getTkcChart,proposalTop,userIncrease,userActiveNum } from '@/api'
  export default {
    name: 'hello',
    data () {
      return {
        chart: null,
        userChart: null,
        realTimeData: {
          proposalCount: {},
          withDraw: {},
          userCount: {},
          waitProcess: {}
        }, //实时数据
        tkcData: {
          platformFree:[],
          tkcRecharge:[]
        }, //tkc数据
        weekTop: '0',
        timeLine: 0,
        userTimeLine: 0,
        columns: [
          {
            title: '排名',
            type: 'index',
            width: 70
          },
          {
            title: '提案名称（ID）',
            key: 'proposalTitle'
          },
          {
            title: '发起人',
            key: 'userPhone'
          },
          {
            title: 'TKC总量',
            key: 'totalTkc'
          },
          {
            title: '参投人数',
            key: 'userCount'
          },
          {
            title: '提案类型',
            key: 'proposalType'
          },
          {
            title: '平台收益',
            key: 'platformIncome'
          },
          {
            title: '参投票数',
            key: 'totalTicket'
          },
          {
            title: '当前状态',
            key: 'proposalStatus'
          }
        ],
        //排名数据
        topData: [],
        activeParams:{
          startTime: '', //开始时间
          endTime: '', //结束时间
        },
        activeNum:0,
      }
    },
    created(){
      this.$Spin.show();
      //获取实时数据
      //this.getRealTimeInfo();
      //获取tkc图表数据
      //this.getTkcChartInfo();
      //获取排名数据
      //this.getProposalTop();
      //获取用户图表数据
      Promise.all([this.getRealTimeInfo(), this.getTkcChartInfo(), this.getProposalTop(), this.getUserIncrease()]).then(() => this.$Spin.hide()).catch(() => this.$Spin.hide())
      this.userActive();
    },
    beforeDestroy() {
      if(this.chart) {
        this.chart.dispose();
        this.chart = null;
      }
      if(this.userChart){
        this.userChart.dispose();
        this.userChart = null;
      }
    },
    filters: {
      valueStatus (val) {
        return val >= 0 ? '+'+val : val
      }
    },
    methods: {
      getRealTimeInfo () {
        return realTimeInfo().then(res => this.realTimeData = res.data);
      },
      getTkcChartInfo () {
        return getTkcChart({type: this.timeLine}).then(res => {
          this.tkcData = res.data;
          let xAxis, recharge, platform;
          xAxis = res.data.platformFree.map(e => Object.keys(e).join(''));
          recharge = res.data.tkcRecharge.map(e => Object.values(e).join(''));
          platform = res.data.platformFree.map(e => Object.values(e).join(''));
          //初始化tkc图表
          this.chart ? this.updateTkcChart(xAxis,recharge,platform) : this.initTkcChart(xAxis,recharge,platform);
        })
      },
      getProposalTop () {
        return proposalTop({type: this.weekTop}).then(res => this.topData = res.data)
      },
      getUserIncrease () {
        return userIncrease({type: this.userTimeLine}).then(res => {
          //初始化user图表
          let xAxis, App;
          xAxis = res.data.map(e => Object.keys(e).join(''));
          App = res.data.map(e => Object.values(e).join(''));
          this.userChart ? this.updateUserChart(xAxis,App) : this.initUserChart(xAxis,App);
        })
      },
      initTkcChart (xaxis,recharge, platform) {
        this.chart = echarts.init(document.getElementById('tkc-chart'));
        this.chart.setOption({
          title: {
            text: 'TKC数据'
          },
          tooltip: {
            trigger: 'axis'
          },
//          axisPointer: true,
          legend: {
            data:['TKC充值','平台收益']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xaxis
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'TKC充值',
              type:'line',
//              stack: '总量',
              data: recharge
            },
            {
              name: '平台收益',
              type: 'line',
//              stack: '总量',
              data: platform
            }
          ]
        });
      },
      updateTkcChart (xaxis,recharge, platform) {
        //tkc data chart
        this.chart.setOption({
          legend: {
            data:['TKC充值','平台收益']
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xaxis
          },
          series: [
            {
              name:'TKC充值',
              type:'line',
//              stack: '总量',
              data: recharge
            },
            {
              name: '平台收益',
              type: 'line',
//              stack: '总量',
              data: platform
            }
          ]
        });
      },
      initUserChart (xaxis,app){
        this.userChart = echarts.init(document.getElementById('user-chart'));
        this.userChart.setOption({
          title: {
            text: '新增用户趋势图'
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['App']
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
              data : xaxis
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            /*{
              name:'Web',
              type:'bar',
              stack: 'user',
              label: {
                normal: {
                  show: true
                }
              },
              data:[60, 72, 71, 74, 190, 130, 110]
            },*/
            {
              name:'App',
              type:'bar',
              stack: 'user',
              label: {
                normal: {
                  show: true
                }
              },
              data:app
            }]
        })
      },
      updateUserChart (xaxis,app) {
        this.userChart.setOption({
          legend: {
            data:['App']
          },
          xAxis : [
            {
              type : 'category',
              data : xaxis
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            /*{
              name:'Web',
              type:'bar',
              stack: 'user',
              label: {
                normal: {
                  show: true
                }
              },
              data:[60, 72, 71, 74, 190, 130, 110]
            },*/
            {
              name:'App',
              type:'bar',
              stack: 'user',
              label: {
                normal: {
                  show: true
                }
              },
              data:app
            }]
        })
      },
      userActive(){
        return userActiveNum(this.activeParams).then(res =>{
          this.activeNum = res.data;
        })
      }
    }
  }
</script>


