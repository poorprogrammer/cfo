<template>
  <div class="base-input">
    <label :for="id" class="input-label">{{ label }}</label>
    <input
      :id="id"
      type="text"
      class="input-field"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "baseInput",
  props: ["id", "label", "value"],
};
</script>

<style scoped>
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
  padding: 8px 12px;
  font-size: 1rem;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.87);
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  transition: border-color 0.2s ease-in-out;
  font-family: "Roboto", sans-serif;
}

.input-field:hover {
  border-color: rgba(0, 0, 0, 0.87);
}

.input-field:focus {
  outline: none;
  border-color: #1976d2;
  box-shadow: 0 0 0 1px #1976d2;
}

/* For error states, add these classes as needed */
.input-field.error {
  border-color: #ff5252;
}

.input-field.error:focus {
  box-shadow: 0 0 0 1px #ff5252;
}
</style>
