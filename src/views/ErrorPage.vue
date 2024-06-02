<template>

  <main class="bg-[#010409] text-center">
    <div class="text-white min-h-[100vh] max-w-6xl mx-auto pt-20 p-5 w-full">

      <h1 class="text-4xl font-bold">
        What did you do!!???? You've definitely broken something.
      </h1>
      <h2 class="mt-5 text-2xl font-bold">
        Just kidding. 404 Error page not found
      </h2>

      <img :src="disconnectedImg" alt="error" class="mx-auto mt-5" />
      <p class="text-xl mt-10">Returning you to the homepage in {{ count }}</p>
    </div>
  </main>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import disconnectedImg from '../assets/images/disconnected.svg';

export default {
  name: "ErrorPage",
  setup() {
    const router = useRouter();
    const count = ref(10);

    const decrementCount = () => {
      if (count.value > 0) {
        count.value--;
      } else {
        router.push('/');
      }
    };

    let interval;
    onMounted(() => {
      interval = setInterval(decrementCount, 1000);
    });

    onUnmounted(() => {
      clearInterval(interval);
    });

    return {
      count,
      disconnectedImg
    };
  }
};
</script>