import axios from "axios";
import { values } from "../constants";

export function getWeather() {
  if (values.value.city.trim().length < 3) {
    values.value.error = 'Введите корректное значение';
    return false
  } else{
    values.value.error=''
  }
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${values.value.city}&appid=d4cea6e448f300abb46acd7e5a624672&units=metric`)
    .then(res => (values.value.info = res.data))
}