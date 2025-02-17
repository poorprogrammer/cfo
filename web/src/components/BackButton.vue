<template>
  <router-link :to="target" class="back-btn">
    <button id="back-button" class="back-button">
      <span class="icon">⬅</span>
    </button>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  target: string;
}>();
</script>

<style scoped>
a.back-btn {
  text-decoration: none;
}

.back-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: var(--accent-color, #82b1ff);
  color: white;
  cursor: pointer;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  margin: 4px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: var(--accent-hover-color, #82b1ff);
}

.back-button .icon {
  font-size: 1.5em;
}
</style>
