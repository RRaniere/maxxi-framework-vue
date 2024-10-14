<script setup lang="ts">
import { shallowRef } from 'vue';

import Avatar1 from '@/assets/images/users/avatar-1.png';
import Avatar2 from '@/assets/images/users/avatar-2.png';
import Avatar3 from '@/assets/images/users/avatar-3.png';
import Avatar4 from '@/assets/images/users/avatar-4.png';
import Avatar5 from '@/assets/images/users/avatar-6.png';

const projects = shallowRef([
  {
    avatar: Avatar1,
    username: 'John Deo',
    role: 'Graphics Designer',
    name: 'Materially',
    date: 'Jun, 26',
    priority: 'low'
  },
  {
    avatar: Avatar2,
    username: 'Jenifer Vintage',
    role: 'Web Designer',
    name: 'Mashable',
    date: 'March, 31',
    priority: 'lower'
  },
  {
    avatar: Avatar3,
    username: 'William Jem',
    role: 'Developer',
    name: 'Flatable',
    date: 'Aug, 02',
    priority: 'medium'
  },
  {
    avatar: Avatar4,
    username: 'David Jones',
    role: 'Developer',
    name: 'Guruable',
    date: 'Sep, 22',
    priority: 'high'
  },
  {
    avatar: Avatar5,
    username: 'Stebin Ben',
    role: 'Leader',
    name: 'Able Pro',
    date: 'Sep, 22',
    priority: 'higher'
  }
]);
</script>

<template>
  <v-table class="bordered-table" hover density="comfortable">
    <thead class="bg-containerBg">
      <tr>
        <th class="text-start ps-6 text-caption font-weight-bold text-uppercase">Assigned</th>
        <th class="text-start text-caption font-weight-bold text-uppercase">Name</th>
        <th class="text-start text-caption font-weight-bold text-uppercase" style="min-width: 100px">Due Date</th>
        <th class="text-end pe-6 text-caption font-weight-bold text-uppercase">Priority</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in projects" :key="item.name">
        <td class="py-4 ps-6" style="min-width: 240px">
          <div class="d-flex align-center">
            <img :src="item.avatar" width="40" alt="user" class="rounded-circle" />
            <div class="ms-4">
              <h6 class="text-subtitle-1 mb-0">{{ item.username }}</h6>
              <span class="text-lightText text-caption">{{ item.role }}</span>
            </div>
          </div>
        </td>
        <td class="py-4">{{ item.name }}</td>
        <td class="py-4" style="min-width: 100px">{{ item.date }}</td>
        <td class="py-4 pe-6 text-end">
          <v-chip color="warning" variant="flat" rounded="lg" size="small" v-if="item.priority === 'low'">Low</v-chip>
          <v-chip color="info" variant="flat" rounded="lg" size="small" v-else-if="item.priority === 'high'">High</v-chip>
          <v-chip color="error" variant="flat" rounded="lg" size="small" v-else-if="item.priority === 'lower'">Lower</v-chip>
          <v-chip color="success" variant="flat" rounded="lg" size="small" v-else-if="item.priority === 'higher'">Higher</v-chip>
          <v-chip color="primary" variant="flat" rounded="lg" size="small" v-else>Medium</v-chip>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
