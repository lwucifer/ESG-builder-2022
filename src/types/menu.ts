import { RouteItem } from './route-item'

export type NavButton = {
  title: string
  click: (route: Partial<RouteItem>) => void
  style: string
}
export type MenuItem = {
  route: Partial<RouteItem>
  menuKey: string
  title: string
  children?: Partial<MenuItem>[]
  hidden: boolean
  disabled: boolean
  click?: (route: Partial<RouteItem>) => void
  workflowStatus: string
  navButtons?: Partial<NavButton>[]
}
