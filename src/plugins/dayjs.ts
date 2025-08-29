import dayjs from 'dayjs/esm';
import duration from 'dayjs/esm/plugin/duration';
import localizedFormat from "dayjs/esm/plugin/localizedFormat";

import type { App } from 'vue';

export function install<T>(_app: App<T>):void {
  dayjs.extend(duration);
  dayjs.extend(localizedFormat);
}