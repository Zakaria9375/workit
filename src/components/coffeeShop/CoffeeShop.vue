<script setup>
	import FormWizard from "@/components/coffeeShop/FormWizard.vue";
</script>
<template>
	<div class="backCofe">
		<div class="overlay">
			<div class="container p-tb">
				<header>
					<div>
						<span class="logo">Liquid Gold Box</span>
					</div>
				</header>
				<div class="content">
					<FormWizard />
				</div>
			</div>
		</div>
	</div>
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
			z-index: 2;
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
