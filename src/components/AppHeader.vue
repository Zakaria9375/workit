<script setup>
	//imports
	import { reactive, ref } from "vue";
	import { useDark, useToggle } from "@vueuse/core";
	import Trans from "../i18n/translate";
	import LangSwitcher from "./LangSwitcher.vue";
	//constants
	const isDark = useDark({
		selector: "body",
		attribute: "theme",
		valueDark: "dark",
		valueLight: "light",
	});
	const toggleDark = useToggle(isDark);
	const openIt = ref(false);
	const mainLinks = reactive([
		{ id: 1, title: "home", name: "home" },
		{ id: 2, title: "facebook", name: "facebook" },
		{ id: 3, title: "multiForm", name: "multiForm"},
		{ id: 4, title: "coffeeShop", name: "coffeeShop"}
	]);
	//functions
	function openMenu() {
		openIt.value = !openIt.value;
	}
</script>
<template>
	<header>
		<div class="overlay">
			<div class="container">
				<RouterLink :to="Trans.i18nRoute({ name: 'home' })" class="logo">
					<span>work<span>it</span></span>
				</RouterLink>
				<nav>
					<ul :class="openIt ? 'appear' : 'disappear'">
						<li v-for="link in mainLinks">
							<RouterLink
								:key="link.id"
								:to="Trans.i18nRoute({ name: link.name })"
							>
								{{ $t(link.title) }}
							</RouterLink>
						</li>
					</ul>
				</nav>
				<i
					class="toggle-menu"
					:class="openIt ? 'fa-solid fa-circle-xmark' : 'fas fa-bars'"
					@click="openMenu"
				></i>
				<div class="mode">
					<span class="thumb" @click="toggleDark()">
						<!-- <i
							class="modeBtn"
							:class="isDark ? 'material-symbols-outlined' : 'bx bx-sun'"
						></i> -->
						<span class="material-symbols-outlined modeBtn" v-if="isDark"> dark_mode </span>
						<span class="material-symbols-outlined modeBtn" v-if="!isDark"> light_mode </span>
					</span>
				</div>
				<LangSwitcher />
			</div>
		</div>
	</header>
</template>

<style scoped lang="scss">
	@import "@/assets/css/main.scss";

	header {
		position: sticky;
		width: 100%;
		z-index: 5;
		font-size: 1rem;
		background-color: getColor(bg2);
		color: getColor(t1);
		border-bottom: 1px solid getColor(d1);
		.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: relative;
			min-height: 60px;

			.logo {
				height: 40px;
				display: flex;
				align-items: center;
				span {
					font-size: 1.5rem;
					letter-spacing: -0.5px;
					font-weight: 500;
					color: getColor(t1);
					span {
						font-weight: 300;
					}
				}
			}

			nav {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: flex-end;

				ul {
					display: flex;
					li {
						text-align: center;
						a {
							padding: 15px !important;
							padding: 10px 16px;
							display: block;
							font-size: 1.15rem;
							position: relative;
							color: getColor(t1);
						}
						a.exActive,
						a:hover {
							color: getColor(act);
						}
					}
				}
				@media (max-width: 767px) {
					ul {
						display: flex;
						flex-direction: column;
						position: absolute;
						left: 0;
						top: 100%;
						width: 100%;
						background-color: getColor(transbg);
						opacity: 50%;
						transition: max-height 0.5s;
						overflow: hidden;
					}
					ul.disappear {
						max-height: 0;
					}
					ul.appear {
						max-height: 1000px;
					}
				}
			}

			.mode {
				// font-size: 1.25rem;
				cursor: pointer;
				.thumb {
					border-left: 1px solid getColor(d1);
					padding-left: 20px;
					margin-right: 10px;
					display: block;
				}
				.modeBtn {
					font-size: 1.25rem;
					display: block;
				}
			}
			@media (max-width: 768px) {
				.mode {
					.modeBtn {
						border-left: none;
					}
				}
			}

			.toggle-menu {
				color: getColor(t2);
				font-size: 1.5rem;
				transition: all 0.3s;
			}
			@media (min-width: 768px) {
				.toggle-menu {
					display: none;
				}
			}
		}
	}
</style>
