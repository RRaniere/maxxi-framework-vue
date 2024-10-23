<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref, shallowRef, onMounted } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import Node from '@/views/network/Node.vue';
import { fetchNetwork} from '@/services/network/networkService';

const page = ref({ title: 'Network' });
const breadcrumbs = shallowRef([{ title: 'Network', disabled: true, href: '#' }]);

const authStore = useAuthStore();

const count = ref<{ left: number; right: number }>({
  left: 0,
  right: 0,
});
const treeData = ref<Array<{ [position: string]: any }> | null>(null);
const searchValue = ref("");
const notFound = ref(false);
const loading = ref(true);  
const hasTree = ref(false);  
const progressSize = ref(512);
const treeContainer = ref(null);




async function search(username: string) { 


    searchValue.value = username

    if(searchValue.value == '') { 
        username = authStore.user.user.username
    } 

    if(searchValue.value == authStore.user.user.username) { 
        searchValue.value = ''
    } 
    try {
        loading.value = true;
        hasTree.value = false;
        const response = await fetchNetwork(username);
        if (response.status) {

            treeData.value = response.network;
            count.value.left = response.count.left 
            count.value.right = response.count.right

            hasTree.value = true;
            loading.value = false;
            
            return true
        } 

        notFound.value = true

        handleSearch( authStore.user.user.username)

        
    } catch (err) {
        return false
    }


}

async function handleSearch(username: string) {
    
    await search(username);
    updateProgressSize();

}


async function handleInformations(username:string) { 
    return true
}

function updateProgressSize() {

    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        progressSize.value = 200;
    } else if (screenWidth <= 960) {
        progressSize.value = 300;
    } else {
        progressSize.value = 512; 
    }

    const treeContainer = document.querySelector('.tree-container');
    if (treeContainer) {
        const scrollWidth = treeContainer.scrollWidth; 
        const clientWidth = treeContainer.clientWidth; 
        const scrollTo = (scrollWidth - clientWidth) / 2;
        treeContainer.scrollLeft = scrollTo; 
    }
}

onMounted(async () => {
    await handleSearch(authStore.user.user.username); 
    window.addEventListener('resize', updateProgressSize);
    
});


import './styles/base.css';

</script>


