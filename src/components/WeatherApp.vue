<script lang="ts" setup>
  import { city, cityByYandex, geoFindMe, getWeather, mapLink, status } from '../composables/weatherApp';
  import { data } from '../constants';
  import { onMounted, ref } from 'vue';

  onMounted(async() => {
    await geoFindMe()
    time()
  })

  const date = new Date();
  const hours = date.getHours();
  const minutes:any = ref(date.getMinutes());
  const checkTime = ref('');
  const weatherAppClass = ref('');

  function time() {
    if (minutes.value < 10) {
      minutes.value = `0${minutes.value}`
    }

    if (hours < 6 && hours >= 0) {
      checkTime.value = 'night';
    } else if (hours < 12 && hours >= 6) {
      checkTime.value = 'morning';
    } else if (hours < 17 && hours >= 12) {
      checkTime.value = 'daytime';
    } else if (hours < 24 && hours >= 17) {
      checkTime.value = 'evening';
    } else {
      checkTime.value = 'ошибка';
    }

    weatherAppClass.value = `weather-app--${checkTime.value}`
  }
</script>

<template>
  <div :class="checkTime" class="wrapper">
    <div :class="weatherAppClass" class="weather-app">
      <h1 class="title">Погода</h1>
      <form @submit.prevent="getWeather($event)" action="#" class="app-box">
        <!-- <input name="input" class="input" v-model="data.city.name" type="text" placeholder="Город"> -->
        <input class="btn" type="submit" value="Узнать">
      </form> 
      
      <div class="city" >
        <p>{{ status }}</p>
        <div v-if="mapLink">{{ city }}</div>
        <img v-if="city" class="city__location" src="/location.png" alt="location">
        <button class="city__reload" @click="cityByYandex" v-if="city==='' && mapLink!=''">&#10227;</button>
      </div>
      
      <div class="time">{{ hours }}:{{ minutes }}</div>
  
      <div class="weather-output" v-if="data.city">
        <p class="weather-output__city-name">{{ data.city.name }}</p>
        <p class="weather-output__desc" v-if="data.city">{{ data.city.weather[0].description }}</p>
        <p class="weather-output__temp">{{ Math.round((data.city.main.temp)) }}°C</p> 
        
        <!-- <p  v-if="data.city">Минимальная температура: {{ Math.round(data.city.main.temp_min) }}°C</p> -->
        <!-- <p  v-if="data.city">Максимальная температура: {{ Math.round(data.city.main.temp_max) }}°C</p> -->
        <!-- <p  v-if="data.city"> {{ data.city.weather[0].main }}</p>  -->
      </div>

    </div>
  </div>

</template>

<style lang="scss" scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    font-family: 'Roboto';
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  .night {
    background-image: url(/night.jpg);
  }

  .morning {
    background-image: url(/morning.jpg);
  }

  .daytime {
    background-image: url(/daytime.webp);
  }

  .evening {
    background-image: url(/evening.jpg);
  }

  .weather-app {
    width: 500px; 
    height: 500px;
    padding: 50px;
    position: relative;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.25); 
    backdrop-filter: blur(12px); 
    &--night {
      background: rgba(255, 255, 255, 0.45); 
    }
  }

  .weather-output {
    text-align: center;
    &__city-name {
      font-size: 40px;
    }
    &__desc {
      margin-bottom: 10px;
    }
    &__temp {
      font-size: 30px;
    }
  }

  .app-box {
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    max-width: 455px;
    margin: 0 auto 20px auto;
  }

  .title {
    margin-bottom: 50px;
    font-size: 50px;
    line-height: 120%;
    text-align: center;
  }

  .info {
    font-size: 25px;
    margin-bottom: 30px;
    text-align: center;
  }

  .input {
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 25px;
  }

  .btn {
    cursor: pointer;
    background-color: #000;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 25px;
    font-family: 'Roboto';
  }

  // .weather-temp,
  // .weather-min-temp,
  // .weather-max-temp,
  // .weather-feels-like,
  // .weather-wind-speed {
  //   font-size: 40px;
  //   font-weight: 70;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;
  //   margin-bottom: 20px;
  // }

  // .weather-min-temp,
  // .weather-max-temp,
  // .weather-feels-like,
  // .weather-wind-speed {
  //   font-size: 25px;
  // }

  // .сelsius {
  //   width: 40px;
  //   margin-left: 10px;
  // }

  // .error {
  //   color: red;
  //   margin-top: 10px;
  //   font-size: 20px;
  // }

  .city {
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &__location {
      height: 30px;
    }
    &__reload {
      font-size: 23px;
      background: transparent;
      border: none;
      cursor: pointer;
    }
  }

  .time {
    position: absolute;
    right: 20px;
    top: 20px;
  }

  @media(max-width: 767px) {
    .app{
      padding: 20px;
    }
    .title {
      margin-bottom: 30px;
      font-size: 35px;
    }
    .input{
      width: 75%;
    }
  }

  @media(max-width: 491px) {
    .app{
      padding: 15px;
    }
    .title,
    .info{
      margin-bottom: 15px;
    }
    .weather-temp, .weather-min-temp, .weather-max-temp {
      margin-bottom: 15px;
    }
    .input{  
      padding: 6px;
    }
  }

  @media(max-width: 440px) {
    .weather-min-temp, .weather-max-temp, .info {
      font-size: 18px;
    }
  }
</style>