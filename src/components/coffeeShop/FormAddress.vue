<template>
  <div>
    <h1 class="title">{{ $t('dd') }}</h1>

    <h2 class="subtitle">
      {{$t('ddSubtitle')}}
    </h2>

    <form class="form">
      <div class="box">
        <input @change="copytheName" type="checkbox" v-model="copyName" class="cBox" name="copeName" id="copy">
        <label class="cBox-label" for="copy">{{$t('sameAs')}}</label>
      </div>
      <div class="form-wrapper">
        <div class="form-group">
        <label class="form-label" for="delivery_name">{{ $t('name') }}</label>
        <input v-model="v$.form.recipient.$model" type="text" placeholder="Recipients Name" class="form-control" id="delivery_name" @blur="v$.form.recipient.$touch">
         
      </div>
      <div class="error">
          <p v-for="error of v$.form.recipient.$errors" :key="error.$uid">
							<span class="message">{{ error.$message }}</span>
					</p>
        </div>
      </div>
      
      <div class="form-wrapper">
        <div class="form-group">
        <label class="form-label" for="address">{{ $t('address') }}</label>
        <textarea v-model="v$.form.address.$model"  @blur="v$.form.address.$touch" placeholder="London Street 470978 New England" rows="3" class="form-control" id="address"></textarea>
        
      </div>
      <div class="error">
          <p v-for="error of v$.form.address.$errors" :key="error.$uid">
							<span class="message">{{ error.$message }}</span>
					</p>
        </div>
      </div>
      <div class="form-wrapper">
					<div class="error">
						<p v-if="inValidData">
							{{ $t('invalidData') }}
						</p>
					</div>
				</div>
    </form>
  </div>
</template>

<script>
	import { useVuelidate } from "@vuelidate/core";
	import { required } from "@/i18n/rules/i18n-validators.js"
  export default {
		setup() {
			return {
				v$: useVuelidate(),
			};
		},
    props: {
      wizardDate: {
        type: Object
      }
    },
    data () {
      return {
        inValidData: false,
        form: {
          address: "",
          recipient: ""
        },
        copyName: false
      }
    },
		methods: {
			submit(){
        this.v$.$touch();
        return new Promise((resolve, reject) => {
          if(!this.v$.$invalid) {
            this.inValidData = false;
            resolve({
              recipient: this.form.recipient,
              address: this.form.address
            })
          }
          else {
            this.inValidData = true;
						setTimeout(() => {this.inValidData = false}, 5000)
						reject('data is not valid yet')
          }
        })
			},
      copytheName(){
        if(this.copyName) {
          this.form.recipient = this.wizardDate.name
        }
        if(!this.copyName) {
          this.form.recipient = ""
        }
      }
		},
		validations() {
			return {
				form: {
        address: {
          required
        },
        recipient: {
          required
        }
			}
		}
    }
  }
</script>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";
  .box {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .cBox {
    margin-left: 5rem;  
    display: inline-block;
    margin-right: 1rem;  
    padding: 8px;
    width: 16px;
    height: 16px;
    @include mobile {
      margin-left: 0;  
    }
  }
  .cBox-label {
    @include fontz(1.2, 500, t2);
    display: inline-block;
  }
</style>