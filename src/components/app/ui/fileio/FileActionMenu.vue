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
          <v-btn v-bind="props" icon="$FileUploadIcon"/>
        </template>
      </v-tooltip>
    </div>
    <div key="2">
      <v-tooltip interactive text="Download">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="$FileDownloadIcon"/>
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
    stote: {
      type: Function,
      required: true
    }
  },
  methods: {
    // async download() {
    //   let json = await this.service.getBackUp()
    //   let text = JSON.stringify(json);
    //   let filename = this.service.getBackUpFileName();
    //   let element = document.createElement('a');
    //   element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    //   element.setAttribute('download', filename);
    //
    //   element.style.display = 'none';
    //   document.body.appendChild(element);
    //
    //   element.click();
    //   document.body.removeChild(element);
    // }
  }
}
</script>

<style scoped lang="sass">

</style>