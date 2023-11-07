<script setup>
  import { store } from "@/store.js";
	import { useRouter } from 'vue-router'
	const router = useRouter();
	function logOut () {
		store.isAuthenticated = false
		router.push({ name: 'facebook' });
	}
</script>

<template>
	<div>
		<h1>Welcome to your account</h1>
		<button @click="logOut">Logout</button>
	</div>
</template>