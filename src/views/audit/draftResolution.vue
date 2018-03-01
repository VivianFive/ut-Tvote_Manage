<style>

</style>
<template>
  <div id="draft-container">
    <div>
    <Tabs value="undone">
      <TabPane :label="undoneLabel" name="undone" icon="minus-circled" style="padding: 0 2px">
        <draft-undone :typeList="typeList"></draft-undone>
      </TabPane>
      <TabPane label="已审核提案" name="done" icon="ios-checkmark" style="padding: 0 2px">
        <draft-done :typeList="typeList" :statusList="statusList"></draft-done>
      </TabPane>
    </Tabs>
    </div>
  </div>
</template>
<script>
    import draftDone from '@/components/audit/draftDone'
    import draftUndone from '@/components/audit/draftUndone'
    import {noneCount,getProposalTypeList,getProposalStatusList} from '@/api'
    import executeSpin from '@/mixins/globalSpin'

    export default {
      mixins: [ executeSpin ],
      components: {
        draftDone,
        draftUndone
      },
      data () {
        return {
          noneNum: '',
          typeList: [],
          statusList: []
        }
      },
      created () {
        this.executeSpin([this.getNoneCount(), this.getTypeList(), this.getStatusList()]);
      },
      methods: {
        getNoneCount () {
          return noneCount().then(res => this.noneNum = res.data.count)
        },
        //类型列表
        getTypeList () {
          return getProposalTypeList().then(res => this.typeList = res.data);
        },
        //状态类别
        getStatusList () {
          return getProposalStatusList().then(res => this.statusList = res.data)
        }
      },
      computed: {
        undoneLabel (h) {
          return h => h('span',[
            '待审核提案',
            h('Badge',{
              props: {
                count: this.noneNum
              },
              style: {
                paddingLeft: '5px'
              }
            })
          ])
        }
      }
    }
</script>
