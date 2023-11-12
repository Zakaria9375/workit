<script setup>
	import { reactive } from "vue";
	import sourceData from "@/Data/myData.json";
	const registeredUsers = reactive(sourceData.users);
</script>
<template>
	<div class="user-table">
		<h1>Information</h1>
		<h4>Create New Account</h4>
		<p>
			this step (Second Step) has three fields email, password and name if email exist password and login button will be displayed and the name field will called form the database. If not, password and name will appear to store the new data.
		</p>
		<h4>Email</h4>
		<p>In second Step The email field will be checked first. If the email exists in database or not. If it exist, login page will appear. If not, fields for for new users will appear</p>
		<h4>Log In</h4>
		<p> Only these records below will give you a successful login</p>
		<h4>Review your Order</h4>
		<p>Checked box will be emitted during submittion that's way their value will never be changed in code in step 4</p>
		<table>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>Password</th>
					<th>Date of Birth</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(user, index) in registeredUsers" :key="index">
					<td>{{ user.firstName }}</td>
					<td>{{ user.lastName }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.password }}</td>
					<td>{{ user.dateOfBirth }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped lang="scss"> 
@import "@/assets/css/main.scss";

	/* Add your styling for the table here */
	.user-table {
		width: 100%;
    color: getColor(t1);
    background-color: getColor(bg1);
		h1 {
			text-align: center;
			padding-bottom: 10px;
		}
		h4 {
			padding: 5px 20px;
		}
		p {
			max-width: 700px;
			/* text-align: center; */
			padding-bottom: 15px;
			padding-left: 10px;
			line-height: 1.25;
			font-size: 1.15rem;
      color: getColor(t1);
		}
		table {
			width: 100%;
			border-collapse: collapse;
		}

		th,
		td {
			border: 1px solid getColor(d1);
			padding: 8px;
			text-align: left;
		}

		th {
			background-color: getColor(bg2);
		}
	}
</style>
