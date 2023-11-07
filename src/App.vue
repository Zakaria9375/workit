<script setup>
//imports
	import AppHeader from '@/components/AppHeader.vue'
	import {	RouterView } from 'vue-router'
	import { useTitle } from '@vueuse/core';
	import { ref, watch, onMounted } from 'vue'
	import { useRoute } from 'vue-router'
//constants
	const pageTitle = useTitle()
	const route = useRoute()
//computed
//watchers
	watch(route, () => {
		pageTitle.value = route.name
	})
//methods

</script>

<template>
	<AppHeader />	
	<div class="view">
		<div class="container">
			<RouterView />
		</div>
	</div>
</template>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";

.view {
	min-height: calc(99.9dvh - 60px);
	background-color: getColor(bg1);
	color:	getColor(t1);
}

</style>
