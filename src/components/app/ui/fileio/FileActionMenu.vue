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

    <v-btn key="1" icon="$FileUploadIcon"/>
    <v-btn key="2" icon="$FileDownloadIcon" />

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
  methods:{
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