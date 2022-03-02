import Economic from '@/common/components/icons/economic.vue'
import Environment from '@/common/components/icons/environment.vue'
import Globe from '@/common/components/icons/globe.vue'
import Activity from '@/common/components/icons/activity.vue'
import Users from '@/common/components/icons/users.vue'
import Building from '@/common/components/icons/building.vue'
import Leadership from '@/common/components/icons/leadership.vue'
import Fuel from '@/common/components/icons/fuel.vue'
import Bank from '@/common/components/icons/bank.vue'
import Books from '@/common/components/icons/books.vue'
import Sun from '@/common/components/icons/sun.vue'
import Airplane from '@/common/components/icons/airplane.vue'
import Shipping from '@/common/components/icons/shipping.vue'
import Education from '@/common/components/icons/education.vue'
import Hospital from '@/common/components/icons/hospital.vue'
import PieChart from '@/common/components/icons/pie-chart.vue'
import Time from '@/common/components/icons/time.vue'
import Calendar from '@/common/components/icons/calendar.vue'
import Custom from '@/common/components/icons/custom.vue'

export const iconList = [
  {
    id: 2,
    icon: 'mdi-earth',
    text: 'Globe',
    color: 'orange'
  },
  {
    id: 3,
    icon: 'mdi-users',
    text: 'Human',
    color: 'red'
  },
  {
    id: 1,
    icon: 'mdi-leaf',
    text: 'Leaf',
    color: 'green'
  },
  {
    id: 4,
    icon: 'mdi-building',
    text: 'Building',
    color: 'pink'
  },
  {
    id: 5,
    icon: 'mdi-leadership',
    text: 'Leader',
    color: 'blue'
  },
  {
    id: 6,
    icon: 'mdi-custom',
    text: 'Add custom',
    color: 'skyblue'
  },
  {
    id: 7,
    icon: 'mdi-calendar',
    text: 'Calendar',
    color: 'grey1'
  },
  {
    id: 8,
    icon: 'mdi-time',
    text: 'Time',
    color: 'grey1'
  },
  {
    id: 10,
    icon: 'mdi-piechart',
    text: 'Pie chart',
    color: 'grey1'
  },
  {
    id: 11,
    icon: 'mdi-activity',
    text: 'Chart',
    color: 'grey1'
  },
  {
    id: 12,
    icon: 'mdi-hospital',
    text: 'Hospital',
    color: 'grey1'
  },
  {
    id: 13,
    icon: 'mdi-education',
    text: 'Education',
    color: 'grey1'
  },
  {
    id: 14,
    icon: 'mdi-shipping',
    text: 'Shipping',
    color: 'grey1'
  },
  {
    id: 15,
    icon: 'mdi-airplane',
    text: 'Airplane',
    color: 'grey1'
  },
  {
    id: 16,
    icon: 'mdi-sun',
    text: 'Sun',
    color: 'grey1'
  },
  {
    id: 17,
    icon: 'mdi-books',
    text: 'Books',
    color: 'grey1'
  },
  {
    id: 18,
    icon: 'mdi-bank',
    text: 'Bank',
    color: 'grey1'
  },
  {
    id: 19,
    icon: 'mdi-fuel',
    text: 'Fuel',
    color: 'grey1'
  }
]

export const colorList = [
  {
    id: 1,
    color: '#0246B1',
    background: '#EFF5FF',
    text: 'blue'
  },
  {
    id: 2,
    color: '#E11900',
    background: '#fff1ef',
    text: 'red'
  },
  {
    id: 3,
    color: '#6e2a6e',
    background: '#F6D9F6',
    text: 'pink'
  },
  {
    id: 4,
    color: '#478f61',
    background: '#E3FCFF',
    text: 'green'
  },
  {
    id: 6,
    color: '#00C3C3',
    background: '#CCFFFF',
    text: 'cyan'
  },
  {
    id: 8,
    color: '#249CA4',
    background: '#E4FDFF',
    text: 'seaGreen'
  },
  {
    id: 9,
    color: '#2C2C2E',
    background: '#F3F3F8',
    text: 'grey'
  }
]

export const themeIcons = {
  'mdi-leaf': Environment,
  'mdi-earth': Globe,
  'mdi-chart': Economic,
  'mdi-users': Users,
  'mdi-activity': Activity,
  'mdi-building': Building,
  'mdi-leadership': Leadership,
  'mdi-fuel': Fuel,
  'mdi-bank': Bank,
  'mdi-books': Books,
  'mdi-sun': Sun,
  'mdi-airplane': Airplane,
  'mdi-shipping': Shipping,
  'mdi-education': Education,
  'mdi-hospital': Hospital,
  'mdi-piechart': PieChart,
  'mdi-time': Time,
  'mdi-calendar': Calendar,
  'mdi-custom': Custom
}

export const themeColors = {
  blue: {
    card: '#EFF5FF',
    progress: '#0246B1',
    text: '#0246B1'
  },
  green: {
    card: '#E8FCE8',
    progress: '#01AA30',
    text: '#01AA30'
  },
  cyan: {
    card: '#CCFFFF',
    progress: '#00C3C3',
    text: '#00C3C3'
  },
  yellow: {
    card: '#FFF2D7',
    progress: '#FFAB00',
    text: '#FFAB00'
  },
  orange: {
    card: '#FFF2D7',
    progress: '#FFAB00',
    text: '#FFAB00'
  },
  pink: {
    card: '#F6D9F6',
    progress: '#6E2A6E',
    text: '#6E2A6E'
  },
  red: {
    card: '#fff1ef',
    progress: '#E11900',
    text: '#E11900'
  },
  brown: {
    card: '#FFF2D7',
    progress: '#8F6A09',
    text: '#8F6A09'
  },
  seaGreen: {
    card: '#E4FDFF',
    progress: '#249CA4',
    text: '#249CA4'
  },
  steelBlue: {
    card: '#EFF5FF',
    progress: '#4682B4',
    text: '#4682B4'
  },
  grey: {
    card: '#F3F3F8',
    progress: '#2C2C2E',
    text: '#2C2C2E'
  },
  gray: {
    card: '#F3F3F8',
    progress: '#2C2C2E',
    text: '#2C2C2E'
  }
}
