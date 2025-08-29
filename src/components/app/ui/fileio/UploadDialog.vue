<template>
  <v-dialog activator="parent" max-width="500" persistent>
    <template v-slot:default="{ isActive }">
      <v-container class="section">
        <v-card>
          <v-card-title class="large-title-text">Please select file to Upload</v-card-title>
          <v-card-subtitle color="red">Be careful when choosing the import type</v-card-subtitle>
          <v-card-item>
            <v-file-input
                hide-details
                show-size
                class="input"
                label="Choose file"
                variant="solo"
                density="default"
                accept=".json"
                :rules="rules"
                v-model="selectedFile"
                @change="readFile"
                prepend-icon=""
                @click:clear="clear"
                @click:append="clear"
            >
              <template v-slot:loader v-if="inProcess">
                <v-progress-linear
                    color="primary"
                    indeterminate
                    rounded
                ></v-progress-linear>
              </template>
            </v-file-input>
          </v-card-item>
          <v-card-actions class="sections-row">
            <v-radio-group v-model="type" inline hide-details width="50%">
              <v-radio label="Replace" value="replace" color="warning"></v-radio>
              <v-radio label="Import" value="import" color="primary"></v-radio>
            </v-radio-group>
            <v-btn
                variant="flat"
                text="template"
                width="30%"
                @click="template"
            />
          </v-card-actions>
          <v-card-actions class="sections-row">
            <v-btn
                text="Close"
                width="50%"
                variant="tonal"
                color="grey"
                @click="isActive.value = false; clear()"
            />
            <v-btn
                text="Save"
                width="50%"
                variant="tonal"
                color="primary"
                :loading="loading"
            />
          </v-card-actions>
          <v-card-text class="small-text-center" color="warning" v-if="exMessage !== ''">
            <div>{{ exMessage }}</div>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
  </v-dialog>

</template>

<script>

export default {
  name: "UploadDialog",
  data() {
    return {
      reader: new FileReader(),
      selectedFile: [],
      inProcess: false,
      loading: false,
      type: "replace",
      json: [],
      exMessage: '',
      rules: [
        value => {
          return !value || !value.length || value[0].size < 2000000 || 'File Size exceeded"'
        },
      ],
    }
  },
  props: {
    store: {
      type: Object,
      required: true
    },
  },
  methods: {
    readFile() {
      this.inProcess = true
      this.reader.readAsText(this.selectedFile);
      this.reader.addEventListener('load', (e) => {
        try {
          this.json = JSON.parse(e.target.result.toString())
        } catch (e) {
          this.exMessage = "Not valid JSON"
        }
        this.inProcess = false
      })
    },
    save() {
      if (this.json !== undefined && this.selectedFile.length > 0) {
        this.save()
      } else {
        this.exMessage = "Please select File first"
      }
    },

    clear() {
      this.inProcess = false;
      this.exMessage = ''
      this.selectedFile = []
      this.json = {}
    },
    template() {
      let text = JSON.stringify(this.store.template());
      let element = document.createElement('a');
      element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', 'Template.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
    async upload() {
      //TODO upload
    }
  },
}
</script>

<style scoped lang="sass">
@use '@/styles/main'

.v-radio
  padding-left: 5px

</style>