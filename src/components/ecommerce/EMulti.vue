<script setup>
import { computed, ref  } from 'vue'
	import StepOne from "@/components/ecommerce/steps/StepOne.vue";
	import StepTwo from "@/components/ecommerce/steps/StepTwo.vue";
	import StepFour from "@/components/ecommerce/steps/StepFour.vue";
	import StepFive from "@/components/ecommerce/steps/StepFive.vue";
	import { FormKit } from "@formkit/vue";
	import { useWindowSize } from '@vueuse/core';

	const formValue = ref(null)
	const submitted = ref(false)
	const { width } = useWindowSize();
	const isMobile = computed(() => width.value <= 540 );
	function handleSubmit(data) {
		console.log(sameAs)
		submitted.value = true
	}
</script>
<template>
	<div class="backEcomerce">
		<div class="container">
			<h1>{{ $t("msCF") }}</h1>
			<FormKit
			v-if="!submitted"
				type="form"
				:actions="false"
				@submit="handleSubmit"
				:classes="{
					form: { myForm: true },
				}"
			>
				<FormKit
					type="multi-step"
					tab-style="progress"
					v-model="formValue"
					:allow-incomplete="false"
					:hideProgressLabels="isMobile"
					:classes="{
						wrapper: { myWrapWidth: true },
						tabLabel: { myTabLabel: true },
						steps: { mySteps: true },
					}"
				>
					<FormKit type="step" name="personalInformation" :label="$t('customer')">
						<StepOne />
					</FormKit>
					<FormKit type="step" name="shippingAddress" :label="$t('sAddress')">
						<StepTwo/>
					</FormKit>
					<FormKit type="step" name="creditCard" :label="$t('cc')">
						<StepFour/>
					</FormKit>
					<FormKit type="step" name="review" :label="$t('review')">
						<StepFive/>
						<template #stepNext>
							<FormKit type="submit" />
						</template>
					</FormKit>
				</FormKit>
			</FormKit>
			<div v-if="submitted" class="thanks">
				<h2>Thank you for your purchase</h2>
			</div>
			<div class="code">
				<pre wrap>{{ formValue }}</pre>
			</div>
		</div>
	</div>
</template>
<style lang="scss">
	@import "@/assets/css/main.scss";

	.backEcomerce {
		min-height: calc(100dvh - 60px);
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			h1 {
				padding-top: 3.5rem;
				margin-top: 0;
				text-align: center;
				@include fontz(2, 600, t1 )
			}
			.myForm {
				width: max(20rem, 75%);
				.myWrapWidth {
					max-width: 100% !important;
				}
				.mySteps {
					background-color: getColor(bg2);
					margin-top: 40px;
					box-shadow: getColor(bs);
				} 
				.myTabLabel {
					white-space: pre-wrap !important;
					@include fontz(0.9, 500, t1 )
				}
			}
			.thanks {
				background-color: getColor(bg2);
				margin-top: 40px;
				box-shadow: getColor(bs);
				padding: 16px;
				h2 {
					@include fontz(1.5, 600, t1)
				}
			}
		}
	}
</style>
