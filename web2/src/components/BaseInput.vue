<template>
  <div class="base-input">
    <label :for="props.id" class="input-label">{{ props.label }}</label>
    <input
      :id="props.id"
      type="text"
      class="input-field"
      :value="props.modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped lang="scss">
.base-input {
  margin-bottom: 16px;
  width: 100%;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.6);
  font-family: "Roboto", sans-serif;
}

.input-field {
  width: 100%;
  padding: 8px 2px;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;

  &:hover {
    border-color: rgba(0, 0, 0, 0.87);
  }

  &:focus {
    outline: none;
    border-color: #1976d2;
    box-shadow: 0 0 0 1px #1976d2;
  }

  &.error {
    border-color: #ff5252;

    &:focus {
      box-shadow: 0 0 0 1px #ff5252;
    }
  }
}
</style>
