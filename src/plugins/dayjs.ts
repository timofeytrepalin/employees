import dayjs from 'dayjs/esm';
import duration from 'dayjs/esm/plugin/duration';
import localizedFormat from 'dayjs/esm/plugin/localizedFormat';

export function install(): void {
  dayjs.extend(duration);
  dayjs.extend(localizedFormat);
}
