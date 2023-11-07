<script setup>
import { FormKit } from "@formkit/vue";
</script>
<template>
  <FormKit
    type="text"
    :label= "$t('fullName')"
		name="fullName"
    validation="required|alpha_spaces:latin|length:2|spaces"
		placeholder="John Doe"
		validation-label="Name"
  />
  <FormKit
    type="email"
    :label= "$t('phEmail')"
		name="email"
		placeholder="ec@example.com"
    validation="required|email"
  />
  <FormKit
    type="text"
    name="phone"
    :label="$t('phone')"
		placeholder="+37112345678"
    validation="required|spaces|(1000)matches:/[0-9]/"
  />
</template>