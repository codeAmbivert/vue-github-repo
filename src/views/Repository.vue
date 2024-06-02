<template>
  <div v-if="id" class="min-h-screen w-full bg-[#010409] p-5">
    <div class="flex justify-between">
      <router-link to="/" class="text-lg sm:text-xl text-blue-400">&lt;ALT/SOE/023/2353.&gt;</router-link>
    </div>
    <div class="min-h-screen max-w-6xl mx-auto pt-20 w-full">
      <div class="w-full flex gap-5 mt-10">
        <div class="hidden sm:block w-1/4">
          <div class="w-full h-auto rounded-full border-2 border-[#31343A] overflow-hidden">
            <img :src="repo?.owner?.avatar_url || githubLogo" alt="user" class="w-full h-auto" />
          </div>
        </div>
        <div class="w-full border-2 border-[#30363D] rounded-xl p-5 text-white">
          <div class="flex justify-between items-center flex-wrap gap-5">
            <div class="text-start flex gap-5">
              <div class="h-16 w-16 block sm:hidden rounded-full border-2 border-[#31343A] overflow-hidden">
                <img :src="repo?.owner?.avatar_url || githubLogo" alt="user" class="w-full h-auto" />
              </div>
              <div>
                <h1 class="font-semibold text-3xl">Titilope Chisom</h1>
                <p class="text-lg font-medium text-[#31343A]">{{ repo?.owner?.login }}</p>
              </div>
            </div>
          </div>
          <div class="text-start mt-5 flex flex-col gap-2 text-[#656E76]">
            <router-link to="/repositories" class="text-blue-400 font-medium">Goto Repositories</router-link>
            <p><span class="font-medium">Email:</span> titilopechisom20@gmail.com</p>
            <a :href="repo?.html_url" target="_blank"
              :style="{ wordBreak: 'break-word', overflowWrap: 'break-word' }"><span class="font-medium">Repo Github
                link:</span> {{ repo?.html_url }}</a>
          </div>
        </div>
      </div>
      <div class="text-start border-2 border-[#30363D] p-3 rounded-lg block mb-4 mt-5 text-white">
        <div class="flex justify-between items-center">
          <router-link :to="repo?.html_url" class="text-blue-400 text-lg font-semibold">{{ repo?.name }}</router-link>
          <p v-if="repo?.visibility" class="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">{{
            repo?.visibility }}</p>
        </div>
        <p>Date created: {{ new Date(repo?.created_at).toLocaleDateString() }}</p>
        <p>Date updated: {{ new Date(repo?.updated_at).toLocaleDateString() }}</p>
        <p>Date pushed: {{ new Date(repo?.pushed_at).toLocaleDateString() }}</p>
        <div class="mt-2 flex gap-5 items-center">
          <p v-if="repo?.language">{{ repo?.language }}</p>
          <div class="text-white flex items-center">
            <img :src="forkIcon" alt="fork" class="h-4 mr-1" /> {{ repo?.forks_count }}
          </div>
          <div class="text-white flex items-center">
            <img :src="starIcon" alt="star" class="h-4 mr-1" /> {{ repo?.stargazers_count }}
          </div>
        </div>
        <div class="flex gap-2 mt-4 font-medium">
          <div @click="openUpdateModal" class="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer">
            Update</div>
          <div @click="openDeleteModal" class="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer">Delete
          </div>
        </div>
      </div>
    </div>
    <DeleteRepoModal v-if="openDelete" :open="openDelete" :onClose="closeDelete" :repo="selectedRepo"
      :updateRepo="resetSelectedRepo" :refreshRepos="getRepo" />
    <UpdateRepoModal v-if="openUpdate" :open="openUpdate" :onClose="closeUpdate" :repo="selectedRepo"
      :updateRepo="resetSelectedRepo" :refreshRepos="getRepo" />
  </div>
</template>

<script>
import axios from 'axios';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import DeleteRepoModal from '../components/DeleteRepoModal.vue';
import UpdateRepoModal from '../components/UpdateRepoModal.vue';
import githubLogo from "@/assets/images/githubLogo.svg";
import forkIcon from "@/assets/images/code-fork-svgrepo-com.svg";
import starIcon from "@/assets/images/star-svgrepo-com.svg";

export default {
  name: "RepositoryPage",
  components: {
    DeleteRepoModal,
    UpdateRepoModal
  },
  setup() {
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const route = useRoute();
    const id = route.params.id;
    const repo = ref({});
    const openUpdate = ref(false);
    const openDelete = ref(false);
    const selectedRepo = ref("");

    const getRepo = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `https://api.github.com/repos/codeAmbivert/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          repo.value = response?.data;
          console.log(response?.data)
        } catch (error) {
          alert(error?.message);
        }
      }
    };

    watchEffect(() => {
      getRepo()
    })

    const openUpdateModal = () => {
      openUpdate.value = true;
      selectedRepo.value = repo.value?.name;
    };

    const closeUpdate = () => {
      openUpdate.value = false
    }

    const openDeleteModal = () => {
      openDelete.value = true;
      selectedRepo.value = repo.value?.name;
    };

    const closeDelete = () => {
      openDelete.value = false
    }


    const resetSelectedRepo = () => {
      selectedRepo.value = ""
    }

    return {
      id,
      repo,
      forkIcon,
      starIcon,
      githubLogo,
      openUpdate,
      openDelete,
      selectedRepo,
      getRepo,
      openUpdateModal,
      closeUpdate,
      openDeleteModal,
      closeDelete,
      resetSelectedRepo
    };
  }
};
</script>
