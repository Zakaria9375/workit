<template>
  <div>
    <h1 class="title">Confirm your order</h1>

    <h2 class="subtitle">
      We're almost there!
    </h2>

    <div class="summary">
      <h3>Subscription</h3>

      <p class="description">
        We'll send you carefully selected coffee every month.
      </p>

      <div class="plans">
        <div class="plan active-plan">
          <div class="weight">
            {{ wizardDate.plan.weight }}
          </div>

          <div class="description">
            <span class="title">
              {{ wizardDate.plan.name }}
            </span>
            <span class="description">
              {{ wizardDate.plan.description }}
            </span>
          </div>

          <div class="price">
            <span class="dollar-sign">$</span>
            <span class="number">{{totalPrice}}</span>
          </div>
        </div>
      </div>

      <h3>
        Level up your box
      </h3>

      <p class="description">
        Treat yourself by leveling up your monthly box
      </p>

      <div class="options" >
        <div class="option">
          <input v-model="form.chocolate" type="checkbox" value="chocolate" id="chocolate">
          <label for="chocolate">4 pcs. Single Origin Chocolate (+$4/month)</label>
        </div>

        <div class="option">
          <input v-model="form.otherTreat" type="checkbox" value="chocolate" id="other_treat">
          <label for="other_treat">Another delicious treat (+$2/month)</label>
        </div>
      </div>

      <div class="address">
        <div class="w-2/3">
          <h3>Delivery</h3>
          <p class="description">
            Your first Liquid Gold Box is right around the corner
          </p>
        </div>

        <div class="w-1/3">
          <h3>{{ wizardDate.recipient }}</h3>
          <p class="leading-normal">
            {{ wizardDate.address }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
	import { useVuelidate } from "@vuelidate/core";
  export default {
		props: {
			wizardDate: {
				type: Object,
				required: true
			}
		},
		setup() {
			return {
				v$: useVuelidate(),
			};
		},
    data () {
      return {
        form: {
          chocolate: false,
          otherTreat: false
        }
      }
    },
		validations() {},
    computed: {
      totalPrice () {
        let total = this.wizardDate.plan.price
				if(this.form.chocolate) {
					total += 4
				}
				if(this.form.otherTreat) {
					total += 2
				}
				return total
      }
    },
		methods: {
			submit(){
				return Promise.resolve({
					chocolate: this.form.chocolate,
					otherTreat: this.form.otherTreat
				})
			
			}
		},
  }
</script>

<style scoped lang="scss">
.summary {
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;

  h3 {
    font-size: 1.125rem;
    color: #5c6162;
    margin-bottom: 0.5rem;
    font-weight: 500;
    letter-spacing: 0.05em;
  }

  p.description {
    color: #8795a1;
    font-size: 0.875rem;
    width: 66.66667%;
    line-height: 1.5;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .options {
    margin-top: 1rem;
    margin-bottom: 2rem;

    .option {
      margin-top: 0.5rem;
      letter-spacing: 0.05em;
      color: #5c6162;
      font-weight: 500;
      font-size: 0.875rem;

      input {
        margin-left: 1rem;
        margin-right: 0.5rem;
      }
    }
  }

  .address {
    display: flex;
  }
}
</style>