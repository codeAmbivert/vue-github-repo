<template>
  <div v-if="open" class="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
    <div class="p-3 max-w-3xl w-full bg-white rounded-lg m-5">
      <img src="@/assets/images/close-svgrepo-com.svg" alt="close" class="ml-auto h-6 w-6 cursor-pointer"
        @click="closeModal" />
      <p class="text-center text-black mb-5 text-lg font-medium">
        Are you sure you want to delete {{ repo }} repository?
      </p>

      <div class="flex justify-center items-center gap-3">
        <button :class="{ 'cursor-not-allowed': loading }" :disabled="loading" @click="deleteRepo"
          class="text-white bg-blue-500 py-2 px-4 rounded-lg">
          Yes
          <div v-if="loading" class="absolute w-full h-full top-0 left-0 bg-white bg-opacity-45" />
        </button>
        <button class="text-white bg-red-500 py-2 px-4 rounded-lg" @click="closeModal">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default {
  props: {
    open: {
      type: Boolean,
      required: true
    },
    onClose: {
      type: Function,
      required: true
    },
    repo: {
      type: String,
      required: true
    },
    updateRepo: {
      type: Function,
      required: true
    },
    refreshRepos: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    // const currentPath = this.$route.path;

    const deleteRepo = async () => {
      loading.value = true;
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        await axios.delete(`https://api.github.com/repos/codeAmbivert/${props.repo}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert('Repo deleted successfully');
        if (route.path.includes('/repositories'))
          router.push("/")
        setTimeout(() => {
          props.refreshRepos();
          props.onClose(false);
          loading.value = false;
        }, 500);
      } catch (error) {
        loading.value = false;
        alert(error?.message);
      }
    };

    console.log(props.repo)

    const closeModal = () => {
      props.onClose();
      props.updateRepo('');
    };

    return {
      loading,
      deleteRepo,
      closeModal
    };
  }
};
</script>

