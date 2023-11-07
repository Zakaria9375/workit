<script setup>
	import { useI18n } from "vue-i18n";
	import Trans from '@/i18n/translate.js'
	import {useRouter} from 'vue-router'
	import { ref, computed, inject } from 'vue';

	const { locale } = useI18n 
	const router = useRouter()
	const supportedLocales = Trans.supportedLocales
	const currentLocale = computed(()=>Trans.currentLocale)
	const isOpen = ref(false);
  const config = inject(Symbol.for('FormKitConfig'))

	const selectOption =	async (sLocale) => {
		const newLocale = sLocale
		await Trans.switchLanguage(newLocale)
		config.locale = newLocale
		try {
			await router.replace({params: {locale: newLocale}})
		} catch (e){
			console.log(e)
			router.push("/")
		}
		isOpen.value = false;
	};
</script>

<template>
	<div class="select" @click="toggleDropdown">
		<div class="select-styled" :class="{ active: isOpen }">{{ currentLocale }}</div>
			<ul class="select-options">
				<li
					v-for="sLocale in supportedLocales"
					:key="`locale-${sLocale}`"
					@click="selectOption(sLocale)"
					:class="{ 'is-selected': currentLocale === sLocale }"
				>
					{{ sLocale }}
				</li>
			</ul>
	</div>
</template>

<style lang="scss" scoped>
	@import "@/assets/css/main.scss";
.select {
	position: relative;
	display: block;
	width: 41px;
	cursor: pointer;
	text-transform: uppercase;
	background-color: getColor(g1);

	.select-styled {
		padding: 5px 10px;
		border-radius: 4px;
	}

	.select-options {
		list-style: none;
		margin: 0;
		padding: 0;
		// border: 1px solid #ccc;
		// border-top: none;
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		position: absolute;
		width: 41px;
		z-index: 1;
		background-color: getColor(bg2);
		color: getColor(t1);
		box-shadow: 0 2px 4px getColor(bs);
		display: none;
		

		li {
			padding: 10px;
			cursor: pointer;
			transition: background-color 0.3s;
			&:hover {
				background-color:	getColor(transbg3);
			}
			&.is-selected {
				display: none;
			}
		}
	}
	&:hover .select-options {
		display: block;
	}
}

</style>