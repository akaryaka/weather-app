<script setup>
  import { getWeather } from '../composables/weatherApp';
  import { values } from '../constants';
</script>

<template>
  <div class="app">
    <h1 class="title">Погода</h1>
    <p class="info">Введите название города</p>
    <form action="#" class="app-box">
      <input class="input" v-model="values.city" type="text" placeholder="Город">
      <button class="btn" type="submit" @click="getWeather">Узнать</button>
    </form>
    <div class="error">{{ values.error }}</div>
    <p class="weather-temp" v-if="values.info != null">
      <span>  
        {{ Math.round(values.info.main.temp) }}
      </span>
    </p>
  </div>
</template>

<style scoped>
   body {
    background: linear-gradient(45deg, rgb(251, 251, 251) 22%, rgb(248, 213, 104) 100%);
  }

  .app {
    padding: 50px;
    border-radius: 10px;
    background-color: #F8D568;
  }

  .app-box {
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    max-width: 455px;
    margin: 0 auto;
  }

  .title {
    margin-bottom: 50px;
    font-size: 50px;
    line-height: 120%;
    text-align: center;
  }

  .info{
    font-size: 25px;
    margin-bottom: 30px;
    text-align: center;
  }

  .input{
    padding: 10px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 25px;
  }

  .btn{
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

  .weather-temp,
  .weather-min-temp,
  .weather-max-temp,
  .weather-feels-like,
  .weather-wind-speed{
    font-size: 40px;
    font-weight: 70;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .weather-min-temp,
  .weather-max-temp,
  .weather-feels-like,
  .weather-wind-speed{
    font-size: 25px;
  }

  .сelsius{
    width: 40px;
    margin-left: 10px;
  }

  .error{
    color: red;
    margin-top: 10px;
    font-size: 20px;
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