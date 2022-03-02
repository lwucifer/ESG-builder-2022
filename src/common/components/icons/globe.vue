<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.8499 12C14.8499 14.2429 14.4588 16.238 13.8561 17.6442C13.5542 18.3487 13.214 18.8709 12.8744 19.2061C12.538 19.538 12.2433 19.65 11.9999 19.65C11.7565 19.65 11.4618 19.538 11.1254 19.2061C10.7858 18.8709 10.4456 18.3487 10.1437 17.6442C9.54099 16.238 9.1499 14.2429 9.1499 12C9.1499 9.75702 9.54099 7.76199 10.1437 6.35572C10.4456 5.65125 10.7858 5.12907 11.1254 4.7939C11.4618 4.46191 11.7565 4.34998 11.9999 4.34998C12.2433 4.34998 12.538 4.46191 12.8744 4.7939C13.214 5.12907 13.5542 5.65125 13.8561 6.35572C14.4588 7.76199 14.8499 9.75702 14.8499 12Z"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M4.80029 12H19.2003"
      :stroke="color"
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="square"
    />
    <path
      d="M19.6501 12C19.6501 16.225 16.2251 19.65 12.0001 19.65C7.77512 19.65 4.3501 16.225 4.3501 12C4.3501 7.775 7.77512 4.34998 12.0001 4.34998C16.2251 4.34998 19.6501 7.775 19.6501 12Z"
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
