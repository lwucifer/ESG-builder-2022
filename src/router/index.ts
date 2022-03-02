import { RouteItem } from '@/types/route-item'
import Vue from 'vue'
import VueRouter from 'vue-router'
import ManageFramework from '../modules/framework-builder/pages/manage-framework.vue'
import ManageJourney from '../modules/framework-builder/pages/manage-journey.vue'
import publishFramework from '../modules/framework-builder/pages/publish-framework.vue'
import AccountSettings from '../modules/settings/pages/account-settings.vue'
import FrameworkEditSettings from '../modules/framework-builder/pages/framework-edit-settings.vue'
import FrameworkEditDimensions from '../modules/framework-builder/pages/framework-edit-dimensions.vue'
import FrameworkEditStructure from '../modules/framework-builder/pages/framework-edit-structure.vue'
import FrameworkEditSelectPage from '../modules/framework-builder/pages/framework-edit-select-page.vue'
import FrameworkEditCustomizePage from '../modules/framework-builder/pages/framework-edit-customize-page.vue'
import FrameworkEditPreview from '../modules/framework-builder/pages/framework-edit-preview.vue'
import AuthSignin from '@/modules/authentication/pages/signin.vue'
import AuthForgotPassword from '@/modules/authentication/pages/forgot-password.vue'

Vue.use(VueRouter)

export const Routes = {
  home: {
    path: '/',
    name: 'Default',
    redirect: {
      name: 'loginSignin'
    }
  },
  //#endregion
  //#region Manage Framework
  globalParameter: {
    path: '/global-parameter',
    name: 'GlobalParameter',
    component: ManageFramework,
    meta: {
      layout: 'Default',
      isAuth: true
    }
  },
  editFrameworkSettings: {
    path: '/framework-edit/settings',
    name: 'FrameworkEditSettings',
    component: FrameworkEditSettings,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  editFrameworkDimensions: {
    path: '/framework-edit/dimensions',
    name: 'FrameworkEditDimensions',
    component: FrameworkEditDimensions,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  editFrameworkStructure: {
    path: '/framework-edit/structure',
    name: 'FrameworkEditStructure',
    component: FrameworkEditStructure,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  editFrameworkSelectPage: {
    path: '/framework-edit/select-page',
    name: 'FrameworkEditSelectPage',
    component: FrameworkEditSelectPage,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  editFrameworkCustomizePage: {
    path: '/framework-edit/customize-page',
    name: 'FrameworkEditCustomizePage',
    component: FrameworkEditCustomizePage,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  editFrameworkPreview: {
    path: '/framework-edit/Preview',
    name: 'FrameworkEditPreview',
    component: FrameworkEditPreview,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  //#endregion
  manageJourney: {
    path: '/manage-journey',
    name: 'ManageJourney',
    component: ManageJourney,
    meta: {
      isAuth: true
    }
  },
  publishFramework: {
    path: '/home',
    name: 'Home',
    component: publishFramework,
    meta: {
      isAuth: true
    }
  },
  editFrameworkManageFramework: {
    path: '/framework-edit',
    name: 'editFrameworkManageFramework',
    component: ManageJourney,
    meta: {
      layout: 'FrameworkEdit',
      isAuth: true
    }
  },
  accountSettings: {
    path: '/account-settings',
    name: 'AccountSettings',
    component: AccountSettings,
    meta: {
      isAuth: true
    }
  },
  //#region Authentication
  login: {
    path: '/login',
    name: 'loginSignin',
    component: AuthSignin,
    meta: {
      layout: 'Login'
    }
  },
  forgot: {
    path: '/forgot',
    name: 'loginForgot',
    component: AuthForgotPassword,
    meta: {
      layout: 'Login'
    }
  }
}

export const routes = (): RouteItem[] => {
  const rt: RouteItem[] = []
  for (const vl of Object.values(Routes)) {
    rt.push(vl as RouteItem)
  }
  return rt
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes()
})

export default router
