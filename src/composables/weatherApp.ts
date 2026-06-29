import axios from "axios";
import { data } from "../constants";
import { watch } from "vue";

export async function getWeather(event: MouseEvent) {
  event.preventDefault();
  // if (values.city.trim().length < 3) {
  //   values.error = 'Введите корректное значение';
  //   return false
  // } else{
  //   values.error=''
  // }
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=d4cea6e448f300abb46acd7e5a624672&units=metric&lang=ru`)
  data.info = response.data
  console.log(data.info);
}