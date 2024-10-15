<template>
    <div class="tree">
      <Node :node="treeRoot" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import Node from './Node.vue';
  
  interface Node {
    id: number;
    level: number
    left?: Node;
    right?: Node;
  }
  
  function createBinaryTree(levels: number): Node {
    let id = 1;
    function createNode(level: number): Node {
      const node: Node = { id: id++ , level: level};
      if (level < levels) {
        node.left = createNode(level + 1);
        node.right = createNode(level + 1);
      }
      return node;
    }
    return createNode(1);
  }
  
  const treeRoot = ref(createBinaryTree(4)); // Cria uma árvore binária de 4 níveis
  </script>
  
  <style scoped>
  .tree {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  </style>
  