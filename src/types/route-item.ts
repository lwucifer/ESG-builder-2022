import { VueConstructor } from 'vue'
import { TodoFixMe } from './common'
type RouteMeta = {
  layout: string //'Default' | 'Blank' | 'FrameworkEdit'
  isAuth?: boolean
}
export type RouteItem = {
  path: string
  name: string
  component: VueConstructor<Vue>
  redirect: Partial<RouteItem>
  meta?: RouteMeta
  children?: TodoFixMe
}
