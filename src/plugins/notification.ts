import { h, render } from 'vue';
import type { App, VNode } from 'vue';
import Notification from '@/core/components/ui/Notification/Notification.vue';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface NotificationOptions {
  message: string;
  title?: string;
  type?: NotificationType;
  duration?: number;
  onClose?: () => void;
  icon?: string;
}

type NotificationProps = NotificationOptions;

const notificationQueue: VNode[] = [];

export const notificationPlugin = {
  install(app: App): void {
    let notificationContainer: HTMLDivElement | null = null;

    if (typeof window !== 'undefined') {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      document.body.appendChild(notificationContainer);
    }

    const showNotification = (options: NotificationOptions) => {
      if (!notificationContainer) {
        console.warn('Notification container is not available.');
        return;
      }

      const container = document.createElement('div');

      const props: NotificationProps = {
        message: options.message,
        title: options.title,
        type: options.type,
        duration: options.duration,
        icon: options.icon,
        onClose: () => {
          render(null, container);
          container.remove();
          const index = notificationQueue.indexOf(vnode);
          if (index !== -1) {
            notificationQueue.splice(index, 1);
          }
          if (options.onClose) {
            options.onClose();
          }
        },
      };

      const vnode = h(Notification as any, props);

      render(vnode, container);
      notificationContainer.appendChild(container);
      notificationQueue.push(vnode);

      if (options.duration && options.duration > 0) {
        setTimeout(() => {
          const index = notificationQueue.indexOf(vnode);
          if (index !== -1) {
            render(null, container);
            container.remove();
            notificationQueue.splice(index, 1);
            if (options.onClose) {
              options.onClose();
            }
          }
        }, options.duration);
      }
    };

    app.config.globalProperties.$notify = showNotification;
    app.provide('notify', showNotification);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: (options: NotificationOptions) => void;
  }
}
