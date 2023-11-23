<template>
    <nuxt-page></nuxt-page>
</template>

<script>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `HALS - ${titleChunk}` : 'HALS';
  },
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Roboto:wght@100;300;400;500;700;900&display=swap',
      crossorigin: true
    },
  ],
})

</script>
<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  font-size: 62.5%;
  font-family: Roboto, sans-serif;
  color: $font_color;
  background-color: $base_color_dark;
  height: 100vh;
}
</style>
