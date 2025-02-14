<template>
  <button id="save-button" @click="$emit('save')" class="save-button">
    <span class="icon">💾</span>
  </button>
</template>

<script>
export default {
  name: "SaveButton",
};
</script>

<style scoped>
.save-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: var(--primary-color, #1976d2);
  color: white;
  cursor: pointer;
  align-items: center;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  justify-content: center;
  margin: 4px;
  transition: background-color 0.2s;
}

.save-button:hover {
  background-color: var(--primary-hover-color, #1565c0);
}

.save-button .icon {
  font-size: 1.5em;
}
</style>
