<style>

</style>
<template>
  <div class="enterprise-container">
    <Tabs v-model="activeTab" @on-click="switchTab">
      <TabPane label="待审核企业" name="name1">
        <enterprise :audit="0"></enterprise>
      </TabPane>
      <TabPane label="已审核企业" name="name2">
        <div v-if="isSwitch">
          <enterprise :audit="1"></enterprise>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
    import enterprise from '@/components/audit/enterprise'
    export default {
        components: {
          enterprise
        },
        data() {
          return{
            activeTab: 'name1',
            isSwitch: false
          }
        },
        methods: {
          switchTab(name) {
            if(name === 'name2') {
              this.isSwitch = true
            }
          }
        }
    };
</script>
