<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  @import url("./assets/icon/MaterialDesign/css/materialdesignicons.css");
html{
  font-family:  "Lexend_Exa",sans-serif;
    color: #2c3e50!important;
}
@font-face {
  font-family: "Quicksand";
  src: url("./assets/fonts/Quicksand/Quicksand-VariableFont_wght.ttf");
}
@font-face {
  font-family: "teko Regular";
  src: url("./assets/fonts/Teko/Teko-Regular.ttf");
}
@font-face {
  font-family: "teko Bold";
  src: url("./assets/fonts/Teko/Teko-Bold.ttf");
}
@font-face {
  font-family: "Lexend_Exa";
  src: url("./assets/fonts/Lexend_Exa/LexendExa-VariableFont_wght.ttf");
}
</style>
