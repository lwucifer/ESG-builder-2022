<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 6.59998V13.6"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M9 10.2H15"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="M12.5354 16.7292C12.3243 16.6236 12.0757 16.6236 11.8646 16.7292L5.75 19.7865V5C5.75 4.30964 6.30964 3.75 7 3.75H17.4C18.0904 3.75 18.65 4.30964 18.65 5V19.7865L12.5354 16.7292Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#87879D'
    },
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>

<style></style>
