import { createRouter, createWebHistory, RouterView } from "vue-router";
import LoginPage from "@/components/loginPage/LoginPage.vue";
import Trans from "../i18n/translate";
import { store } from "@/store.js";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:locale?",
			name: "home",
			component: RouterView,
			beforeEnter: Trans.routeMiddleware,
			children: [
				{
					path: "",
					redirect: {name: 'facebook'}
				},
				{
					path: "facebook",
					name: "facebook",
					component: LoginPage,
				},
				{
					path: "about",
					name: "about",
					component: () => import("@/views/AboutView.vue"),
				},
				{
					path: "multiForm",
					name: "multiForm",
					component: () => import("@/components/ecommerce/EMulti.vue"),
				},
				{
					path: "coffee",
					name: "coffeeShop",
					component: () => import("@/components/coffeeShop/CoffeeShop.vue"),
				},
				{
					path: "amazon",
					name: "amazon",
					component: () => import("@/components/amazon/AmazonForm.vue"),
				},
				{
					path: "protected",
					name: "private",
					component: () => import("@/components/loginPage/ProtectedPage.vue"),
					meta: { requiresAuth: true },
				},
			],
		},
		{
			path: "/:pathMatch(.*)*",
			name: "NotFound",
			component: () => import("@/views/NotFoundPage.vue"),

		},
	],
	linkActiveClass: "active",
	linkExactActiveClass: "exActive",
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		if (store.isAuthenticated) {
			next();
		} else {
			next({ name: "facebook" });
		}
	} else {
		next();
	}
});
export default router;
