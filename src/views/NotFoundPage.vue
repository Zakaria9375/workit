<script setup>
	import Trans from "../i18n/translate";
</script>

<template>
	<div class="page_404">
		<div class="main404">
			<div class="f404_bg">
				<h1 class="text-center">404</h1>
			</div>
			<div class="contant_box_404">
				<h3>Look like you're lost</h3>
				<p>the page you are looking for not avaible!</p>
				<router-link :to="Trans.i18nRoute({ name: 'facebook' })" class="goHome">Go to Home</router-link>
			</div>
		</div>
	</div>
</template>

<style >
.page_404 {
	background-color: #fff;
	margin-right: -15px;
	margin-left: -15px;
	width: 100%;
	padding: 40px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}

.main404 {
	min-height: 1px;
	padding-right: 15px;
	padding-left: 15px;
}
.text-center {
	text-align: center;
}
.page_404 img {
	width: 100%;
}

.f404_bg {
	background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
	height: 400px;
	background-position: center;
	object-fit: contain;
	width: 100%;
}

.f404_bg h1 {
	font-size: 80px;
}

.f404_bg h3 {
	font-size: 80px;
}

.goHome {
	color: #fff;
	padding: 10px 20px;
	background: #39ac31;
	margin: 20px 0;
	display: inline-block;
}
.contant_box_404 {
	margin-top: -50px;
}
</style>
