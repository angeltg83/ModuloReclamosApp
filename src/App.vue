<template>
  <v-app>
    
    <v-app-bar absolute color="primary" dense dark elevation="4">
      <v-toolbar-title>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
       <SolicitudView/>
      </v-container>
    </v-main>

    <v-footer app>
      <strong style="font-size: 11px">Modulo reclamos</strong>
    </v-footer>
  </v-app>
</template>

<script>
import SolicitudView from './views/SolicitudView'
export default {
  name: "App",
  components:{
    SolicitudView
  },
  data() {
    return {
      drawer: null,
    };
  },
};
</script>
