export const AllowBack = {
  namespaced: true,
  state: {
    allowBack: true
  },
  mutations: {
    UPDATE_ALLOWBACK (state, isAllow) {
      state.allowBack = isAllow;
    }
  }
}