<template>
  <div>
    <v-layout :wrap="true">
      <v-flex xs12>
        <v-card
          elevation="2"
          class="pa-2"
          style="margin-top: 3em"
          outlined
          tile
        >
          <template>
            <v-snackbar v-model="snackbar" :timeout="timeout">
              {{ message }}

              <template v-slot:action="{ attrs }">
                <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>

            <v-form
              @submit="submit"
              method="post"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-container class="lighten-5 mb-6">
                <v-row>
                  <v-col cols="12" sm="6" md="3"></v-col>
                  <v-col cols="12" sm="6" md="6">
                    <h4>Formulario de registro de reclamos y queja</h4>
                  </v-col>
                  <v-col cols="12" sm="6" md="3"> </v-col>
                </v-row>

                <v-row>
                  <v-col outlined cols="12" sm="6" md="4">
                    <v-select
                      v-model="tipoPersona"
                      :items="tiposPersona"
                      :rules="[(v) => !!v || 'Tipo persona es requerido']"
                      label="Tipo persona"
                      item-value="id"
                      item-text="descripcion"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6" md="6"> </v-col>
                </v-row>
                <div v-if="tipoPersona && tipoPersona === 1">
                  <!-- PERSONA NATURAL -->
                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="identificacion"
                        :rules="[identificacionRules]"
                        label="Identificación"
                      ></v-text-field>
                    </v-col>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="nombres"
                        :rules="nombresRules"
                        label="Nombres"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="apellidoPaterno"
                        :rules="apellidoPaternoRules"
                        label="Apellido paterno"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="apellidoMaterno"
                        label="Apellido materno"
                      ></v-text-field>
                    </v-col>

                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="telefono"
                        :rules="[telefonoRules]"
                        label="Teléfono"
                      ></v-text-field>
                    </v-col>

                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Correo eléctronico"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="pais"
                        :items="paises"
                        :rules="[(v) => !!v || 'Debe seleccionar un pais']"
                        label="Pais"
                        item-value="id"
                        item-text="descripcion"
                        required
                      ></v-select>
                    </v-col>

                    <v-col cols="6" md="4">
                      <v-text-field
                        v-model="ciudad"
                        label="Ciudad"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>

                <div v-if="tipoPersona && tipoPersona !== 1">
                  <!-- PERSONA JURIDICA -->
                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="razonSocial"
                        label="Razón social"
                      ></v-text-field>
                    </v-col>

                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="representanteLegal"
                        :rules="representanteLegalRules"
                        label="Representante legal"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col sm="6" md="4">
                      <v-text-field
                        v-model="identificacion"
                        label="Ruc"
                        required
                        :rules="[rucRules]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="pais"
                        :items="paises"
                        :rules="[(v) => !!v || 'Debe seleccionar un pais']"
                        label="Pais"
                        item-value="id"
                        item-text="descripcion"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="6" md="4">
                      <v-text-field
                        v-model="ciudad"
                        label="Ciudad"
                      ></v-text-field>
                    </v-col>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="telefono"
                        label="Teléfono"
                        :rules="[telefonoRules]"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col sm="6" md="4">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Correo eléctronico"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>

                <div class="mt-6" v-if="tipoPersona">
                  <!-- DATOS DE LA SOLICITUD -->
                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="tipoSolicitud"
                        :items="tiposSolicitud"
                        :rules="[(v) => !!v || 'Tipo solicitud es requerido']"
                        label="Tipo solicitud"
                        item-value="id"
                        item-text="descripcion"
                        required
                      ></v-select>
                    </v-col>

                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="motivo"
                        :items="tiposMotivos"
                        label="Motivo"
                        item-value="id"
                        item-text="descripcion"
                      ></v-select>
                    </v-col>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="tipoServicio"
                        :items="tiposServicios"
                        label="Producto o servicio en cuestión"
                        item-value="id"
                        item-text="descripcion"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col outlined cols="12" sm="6" md="4">
                      <v-select
                        v-model="entidadBancaria"
                        :items="entidadesBancarias"
                        label="Entidad origen"
                        item-value="id"
                        item-text="descripcion"
                      ></v-select>
                    </v-col>
                    <v-col outlined cols="12" sm="6" md="8">
                      <v-textarea
                        v-model="observacion"
                        name="observacion"
                        label="Observación"
                        value=""
                        rows="2"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-col outlined cols="12" sm="6" md="4"> </v-col>
                  <v-col outlined cols="12" sm="6" md="4">
                    <v-btn
                      type="submit"
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="submit"
                      width="100%"
                    >
                      Enviar
                    </v-btn>
                  </v-col>
                  <v-col outlined cols="12" sm="6" md="4"> </v-col>
                </v-row>
              </v-container>
            </v-form>
            <!-- <button class="action-button" @click="showToast">Show toast</button> -->
          </template>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
