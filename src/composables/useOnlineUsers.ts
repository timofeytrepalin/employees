import { ref, onUnmounted } from 'vue';
import type { Subscription } from 'rxjs';
import { onOnlineCount } from '@/services/realtime';

export function useOnlineUsers() {
  const count = ref<number>(0);
  const sub: Subscription = onOnlineCount().subscribe((v) => {
    count.value = v;
  });

  onUnmounted(() => {
    sub.unsubscribe();
  });

  return { count };
}

export default useOnlineUsers;
