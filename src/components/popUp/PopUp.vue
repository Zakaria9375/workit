<script setup>
	import { store } from "@/store.js";
</script>
<template>
	<div class="popUp">
		<div class="flex">
			<div class="content">
				<div class="popInner">
					<button class="pClose" @click="store.closeThePopUp">
						<i class="fa-solid fa-circle-xmark"></i>
					</button>
					<slot />
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
	@import "@/assets/css/main.scss";

	.popUp {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 11;
		width: 100%;
		background-color: getColor(transbg);

		.flex {
			width: 100%;
			max-height: 100%;
			overflow: auto;
		}
		.content {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.popInner {
			max-height: 100%;
			position: relative;
			background-color: getColor(bg1);
			padding: 16px;
			border-radius: 6px;
			width: fit-content;
			margin: 32px;
		}
		.pClose {
			border: none;
			background-color: transparent;
			cursor: pointer;
			display: flex;
			i {
				font-size: 1.5rem;
				position: absolute;
				top: -12px;
				right: -12px;
				color: getColor(primary);
				background-color: getColor(bg1);
				border: none;
				border-radius: 50%;
			}
			&::before {
				content: "close";
				background-color: getColor(primary);
				color: getColor(bg1);
				position: absolute;
				padding: 6px 8px;
				border-radius: 4px;
				font-size: 1.1rem;
				top: 0;
				right: -53px;
				transform: translate(50%, -50%);
				display: none;
			}
			&::after {
				content: "";
				position: absolute;
				border-width: 10px;
				border-style: solid;
				position: absolute;
				border-color: transparent getColor(primary) transparent transparent;
				top: 0;
				right: -15px;
				transform: translate(50%, -50%);
				display: none;
			}
		}
		.pClose:hover::before,
		.pClose:hover::after {
			display: block;
		}
	}
</style>
