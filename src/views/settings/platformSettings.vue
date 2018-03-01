<style scoped lang="less">
  .input-container{
    width: 80px;
    display: inline-block;
    margin:0 10px;
  }
  .setting-box{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .annotation{
    color: #ff3300;
    margin-bottom: 10px;
  }
  .cost-set-container {
    .ivu-row {
      margin-bottom: 10px;
    }
  }
  .vote-flex{
     display: flex;
  }
  .set-label{
    display: inline-block;
    width: 80px;
    text-align: right;
  }
  .set-item{
    margin-bottom: 15px;
    >p{
      color: #999999;
      font-size: 12px;
    }
  }
  .label-box{
    display: inline-block;
    width: 130px;
  }
  .cost-set-box{
    border: 1px solid #999999;
    border-radius: 5px;
    padding: 10px 0;
    margin: 10px 0;
    width: 900px;
  }
</style>
<template>
  <div id="platformSettings">
    <Form>
      <div class="com-settings-header">
        <h4>费用设置</h4>
      </div>
      <div class="cost-set-container">
        <!--<Row>
          <Col span="3">
            提案发起者收益：
          </Col>
          <Col span="21">
            <div class="setting-box">
              占比整体参投败方的<div class="input-container">
              <InputNumber :max="100" :min="0" v-model="configInfo.DOUBLE_PROPOSAL_SPONSOR_PERCENT"></InputNumber>
              </div> % Tkc
            </div>
            <p class="annotation">注：提案生效后，发起者将获得败方所有Tkc的1%，如提案失败（未达到生效要求），则不获得任何收益</p>
          </Col>
        </Row>
        <Row>
          <Col span="3" >
          提案发起费用：
          </Col>
          <Col span="21">
          <div class="setting-box">全民公决 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC"></InputNumber>
          </div> Tkc</div>
          <div  class="setting-box">群体智能 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_INTELLIGENCE_PAY_TKC"></InputNumber>
          </div> Tkc</div>
          </Col>
        </Row>-->
        <Row>
          <Col span="3">
            群体智能：
          </Col>
          <Col span="21">
            <div class="set-item">
              <span class="label-box">发起费用：</span>
              <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_INTELLIGENCE_PAY_TKC"></InputNumber>
              TKC
            </div>
            <div class="set-item">
              <span class="label-box">发起者收益比例：</span>
              <InputNumber :max="100" :min="0" v-model="configInfo.DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE"></InputNumber>
              %
              <p>注：此收益比例是指该提案可分配收益中发起者分配比例</p>
            </div>
            <div class="set-item">
              <span class="label-box">平台收取服务费比例：</span>
              <InputNumber :max="100" :min="0" v-model="configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE"></InputNumber>
              %
              <p>注：此服务费比例是指该提案可分配收益中平台收取的服务费比例</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="3">
          全民公决：
          </Col>
          <Col span="21">
            <div>
              <span class="label-box">发起费用：</span>
              <div class="vote-set-container cost-set-box">
                <div class="vote-flex">
                  <div class="setting-box"><span class="set-label">布衣：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BY"></InputNumber>
                  </div> TKC</div>
                  <div class="setting-box"> <span class="set-label">百夫长：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_BFZ"></InputNumber>
                  </div> TKC</div>
                  <div  class="setting-box"><span class="set-label">知府：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_ZF"></InputNumber>
                  </div> TKC</div>
                  <div  class="setting-box"><span class="set-label">刺史：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CS"></InputNumber>
                  </div> TKC</div>
                </div>
                <div class="vote-flex">
                  <div  class="setting-box"><span class="set-label">太守：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_TS"></InputNumber>
                  </div> TKC</div>
                  <div  class="setting-box"><span class="set-label">国王：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_GW"></InputNumber>
                  </div> TKC</div>
                  <div class="setting-box"> <span class="set-label">创世：</span> <div class="input-container">
                    <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_PAY_TKC_CHS"></InputNumber>
                  </div> TKC</div>
                </div>
              </div>
            </div>
            <div>
              <div class="set-item">
                <span class="label-box">平台收取服务费比例：</span>
                <InputNumber  :max="100" :min="0" v-model="configInfo.DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM"></InputNumber>
                %
                <p>注：此服务费比例是对每个有效全民公决参投用户收取的服务费占比。如服务费比例为20%，用户参投10TKC，则平台收取2TKC，其余退还用户余额账户。</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="3" >
          提现服务费：
          </Col>
          <Col span="21">
            <InputNumber :max="100" :min="0" v-model="configInfo.DOUBLE_WITHDRAW_FEE_PERCENT"></InputNumber> %Tkc
            <p style="color: #999999">注：此服务费是指用户在提现时，平台收取的提案服务费</p>
          </Col>
        </Row>
        <Row>
          <Col span="3" >
          提现简体说明：
          </Col>
          <Col span="21">
          <Input style="width: 600px" v-model="configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_CN" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="提现简体说明"></Input>
          </Col>
        </Row>
        <Row>
          <Col span="3" >
          提现繁体说明：
          </Col>
          <Col span="21">
          <Input style="width: 600px" v-model="configInfo.STRING_WITHDRAW_DESCRIPTION_ZH_HK" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="提现繁体说明"></Input>
          </Col>
        </Row>
      </div>
      <div class="com-settings-header">
        <h4>提案设置</h4>
      </div>
      <div class="draft-set-container">
        <Row>
          <Col span="3" >
          提案生效票数：
          </Col>
          <Col span="21">
          <div class="setting-box">全民公决 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_EFFECTIVE"></InputNumber>
          </div> 票 </div>
          <div  class="setting-box">群体智能 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_INTELLIGENCE_EFFECTIVE"></InputNumber>
          </div> 票 </div>
          </Col>
        </Row>
      </div>
      <div class="com-settings-header">
        <h4>企业用户设置</h4>
      </div>
      <div class="draft-set-container">
        <Row>
          <Col span="3" >
          发起提案费用：
          </Col>
          <Col span="21">
          <div class="setting-box">全民公决 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_REFERENDUM_ENTERPRISE_PAY_TKC"></InputNumber>
          </div> TKC </div>
          <div  class="setting-box">群体智能 <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_PROPOSAL_INTELLIGENCE_ENTERPRISE_PAY_TKC"></InputNumber>
          </div> TKC </div>
          </Col>
        </Row>
      </div>

      <div class="com-settings-header">
        <h4>身份票权设置</h4>
      </div>
      <div class="vote-set-container">
        <div class="vote-flex">
          <div class="setting-box"><span class="set-label">布衣：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_BY_TICKET"></InputNumber>
          </div> 票权</div>
          <div class="setting-box"> <span class="set-label">百夫长：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_BFZ_TICKET"></InputNumber>
          </div> 票权</div>
          <div  class="setting-box"><span class="set-label">知府：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_ZF_TICKET"></InputNumber>
          </div> 票权</div>
          <div  class="setting-box"><span class="set-label">刺史：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_CS_TICKET"></InputNumber>
          </div> 票权</div>
        </div>
        <div class="vote-flex">
          <div  class="setting-box"><span class="set-label">太守：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_TS_TICKET"></InputNumber>
          </div> 票权</div>
          <div  class="setting-box"><span class="set-label">国王：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_GW_TICKET"></InputNumber>
          </div> 票权</div>
          <div class="setting-box"> <span class="set-label">创世：</span> <div class="input-container">
            <InputNumber :min="0" v-model="configInfo.INTEGER_ROLE_CHS_TICKET"></InputNumber>
          </div> 票权</div>
        </div>
      </div>
      <div style="text-align: center;padding: 20px 0">
        <Button type="primary" style="width: 300px" @click="setConfig">保存设置</Button>
      </div>
    </Form>
  </div>
</template>
<script>
  import { platformConfig,updatePlatformConfig } from '@/api'
  import NP from 'number-precision'
    export default {
      data () {
        return {
          configInfo: {}
        }
      },
      created () {
        this.$Spin.show();
        this.getConfig().then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
      },
      methods: {
        getConfig () {
          return platformConfig().then(res => {
            let configData = res.data;
            configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM'] = NP.times(configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM'], 100);
            configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE'] = NP.times(configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE'], 100);
            configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT'] = NP.times(configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT'], 100);
            configData['DOUBLE_WITHDRAW_FEE_PERCENT'] = NP.times(configData['DOUBLE_WITHDRAW_FEE_PERCENT'], 100);
            configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE'] = NP.times(configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE'], 100);
            // 字符串数字转数字
            for(let key in configData){
              if ((key !== 'STRING_WITHDRAW_DESCRIPTION_ZH_CN') && (key !== 'STRING_WITHDRAW_DESCRIPTION_ZH_HK')) {
                configData[key] = configData[key] * 1;
              }
            }
            this.configInfo = configData;
          });
        },
        setConfig () {
          let configArr = [];
          let configData = JSON.parse(JSON.stringify(this.configInfo));
          configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM'] = NP.divide(configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_REFERENDUM'], 100);
          configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE'] = NP.divide(configData['DOUBLE_PROPOSAL_PLATFORM_PERCENT_INTELLIGENCE'], 100);
          configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT'] = NP.divide(configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT'], 100);
          configData['DOUBLE_WITHDRAW_FEE_PERCENT'] = NP.divide(configData['DOUBLE_WITHDRAW_FEE_PERCENT'], 100);
          configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE'] = NP.divide(configData['DOUBLE_PROPOSAL_SPONSOR_PERCENT_INTELLIGENCE'], 100);
          for(let key in configData){
            configArr.push({name: key, value: configData[key]})
          }
          updatePlatformConfig({"sysconfigDTOs":JSON.stringify(configArr)}).then(res => this.$Message.success('设置成功！'));
        }
      }
    }
</script>
