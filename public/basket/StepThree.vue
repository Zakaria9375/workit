<script setup>
import { FormKit } from "@formkit/vue";

import { ref, onMounted } from 'vue'
const sameAs = ref(false)
const emit = defineEmits(['emitIsChecked'])
function handleCheckboxChange () {
  console.log(sameAs.value)
  emit('emitIsChecked', sameAs.value);
  }
onMounted(() => handleCheckboxChange ())
</script>
<template>
  <FormKit 
    type="checkbox"
    label="Shipping Address is the same as billing Address"
    name="sameAddress"
    v-model="sameAs"
    @input="handleCheckboxChange"
  />
  <FormKit
    type="select"
    :label="$t('country')"
		name="billingCountry"
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
		name="billingCity"
    validation="required"
		placeholder="Paris"
		:classes="{ outer: {'myOuter': true}}"
  />
	<FormKit
    type="text"
    :label="$t('zipCode')"
		name="billingZipCode"
    validation="required|spaces"
		placeholder="GU16 7HF"
		:classes="{ outer: {'myOuter': true}}"
  />	
	</div>
  <FormKit
    type="text"
    :label="$t('street')"
		name="billingStreet"
    validation="required|spaces"
		placeholder="32 George Street"

  />
  <FormKit
    name="billingAdditionalInfo"
    :label="$t('addInfo')"
    validation="required"
		placeholder="Flat 32, Third Floor"
  />
</template>
<style >

</style>