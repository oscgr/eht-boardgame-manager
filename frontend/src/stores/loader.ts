import { computed, ref } from 'vue'

const loading = ref(false)

const useLoader = () => {
  const setLoading = (value: boolean) => {
    if (value) {
      loading.value = value
    } else {
      setTimeout(() => {
        loading.value = value
      }, 200)
    }
  }

  const isLoading = computed(() => loading.value)
  return {
    setLoading,
    isLoading
  }
}

export default useLoader
