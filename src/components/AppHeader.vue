<script setup>
	//imports
	import { useDark, useToggle  } from "@vueuse/core";
	import Trans from "../i18n/translate";
	import LangSwitcher from "./LangSwitcher.vue";
	import { reactive, ref } from 'vue'
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
				<div class="main">
					<RouterLink :to="Trans.i18nRoute({ name: 'home' })" class="logo">
					<span>work<span>it</span></span>
				</RouterLink>
				<nav>
						<ul>
							<li v-for="link in mainLinks">
								<RouterLink
									:key="link.id"
									:to="Trans.i18nRoute({ name: link.name })"
								>
									{{ $t(link.title) }}
								</RouterLink>
							</li>
						</ul>
				<i
					class="toggle-menu"
					:class="openIt ? 'fa-solid fa-circle-xmark' : 'fas fa-bars'"
					@click="openMenu"
				></i>
				<div class="mode">
					<span class="thumb" @click="toggleDark()">
						<span class="material-symbols-outlined modeBtn" v-if="isDark"> dark_mode </span>
						<span class="material-symbols-outlined modeBtn" v-if="!isDark"> light_mode </span>
					</span>
				</div>
				<LangSwitcher/>
			</nav>
				</div>
			<div class="tabletLinks">
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
			</div>
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
		.main {
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
				display: flex;
				align-items: center;
				justify-content: flex-end;
				ul {
					display: flex;
					@include tablet {
						display: none;
					}
					li {
						text-align: center;
						a {
							padding: 15px;
							display: block;
							font-size: 1.15rem;
							position: relative;
							color: getColor(t1);
						}
					}
					a.exActive,
					a:hover {
						color: getColor(act);
					}
				}
				.toggle-menu {
					color:getColor(t2);
					padding: 15px;
					font-size: 1.5rem;
					transition: all 0.3s;
					@include desktop {
						display: none;
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
					@include tablet {
						border-left: none;
					}
				}
				.modeBtn {
					font-size: 1.25rem;
					display: block;
					
				}
				
			}

			
		}
		.tabletLinks ul {
			display: none;
			overflow: hidden;
			@include tablet {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				width: 100%;
				transition: max-height 0.5s;
				&.disappear {
					max-height: 0;
				}
				&.appear {
					max-height: 500px;
					padding-bottom: 16px;

				}
				li {
					text-align: center;
					a {
						padding: 5px 20px;
						margin: 5px;
						border-radius: 10px;
						width: fit-content;
						display: block;
						font-size: 1.15rem;
						position: relative;
						color: getColor(t1);
					}
				}
				a.exActive,
				a:hover {
					background-color: getColor(bg3);;
					color: getColor(act);;
				}
			}
		}
	}
</style>
