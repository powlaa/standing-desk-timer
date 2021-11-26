<template>
  <div class="container">
    <h1>{{ currentTimerTime }} {{ activeTimer }}</h1>
    <v-card class="card" elevation="2">
      <v-card-title>Timer</v-card-title>
      <v-card-text>
        <div class="sitting-container">
          <v-row>
            <v-col>
              <VueSlider
                class="slider"
                v-model="sittingValue"
                :min="min"
                :max="max"
                :interval="interval"
                process-style="#03A688"
                tooltip="always"
              >
              </VueSlider>
            </v-col>
          </v-row>
          <v-btn
            color="#6CD9C5"
            dark
            elevation="2"
            rounded
            @click="checkInSitting"
            >Start sitting</v-btn
          >
        </div>
        <div class="standing-container">
          <VueSlider
            class="slider"
            v-model="standingValue"
            :min="min"
            :max="max"
            :interval="interval"
            process-style="#03A688"
            tooltip="always"
          >
          </VueSlider>
          <v-btn
            class="align-center"
            color="#6CD9C5"
            dark
            elevation="2"
            rounded
            @click="checkInStanding"
            >Start standing</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <audio ref="stand" src="@/assets/stand-up.mp3" preload></audio>
    <audio ref="sit" src="@/assets/sit-down.mp3" preload></audio>
  </div>
</template>

<script>
import { Timer } from "easytimer.js";

export default {
  title() {
    if (this.currentTimerTime === 0) {
      return "Standing desk timer";
    }
    return `${this.currentTimerTime} ${this.activeTimer}`;
  },
  name: "Timer",
  props: {},
  data: () => {
    return {
      currentTimerTime: 0,
      timer: new Timer(),
      sittingValue: 60,
      standingValue: 30,
      min: 5,
      max: 120,
      interval: 5,
      activeTimer: "sitting",
    };
  },
  methods: {
    checkInSitting() {
      console.log("start sitting timer");
      this.activeTimer = "sitting";
      this.timer.start({
        countdown: true,
        startValues: { minutes: this.sittingValue },
      });
      this.currentTimerTime = this.timer.getTimeValues().toString();
    },
    checkInStanding() {
      console.log("start standing timer");
      this.activeTimer = "standing";
      this.timer.start({
        countdown: true,
        startValues: { minutes: this.standingValue },
      });
      this.currentTimerTime = this.timer.getTimeValues().toString();
    },
  },
  created() {
    this.timer.addEventListener("secondsUpdated", () => {
      this.currentTimerTime = this.timer.getTimeValues().toString();
    });
    this.timer.addEventListener("targetAchieved", () => {
      if (this.activeTimer === "sitting") {
        console.log("time to stand up");
        this.$refs.stand.play();
        this.checkInStanding();
      } else {
        console.log("time to sit down");
        this.$refs.sit.play();
        this.checkInSitting();
      }
    });
  },
};
</script>

<style scoped>
h1 {
  font-size: 3em;
  margin-top: 20px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
}
.card {
  width: 50%;
  margin-top: 30px;
}
.sitting-container {
  margin: 30px 0 0 0;
}
.standing-container {
  margin: 70px 0 5px 0;
}
.slider {
  margin-bottom: 20px;
}
</style>
