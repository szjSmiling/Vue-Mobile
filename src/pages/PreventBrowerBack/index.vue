<template>
  <div class="brower-back">
    <p>111111111111111111</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('AllowBack', {
      allowBack: state => state.allowBack
    })
  },
  mounted () {
    console.log(window.history)
    let state = {
      title: 'download'
    }
    window.history.pushState(state, '下载', location.origin+'/aaaaaa');
    window.addEventListener('popstate', this.browerBack, false)
  },
  methods: {
    browerBack () {
      // this.$router.push('/es6')
    }
  },
  beforeDestroy () {
    window.removeEventListener('popstate', this.browerBack, false)
  }
}
</script>
<style lang="less" scoped>
.brower-back{
  padding: 2.5rem 0 0;
}
</style>