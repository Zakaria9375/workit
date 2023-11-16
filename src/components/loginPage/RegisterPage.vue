<script setup>
	import { FormKit } from "@formkit/vue";
	import sourceData from "@/Data/myData.json";
	import { reactive, computed } from "vue";
	import { format } from "date-fns";

	const registeredUsers = reactive(sourceData.users);
	const currentDate = new Date();
	const formattedDate = computed(() => format(currentDate, "yyyy-MM-dd"));
	async function handleSubmit(data) {
		await new Promise((r) => setTimeout(r, 1000));
		console.log(data);
		const newRecord = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			dateOfBirth: data.dateOfBirth,
			gender: data.gender,
		};
		registeredUsers.push(newRecord);
	}
</script>
<template>
	<div class="myFormContainer">
		<FormKit type="form" @submit="handleSubmit" :submit-label="$t('signUp')">
			<div class="title">
				<h1>{{ $t("signUp") }}</h1>
				<p>{{ $t("signHint") }}</p>
			</div>
			<div class="double">
				<FormKit
					type="text"
					:placeholder="$t('phFirstName')"
					name="firstName"
					validation="required|alpha|length:2"
					validation-label="First name"
				/>
				<FormKit
					type="text"
					:placeholder="$t('phLastName')"
					name="lastName"
					validation="required|alpha|length:2"
					validation-label="Last name"
				/>
			</div>
			<FormKit
				type="text"
				:placeholder="$t('phEmail')"
				name="email"
				validation="required|email|(200)isUnique"
			/>
			<FormKit
				type="password"
				:placeholder="$t('phNewPassword')"
				name="password"
				:validation="[
					['required'],
					[
						'matches',
						/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
					],
					['length', '8'],
				]"
				:validation-messages="{
					matches:
						'Please, provide one capital letter, small letter, number and special character',
				}"
			/>
			<FormKit
				type="password"
				:placeholder="$t('phConfirmPassword')"
				name="password_confirm"
				validation="required|confirm"
				validation-label="Password confirmation"
			/>
			<FormKit
				type="date"
				:label="$t('Dob')"
				:classes="{
					help: 'myHelp',
					label: 'myLabel',
				}"
				name="dataOfBirth"
				:help="$t('helpDOB')"
				placeholder="MM/DD/YYYY"
				validation="required|date_before:2010-01-01"
				validation-label="Data of Birth"
				:max="formattedDate"
				min="1930-01-01"
			/>
			<FormKit
				type="text"
				:placeholder="$t('phGender')"
				name="gender"
				:help="$t('helpGender')"
				:classes="{
					help: 'myHelp',
				}"
			/>
		</FormKit>
	</div>
</template>
<style scoped lang="scss">
	@import "@/assets/css/main.scss";

	.myFormContainer {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		max-width: 400px;

		margin: 10px;
		color: getColor(t1);

		.title {
			text-align: center;
			padding-bottom: 10px;
			h1 {
				@include fontz( 2, 600, t1)
			}
			p {
				margin-top: 10px;
				margin-bottom: 5px;
			}
		}
	}
	.double {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		gap: 16px;
		@include mobile {
			display: block;
		}
	}
</style>
