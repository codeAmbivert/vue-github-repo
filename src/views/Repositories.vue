  <template>
    <main class="min-h-[100vh] w-full bg-[#010409] text-white p-5">
      <div class="flex justify-start">
        <router-link to="/" class="text:lg sm:text-xl text-blue-400">
          &lt;ALT/SOE/023/2353.&gt;
        </router-link>
      </div>
      <div class="min-h-[100vh] max-w-6xl mx-auto pt-20 w-full">
        <h2 class="font-semibold text-2xl">
          <span class="capitalize">Titilope Chisom&apos;s</span>
          repositories
        </h2>
        <div
          class="grid grid-cols-1 sm:flex sm:flex-wrap sm:justify-between sm:items-center w-full text-white mt-5 mb-8">
          <div class="max-w-2xl bg-[#0D1117] w-full p-2 border border-[#30363D] rounded-xl flex gap-2 items-center">
            <input type="text" name="search" v-model="search" placeholder="Search repositories"
              class="focus:outline-none p-1 px-4 w-full rounded-md border font-medium text-lg border-[#30363D] bg-[#0D1117] text-white" />
          </div>
          <button
            class="bg-[#292E36] h-full rounded-md p-1 flex justify-center items-center w-full sm:w-40 mt-4 sm:mt-5 ml-auto text-white text-center border font-medium sm:text-lg border-[#30363D] cursor-pointer"
            @click="openCreate = true">

            Create New Repo
          </button>
        </div>

        <div v-if="search.length < 1" class="mt-5 w-full">
          <div v-if="repos.length > 0" class="grid grid-cols-1 sm:grid-cols-2">
            <div v-for="(item, index) in repos" :key="item.id">
              <div v-if="index >= startIndex && index < endIndex"
                class="text-start border-2 border-[#30363D] p-3 rounded-lg m-3">
                <div class="flex gap-5 justify-between flex-wrap">
                  <router-link :to="`/repositories/${item.name}`"
                    class="text-blue-400 text-lg font-semibold hover:underline">
                    {{ item.name }}
                  </router-link>
                  <p class="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">
                    {{ item.visibility }}
                  </p>
                </div>
                <div class="mt-5 flex gap-5 items-center">
                  <p v-if="item.language">{{ item.language }}</p>

                  <div class="text-white flex items-center">
                    <img :src="forkIcon" alt="fork" class="h-4" />:
                    {{ item.forks_count }}
                  </div>
                  <div class="text-white flex items-center">
                    <img :src="starIcon" alt="fork" class="h-4" />:
                    {{ item.stargazers_count }}
                  </div>
                </div>
                <div class="flex gap-2 mt-4 font-medium">
                  <button class="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer" @click="() => {
                    openUpdate = true;
                    selectedRepo = item.name;
                  }">
                    Update
                  </button>
                  <button class="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                    @click="openDeleteModal(item.name)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center items-center w-full mt-5">
            <button disabled="currentPage === 1"
              class="p-2 px-4 border border-[#30363D]  rounded-tl-lg rounded-bl-lg cursor-pointer"
              @click="current.value = currentPage > 1 ? currentPage - 1 : currentPage">
              Prev
            </button>
            <div v-for="(item, i) in Array.from({ length: Math.ceil(repos.length / reposPerPage) })" :key="i">
              <button
                :class="['p-2', 'px-4', 'border', 'border-[#30363D]', (i + 1 === currentPage) ? 'bg-[#0D1117]' : '']"
                @click="currentPage = i + 1">
                {{ i + 1 }}
              </button>
            </div>
            <button :disabled="currentPage === Math.ceil(repos.length / reposPerPage)"
              class="p-2 px-4 border border-[#30363D] rounded-tr-lg rounded-br-lg cursor-pointer"
              @click="currentPage = currentPage + 1">
              Next
            </button>
          </div>
        </div>

        <div v-else class="mt-5 w-full">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div v-for="item in filteredRepos" :key="item.id">
              <div class=" text-start border-2 border-[#30363D] p-3 rounded-lg block mb-4">
                <div class="flex justify-between items-center">
                  <router-link :to="`/repositories/${item.name}`" class="text-blue-400 text-lg font-semibold">
                    {{ item.name }}
                  </router-link>

                  <p v-if="item.visibility" class="p-1 px-4 text-xs border border-[#30363D] rounded-full capitalize">
                    {{ item.visibility }}
                  </p>
                </div>
                <div class="mt-2 flex gap-5 items-center">
                  <p v-if="item.language">{item.language}</p>
                  <div class="text-white flex items-center">
                    <img :src="forkIcon" alt="fork" class="h-4 mr-1" />
                    {{ item.forks_count }}
                  </div>
                  <div class="text-white flex items-center">
                    <img :src="starIcon" alt="star" class="h-4 mr-1" />
                    {{ item.stargazers_count }}
                  </div>
                </div>
                <div class="flex gap-2 mt-4 font-medium">
                  <div class="text-white bg-blue-500 py-1 px-2 text-sm rounded-lg cursor-pointer" @click="() => {
                    openUpdate = true;
                    selectedRepo = item.name;
                  }">
                    Update
                  </div>
                  <div class="text-white bg-red-500 py-1 px-2 text-sm rounded-lg cursor-pointer"
                    @click="openDeleteModal(item.name)">

                    Delete
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UpdateRepoModal :open="openUpdate" :onClose="closeUpdate" :repo="selectedRepo" :updateRepo="resetSelectedRepo"
          :refreshRepos="getUserRepos" />
        <CreateRepoModal :open="openCreate" :onClose="closeCreate" :refreshRepos="getUserRepos" />
        <DeleteRepoModal :open="openDelete" :onClose="closeDelete" :repo="selectedRepo" :updateRepo="resetSelectedRepo"
          :refreshRepos="getUserRepos" />
      </div>
    </main>
  </template>

