<template>
  <v-card height="200">
    <v-card-text>
      <v-row>
        <v-text-field
            hide-details
            type="number"
            label="CurrentBalance"
            variant="outlined"
            density="compact"
            v-model="inputBalance"
        ></v-text-field>
        <v-btn
            class="v-btn-delete"
            variant="plain"
            icon="$TrashIcon"
            @click="clear"
        >
        </v-btn>
        <v-text-field
            hide-details
            label="Balance for the day"
            variant="outlined"
            density="compact"
            v-model="calculatedValue"
            disabled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
            hide-details
            type="number"
            label="DayOn"
            variant="outlined"
            density="compact"
            v-model="dayOn"
        ></v-text-field>
        <v-text-field
            hide-details
            type="number"
            label="DayOff"
            variant="outlined"
            density="compact"
            v-model="dayOff"
        ></v-text-field>
        <v-text-field
            hide-details
            label="DaysLeft"
            variant="outlined"
            density="compact"
            v-model="daysLeft"
            disabled
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
            hide-details
            type="number"
            label="Reserved:"
            variant="outlined"
            density="compact"
            v-model="reserved"
        ></v-text-field>
        <v-text-field
            hide-details
            type="number"
            label="Multiplier:"
            variant="outlined"
            density="compact"
            v-model="multiplier"
        ></v-text-field>
        <v-text-field
            hide-details
            type="number"
            label="ResultReserved:"
            variant="outlined"
            density="compact"
            v-model="reserverResult"
            disabled
        ></v-text-field>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
          class="v-btn-calculate"
          variant="tonal"
          text="Calculate"
          @click="calcDaysLeft"
      ></v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: "BalanceCalculation",

  data() {
    return {
      dayOn: '',
      dayOff: '',
      daysLeft: '',
      calculatedValue: '',
      inputBalance: '',

      reserved: '',
      multiplier: '',
      reserverResult: '',

    };
  },
  methods: {
    calcDaysLeft() {
      const currentDate = new Date();
      const todayDate = new Date(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + this.dayOn);
      if (this.dayOn <= this.dayOff) {
        this.daysLeft = this.dayOff - this.dayOn;
      } else if (this.dayOn > this.dayOff) {
        const nearestFirstDay = new Date(todayDate.getFullYear() + '-' + (todayDate.getMonth() + 2) + '-' + this.dayOff);
        const timeDifference = nearestFirstDay.getTime() - todayDate.getTime();
        this.daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
      } else {
        this.daysLeft = 0;
      }
      this.calcDayLimit();
    },
    calcDayLimit() {
      if (this.daysLeft > 0) {
        this.calculatedValue = (this.calcResultBalance(this.inputBalance) / this.daysLeft).toFixed(2);
      } else {
        this.calculatedValue = this.calcResultBalance(this.inputBalance);
      }
    },
    calcResultBalance(value) {
      if (this.reserved === '') {
        return value;
      }
      this.calcResurved()
      return value - this.reserverResult;
    },
    calcResurved(){
      let tempMultiplier=1
      if(this.multiplier.indexOf(",") !== -1){
        this.multiplier = this.multiplier.replace(",",".")
      }
      if (this.multiplier !== "") {
        tempMultiplier = this.multiplier
      }
      this.reserverResult = this.reserved * tempMultiplier;
    },
    clear() {
      this.inputBalance = '';
      this.calculatedValue = '';
      this.reserved = '';
      this.multiplier = 1;
    },
    // calcMaxDaysInCurrentMonth(){
    //   let currentDate = new Date()
    //   return new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 0).getDate()
    // }
  },
  mounted() {
    this.dayOn = new Date().getDate();
    if (this.dayOn < 15) {
      this.dayOff = 15;
    } else {
      this.dayOff = 26;
    }
    this.calcDaysLeft();
  },

}
</script>

<style lang="sass" scoped>
@use '@/styles/main'


.v-btn-delete
  margin: 0 auto 0 auto

.v-btn-calculate
  width: 100%
  position: absolute
  bottom: 0px

.v-text-field
  width: 20%
</style>