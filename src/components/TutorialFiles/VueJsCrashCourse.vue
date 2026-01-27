<!-- <script lang="ts"> -->
<script setup>
// Composition API approach
import { ref, onMounted } from 'vue'; // "ref" is simmilar to the react useState() method

const name = ref('Hristo Yonkov');
const status = ref('pending');
const tasks = ref(['one', 'two', 'three']);
const link = ref('https://google.com');
const newTask = ref('');

const toggleStatus = () => {
    if (status.value === 'active') {
        status.value = 'pending';
    } else if (status.value === 'pending') {
        status.value = 'inactive';
    } else {
        status.value = 'active';
    }
};

const addTask = () => {
    if (newTask.value.trim() !== '') {
        tasks.value.push(newTask.value);
        newTask.value = '';
    }
};

const deleteTask = (index) => {
    tasks.value.splice(index, 1);
};

onMounted(async () => {
    try {
        const response = await fetch ('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks.value = data.map((task) => task.title);
        console.log(data);
    } catch (error) {
        console.log('Error fetching tasks');                
    }
});
</script>

<template>
    <h1 class="text-red-500">{{ name }}</h1>
    <!-- if statements -->
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>

    <!-- How forms are used and binded -->
    <form @submit.prevent="addTask">
        <label for="newTask">Add Task</label>
        <input type="text" id="newTask" name="newTask" v-model="newTask" />
        <button type="submit">Submit</button>
    </form>


    <h3>Tasks:</h3>
    <ul>
        <!-- loops -->
        <li v-for="(task, index) in tasks" :key="task">
            <span>{{ task }}</span>
            <button @click="deleteTask(index)">X</button>
        </li>
    </ul>
    <!-- Bind -->
    <!-- <a v-bind:href="link">Click for google..</a> -->
    <a :href="link">Click for google..</a>
    <br>
    <!-- onclick directives -->
    <!-- <button v-on:click="toggleStatus">Change Status</button> -->
    <button @click="toggleStatus">Change Status</button>
</template>
