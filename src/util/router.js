import Vue from "vue";
import Router from "vue-router";
import { router as userRouter } from "@/components/user/router.js";
import { router as systemRouter } from "@/components/system/router.js";
import { router as serviceRouter } from "@/components/service/router.js";
import { router as formRouter } from "@/components/form/router.js";
import { router as triggerRouter } from "@/components/trigger/router.js";
import { router as viewRouter } from "@/components/view/router.js";
import { router as appRouter } from "@/components/application/router.js";
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            redirect: "/login"
        },
        ...userRouter,
        ...systemRouter,
        ...serviceRouter,
        ...formRouter,
        ...triggerRouter,
        ...viewRouter,
        ...appRouter
    ]
});
