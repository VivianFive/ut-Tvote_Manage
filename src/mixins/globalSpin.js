export default {
  methods: {
      executeSpin (reqArr) {
        this.$Spin.show();
        Promise.all(reqArr).then(() => setTimeout(() => this.$Spin.hide(),500)).catch(() => this.$Spin.hide());
      }
  }
}
