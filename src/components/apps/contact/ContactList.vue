<script setup lang="ts">
import { ref, onMounted, computed, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import ContactItem from './ContactItem.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useContactStore } from '@/stores/apps/contact';
import _ from 'lodash';
import SelectedContact from './SelectedContact.vue';
import EditContact from './EditContact.vue';
import AddContact from './AddContact.vue';

const page = ref({ title: 'List' });
const breadcrumbs = shallowRef([
  {
    title: 'Contact',
    disabled: false,
    href: '#'
  },
  {
    title: 'List',
    disabled: true,
    href: '#'
  }
]);

const store = useContactStore();

onMounted(() => {
  store.fetchContacts();
});

const allContacts = computed(() => {
  return store.contact;
});
const searchValue = ref('');
const { flow, orderBy, groupBy, flatMap, get, filter } = _;
const groupItems = flow([
  (arr: string) => orderBy(arr, 'name'),
  (arr: string) => groupBy(arr, (o: string) => get(o, 'name[0]', '').toUpperCase()),
  (groups: string) => flatMap(groups, (v: string, k: string) => [k, ...v]),
  (arr: string) => filter(arr, (o: string) => get(o, 'name', '').toLowerCase().includes(searchValue.value.toLowerCase()))
]);
const filteredContact = computed(() => {
  return groupItems(allContacts.value);
});

const drawer = ref(false);
const contactDrawer = ref(false);

const editContact = ref(false);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <UiParentCard title="Contact List">
        <div class="d-flex align-center ga-4">
          <v-text-field
            variant="outlined"
            density="comfortable"
            v-model="searchValue"
            persistent-placeholder
            placeholder="Search Contact"
            hide-details
          >
            <template v-slot:prepend-inner>
              <SvgSprite name="custom-search" class="text-lightText" style="width: 16px; height: 16px" />
            </template>
          </v-text-field>
          <v-btn class="ms-auto" elevation="0" variant="flat" color="primary" size="large" @click.stop="contactDrawer = !contactDrawer">
            <SvgSprite name="custom-plus" style="width: 18px; height: 18px" />
            Add
          </v-btn>
        </div>
        <div>
          <ContactItem :getContacts="filteredContact" @openDrawer="drawer = true" />
        </div>
      </UiParentCard>
    </v-col>
  </v-row>
  <v-navigation-drawer v-model="drawer" temporary location="end" width="300">
    <SelectedContact @editContact="editContact = true" v-if="!editContact" />
    <EditContact @closeDrawer="(drawer = false), (editContact = false)" v-else />
  </v-navigation-drawer>
  <v-navigation-drawer v-model="contactDrawer" temporary location="end" width="300">
    <AddContact @closeDrawer="contactDrawer = false" />
  </v-navigation-drawer>
</template>
