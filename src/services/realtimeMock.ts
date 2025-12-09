import { BehaviorSubject, interval } from 'rxjs';

const initial = 5;
export const onlineCount$ = new BehaviorSubject<number>(initial);

interval(2500).subscribe(() => {
  const current = onlineCount$.value;
  const change = Math.floor(Math.random() * 6) - 2;
  const next = current + change >= 0 ? current + change : 0;
  onlineCount$.next(next);
});

export default onlineCount$;
