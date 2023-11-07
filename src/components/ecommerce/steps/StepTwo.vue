<script setup>
import { FormKit } from "@formkit/vue";
</script>
<template>
  <FormKit
    type="select"
    :label="$t('country')"
		name="sCountry"
		placeholder="Select a country"
		:options="[
    $t('France'),
    $t('Germany'),
    $t('England'),
		]"
    validation="required"
  />
	<div class="edouble">
		<FormKit
    type="text"
    :label="$t('city')"
		name="sCity"
    validation="required|spaces"
		placeholder="Paris"
		:classes="{outer: {'myOuter1': true}}"
  />
	<FormKit
    type="text"
    :label="$t('zipCode')"
		name="sZipCode"
    validation="required|spaces"
		placeholder="GU16 7HF"
		:classes="{outer: {'myOuter2': true}}"
  />	
	</div>
  <FormKit
    type="text"
    :label="$t('street')"
		name="sStreet"
    validation="required|spaces"
		placeholder="32 George Street"
  />
  <FormKit
    name="sAdditionalInfo"
    :label="$t('addInfo')"
    validation="required"
		placeholder="Flat 32, Third Floor"
  />
</template>
<style lang="scss">
	@import "@/assets/css/main.scss";

.edouble {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	min-width: 100%;
	gap: 16px;
  @media (max-width: 600px) and (min-width: 400px) {
    .myOuter1 {
      width: 65%;
    }
  }
  
  @include mobile {
    display: block;
  }
}

.myOuter1, .myOuter2 {
	width	: 100% ;
}

</style>