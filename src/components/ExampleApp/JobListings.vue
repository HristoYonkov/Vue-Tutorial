<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
// import jobsData from './jobs.json'
import { reactive, ref, defineProps, onMounted } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import axios from 'axios';
// reactive() onlytakes objects. it does not take primitives like strings, numbers and booleans.
// It uses ref() under the hood.

// ref() can take objects or primitives.
// ref() has a `.value` property for reassigning, `reactive()` diesn't use `.value` and cant be reassigned.

defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})

// const jobs = jobsData;
// const jobs = ref([]);
const state = reactive({
    jobs: [],
    isLoading: true,
});

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:8000/jobs');
        // jobs.value = response.data;
        state.jobs = response.data;
    } catch (error) {
        console.log('Errof fetching jobs', error);
    } finally {
        state.isLoading = false;
    }
});
</script>

<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <!-- Show loading spinner while loading is true -->
            <div v-if="state.isLoading" class="text-center text-gray-500">
                <PulseLoader />
            </div>

            <!-- Show jhob listing when done loading -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job">
                    {{ job.title }}
                </JobListing>
            </div>
        </div>
    </section>

    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Jobs
        </RouterLink>
    </section>
</template>