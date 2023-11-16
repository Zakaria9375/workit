<script setup>
	import FormPlanPicker from "@/components/coffeeShop/FormPlanPicker.vue";
	import FormUserDetails from "@/components/coffeeShop/FormUserDetails.vue";
	import FormAddress from "@/components/coffeeShop/FormAddress.vue";
	import FormReviewOrder from "@/components/coffeeShop/FormReviewOrder.vue";
	import { ref, computed, reactive } from "vue";
	import { api } from "@/stores/api.js"


	const form = reactive({
		plan: {
			price: 0,
			weight: "",
			name: "",
			description: "",
		},
		email: "",
		name: "",
		password: "",
		address: "",
		recipient: "",
		chocolate: false,
		otherTreat: false,
	});
	const submitted = ref(false);
	const csn = ref(1);
	const asyncState = ref(null);
	const currentComponent = ref(null);
	const steps = [
		"FormPlanPicker",
		"FormUserDetails",
		"FormAddress",
		"FormReviewOrder",
	];

	const currentStep = computed(() => steps[csn.value - 1]);
	const progress = computed(() => (csn.value / 4) * 100);

	function goBack() {
		csn.value--;
	}
	function goNext() {
		currentComponent.value.submit()
			.then(stepData => {
				Object.assign(form, stepData);
				csn.value++;
			})
			.catch(error => console.log(error))
	}
	function handleSubmit() {
		currentComponent.value.submit()
			.then(stepData => {
				Object.assign(form, stepData);
				asyncState.value = "pending";
				api.postFormToDB(form).then(() => {
					console.log("form submitted", form);
					asyncState.value = "success";
					submitted.value = true;
				});
				
			})
			.catch(error => console.log(error))
	}
	function updateAsyncState(state) {
		asyncState.value = state;
	}
</script>

<template>
	<div class="main" v-if="!submitted" v-show="asyncState !== 'pending'">
		<KeepAlive>
			<component
				ref="currentComponent"
				:is="currentStep"
				:wizardDate="form"
				@updateAsyncState="updateAsyncState"
			></component>
		</KeepAlive>

		<div class="progress-bar">
			<div :style="`width: ${progress}%;`"></div>
		</div>

		<!-- Actions -->
		<div class="buttons">
			<button @click="goBack" v-if="csn > 1" class="btn-left btn">{{$t("back")}}</button>
			<button
				@click="goNext"
				v-if="csn < 4"
				class="btn-right btn"
			>
				{{$t("next")}}
			</button>
			<button
				type="submit"
				v-if="csn === 4"
				@click="handleSubmit"
				class="btn btn-right"
			>
				{{$t("submit")}}
			</button>
		</div>
		<div class="code">
			<pre><code>{{form}}</code></pre>
		</div>
		
	</div>
	<div v-if="submitted">
		<h1 class="title">{{ $t('thanks') }}</h1>
		<h2 class="subtitle">{{ $t('toShip') }}</h2>
	</div>
	<div class="message" v-if="asyncState === 'pending'">
		<div class="loading-wrapper" >
			<div class="loader">
				<img src="/svg/spinner.svg" alt="spinner" />
				<p>{{ $t('waitServer') }}</p>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		components: {
			FormPlanPicker,
			FormAddress,
			FormUserDetails,
			FormReviewOrder,
		},
	};
</script>

