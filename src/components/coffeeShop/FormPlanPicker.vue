<template>
	<div class="planMain">
		<h1 class="title">Coffee Plans</h1>

		<h2 class="subtitle">
			We travel the world to source the very best single origin coffee for you
		</h2>

		<div class="plans">
			<div
				v-for="plan in plans"
				:key="plan.price"
				@click="this.selectedPlan = plan"
				:class="{ 'active-plan': selectedPlan === plan }"
				class="plan"
			>
				<div class="weight item1">
					{{ plan.weight }}
				</div>
				<div class="description item2">
					<span class="title">
						{{ plan.name }}
					</span>
					<span class="description">
						{{ plan.description }}
					</span>
				</div>
				<div class="price item3">
					<span class="dollar-sign">$</span>
					<span class="number">{{ plan.price }}</span>
				</div>
			</div>
		</div>
		<div v-if="v$.selectedPlan.$invalid" class="error">
			You should pick a plan to continue
		</div>
	</div>
</template>

<script>
	import { useVuelidate } from "@vuelidate/core";
	import { required } from "@vuelidate/validators";
	import sourceData from "@/Data/myData.json";
	export default {
		setup() {
			return {
				v$: useVuelidate({ $lazy: true }),
			};
		},
		data() {
			return {
				plans: sourceData.plans,
				selectedPlan: null,
			};
		},
		validations() {
			return {
				selectedPlan: { required, $autoDirty: false },
			};
		},
		methods: {
			submit() {
				this.v$.$touch();
				return new Promise((resolve, reject) => {
					if (!this.v$.$invalid) {
						resolve({
							plan: this.selectedPlan,
						});
					} else {
						reject("plan not selected");
					}
				});
			},
		},
	};
</script>
