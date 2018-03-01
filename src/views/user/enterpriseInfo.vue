<style scoped lang="less" type="text/less">
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
</style>
<template>
  <div id="enterpriseInfo">
    <div class="base-msg">
      <div class="com-settings-header">
        <h4>账户基本信息</h4>
      </div>
      <div class="base-msg-box">
        <table>
          <tr>
            <td>账户ID：{{enterpriseInfo.userId}}</td>
            <td>企业logo：</td>
            <td>企业全称：{{enterpriseInfo.name}}</td>
            <td>注册时间：{{enterpriseInfo.createTime | timeFormat}}</td>
          </tr>
          <tr>
            <td>账户总资产：{{enterpriseInfo.balance}}</td>
            <td rowspan="3">
              <img style="width: 120px;height: 120px" :src="enterpriseInfo.logo" alt="">
            </td>
            <td>企业简称：{{enterpriseInfo.shortName}}</td>
            <td>申请企业账号时间：{{enterpriseInfo.auditTime | timeFormat}}</td>
          </tr>
          <tr>
            <td>发起提案：{{enterpriseInfo.launchNum}}</td>
            <td></td>
            <td>企业账号审核通过时间：{{enterpriseInfo.auditPassTime | timeFormat}}</td>
          </tr>
          <tr>
            <td>参投提案：{{enterpriseInfo.voteNum}}</td>
            <td>当前状态：{{enterpriseInfo.disabled == 0 ? '正常' : '禁用'}}</td>
            <td>
              <span v-if="enterpriseInfo.disabled == 1">
                禁用原因：{{enterpriseInfo.reason}}
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>

    <chart-table :userId="userId"></chart-table>
  </div>
</template>
<script>
  import chartTable from '@/components/user/infoChartTable';
    export default {
      data() {
        return{
          userId: this.$route.query.userId,
          enterpriseInfo: JSON.parse(localStorage.getItem('eInfo'))
        }
      },
      components: {
        chartTable
      }
    };
</script>
