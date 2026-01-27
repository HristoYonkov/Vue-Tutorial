<script setup>
import Hero from '../Hero.vue';
import HomeCards from '../HomeCards.vue';
import JobListings from '../JobListings.vue';

</script>

<template>
    <Hero title="JobsiVue" subtitle="Hello There you are on the right place for finding jobs with Vue!" />
    <HomeCards />
    <JobListings :limit="3" :showButton="true" />
</template>