//import { config } from "../config/config";
// eslint-disable-next-line
import { createToastInterface } from "vue-toastification";
//const { API_HOST } = config;

const API_HOST = process.env.VUE_APP_BACKEND_SERVER_URL; 
console.log(API_HOST)
//VUE_APP_BACKEND_SERVER_URL

export default {
  name: "SolicitudView",

  data: () => ({
    snackbar: false,
    message: "Exito",
    timeout: 2000,
    color: "success",

    valid: true,
    nombres: "",
    nombresRules: [
      (v) => !!v || "Nombres es requerido",
      // (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],

    identificacion: "",
    identificacionRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 13) return "Solo debe tener al menos 10 o 13 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    apellidoPaterno: "",
    apellidoPaternoRules: [(v) => !!v || "Apellido es requerido"],

    apellidoMaterno: "",
    apellidoMaternoRules: [(v) => !!v || "Apellido es requerido"],

    telefono: "",
    telefonoRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 10) return "Solo debe tener 10 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    rucRules: (v) => {
      if (!v.trim()) return true;
      if (v.length > 13) return "Solo debe tener 13 números";
      if (!isNaN(parseFloat(v))) return true;
      return "Debe ingresar números";
    },
    ciudad: "",
    email: "",
    observacion: "",
    emailRules: [
      (v) => !!v || "Correo es requerido",
      (v) => /.+@.+\..+/.test(v) || "Correo no válido",
    ],
    representanteLegal: "",
    razonSocial: "",
    representanteLegalRules: [(v) => !!v || "Nombre representante requerido"],
    tipoPersona: null,
    tiposPersona: [],

    tipoSolicitud: null,
    tiposSolicitud: [],

    motivo: null,
    tiposMotivos: [],
    entidadBancaria: null,
    entidadesBancarias: [],

    tipoServicio: null,
    tiposServicios: [],
    paises: [],
    pais: null,
  }),

  methods: {
    showToast() {
      console.log("toast", this.$toast);
    },
    submit: function (e) {
      e.preventDefault();
      const formData = {
        email: this.email,
        telefono: this.telefono,
        identificacion: this.identificacion,
        tipo_persona_id: this.tipoPersona,
        nombres: this.nombres,
        apellido_paterno: this.apellidoPaterno,
        apellido_materno: this.apellidoMaterno,
        razon_social: this.razonSocial,
        representante_legal: this.representanteLegal,
        tipo_motivo_id: this.motivo,
        tipo_productos_id: this.tipoServicio,
        entidad_bancaria_id: this.entidadBancaria,
        pais_id: this.pais,
        observacion: this.observacion,
        tipo_solicitud_id: this.tipoSolicitud,
        ciudad: this.ciudad,
      };

      this.sendData(formData);
    },

    async sendData(data) {
      try {
        const resp = await fetch(
          `${API_HOST}/api/send/mail/sendmailSolicitud`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        // console.log(err)
        const result = await resp.json();
        if (!result.error) {
          this.getToastSuccess("Se ha enviado la información");

          //     this.message = result.message;
          //    this.color = "success";
          //   this.snackbar = true;
        } else {
          throw new Error("Error en servidor");
        }
      } catch (err) {
        console.log("errr", err);
        this.message = "Error en servidor";
        this.color = "error";
        this.snackbar = true;
      }
    },
    // consume api php catalogo.

    async getBancos() {
      try {
        const resp = await fetch(`${API_HOST}/api/bancos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTiposPersonas() {
      try {
        const resp = await fetch(`${API_HOST}/api/persona/tiposPersonas`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getPaises() {
      try {
        const resp = await fetch(`${API_HOST}/api/persona/paises`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTipoProducto() {
      try {
        const resp = await fetch(`${API_HOST}/api/producto/tiposProductos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },

    async getTiposSolicitudes() {
      try {
        const resp = await fetch(
          `${API_HOST}/api/solicitud/reclamos/tiposSolicitudes`,
          {
            method: "GET",
          }
        );
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },
    //
    async getTiposMotivos() {
      try {
        const resp = await fetch(`${API_HOST}/api/solicitud/reclamos/motivos`, {
          method: "GET",
        });
        return await resp.json();
      } catch (err) {
        console.log(err);
      }
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    getToastSuccess(msg) {
      createToastInterface({
        timeout: 2000,
      }).success(msg);
    },
  },
  async mounted() {
    this.entidadesBancarias = await this.getBancos();
    this.tiposPersona = await this.getTiposPersonas();
    this.paises = await this.getPaises();
    this.tiposServicios = await this.getTipoProducto();
    this.tiposSolicitud = await this.getTiposSolicitudes();
    this.tiposMotivos = await this.getTiposMotivos();
  },
};
</script>
