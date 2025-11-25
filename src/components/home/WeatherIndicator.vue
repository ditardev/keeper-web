<template>
  <v-card>
    <v-card-actions>
      <v-btn
          text="callApi"
          @click="callApi"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
//https://open-meteo.com/en/docs?current=temperature_2m&forecast_days=1&timezone=Europe%2FMoscow
import axios from "axios";

export default {
  name: "WeatherIndicator",
  data() {
    return {
      data: {},
      places: [
        {minsk: {latitude: 53.927671, longitude: 27.434405}},
        //https://api.gismeteo.net/v2/weather/current/?latitude=53.92&longitude=27.43
      ]
    }
  },
  methods: {
    async callApi() {
      let url = "https://api.open-meteo.com/v1/forecast"
      let params = {
        latitude: 53.927671,
        longitude: 27.434405,
        hourly: 'temperature_2m,rain,snowfall,wind_speed_10m,surface_pressure',
        current: 'temperature_2m,wind_speed_10m,rain,cloud_cover,is_day,snowfall',
        timezone: 'Europe%2FMoscow',
        forecast_days: 1
      }
      const res = await axios.get(url, {
        params,
        paramsSerializer: function paramsSerializer(params) {
          return Object.entries(Object.assign({}, params)).
              map(([key, value]) => `${key}=${value}`).
              join('&');
        }
      }).then(response => {
        this.data = response.data
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="sass" scoped>

</style>