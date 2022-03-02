<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.001 10.8C13.6578 10.8 15.001 9.4569 15.001 7.80005C15.001 6.14319 13.6578 4.80005 12.001 4.80005C10.3441 4.80005 9.00098 6.14319 9.00098 7.80005C9.00098 9.4569 10.3441 10.8 12.001 10.8Z"
      :stroke="color"
      stroke-width="1.8"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M5.40039 19.2V17.2C5.40039 14.9908 7.19125 13.2 9.40039 13.2H14.6004C16.8095 13.2 18.6004 14.9908 18.6004 17.2V19.2"
      :stroke="color"
      stroke-width="1.8"
    />
    <defs>
      <clipPath id="clip0">
        <rect width="16" height="16" :fill="color" />
      </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#226FEA'
    },
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>

<style></style>
