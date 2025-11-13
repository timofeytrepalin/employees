<template>
  <div class="cosmic-diamonds-component">
    <div class="cosmic-diamonds" :data-theme="currentTheme">
      <div class="crisp-stars" ref="crispStars"></div>
      <div class="star-clusters" :data-theme="currentTheme">
        <div class="star-cluster cluster-1">
          <div class="cluster-star size-m" :data-theme="currentTheme"></div>
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
          <div class="cluster-star size-m" :data-theme="currentTheme"></div>
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
          <div class="cluster-star size-l" :data-theme="currentTheme"></div>
        </div>
        <div class="star-cluster cluster-2">
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
          <div class="cluster-star size-m" :data-theme="currentTheme"></div>
          <div class="cluster-star size-m" :data-theme="currentTheme"></div>
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
          <div class="cluster-star size-l" :data-theme="currentTheme"></div>
          <div class="cluster-star size-s" :data-theme="currentTheme"></div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useSettings } from '@/stores/settings';

const settingsStore = useSettings();
const crispStars = ref<HTMLElement>();

const currentTheme = computed(() => settingsStore.appTheme);

onMounted(() => {
  createCrispStars();
});

const createCrispStars = () => {
  if (!crispStars.value) return;

  const starCount = 350;
  const sizes = ['size-1', 'size-2', 'size-3', 'size-4'];
  const colors = ['diamond-white', 'diamond-blue', 'diamond-purple', 'diamond-ice'];

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];

    star.className = `crisp-star ${size} ${color}`;
    star.setAttribute('data-theme', currentTheme.value);
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
    star.style.setProperty('--delay', `${Math.random() * 6}s`);

    crispStars.value.appendChild(star);
  }
};
</script>
