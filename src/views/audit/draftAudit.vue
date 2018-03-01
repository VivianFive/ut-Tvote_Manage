<style scoped lang="less">
  #draftEdit{
    padding-bottom: 280px;
  }
  .content-panel{
    padding: 0 20px;
  }
  .rule-list{
    flex: 1;
  }
  .rule-list > p:not(:last-child){
    padding-bottom: 20px;
  }
  .info-item-box{
    display: flex;
    padding: 10px 0;
    p{
      flex: 1;
    }
  }
  .span-label{
    display: inline-block;
    width: 130px;
  }
</style>
<template>
  <div id="draftEdit">
      <info-and-edit :draftId="draftId" @proposalMsg="getProposalMsg"></info-and-edit>
      <div class="com-settings-header">
        <h4>审核</h4>
      </div>
      <div class="content-panel">
        <div class="info-item-box">
          <div class="" style="width: 130px"><span class="span-label">提案是否审核通过：</span></div>
          <div class="rule-list">
            <RadioGroup v-model="auditStatus" vertical>
              <Radio label="1">
                <Icon type="checkmark-circled" color="#19be6b"></Icon>
                <span>审核通过</span>
              </Radio>
              <Radio label="0">
                <Icon type="close-circled" color="#ed3f14"></Icon>
                <span>审核不通过</span>
              </Radio>
            </RadioGroup>
            <div v-if="auditStatus =='0'"><Input v-model="auditResult" type="textarea" style="width:100%;" :rows="5" placeholder="请输入不通过原因..."/></div>
          </div>
        </div>
      </div>
      <div v-show="auditStatus == 1">
        <div class="com-settings-header">
          <h4>提案排期</h4>
        </div>
        <div class="calendar-set content-panel" style="padding: 0 20px 20px">
          <span class="span-label">选择提案上线时间：</span>
          <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" :value="preheat.startTime" @on-change="(date) => {preheat.startTime = date}" format="yyyy-MM-dd HH:mm"></DatePicker>
        </div>
        <div class="calendar-set content-panel" style="padding: 0 20px 20px">
          <span class="span-label">选择提案结束时间：</span>
          <DatePicker type="datetime" placeholder="选择日期" style="width: 200px" :value="preheat.endTime" @on-change="(date) => {preheat.endTime = date}" format="yyyy-MM-dd HH:mm"></DatePicker>
        </div>

        <div class="com-settings-header">
          <h4>预热设置</h4>
        </div>
        <div class="preheat-set content-panel">
          <div style="padding-bottom: 20px">
            <span class="span-label">是否需提案预热： </span>
            <RadioGroup v-model="isPreheat" @on-change="preheatChange"  >
              <Radio label="1">是</Radio>
              <Radio label="0">否</Radio>
            </RadioGroup>
          </div>
          <div style="padding-bottom: 20px" v-show="isPreheat == 1">
            <span class="span-label">请选择预热周期： </span>
            <DatePicker type="datetime" placeholder="选择日期" :value="preheat.preheatEndTime" @on-change="(date) => {preheat.preheatBeginTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
            <span> 至 </span>
            <DatePicker type="datetime" placeholder="选择日期" :value="preheat.preheatEndTime" @on-change="(date) => {preheat.preheatEndTime = date}" clearable format="yyyy-MM-dd HH:mm"></DatePicker>
          </div>
        </div>
      </div>
      <div style="text-align: center;padding: 20px 0">
      <Button type="primary" style="width: 300px" @click="submitAudit">提交审核</Button>
    </div>

  </div>
</template>
<script>
  import { proposalRefuse,proposalPass } from '@/api'
  import infoAndEdit from '@/components/audit/infoAndEdit'
  import moment from 'moment'
   export default {
      data () {
        return {
          draftId: this.$route.query.draftId,
          auditStatus: 0, //是否通过
          isPreheat: 0, //是否预热
          auditResult: '', //审核原因
          preheat: {
            startTime: '',
            endTime: '',
            preheatBeginTime: '',
            preheatEndTime: ''
          }
        }
      },
      components: {
        infoAndEdit
      },
      methods: {
        preheatChange (v) {
          if(v === '0'){
            this.preheat.preheatBeginTime = '';
            this.preheat.preheatEndTime = '';
          }
        },
        submitAudit () {
          //通过
          if(this.auditStatus === '1'){
            if(!this.preheat.startTime){
              this.$Message.error('请选择提案上线时间！');
              return
            }
            if(!this.preheat.endTime){
              this.$Message.error('请选择提案结束时间！');
              return
            }
            if(this.isPreheat === '1'){ //如果需要预热
              if(!this.preheat.preheatBeginTime) {
                this.$Message.error('请选择预热开始时间！');
                return
              }
              if(!this.preheat.preheatEndTime){
                this.$Message.error('请选择预热结束时间！');
                return
              }
            }
            proposalPass({
              id: this.draftId,
              auditResult: '', //原因
              preheat: this.isPreheat === '1', //是否预热
              ...this.preheat
            }).then(res => {
              this.$Message.success('审核成功！');
              this.$router.push('/audit/draftResolution')
            })
          }else { //不通过
            if(!this.auditResult){
              this.$Message.error('请输入不通过原因！');
              return
            }
            proposalRefuse({id:this.draftId,auditResult:this.auditResult}).then(res => {
              this.$Message.success('审核成功！');
              this.$router.push('/audit/draftResolution')
            })
          }
        },
        getProposalMsg (msg) {
          if (msg.startTime) {
            this.preheat.startTime = moment(msg.startTime).format('YYYY-MM-DD HH:mm');
          }
          if (msg.endTime) {
            this.preheat.endTime = moment(msg.endTime).format('YYYY-MM-DD HH:mm');
          }
        }
      }
    }
</script>
