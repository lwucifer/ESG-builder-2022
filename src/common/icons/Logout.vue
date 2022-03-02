<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="24" height="24" fill="white" />
    <path
      d="M15 9.59961C13.3431 9.59961 12 8.25646 12 6.59961C12 4.94276 13.3431 3.59961 15 3.59961C16.6569 3.59961 18 4.94276 18 6.59961C18 8.25646 16.6569 9.59961 15 9.59961Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M21.5996 18.5996V16.5996C21.5996 14.3905 19.8087 12.5996 17.5996 12.5996H12.5996"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M12.5996 16.7998H2.99961"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M2.99961 16.7998L2.46928 17.3301C2.17639 17.0372 2.17639 16.5624 2.46928 16.2695L2.99961 16.7998ZM7.26928 22.1301L2.46928 17.3301L3.52994 16.2695L8.32994 21.0695L7.26928 22.1301ZM2.46928 16.2695L7.26928 11.4695L8.32994 12.5301L3.52994 17.3301L2.46928 16.2695Z"
      fill="#87879D"
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
