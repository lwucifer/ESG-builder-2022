<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.1998 9.60005C8.52529 9.60005 9.5998 8.52553 9.5998 7.20005C9.5998 5.87457 8.52529 4.80005 7.1998 4.80005C5.87432 4.80005 4.7998 5.87457 4.7998 7.20005C4.7998 8.52553 5.87432 9.60005 7.1998 9.60005Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M15.5997 9.60005C16.9252 9.60005 17.9997 8.52553 17.9997 7.20005C17.9997 5.87457 16.9252 4.80005 15.5997 4.80005C14.2742 4.80005 13.1997 5.87457 13.1997 7.20005C13.1997 8.52553 14.2742 9.60005 15.5997 9.60005Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M2.3999 19.2001V17.2001C2.3999 14.9909 4.19076 13.2001 6.3999 13.2001H7.99991C10.209 13.2001 11.9999 14.9909 11.9999 17.2001V19.2001"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M14.3999 13.2001H16.9999C19.209 13.2001 20.9999 14.9909 20.9999 17.2001V19.2001"
      :stroke="color"
      stroke-width="1.5"
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
