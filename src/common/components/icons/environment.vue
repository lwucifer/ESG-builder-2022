<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.85041 9.38665L7.85052 9.38655C8.39303 8.84382 9.356 8.30073 10.5852 7.79279C11.7944 7.29312 13.1832 6.85835 14.5078 6.49984C15.8299 6.14202 17.0739 5.86397 17.9882 5.6753C18.1382 5.64434 18.2793 5.6158 18.4102 5.58974C18.3842 5.72068 18.3556 5.86174 18.3247 6.01177C18.136 6.92604 17.8579 8.17001 17.5001 9.49212C17.1416 10.8168 16.7068 12.2056 16.2072 13.4148C15.6992 14.644 15.1561 15.6069 14.6134 16.1494L14.6133 16.1495C12.7452 18.0176 9.7174 18.0174 7.85054 16.1497C5.98334 14.2816 5.98353 11.2535 7.85041 9.38665Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M5.7002 18.3L11.4752 12.525"
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
      default: '#016A1F'
    },
    size: {
      type: String,
      default: '24'
    }
  }
}
</script>

<style></style>
