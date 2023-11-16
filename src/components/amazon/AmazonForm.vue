<script setup>
	import { computed } from 'vue'
	import { useWindowSize  } from "@vueuse/core";
	const { height } = useWindowSize();
	const h = computed(()=> `${height.value}px`)
</script>
<template>
	<div class="cs">
		<h1>Coming Soon</h1>
	</div>
</template>

<style scoped lang="scss"> 
	@import "@/assets/css/main.scss";

	.cs {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		min-height: calc(v-bind(h) - 80px);
		h1 {
			@include fontz(3.5, 800, gb)
		}
	}
</style>