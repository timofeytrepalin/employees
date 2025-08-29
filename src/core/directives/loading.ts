import type { Directive, DirectiveBinding } from 'vue'

const loading: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    createLoadingElement(el, binding.value)
  },
  updated(el: HTMLElement, binding: DirectiveBinding<boolean>) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        createLoadingElement(el, true)
      } else {
        removeLoadingElement(el)
      }
    }
  },
  unmounted(el: HTMLElement) {
    removeLoadingElement(el)
  }
}

function createLoadingElement(el: HTMLElement, isLoading: boolean) {
  if (!isLoading) return
  
  const spinner = document.createElement('div')
  spinner.className = 'v-loading-spinner'
  spinner.innerHTML = `
    <div class="v-loading-spinner__inner">
      <div class="v-loading-spinner__circle"></div>
      <div class="v-loading-spinner__text">Загрузка...</div>
    </div>
  `  
  el.style.position = 'relative'  
  el.dataset.loadingId = 'loading-' + Math.random().toString(36).substr(2, 9)
  spinner.id = el.dataset.loadingId
  el.appendChild(spinner)
}

function removeLoadingElement(el: HTMLElement) {
  const loadingId = el.dataset.loadingId
  if (loadingId) {
    const spinner = el.querySelector(`#${loadingId}`)
    if (spinner) {
      el.removeChild(spinner)
    }
    delete el.dataset.loadingId
  }
}

export default loading