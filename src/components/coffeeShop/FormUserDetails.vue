<template>
	<div class="mainUser">
		<div>
			<h1 class="title">{{ $t('createAcc') }}</h1>

			<h2 class="subtitle">
				{{ $t('createAccountorLogin') }}
			</h2>

			<form v-if="!loggedIn" class="form" >
				<div class="form-wrapper">
					<div class="form-group">
						<label class="form-label" for="email">{{ $t('email') }}</label>
						<input
							@blur="v$.form.email.$touch"
							type="text"
							v-model="v$.form.email.$model"
							placeholder="your@email.com"
							class="form-control"
							id="email"
							@input="checkIfUserExists"
						/>
					</div>
					<div class="error">
						<p v-for="error of v$.form.email.$errors" :key="error.$uid">
							<span class="message">{{ error.$message }}</span>
						</p>
					</div>
				</div>
				<div class="from-wrapper">
					<div v-if="emailCheckedInDB" class="form-group">
						<label class="form-label" for="password">{{ $t('phPassword') }}</label>
						<input
							v-model="v$.form.password.$model"
							@blur="v$.form.password.$touch"
							type="password"
							placeholder="Super Secret Password"
							class="form-control"
							id="password"
						/>
					</div>
					<div class="error">
						<p v-for="error of v$.form.password.$errors" :key="error.$uid">
							<span class="message">{{ error.$message }}</span>
						</p>
					</div>
					<div class="error">
						<p v-if="invalidPassword && existingUser">
							{{$t('suppliedCrd')}}
						</p>
					</div>
					<div 
						v-if="emailCheckedInDB && existingUser" 
						v-show="!v$.form.password.$dirty"
						class="info"
					>
						<p>{{ $t('loginMessage') }}</p>
					</div>
				</div>
				<div v-if="emailCheckedInDB && existingUser"  class="form-wrapper">
					<div class="buttons">
						<button @click.prevent="login" class="btn btn-right">{{ $t('logIn') }}</button>
					</div>
				</div>
				<div v-if="emailCheckedInDB && !existingUser" class="form-wrapper">
					<div  class="form-group">
						<label class="form-label" for="name">{{ $t('name') }}</label>
						<input
							v-model="v$.form.name.$model"
							@blur="v$.form.name.$touch"
							type="text"
							placeholder="What should we call you?"
							class="form-control"
							id="name"
						/>
					</div>
					<div class="error">
						<p v-for="error of v$.form.name.$errors" :key="error.$uid">

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
			<div v-if="loggedIn" class="text-center logging">
				<p>{{ $t('logInSuccess') }}</p>
				<a href="#" @click="reset">
					{{$t('not')}} <span>{{ form.name }}</span>?
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	import { useVuelidate } from "@vuelidate/core";
	import { required, minLength, email } from "@/i18n/rules/i18n-validators.js"
	import {api} from "@/stores/api.js";

	export default {
		setup() {
			return {
				v$: useVuelidate({ $lazy: true }),
			};
		},
		data() {
			return {				
				form: {
					email: null,
					password: null,
					name: null,
				},
				emailCheckedInDB: false,
				existingUser: false,
				loggedIn: false,
				invalidPassword: false,
				inValidData: false
			};
		},
		validations() {
			return {
				form: {
					email: {
						required,
						email,
					},
					password: {
						required,
        ...(this.existingUser
          ? {}
          : {
              minLength: minLength(8),
            }) 
					},
					name: {
						...(this.existingUser
          ? {}
          : {
              required,
              minLength: minLength(2),
            }) 
					},
				},
			};
		},
		methods: {
			checkIfUserExists() {
				if (!this.v$.form.email.$invalid) {
					this.$emit("updateAsyncState", "pending");
					return api.checkIfUserExistsInDB(this.form.email)
						.then((res) => {
							this.existingUser = true;
							this.emailCheckedInDB = true;
							this.$emit("updateAsyncState", "success");
							console.log(res);
						})
						.catch((err) => {
							this.existingUser = false;
							this.emailCheckedInDB = true;
							this.$emit("updateAsyncState", "success");
							console.log(err);
						});
				}
			},
			login() {
				this.invalidPassword = false;
				if (!this.v$.form.password.$invalid) {
					this.$emit("updateAsyncState", "pending");
					return api.authenticateUser(this.form.email, this.form.password)
						.then( validUser => {
							this.loggedIn = true;
							console.log(validUser)
							this.form.name = `${validUser.firstName} ${validUser.lastName}`
							this.$emit("updateAsyncState", "success");
						})
						.catch((err) => {
							console.log(err)
							this.invalidPassword = true;
							this.$emit("updateAsyncState", "success");
						});
				}
			},
			reset() {
				this.form.email = null;
				this.form.password = null;
				this.form.name = null;
				this.emailCheckedInDB = false;
				this.invalidPassword = false;
				this.existingUser = false;
				this.loggedIn = false
				this.v$.$reset();
			},
			submit () {
        return new Promise((resolve, reject) => {
					this.v$.$touch()
					if ((!this.v$.$invalid && !this.existingUser) || (this.existingUser && this.loggedIn)) {
						this.inValidData = false;
						resolve({
							email: this.form.email,
							password: this.form.password,
							name: this.form.name
						})
					} else {
						this.inValidData = true;
						setTimeout(() => {this.inValidData = false}, 5000)
						reject('data is not valid yet')
					}
        })
      }
		},
	};
</script>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";

	.logging {
		p {
			@include fontz(1.5, 500, t1);
		}
		a {
			margin-top: 10px;
			display: block;
			text-decoration: none;
			@include fontz(1.3, 500, t1);
			span {
				@include fontz(1.6, 600, primary);
			}
		}
	}
</style>