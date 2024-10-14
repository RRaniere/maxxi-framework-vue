<script setup lang="ts">
import { shallowRef } from 'vue';

const projects = shallowRef([
  {
    subject: 'Website down for one week',
    dept: 'Support',
    date: 'Today 2:00',
    status: 'open'
  },
  {
    subject: 'Loosing control on server',
    dept: 'Support',
    date: 'Yesterday',
    status: 'progress'
  },
  {
    subject: 'Authorizations keys',
    dept: 'Support',
    date: '27, Aug',
    status: 'closed'
  },
  {
    subject: 'Restoring default settings',
    dept: 'Support',
    date: 'Today 9:00 ',
    status: 'open'
  },
  {
    subject: 'Loosing control on server',
    dept: 'Support',
    date: 'Yesterday',
    status: 'progress'
  },
  {
    subject: 'Authorizations keys',
    dept: 'Support',
    date: '27, Aug',
    status: 'closed'
  },
  {
    subject: 'Restoring default settings',
    dept: 'Support',
    date: 'Today 9:00',
    status: 'open'
  },
  {
    subject: 'Authorizations keys',
    dept: 'Support',
    date: '27, Aug',
    status: 'closed'
  }
]);
</script>

<template>
  <v-table hover density="comfortable">
    <thead class="bg-containerBg">
      <tr>
        <th class="text-start ps-6 text-caption font-weight-bold text-uppercase">Subject</th>
        <th class="text-start text-caption font-weight-bold text-uppercase">Department</th>
        <th class="text-start text-caption font-weight-bold text-uppercase">Date</th>
        <th class="text-end pe-6 text-caption font-weight-bold text-uppercase">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in projects" :key="item.subject">
        <td class="py-3 ps-6" style="min-width: 200px">
          {{ item.subject }}
        </td>
        <td class="py-3">{{ item.dept }}</td>
        <td class="py-3">{{ item.date }}</td>
        <td class="py-3 text-end pe-6">
          <v-chip color="primary" variant="tonal" rounded="md" label v-if="item.status === 'progress'" size="small"> progress </v-chip>
          <v-chip color="success" variant="tonal" rounded="md" label v-if="item.status === 'open'" size="small"> open </v-chip>
          <v-chip color="error" variant="tonal" rounded="md" label v-if="item.status === 'closed'" size="small"> closed</v-chip>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
