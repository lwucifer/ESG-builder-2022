import { Routes } from '@/router'
import { MenuItem } from '@/types/menu'
import { RouteItem } from '@/types/route-item'

export const editFrameworkMenuItems = {
  manageFramework: {
    route: Routes.editFrameworkSettings,
    menuKey: 'manageFramework_parent',
    title: 'Manage Framework',
    workflowStatus: 'editFrameworkManageFramework',
    children: {
      manageFrameworkSettings: {
        route: Routes.editFrameworkSettings,
        menuKey: 'manageFramework_children-settings',
        title: 'Settings',
        workflowStatus: 'manageFrameworkSettings'
      },
      manageFrameworkDimensions: {
        route: Routes.editFrameworkDimensions,
        menuKey: 'manageFramework_children-dimensions',
        title: 'Dimensions',
        workflowStatus: 'manageFrameworkSettings'
      },
      manageFrameworkStructure: {
        route: Routes.editFrameworkStructure,
        menuKey: 'manageFramework_children-structure',
        title: 'Structure',
        workflowStatus: 'manageFrameworkSettings'
      },
      manageFrameworkSelectedPages: {
        route: Routes.editFrameworkSelectPage,
        menuKey: 'manageFramework_children-customize-pages',
        title: 'Select Pages',
        workflowStatus: 'manageFrameworkSettings'
      },
      manageFrameworkCustomisePages: {
        route: Routes.editFrameworkCustomizePage,
        menuKey: 'manageFramework_children-customise-pages',
        title: 'Customise Pages',
        workflowStatus: 'manageFrameworkSettings'
      }
    },
    navButtons: [
      {
        title: 'Back',
        click: (item: Partial<RouteItem>): void => {
          console.log(item)
        }
      }
    ]
  },

  manageJourney: {
    route: Routes.editFrameworkPreview,
    menuKey: 'manageJourney_parent',
    title: 'Manage Journey',
    workflowStatus: 'manageJourney',
    navButtons: [
      {
        title: 'Exit',
        click: (item: Partial<RouteItem>): void => {
          console.log(item)
        }
      }
    ],
    children: {
      manageJourneyPreview: {
        route: Routes.editFrameworkPreview,
        menuKey: 'manageJourney_children-preview',
        title: 'Preview',
        workflowStatus: 'manageJourneyPreview'
      }
    }
  }
}

export const menuItems = (): Partial<MenuItem>[] => {
  const rt: Partial<MenuItem>[] = []
  const items = Object.values(editFrameworkMenuItems)
  items.forEach((item) => {
    const rtChild: Partial<MenuItem>[] = []
    if (item?.children) {
      const children = Object.values(item?.children)
      children.forEach((child) => {
        rtChild.push(child)
      })
    }
    const { route, menuKey, navButtons, title, workflowStatus } = item
    rt.push({
      ...route,
      menuKey,
      navButtons,
      title,
      workflowStatus,
      children: rtChild
    })
  })
  return rt
}
