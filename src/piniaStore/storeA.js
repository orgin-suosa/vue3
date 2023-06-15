import { defineStore } from "pinia";

export const storeA = defineStore("storeA", {
  state: () => {
    return {
      piniaMsg: "hello pinia",
      name: "xiao yue",
      count1:1,
      count2:2,
    };
  },
  getters: {
    sum(state) {
        console.log('我被调用了!')
        return state.count1 + state.count2;
      },
  },
  actions: {
    setName(data) {
        this.name = data;
      },
  },
});
// export default storeA;