<style lang="scss">
	@import "@/assets/css/main.scss";
	.code {
		max-width: 100%;
		overflow: auto;
	}
	.buttons {
			display: flex;
			justify-content: flex-end;
			.btn {
				display: inline-block;
				padding: 0.75rem 1.5rem;
				border-radius: 0.25rem;
				text-transform: uppercase;
				letter-spacing: 0.2;
				transition: all 0.3s ease;
				font-size: 0.875rem;
				font-weight: 500;
				cursor: pointer;
				&:hover {
					color: #fff;
					background: rgba(37, 142, 149, 0.96);
					border-color: rgba(37, 142, 149, 0.96);
				}
				&:disabled {
					cursor: not-allowed;
					opacity: 0.5;
				}
			}
			.btn-left {
				margin-left: 0.75rem;
				margin-right: 0.75rem;
				background-color: #fff;
				color: #09848d;
				border: 2px solid #09848d;
			}
			.btn-right {
				position: relative;
				color: #fff;
				background-color: #09848d;
				border: 2px solid #09848d;
			}
		}
	.leading-normal {
		line-height: 1.5;
	}
	.mx-auto {
		margin-left: auto;
		margin-right: auto;
	}
	.text-center {
		text-align: center;
	}
	.w-1\/3 {
		width: 33.33333%;
	}
	.w-2\/3 {
		width: 66.66667%;
	}
	.info {
		margin-top: 10px;
		margin-bottom: 10px;
		@include fontoo(0.9rem, 500, primary);
		text-align: right;
	}
	div.message {
		.loading-wrapper {
			margin-top: 4rem;
			&,
			.loader {
				display: flex;
				-ms-flex-wrap: wrap;
				flex-wrap: wrap;
				padding: 0.5rem;
				margin-left: auto;
				margin-right: auto;
				align-items: center;
				justify-content: center;
				border-width: 2px;
				border-color: #09848d;
				border-radius: 0.5rem;
				font-size: 1.25rem;
				color: #5c6162;
			}

			.loader p {
				margin-right: 1rem;
			}
		}
	}
	h1.title {
		text-align: center;
		@include fontoo(1.875, 500, t2);
	}
	h2.subtitle {
		margin: 0.7rem auto;
		@include fontoo(1.5, 300, gb);
		text-align: center;
		line-height: 1.5;
		max-width: 500px;
	}
	.error {
		width: 100%;
		margin-top: 0.5rem;
		text-align: right;
		@include fontoo(0.875, 400, error);
		span.property {
			text-transform: capitalize;
			padding-right: 3px;
		}
		span.message {
			text-transform: lowercase;
		}
	}
	.main {
		.progress-bar {
			width: 100%;
			border-radius: 6px;
			margin-top: 1.25rem;
			margin-bottom: 1.25rem;
			height: 12px;
			background: getColor(bg4);
			> div {
				border-radius: 6px;
				height: 100%;
				background-color: #09848d;
				transition: all 0.3s ease;
			}
		}
		
	}
	.form {
		padding: 0.8rem 4rem;
		@include mScreen {
			padding: 0.5rem;
		}
		display: flex;
		flex-direction: column;
		.form-group {
			display: flex;
			width: 100%;
			align-items: center;
			margin: 0.5rem;
			justify-content: flex-end;

			.form-label {
				flex-basis: 20%;
				text-align: right;
				margin-right: 2rem;
				@include mobile {
					margin-right: 0.8rem;
				}
				font-weight: 500;
				color: #5c6162;
				@include fontz(1.1, 500, t2)
			}
			.form-control {
				flex-basis: 60%;
				border-radius: 0.25rem;
				padding: 0.5rem 0.75rem;
				flex-grow: 1;
				color: #5c6162;
				font-weight: 500;
				background-color: #f4f7f7;
			}
			.form-control::placeholder {
				font-weight: 400;
			}
			.form-control:focus {
				background-color: #fff;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
				outline: none;
			}
		}
	}
	.plans {
		padding: 0 40px;
		@media (max-width: 500px) {
			padding: 0;
		}
		margin-bottom: 40px;
		.plan {
			display: flex;
			background-color: getColor(bg1);
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
			margin-top: 1rem;
			margin-bottom: 1rem;
			border-radius: 0.25rem;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;
			position: relative;
			transition: all 0.3s ease;
			height: 100px;
			@media (max-width: 600px) {
				height: 120px;
			}
			@media (max-width: 500px) {
				height: auto;
				display: grid;
				grid-template-columns: 50% 50%;
				grid-template-rows: 30% 70%;
				.item1 {
					grid-row-start: 1;
					grid-column-start: 1;
				}
				.item2 {
					grid-row-start: 2;
					grid-row-end: 3;
					grid-column-start: 1;
					grid-column-end: 3;
				}
				.item3 {
					grid-row-start: 1;
					grid-column-start: 2;
				}
			}
			&:hover {
				box-shadow: getColor(bs2);
			}
			.weight {
				display: flex;
				flex-basis: 20%;
				padding: 1rem;
				@include fontz(1.875, 600, cofe);
				align-items: center;
				justify-content: center;
				background-color: getColor(cofeBg);
				border-top-left-radius: 0.25rem;
				border-bottom-left-radius: 0.25rem;
				height: 100%;
			}
			div.description {
				flex-basis: 60%;
				padding: 0.5rem;
				display: grid;
				span.title {
					display: block;
					@include fontz(1.1, 600, t3);
					margin-bottom: 0.25rem;
				}
				span.description {
					font-size: 0.875rem;
					font-weight: 500;
					color: #8795a1;
					line-height: 1.5;
				}
			}
			.price {
				flex-basis: 20%;
				height: 100%;
				color: getColor(price);
				display: flex;
				position: relative;
				justify-content: flex-end;
				@media (max-width: 500px) {
					justify-content: center;
					padding-top: 6px;
				}
				align-items: center;
				font-family: Crimson Text, serif;
				font-weight: 600;
				.number {
					display: block;
					@include fz(3.5);
					line-height: 0.5;
					padding-right: 10px;
					padding-left: 5px;
				}
				.dollar-sign {
					font-size: 24px;
					font-weight: 700;
				}
			}
		}
		.active-plan {
			box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
				0 5px 15px 0 rgba(0, 0, 0, 0.08);
				border:1px solid getColor(cofe);
		}
	}
</style>
