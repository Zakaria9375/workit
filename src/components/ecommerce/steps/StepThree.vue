<script setup>
import { FormKit } from "@formkit/vue";
</script>
<template>
  <FormKit
    type="select"
    :label="$t('country')"
		name="bCountry"
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
		name="bCity"
    validation="required"
		placeholder="Paris"
		:classes="{ outer: {'myOuter': true}}"
  />
	<FormKit
    type="text"
    :label="$t('zipCode')"
		name="bZipCode"
    validation="required|spaces"
		placeholder="GU16 7HF"
		:classes="{ outer: {'myOuter': true}}"
  />	
	</div>
  <FormKit
    type="text"
    :label="$t('street')"
		name="bStreet"
    validation="required|spaces"
		placeholder="32 George Street"

  />
  <FormKit
    name="bAdditionalInfo"
    :label="$t('addInfo')"
    validation="required"
		placeholder="Flat 32, Third Floor"
  />
</template>
<style >

</style>