<template>

    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <v-snackbar color="error" variant="flat" rounded="md" location="top right" v-model="notFound">
        User not found.
    </v-snackbar>

    <div v-if="loading" class="loader-container">
            <v-progress-circular
                aria-label="circular progressbar"
                :size=progressSize
                indeterminate
                color="primary"
                bg-opacity="1"
                bg-color="borderLight"
            >
            </v-progress-circular>
        </div>
    
    <div v-if="!loading">
        <v-row>
            <v-col cols="9" sm="10" md="10" lg="10">
                <v-text-field
                variant="outlined"
                single-line
                color="primary"
                density="comfortable"
                :placeholder = "searchValue"
                v-model="searchValue"
                @keyup.enter="handleSearch(searchValue)"

                >
                </v-text-field>
            </v-col>
            <v-col cols="3" sm="2" md="2" lg="2">
                <v-btn
                    color="primary"
                    block
                    class="d-block"
                    rounded="md"
                    size="large"
                    @click="handleSearch(searchValue)"
                >
                    Search
                </v-btn>
            </v-col>
        </v-row>

        <v-row class="justify-space-around">
            <v-col cols="12" sm="12" md="6" lg="3">
                <v-card elevation="0" rounded="lg">
                    <v-card variant="outlined" rounded="lg">
                        <v-card-text>
                            <div class="d-flex align-items-center justify-space-between">
                            <div>
                                <h4 class="text-h4">Left Side: </h4>
                            </div>
                            <span class="d-flex align-center">
                                <h4 class="text-h4 text-success">{{ count.left }}</h4>
                            </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-col>
            <v-col cols="12" sm="12" md="6" lg="3">
                <v-card elevation="0" rounded="lg">
                    <v-card variant="outlined" rounded="lg">
                        <v-card-text>
                            <div class="d-flex align-items-center justify-space-between">
                            <div>
                                <h4 class="text-h4">Right Side: </h4>
                            </div>
                            <span class="d-flex align-center">
                                <h4 class="text-h4 text-success">{{ count.right }}</h4>
                            </span>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </div>

   
    <div v-if="!loading && hasTree" class="tree-container" style="width: 100%; overflow-x: auto;" ref="treeContainer">
        <div class="tree d-flex justify-center" style="min-width: 1500px;" >
            <ul>
                <li>
                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                    :root="true"
                    :username="treeData[0][1]?.username ?? undefined"
                    :parentUsername="treeData[0][1]?.parent_username ?? undefined"
                    :sponsorUsername="treeData[0][1]?.sponsor_username ?? undefined"
                    :level="treeData[0][1]?.level ?? undefined"
                    :position="treeData[0][1]?.position ?? undefined"
                    :status="treeData[0][1]?.status ?? undefined"
                    />
                    <ul>
                        <li>
                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                            :username="treeData[1][1]?.username ?? undefined"
                            :parentUsername="treeData[1][1]?.parent_username ?? undefined"
                            :sponsorUsername="treeData[1][1]?.sponsor_username ?? undefined"
                            :level="treeData[1][1]?.level ?? undefined"
                            :position="treeData[1][1]?.position ?? undefined"
                            :status="treeData[1][1]?.status ?? undefined"
                            />
                            <ul>
                                <li>
                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                    :username="treeData[2][3]?.username ?? undefined"
                                    :parentUsername="treeData[2][3]?.parent_username ?? undefined"
                                    :sponsorUsername="treeData[2][3]?.sponsor_username ?? undefined"
                                    :level="treeData[2][3]?.level ?? undefined"
                                    :position="treeData[2][3]?.position ?? undefined"
                                    :status="treeData[2][3]?.status ?? undefined"
                                    />
                                    <ul>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][7]?.username ?? undefined"
                                            :parentUsername="treeData[3][7]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][7]?.sponsor_username ?? undefined"
                                            :level="treeData[3][7]?.level ?? undefined"
                                            :position="treeData[3][7]?.position ?? undefined"
                                            :status="treeData[3][7]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][15]?.username ?? undefined"
                                                    :parentUsername="treeData[4][15]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][15]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][15]?.level ?? undefined"
                                                    :position="treeData[4][15]?.position ?? undefined"
                                                    :status="treeData[4][15]?.status ?? undefined"
                                                    />
                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][16]?.username ?? undefined"
                                                    :parentUsername="treeData[4][16]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][16]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][16]?.level ?? undefined"
                                                    :position="treeData[4][16]?.position ?? undefined"
                                                    :status="treeData[4][16]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][8]?.username ?? undefined"
                                            :parentUsername="treeData[3][8]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][8]?.sponsor_username ?? undefined"
                                            :level="treeData[3][8]?.level ?? undefined"
                                            :position="treeData[3][8]?.position ?? undefined"
                                            :status="treeData[3][8]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][17]?.username ?? undefined"
                                                    :parentUsername="treeData[4][17]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][17]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][17]?.level ?? undefined"
                                                    :position="treeData[4][17]?.position ?? undefined"
                                                    :status="treeData[4][17]?.status ?? undefined"
                                                    />
                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][18]?.username ?? undefined"
                                                    :parentUsername="treeData[4][18]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][18]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][18]?.level ?? undefined"
                                                    :position="treeData[4][18]?.position ?? undefined"
                                                    :status="treeData[4][18]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                    :username="treeData[2][4]?.username ?? undefined"
                                    :parentUsername="treeData[2][4]?.parent_username ?? undefined"
                                    :sponsorUsername="treeData[2][4]?.sponsor_username ?? undefined"
                                    :level="treeData[2][4]?.level ?? undefined"
                                    :position="treeData[2][4]?.position ?? undefined"
                                    :status="treeData[2][4]?.status ?? undefined"
                                    />
                                    <ul>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][9]?.username ?? undefined"
                                            :parentUsername="treeData[3][9]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][9]?.sponsor_username ?? undefined"
                                            :level="treeData[3][9]?.level ?? undefined"
                                            :position="treeData[3][9]?.position ?? undefined"
                                            :status="treeData[3][9]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][19]?.username ?? undefined"
                                                    :parentUsername="treeData[4][19]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][19]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][19]?.level ?? undefined"
                                                    :position="treeData[4][19]?.position ?? undefined"
                                                    :status="treeData[4][19]?.status ?? undefined"
                                                    />

                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][20]?.username ?? undefined"
                                                    :parentUsername="treeData[4][20]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][20]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][20]?.level ?? undefined"
                                                    :position="treeData[4][20]?.position ?? undefined"
                                                    :status="treeData[4][20]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][10]?.username ?? undefined"
                                            :parentUsername="treeData[3][10]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][10]?.sponsor_username ?? undefined"
                                            :level="treeData[3][10]?.level ?? undefined"
                                            :position="treeData[3][10]?.position ?? undefined"
                                            :status="treeData[3][10]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][21]?.username ?? undefined"
                                                    :parentUsername="treeData[4][21]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][21]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][21]?.level ?? undefined"
                                                    :position="treeData[4][21]?.position ?? undefined"
                                                    :status="treeData[4][21]?.status ?? undefined"
                                                    />

                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][22]?.username ?? undefined"
                                                    :parentUsername="treeData[4][22]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][22]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][22]?.level ?? undefined"
                                                    :position="treeData[4][22]?.position ?? undefined"
                                                    :status="treeData[4][22]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                            :username="treeData[1][2]?.username ?? undefined" 
                            :parentUsername="treeData[1][2]?.parent_username ?? undefined"
                            :sponsorUsername="treeData[1][2]?.sponsor_username ?? undefined"
                            :level="treeData[1][2]?.level ?? undefined"
                            :position="treeData[1][2]?.position ?? undefined"
                            :status="treeData[1][2]?.status ?? undefined"
                            />
                            <ul>
                                <li>
                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                    :username="treeData[2][5]?.username ?? undefined"
                                    :parentUsername="treeData[2][5]?.parent_username ?? undefined"
                                    :sponsorUsername="treeData[2][5]?.sponsor_username ?? undefined"
                                    :level="treeData[2][5]?.level ?? undefined"
                                    :position="treeData[2][5]?.position ?? undefined"
                                    :status="treeData[2][5]?.status ?? undefined"
                                    />
                                    <ul>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][11]?.username ?? undefined"
                                            :parentUsername="treeData[3][11]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][11]?.sponsor_username ?? undefined"
                                            :level="treeData[3][11]?.level ?? undefined"
                                            :position="treeData[3][11]?.position ?? undefined"
                                            :status="treeData[3][11]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][23]?.username ?? undefined"
                                                    :parentUsername="treeData[4][23]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][23]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][23]?.level ?? undefined"
                                                    :position="treeData[4][23]?.position ?? undefined"
                                                    :status="treeData[4][23]?.status ?? undefined"
                                                    />
                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][24]?.username ?? undefined"
                                                    :parentUsername="treeData[4][24]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][24]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][24]?.level ?? undefined"
                                                    :position="treeData[4][24]?.position ?? undefined"
                                                    :status="treeData[4][24]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][12]?.username ?? undefined"
                                            :parentUsername="treeData[3][12]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][12]?.sponsor_username ?? undefined"
                                            :level="treeData[3][12]?.level ?? undefined"
                                            :position="treeData[3][12]?.position ?? undefined"
                                            :status="treeData[3][12]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][25]?.username ?? undefined"
                                                    :parentUsername="treeData[4][25]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][25]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][25]?.level ?? undefined"
                                                    :position="treeData[4][25]?.position ?? undefined"
                                                    :status="treeData[4][25]?.status ?? undefined"
                                                    />

                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][26]?.username ?? undefined"
                                                    :parentUsername="treeData[4][26]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][26]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][26]?.level ?? undefined"
                                                    :position="treeData[4][26]?.position ?? undefined"
                                                    :status="treeData[4][26]?.status ?? undefined"
                                                    />

                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                    :username="treeData[2][6]?.username ?? undefined"
                                    :parentUsername="treeData[2][6]?.parent_username ?? undefined"
                                    :sponsorUsername="treeData[2][6]?.sponsor_username ?? undefined"
                                    :level="treeData[2][6]?.level ?? undefined"
                                    :position="treeData[2][6]?.position ?? undefined"
                                    :status="treeData[2][6]?.status ?? undefined"
                                    />
                                    <ul>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][13]?.username ?? undefined"
                                            :parentUsername="treeData[3][13]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][13]?.sponsor_username ?? undefined"
                                            :level="treeData[3][13]?.level ?? undefined"
                                            :position="treeData[3][13]?.position ?? undefined"
                                            :status="treeData[3][13]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][27]?.username ?? undefined"
                                                    :parentUsername="treeData[4][27]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][27]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][27]?.level ?? undefined"
                                                    :position="treeData[4][27]?.position ?? undefined"
                                                    :status="treeData[4][27]?.status ?? undefined"
                                                    />
                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][28]?.username ?? undefined"
                                                    :parentUsername="treeData[4][28]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][28]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][28]?.level ?? undefined"
                                                    :position="treeData[4][28]?.position ?? undefined"
                                                    :status="treeData[4][28]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                            :username="treeData[3][14]?.username ?? undefined"
                                            :parentUsername="treeData[3][14]?.parent_username ?? undefined"
                                            :sponsorUsername="treeData[3][14]?.sponsor_username ?? undefined"
                                            :level="treeData[3][14]?.level ?? undefined"
                                            :position="treeData[3][14]?.position ?? undefined"
                                            :status="treeData[3][14]?.status ?? undefined"
                                            />
                                            <ul class="mate-container-level-5">
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][29]?.username ?? undefined"
                                                    :parentUsername="treeData[4][29]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][29]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][29]?.level ?? undefined"
                                                    :position="treeData[4][29]?.position ?? undefined"
                                                    :status="treeData[4][29]?.status ?? undefined"
                                                    />
                                                </li>
                                                <li>
                                                    <Node v-if="treeData" @search="handleSearch" @informations="handleInformations"
                                                    class="level-5"
                                                    :username="treeData[4][30]?.username ?? undefined"
                                                    :parentUsername="treeData[4][30]?.parent_username ?? undefined"
                                                    :sponsorUsername="treeData[4][30]?.sponsor_username ?? undefined"
                                                    :level="treeData[4][30]?.level ?? undefined"
                                                    :position="treeData[4][30]?.position ?? undefined"
                                                    :status="treeData[4][30]?.status ?? undefined"
                                                    />
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

</template>


<style scoped>
.loader-container {
  height: 70vh; 
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px

}

.tree-container { 
  align-items: center;
  margin-bottom: 100px
}
</style>