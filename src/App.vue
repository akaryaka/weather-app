<script>
  import axios from 'axios';
  import сelsius from './assets/сelsius.png';

  export default {
    data() {
      return{
        city: '',
        error: '',
        info: null,
        imageSrc: сelsius
      }
    },
    methods: {
      //валидация формы и получения данных погоды
      getWeather() {
        if(this.city.trim().length < 3) {
          this.error = 'Введите корректное значение';
          return false
        } else{
          this.error=''
        }

        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=d4cea6e448f300abb46acd7e5a624672&units=metric`)
          .then(res => (this.info = res.data))
      }
    }
  }
</script>

<template>
  <div class="app">
    <h1 class="title">Погода</h1>
    <p class="info" v-if="city!=''">Узнаем погоду в городе "{{city}}"</p>
    <p class="info" v-else disabled>Введите название города</p>
    <form action="#" class="app-box">
      <input class="input" v-model="city" type="text" placeholder="Город">
      <button class="btn" type="submit" v-on:click="getWeather()">Узнать</button>
    </form>
    <div class="error">{{ error }}</div>
    <p class="weather-temp" v-if="info != null">
      <span>  
        {{ Math.round(info.main.temp) }}
      </span>
      <img class="сelsius" :src="imageSrc" alt="image">
    </p>
    <p class="weather-min-temp" v-if="info !=null">
      {{ "Минимальная температура: " + Math.round(info.main.temp_min) }}
    </p>
    <p class="weather-max-temp" v-if="info != null">
      {{ "Максимальная температура: " + Math.round(info.main.temp_max) }}
    </p>
    <p class="weather-feels-like" v-if="info != null">
      {{ "Чувствуется как: " + Math.round(info.main.feels_like) }}
    </p>
    <p class="weather-wind-speed" v-if="info != null">
      {{ "Скорость ветра: " + Math.round(info.wind.speed) + "м/с" }}
    </p>
  </div>
</template>

<style>
  body{
    background: -webkit-linear-gradient(45deg, rgb(251, 251, 251) 22%, rgb(248, 213, 104) 100%);
    background: -moz-linear-gradient(45deg, rgb(251, 251, 251) 22%, rgb(248, 213, 104) 100%);
    background: linear-gradient(45deg, rgb(251, 251, 251) 22%, rgb(248, 213, 104) 100%);
  }

  .app{
    padding: 50px;
    border-radius: 10px;
    background-color: #F8D568;
  }
  .app-box{
    display: flex;
    justify-content: space-between;
    align-content: center;
    background-color: #fff;
    padding: 5px;
    border-radius: 10px;
    max-width: 455px;
    margin: 0 auto;
  }
  .title{
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