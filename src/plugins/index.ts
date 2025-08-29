import { notificationPlugin } from './notification';
import {install as dayJsinstall} from './dayjs'

import type { App } from 'vue';

export default function installPlugins<T>(app: App<T>): void {
  notificationPlugin.install(app);
  dayJsinstall(app)
}