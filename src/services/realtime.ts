import { Observable } from 'rxjs';
import { onlineCount$ as mockOnlineCount$ } from './realtimeMock';

export function onOnlineCount(): Observable<number> {
  return mockOnlineCount$ as Observable<number>;
}

export default {
  onOnlineCount,
};
