<template>
  <!-- <div class="min-h-[100vh] w-full bg-[#010409]">
    <div class="flex flex-col items-start gap-5">
        <router-link to="/" class="text:lg sm:text-xl text-blue-400">
          &lt;ALT/SOE/023/2353.&gt;
        </router-link>
      </div>
      <div class="min-h-[100vh] max-w-6xl mx-auto pt-20 w-full">
        <div class="w-full flex flex-col items-center">
          {user ? (
            <div class="w-full flex gap-5 mt-10">
              <div class="hidden sm:block w-1/4">
                <div class="w-full h-auto rounded-full border-2 border-[#31343A] overflow-hidden">
                  <img
                    src={user?.data?.avatar_url || githubLogo}
                    alt="user"
                    class="w-full h-auto"
                  />
                </div>
              </div>
              <div class="w-full border-2 border-[#30363D] rounded-xl p-5 text-white">
                <div class="flex justify-between items-center flex-wrap gap-5">
                  <div class="text-start flex gap-5">
                    <div class="h-16 w-16 block sm:hidden rounded-full border-2 border-[#31343A] overflow-hidden">
                      <img
                        src={user?.data?.avatar_url || githubLogo}
                        alt="user"
                        class="w-full h-auto"
                      />
                    </div>
                    <div>
                      <h1 class="font-semibold text-3xl">
                        {user?.data?.name}
                      </h1>
                      <p class="text-lg font-medium text-[#31343A]">
                        {user?.data?.login}
                      </p>
                    </div>
                  </div>
                  <div class="flex gap-5">
                    <div>Followers: {user?.data?.followers}</div>
                    <div>Following: {user?.data?.following}</div>
                  </div>
                </div>
                <div class="text-start mt-5 flex flex-col gap-2 text-[#656E76]">
                  <Link
                    to="repositories"
                    class="text-blue-400 font-medium"
                  >
                    Goto Repositories
                  </Link>
                  <p>
                    <span class="font-medium">Email:</span>{" "}
                    {user?.data?.email}
                  </p>
                  {user?.data?.bio && (
                    <p>
                      <span class="font-medium">Bio:</span>{" "}
                      {user?.data?.bio}
                    </p>
                  )}
                  {user?.data?.location && (
                    <p>
                      <span class="font-medium">Location:</span>{" "}
                      {user?.data?.location}
                    </p>
                  )}

                  <p>
                    <span class="font-medium">Public repositories:</span>{" "}
                    {user?.data?.public_repos}
                  </p>
                  {user?.data?.total_private_repos && (
                    <p>
                      <span class="font-medium">Private repositories:</span>{" "}
                      {user?.data?.total_private_repos}
                    </p>
                  )}

                  <router-link
                    to="/error-boundary"
                    class="text-blue-400 font-medium"
                  >
                    Error boundary page
                  </router-link>
                </div>
              </div>
            </div>
  </div> -->
  <div>Home</div>
</template>

<script>
import { ref, onMounted } from 'vue'
import githubLogo from '@/assets/githubLogo.svg'
import axios from 'axios'

export default {
  name: 'HomePage',
  data() {
    return {
      user: null,
      githubLogo: githubLogo,
      token: import.meta.env.VITE_GITHUB_TOKEN
    }
  },
  methods: {
    async getUserDetails() {
      try {
        const response = await axios.get(`https://api.github.com/users/codeAmbivert`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        this.user = response
      } catch (error) {
        console.log(error)
      }
      console.log(this.user)
    }
  },
  mounted() {
    this.getUserDetails()
  }
  // Your component options here
}
</script>
