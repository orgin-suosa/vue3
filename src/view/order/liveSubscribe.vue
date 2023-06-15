<script setup>
import { reactive } from 'vue';
const data = reactive({
		shareNumber: '400',
    orderState:false
	});
// defineProps({
//   msg: {
//     type: String,
//     required: true
//   }
// })
</script>

<template>
  <div class="liveSubscribe">
    <div class="button_share"></div>
    <div class="order_conten" v-if="!orderState">
      <div class="button_order"></div>
      <div class="order_text">
        已有 <p class="orderNumber">{{data.shareNumber}}</p>人预约
      </div>
    </div>
    <div class="order_conten" v-else>

    </div>
  </div>
</template>

<style scoped>
.liveSubscribe {
  width: 750px;
  height: 1624px;
  overflow: hidden;
  background: url("../../assets/bg.png") no-repeat center;
  background-size: contain;
  position: relative;
}

.button_share {
  width: 186px;
  height: 68px;
  background: url("../../assets/ico-share.png") no-repeat center;
  background-size: contain;
  position: absolute;
  right: 30px;
  top: 80px;
}

.button_order {
  width: 428px;
  height: 88px;
  background: url("../../assets/btn-order.png") no-repeat center;
  background-size: contain;
  margin: 0 auto;

}

.order_conten {
  font-size: 18px;
  width: 100%;
  position: absolute;
  left: 50%;
  bottom: 94px;
  transform: translateX(-50%);
}

.order_text {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-top: 20px;
}

.orderNumber{
    color: #FFE247;
  }

</style>
