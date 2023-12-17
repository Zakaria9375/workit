
<script setup>
const techs = ['Vue js', 'Formkit', 'Vuelidate', 'Sass', 'Javascript', 'i18n', 'Vue-Use library']
</script>
<template>
	<main>
		<div class="container px">
			<section>
				<h2 class="top">What is workit?</h2>
				<p>A project that has been built to demonstrarte the pros and cons of forms libraries of vue js. The most common libraries are Formkit, Vee-validate, Vuelidate</p>
				<p class="list"><span>Vuelidate</span> focus only on validation, decoupled from the template, so flexible.</p>
				<p class="list"><span>Formkit</span> is an entire library for forms in vue js, powerful documentation, offering everything not just validation</p>
				<p class="list"><span>Vee-validate,</span> An intermediate solution between vuelidate and formkit. it is great as it offers both declarative components as base input field or composable functions API that work with composition API.</p>
			</section>
			<section>
				<h2>What are the technologies used in workit?</h2>
				<ul>
					<li v-for="tech in techs">{{ tech }}</li>
				</ul>
			</section>
			<section>
				<h2>Facebook Form</h2>
				<p>Formkit has been used in this form providing almost everything, base-Input, validation, messages, vue-i18n translation, and more..</p>
				<p>Registered records that should be in Database has been saved in json format, Click on ? on facebook to display these records. Only these records will give successful login.</p>
				<p>While creating new record (account), email should be a unique value, that's why when we use one of the registered emails, an error will prevent sumbition.</p>
			</section>
			<section>
				<h2>E-commerce Form</h2>
				<p>Created by formkit, it is not a great option for these type of forms.</p>
				<p>Makeing a checkbox "billing address same as shipping address is a chalange. Although Formkit providing a lot but it takes control over everything"</p>
			</section>
			<section>
				<h2>Coffee Shop Form</h2>
				<p>Made by vuelidate, Although the form is amazing, but I even had to translate the error messages. so vuelidate is just an option and maybe not the best</p>
				<p>The second step of this form contains a lot of logic. first email checked in database if exist user has to login by providing the correspendent password. if it does not exist, fields for name and password shall appear to store new data.</p>
				<p>Registered records that should be in Database has been saved in json format, Click on ? on facebook to display these records. Only these records will give successful login.</p>
			</section>
		</div>
	</main>
</template>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";
	main {
		.px {
			padding-left: 30px;
			padding-right: 30px;
		}
		.container {
			padding-bottom: 2rem;
			padding-top: 2rem;
			section {
				h2 {
					margin: 4rem 0 1.8rem 1.2rem;
					border-top: 1px solid getColor(d1);
					padding-top: 1.8rem;
					letter-spacing: -.02em;
					@include fontz(2, 700, t3);
				}
				.top {
					border-top: none;
					margin: 1rem 0 1.8rem 1.2rem;
				}
				p {
					margin-bottom: 1.2em;
					line-height: 1.4;
					overflow-wrap: break-word;
					@include fontz(1.2, 400, t2);
					span {
						@include fontz(1.3, 600, t2);
					}
					
				}
				p.list {
					margin-left: 1rem;
					display: block;
				}
			ul {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				gap: 20px;
				flex-wrap: wrap;
				li {
					@include fontz(1.2, 400, t2)
				}
			}
			}
		}
	}
	
</style>
