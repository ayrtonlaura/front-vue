<template lang="pug">
div.showbox
  div.loader
    svg.circular(viewBox="25 25 50 50")
      circle.path(cx="50" cy="50" fill="none" r="20" stroke-miterlimit="10" stroke-width="2")
</template>
<script>
import './LoadingSpinner.scss'
export default {}
</script>