<script setup>
import { FormKit } from "@formkit/vue";
</script>
<template>
	<FormKit
    type="text"
    :label="$t('nameCard')"
		name="nameOnCard"
    validation="required|spaces|alpha:latin|length:2"
  />
  <FormKit
    type="text"
    :label="$t('cc')"
		name="creditCard"
    validation="required|number|length:16, 16"
  />
	<div class="etrible">
  <FormKit
    type="select"
    :label="$t('month')"
		name="month"
    validation="required"
    placeholder="MM"
		:options="['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']"
		:classes="{ outer: {'myOuter': true}, option: {'myOption': true}, input:{'selectedInput': true}}"

  />
	<FormKit
    type="select"
    :label="$t('year')"
		name="year"
    validation="required"
    placeholder="YYYY"
		:options="['2023', '2024', '2025', '2026', '2027', '2028']"
		:classes="{ outer: {'myOuter': true}, option: {'myOption': true}, input:{'selectedInput': true}}"
  />
  <FormKit
    type="text"
    name="cvv"
    label="CVV"
    validation="required|number|length:3,3"
		:classes="{ outer: {'myOuter': true}}"
  />
	</div>
</template>
<style lang="scss">
	@import "@/assets/css/main.scss";

.etrible {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	min-width: 100%;
	gap: 16px;
}
.selectedInput {
  background-color: getColor(bg2);
}

.myOption {
  background-color: getColor(bg2);
} 

.myOuter {
	width	: 100% !important;
}
</style>