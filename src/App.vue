<script setup>
//imports
	import AppHeader from '@/components/AppHeader.vue'
	import {	RouterView } from 'vue-router'
</script>

<template>
	<AppHeader />	
	<div class="view">
		<RouterView />
	</div>
</template>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";

.view {
	min-height: calc(99.9dvh - 60px);
	background-color: getColor(bg5);
	color:	getColor(t1);
}

</style>
