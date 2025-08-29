<template>
  <v-speed-dial
      location="bottom center"
      transition="scale-transition"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab
          v-bind="activatorProps"
          size="50px"
          icon="$FileMenuIcon"
      ></v-fab>
    </template>

    <div key="1">
      <v-tooltip interactive text="Upload">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" rounded>
            <v-icon icon="$FileUploadIcon"/>
            <upload-dialog :store="store"></upload-dialog>
          </v-btn>
        </template>
      </v-tooltip>
    </div>
    <div key="2">
      <v-tooltip interactive text="Download">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" rounded @click="download">
            <v-icon icon="$FileDownloadIcon"/>
          </v-btn>
        </template>
      </v-tooltip>
    </div>

  </v-speed-dial>
</template>

<script>
export default {
  name: "FileActionMenu",
  data() {
    return {}
  },
  props: {
    store: {
      type: Object,
      required: true
    }
  },
  methods: {
    async download() {
      await this.store.backup().then(response => {
        if (response) {
          let json = JSON.stringify(response.data)
          let element = document.createElement('a');
          element.setAttribute('download', response.fileName);
          element.setAttribute('href',
              'data:application/json;charset=utf-8,' + encodeURIComponent(json));

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();
          document.body.removeChild(element);
        }
      })

    }
  }
}
</script>

<style scoped lang="sass">

</style>