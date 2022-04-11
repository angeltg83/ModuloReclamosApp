<template>
  <v-app>
    <v-navigation-drawer width="10rem" app v-model="drawer" absolute temporary>
      nav
    </v-navigation-drawer>
    
    <v-app-bar absolute color="primary" dense dark elevation="4">
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <v-footer app>
      <strong style="font-size: 11px">Modulo reclamos</strong>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: null,
    };
  },
};
</script>
