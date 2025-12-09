<template>
  <div class="online-users" title="Online users" :class="{ 'online-users_active': count > 0 }">
    <svg :class="['online-users__icon', { 'online-users__icon_active': count > 0 }]" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      />
    </svg>
    <span class="online-users__count">{{ count }}</span>
  </div>
</template>

<script setup lang="ts">
import { useOnlineUsers } from '@/composables/useOnlineUsers';
const { count } = useOnlineUsers();
</script>

<style lang="scss">
.online-users {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--color-base-content-primary);
  font-weight: 600;
}

.online-users__icon {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

.online-users__icon_active {
  color: var(--color-status-success);
}
</style>
