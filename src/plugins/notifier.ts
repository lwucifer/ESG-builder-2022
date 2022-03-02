import { EventBus } from './event-bus'

export const notifier = (message: string, isError = false) => {
  EventBus.$emit('ShowToastBase', { message, isError })
}
