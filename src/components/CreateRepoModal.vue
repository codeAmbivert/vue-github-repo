<template>
  <div v-if="open" class="fixed top-0 left-0 h-full w-full bg-white bg-opacity-50 flex justify-center items-center">
    <div class="p-3 max-w-3xl w-full bg-white rounded-lg m-5">
      <!-- <ToastContainer /> -->
      <img src="@/assets/images/close-svgrepo-com.svg" alt="close" class="ml-auto h-6 w-6 cursor-pointer"
        @click="() => { onClose() }" />

      <div class="flex flex-col justify-center items-center gap-3 mt-5">
        <div
          class="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
          <input type="text" v-model="formData.name" placeholder="Input repository name"
            class="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white" />
        </div>
        <div
          class="max-w-2xl min-w-72 bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
          <input type="text" v-model="formData.description" placeholder="Input repository description"
            class="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white" />
        </div>

        <button
          :class="['relative overflow-hidden bg-[#0D1117] mt-5 h-full rounded-md p-1 w-40 text-white text-center border font-medium text-lg border-[#30363D]', disable ? 'cursor-not-allowed' : 'cursor-pointer']"
          :disabled="disable" @click="handleCreateRepo">
          Create Repo
          <div v-if="loading || disable" class="absolute w-full h-full top-0 left-0 bg-white bg-opacity-45"></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import axios from 'axios';
// import { ToastContainer, toast } from 'vue-toastification';
// import 'vue-toastification/dist/index.css';

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
    refreshRepos: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const formData = ref({ name: '', description: '' });
    const loading = ref(false);

    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const disable = computed(() => !formData.value.name || !formData.value.description);

    const handleInput = (e) => {
      const { name, value } = e.target;
      formData.value[name] = value;
    };

    const handleCreateRepo = async () => {
      loading.value = true;
      try {
        await axios.post(`https://api.github.com/user/repos`, formData.value, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        alert("Repository created successfully");
        setTimeout(() => {
          props.refreshRepos();
          props.onClose();
          loading.value = false;
          formData.value = { name: '', description: '' };
        }, 500);
      } catch (error) {
        alert(error?.message);
        loading.value = false;
      }
      console.log(formData)
    };

    return {
      formData,
      loading,
      disable,
      handleInput,
      handleCreateRepo
    };
  },
  // components: {
  //   ToastContainer
  // }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
