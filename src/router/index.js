import { createRouter, createWebHistory, RouterView } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Trans from "../i18n/translate";
import { store } from "@/store.js";
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/:locale?",
			component: RouterView,
			beforeEnter: Trans.routeMiddleware,
			children: [
				{
					path: "",
					name: "home",
					component: HomeView,
				},
				{
					path: "login",
					name: "facebook",
					component: () => import("@/components/loginPage/LoginPage.vue")
				},
				{
					path: "multiForm",
					name: "multiForm",
					component: () => import("@/components/ecommerce/EMulti.vue")
				},
				{ 
					path: 'protected', 
					name: "private",
					component: () => import("@/components/loginPage/ProtectedPage.vue"), 
					meta: { requiresAuth: true } },
			],
		},
	],
	linkActiveClass: "active",
	linkExactActiveClass: "exActive",
});

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (store.isAuthenticated) {
			next();
		} else {
			next({ name: 'facebook' });
		}
	} else {
		next();
	}
});
export default router;
