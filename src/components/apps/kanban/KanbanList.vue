<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useKanbanStore } from '@/stores/apps/kanban';
import TaskCard from './TaskCard.vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { sub } from 'date-fns';

const store = useKanbanStore();
onMounted(() => {
  store.fetchkanbanItems();
});
const getTask = computed(() => store.kanbanItems);
const msg = ref('');
const showTaskform = ref<number | null>(null);
const draggable = VueDraggableNext;
const handleToggle = (id: number) => {
  showTaskform.value = id;
};
const addTaskCard = (id: number, task: string) => {
  const newTask = {
    description: '',
    userStory: `${Math.floor(Math.random() * 9000) + 1000}`,
    dueDate: sub(new Date(), { days: 12 }),
    id: 1,
    priority: 'low',
    title: task
  };
  store.addTask(id, newTask);
  msg.value = '';
  showTaskform.value = null;
};
</script>
<template>
  <div class="overflow-auto">
    <v-row class="taskBoardBox my-0">
      <v-col cols="3" v-for="column in getTask" :key="column.title">
        <div class="bg-gray100 pa-4 rounded-lg task-card">
          <h5 class="text-h6 font-weight-medium mb-5">{{ column.title }}</h5>
          <draggable :list="column.tasks" :animation="200" ghost-class="ghost-card" group="tasks">
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <TaskCard v-for="task in column.tasks" :key="task.id" :task="task" class="mt-3 cursor-move"></TaskCard>
          </draggable>
          <v-card class="pa-3 pt-1 mt-4 bg-surface" rounded="lg" variant="outlined" elevation="0" v-if="showTaskform === column.id">
            <v-text-field
              variant="plain"
              hide-details
              density="compact"
              v-model="msg"
              color="primary"
              persistent-placeholder
              placeholder="Add Task"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between mt-1 ga-2">
              <div class="d-flex align-center ga-1">
                <v-btn icon size="small" variant="text" color="primary" rounded="md">
                  <SvgSprite name="custom-multi-users" style="width: 20px; height: 20px" />
                </v-btn>
                <v-btn icon size="small" variant="text" color="primary" rounded="md">
                  <SvgSprite name="custom-calculator" style="width: 20px; height: 20px" />
                </v-btn>
              </div>
              <div>
                <v-btn
                  icon
                  size="small"
                  rounded="md"
                  variant="text"
                  color="error"
                  @click="showTaskform = showTaskform === column.id ? null : column.id"
                >
                  <SvgSprite name="custom-close" style="width: 18px; height: 18px; transform: rotate(45deg)" />
                </v-btn>
                <v-btn color="primary" size="small" rounded="md" elevation="0" @click="addTaskCard(column.id, msg)">Add</v-btn>
              </div>
            </div>
          </v-card>
          <v-btn
            variant="text"
            rounded="md"
            @click="handleToggle(column.id)"
            class="mt-4"
            border="secondary dashed thin opacity-100"
            color="secondary"
            block
            v-else
          >
            Add Task
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
.task-card {
  border: 1px solid rgb(var(--v-theme-borderLight));
}
.taskBoardBox {
  width: 1200px;
}
</style>
