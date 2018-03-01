<style>

</style>
<template>
  <div id="mngDraftEdit">
    <info-and-edit :draftId="draftId" @proposalMsg="getProposalMsg"></info-and-edit>
    <vote-table :proposalId='proposalInfo.id' v-if="showVoteTable"></vote-table>
    <proof :proposalInfo='proposalInfo' v-if="showProof"></proof>
  </div>
</template>
<script>
  import infoAndEdit from '@/components/audit/infoAndEdit'
  import proof from '@/components/draftManage/proof'
  import voteTable from '@/components/draftManage/voteTable'
  export default {
    data () {
      return {
        draftId: this.$route.query.proposalId,
        proposalInfo: {
          evidenceInfo:{
            linkUrlList: []
          }
        },
        showVoteTable: false,
        showProof: false
      }
    },
    components: {
      infoAndEdit,
      proof,
      voteTable
    },
    methods: {
      getProposalMsg (msg) {
        this.proposalInfo = msg;
        this.showVoteTable = msg.status != 9;
        if(msg.type == 1){
          this.showProof = msg.status == 7 || msg.status == 8;
        }else {
          this.showProof = false;
        }
      }
    }
  }
</script>
