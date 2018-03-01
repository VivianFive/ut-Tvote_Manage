<style scoped lang="less">
  .set-top-content{
    margin: 15px 0 15px 100px;
    border: 1px dashed #000;
    padding: 15px;
  }
  .info-ul > li{
    display: flex;
  }
  .info-ul > li:not(:last-child) {
    margin-bottom: 15px;
  }
  .vote-info{
    background: #fafafa;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .select-info{
    display: flex;
    flex-wrap: wrap;
  }
  .info-left{
    margin-right: 50px;
  }
</style>
<template>
  <div id="proposalResult">
    <div v-if="result" class="set-top-content">
      <div class="select-info">
        <div class="info-left">
          <ul class="info-ul">
            <li>
              <div class="info-label">
                提案名称（512）：
              </div>
              <div class="info-content">
                {{result.title}}
              </div>
            </li>
            <li>
              <div class="info-label">
                提案结束时间：
              </div>
              <div class="info-content">
                {{formatTimestamp}}
              </div>
            </li>
            <li>
              <div class="info-label">
                提案进度：
              </div>
              <div class="info-content" style="width: 400px">
                <Progress :percent="resultProgress" status="active"></Progress>
                <div class="vote-info">
                  <div class="vote-min">
                    <p>{{result.effectiveTicket}}票</p>
                    <p>最低生效</p>
                  </div>
                  <div class="vote-num">
                    <p>{{result.totalTicket}}票</p>
                    <p>参投票数</p>
                  </div>
                  <div class="vote-time">
                    <p>{{result.remainHours}}小时</p>
                    <p>参投票数</p>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="info-label">
                提案简介：
              </div>
              <div class="info-content">
                {{result.summary}}
              </div>
            </li>
          </ul>
        </div>
        <div class="info-right">
          <ul class="info-ul">
            <li>
              <div class="info-label">
                提案状态：
              </div>
              <div class="info-content">
                <span>{{result.statusName}}</span>
              </div>
            </li>
            <li>
              <div class="info-label">
                提案规则：
              </div>
              <div class="info-content">
                1票={{result.ticketTkc}} Tkc  投票上限：{{result.userTicketLimit}}票/人
              </div>
            </li>
            <li>
              <div class="info-label">
                提案类型：
              </div>
              <div class="info-content">
                {{result.typeName}}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data() {
      return {}
    },
    props: {
      result: {
        type: Object
      }
    },
    computed: {
      resultProgress () {
        return this.result.ticketRatio > 1 ? 100 : this.result.ticketRatio*100
      },
      formatTimestamp () {
        return moment(this.result.endTime).format('YYYY-MM-DD HH:mm')
      }
    }
  }
</script>