<script>
import axios from 'axios'
import { ref, watchEffect } from 'vue'
import forkIcon from "@/assets/images/code-fork-svgrepo-com.svg";
import starIcon from "@/assets/images/star-svgrepo-com.svg";
import CreateRepoModal from '@/components/CreateRepoModal.vue'
import UpdateRepoModal from '@/components/UpdateRepoModal.vue'
import DeleteRepoModal from '@/components/DeleteRepoModal.vue'

export default {
  name: 'RepositoriesPage',
  components: {
    CreateRepoModal,
    UpdateRepoModal,
    DeleteRepoModal,
  },

  setup() {
    const token = import.meta.env.VITE_GITHUB_TOKEN
    const repos = ref([])
    const selectedRepo = ref('')
    const search = ref('')
    const currentPage = ref(1)
    const openCreate = ref(false)
    const openUpdate = ref(false)
    const openDelete = ref(false)
    const loading = ref(true)
    const reposPerPage = 10
    const startIndex = ref(0);
    const endIndex = ref(reposPerPage);



    const getUserRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/codeAmbivert/repos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        repos.value = response.data
        loading.value = false
      } catch (error) {
        console.error(error)
        // Handle error
        loading.value = false
      }
    }

    watchEffect(() => {
      getUserRepos()
    })

    const openUpdateModal = (repoName) => {
      selectedRepo.value = repoName
      openUpdate.value = true
    }
    const openDeleteModal = (repoName) => {
      selectedRepo.value = repoName
      openDelete.value = true
    }

    const closeUpdate = () => {
      openUpdate.value = false
    }
    const closeCreate = () => {
      openCreate.value = false
    }
    const closeDelete = () => {
      openDelete.value = false
    }

    const resetSelectedRepo = () => {
      selectedRepo.value = ""
    }

    const filteredRepos = ref([])

    const paginatedRepos = ref([])

    const totalPages = ref(1)


    watchEffect(() => {
      startIndex.value = (currentPage.value - 1) * reposPerPage
      endIndex.value = startIndex.value + reposPerPage

      const filtered = repos.value.filter((repo) =>
        repo.name.toLowerCase().includes(search.value.toLowerCase())
      )
      filteredRepos.value = filtered

      const totalPagenations = Math.ceil(filtered.length / reposPerPage)
      totalPages.value = totalPagenations

      paginatedRepos.value = filtered.slice(startIndex, endIndex)
    })

    return {
      repos,
      selectedRepo,
      search,
      forkIcon,
      starIcon,
      currentPage,
      openCreate,
      openUpdate,
      openDelete,
      startIndex,
      endIndex,
      loading,
      reposPerPage,
      closeUpdate,
      closeCreate,
      openDeleteModal,
      resetSelectedRepo,
      closeDelete,
      getUserRepos,
      openUpdateModal,
      filteredRepos,
      paginatedRepos,
      totalPages
    }
  }
}
</script>
