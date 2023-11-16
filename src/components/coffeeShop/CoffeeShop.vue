<script setup>
	import FormWizard from "@/components/coffeeShop/FormWizard.vue";
	import { store } from "@/store.js";
  import PopUp from "@/components/popUp/PopUp.vue";
	import CoffeeDatabase from "@/components/coffeeShop/CoffeeDatabase.vue"
</script>
<template>
	<div class="backCofe">
		<div class="overlay">
			<div class="container">
				<header>
					<div>
						<span class="logo">{{$t('lgb')}}</span>
						<span @click="store.togglePopUp3" class="dataInfo"><i class="fa-regular fa-circle-question"></i></span>
					</div>
				</header>
				<div class="content">
					<FormWizard />
				</div>
				>
			</div>
		</div>
	</div>
	<PopUp v-if="store.openPopUp3" >
					<CoffeeDatabase/>
	</PopUp>
</template>
<style scoped lang="scss">
	@import "@/assets/css/main.scss";

	.backCofe {
		min-height: calc(99.9dvh - 60px);
		background-image: url("/images/coffee.jpg");
		background-repeat: no-repeat;
		background-color: #ccdcdc;
		background-position: 100% 100%;
		.overlay {
			position: relative;
			z-index: 1;
			min-height: calc(99.9dvh - 60px);
			background: getColor(overlay)
		}
		.container {
			position: relative;
			padding-top: 2rem;
			z-index: 2;
			header {
				width: fit-content;
				position: relative;
				padding: 16px;
			}
			.logo {
				font-weight: 700;
				text-transform: uppercase;
				color: getColor(gb);
				font-size: 0.875rem;
				letter-spacing: 0.05em;
				padding-left: 0.5rem;
				padding-right: 0.5rem;
				padding-bottom: 1rem;
				background: url("/images/logo.png") bottom no-repeat;
			}
			.dataInfo {
        position: absolute;
				color: getColor(gb);
        top: -5px;
        right:-5px;
        font-size: 1.25rem;
        cursor: pointer;
			}
			.content {
				margin-left: auto;
				margin-right: auto;
				padding-top: 1.5rem;
				padding-bottom: 1.5rem;
				width: 620px;
				@include tablet {
					width: 100%;
				}

			}
		}
	}
</style>
