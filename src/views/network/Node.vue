<template>
    <div :class="['node-container', { 'level-4-node': node.level >= 4 }]">
      <div class="node">{{ node.id }}</div>
      <div class="children" v-if="node.left && node.right">
        <Node :node="node.left" />
        <Node :node="node.right" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
  import Node from './Node.vue';

  
  interface Node {
    id: number;
    level: number;
    left?: Node;
    right?: Node;
  }
  
  const props = defineProps<{ node: Node }>();
  </script>
  
  <style scoped>
  .node-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .level-4-node {
    padding: 10px;
  }

  .node {
    width: 80px;
    height: 80px;
    background-color: rgb(var(--v-theme-surface)) !important;
    border: 1px solid rgba(var(--v-theme-primary), 0.8) !important;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
  }
  
  .children {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

  }
  
  .children::before,
  .children::after {
    content: '';
    border-top: 2px solid black;
    width: 50%;
    position: absolute;
    top: 25px;
  }
  
  .children::before {
    left: 0;
  }
  
  .children::after {
    right: 0;
  }
  </style>
  