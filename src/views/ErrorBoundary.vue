<template>
  <ErrorBoundary>
    <main class="text-2xl font-semibold">Hello there 👋</main>
  </ErrorBoundary>
</template>



<script>
import ErrorBoundary from "../components/ErrorBoundary.vue"


export default {
  name: "ErrorBoundaryPage",
  components: {
    ErrorBoundary,
  },

};
</script>