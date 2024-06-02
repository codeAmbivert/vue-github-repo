<template>
  <main class="p-5">

    <div v-if="hasError">
      <!-- Error message or fallback UI -->
      <h1 class="text-2xl font-semibold">An error occurred. Please try again later.</h1>
    </div>
    <div v-else>
      <!-- Render children -->
      <slot></slot>
    </div>

    <p class="mt-20">To test error boundary click on the toggle button</p>

    <button @click="hasError = !hasError" class="text-white bg-blue-500 py-2 px-4 text-sm rounded-lg cursor-pointer mt-3">
      Toggle</button>
  </main>
</template>

<script>
export default {
  data() {
    return {
      hasError: false
    };
  },
  errorCaptured(error, vm, info) {
    // Display fallback UI
    this.hasError = true;
    // Log the error
    console.error('Error captured in error boundary:', error, vm, info);
    // Prevent the error from propagating further
    return false;
  }
};
</script>
