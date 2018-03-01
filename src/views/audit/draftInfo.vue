<style>

</style>
<template>
  <info-and-edit :draftId="draftId"></info-and-edit>
</template>
<script>
  import infoAndEdit from '@/components/audit/infoAndEdit'
  export default {
    data () {
      return {
        draftId: this.$route.query.draftId
      }
    },
    components: {
      infoAndEdit
    },
  }
</script>
