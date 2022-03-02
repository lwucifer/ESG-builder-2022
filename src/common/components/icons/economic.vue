<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.2402 4.94995H18.7602C18.9204 4.94995 19.0502 5.07979 19.0502 5.23995V18.76C19.0502 18.9201 18.9204 19.05 18.7602 19.05H5.2402C5.08003 19.05 4.9502 18.9201 4.9502 18.76V5.23995C4.9502 5.07979 5.08003 4.94995 5.2402 4.94995Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M7.84033 12.7799L10.1803 10.4399L13.3003 13.5599L16.4203 10.4399"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
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
