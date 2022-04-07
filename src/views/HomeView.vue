<template>
  <div>
    <v-layout :wrap="true">
      <v-flex xs12>
        <!-- <v-row> -->
        <!-- <v-col cols="12"> -->
        <v-card
          elevation="2"
          class="pa-2"
          style="margin-top: 3em"
          outlined
          tile
        >
          <template>
            <div>
              <v-data-table
                :headers="headers"
                :items="desserts"
                item-key="name"
                class="elevation-1"
                :search="search"
                :custom-filter="filterOnlyCapsText"
              >
                <template v-slot:[`item.estado`]="{ item }">
                  <v-chip :color="getColor(item.estado)" dark>
                    {{ item.estado }}
                  </v-chip>
                </template>
                <template v-slot:[`item.accion`]="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
                </template>

                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title
                      >Listado de ordenes de pago</v-toolbar-title
                    >
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <template>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                      >
                        Nuevo
                      </v-btn>
                    </template>
                  </v-toolbar>
                </template>
              </v-data-table>
            </div>
          </template>
        </v-card>
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      calories: "",
      desserts: [
        {
          id: 1,
          num_orden_pago: 100,
          nombres_cliente: "Bruce Banner",
          nombre_asesor_cobranza: "Jhon Doe",
          id_asesor_cobranza: 10,
          valor_deuda: 2500,
          estado: "PENDIENTE",
        },
        {
          id: 2,
          num_orden_pago: 100,
          nombres_cliente: "Barry Alley",
          nombre_asesor_cobranza: "Steve Dicko",
          id_asesor_cobranza: 15,
          valor_deuda: 780,
          estado: "PENDIENTE",
        },
        {
          id: 3,
          num_orden_pago: 100,
          nombres_cliente: "Dick Grayson",
          nombre_asesor_cobranza: "Bryan Josepth",
          id_asesor_cobranza: 12,
          valor_deuda: 7800,
          estado: "PENDIENTE",
        },
        {
          id: 4,
          num_orden_pago: 104,
          nombres_cliente: "Raplh M.",
          nombre_asesor_cobranza: "Jhonny Quick",
          id_asesor_cobranza: 11,
          valor_deuda: 4500,
          estado: "PENDIENTE",
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "# Orden pago",
          align: "start",
          sortable: false,
          value: "num_orden_pago",
        },
        {
          text: "Clientes",
          value: "nombres_cliente",
        },
        { text: "Valor", value: "valor_deuda" },
        { text: "Asesor cobranza", value: "nombre_asesor_cobranza" },
        { text: "Estado", value: "estado" },
        { text: "Acción", value: "accion" },
      ];
    },
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().toLocaleUpperCase().indexOf(search) !== -1
      );
    },
    getColor(estado) {
      if (estado === "PENDIENTE") return "orange";
      else return "green";
    },
  },
};
</script>
