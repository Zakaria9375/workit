<template>
  <div>
    <h1 class="title">{{ $t('confirmOrder') }}</h1>

    <h2 class="subtitle">
      {{ $t('weThere') }}
    </h2>

    <div class="summary">
      <h3>{{ $t('subscription') }}</h3>

      <p class="description">
        {{ $t('selectedCofe') }}
      </p>

      <div class="plans">
        <div class="plan active-plan">
          <div class="weight item1">
            {{ wizardDate.plan.weight }}
          </div>

          <div class="description item2">
            <span class="title">
              {{ $t(`${wizardDate.plan.name}`) }}
            </span>
            <span class="description ">
              {{ $t(`${wizardDate.plan.description}`) }}
            </span>
          </div>

          <div class="price item3">
            <span class="dollar-sign">$</span>
            <span class="number">{{totalPrice}}</span>
          </div>
        </div>
      </div>

      <h3>
        {{ $t('lvlUp') }}
      </h3>

      <p class="description">
        {{ $t('trtDescription') }}
      </p>

      <div class="options" >
        <div class="option">
          <input v-model="form.chocolate" type="checkbox" value="chocolate" id="chocolate">
          <label for="chocolate">{{ $t('chocloteTrt') }}</label>
        </div>

        <div class="option">
          <input v-model="form.otherTreat" type="checkbox" value="chocolate" id="other_treat">
          <label for="other_treat">{{ $t('anotherTrt') }}</label>
        </div>
      </div>

      <div class="address">
        <div class="w-2/3">
          <h3>Delivery</h3>
          <p class="description">
            {{ $t('almostReady') }}
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
	@import "@/assets/css/main.scss";

.summary {
  background-color: getColor(bg2);
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;

  h3 {
    margin-bottom: 0.75rem;
    letter-spacing: 0.05em;
    @include fontoo(1.2rem, 500, t2);
  }

  p.description {
    width: 66.66667%;
    @include fontoo(0.95rem, 500, t1);
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .options {
    margin-top: 1.2rem;
    margin-bottom: 2rem;

    .option {
      margin-top: 0.75rem;
      letter-spacing: 0.05em;
      @include fontoo(0.875rem, 500, t3);

      input {
        margin-left: 1rem;
        margin-right: 0.5rem;
      }
    }
  }

  .address {
    display: flex;
    p {
      @include fontoo(1rem, 500, t3);
    }
  }
}
</style>