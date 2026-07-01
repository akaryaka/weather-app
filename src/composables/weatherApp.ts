import axios from "axios";
import { data } from "../constants";
import { ref } from "vue";
 
export const mapLink = ref('')
export const href = ref('')
export const status = ref('')
export const city = ref('')

const lat = ref('')
const lon = ref('')

// не смотреть :)
const YANDEX_API_KEY = '42ba24f6-3a76-4f9f-9192-23201360664a';

export async function getWeather(event: SubmitEvent) {
  event.preventDefault()
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=e94b07c466b1419a215d267e5ce79924&units=metric&lang=ru`)
  
  data.city = response.data
}

async function getCityByYandex(lon: string, lat: string, apiKey: string) {
  try {
    const response = await axios.get(`https://geocode-maps.yandex.ru/v1/?apikey=${apiKey}&geocode=${lon},${lat}&format=json&lang=ru_RU`);
    const data = await response.data;
    const members = data.response.GeoObjectCollection.featureMember;
    
    if (members && members.length > 0) {
      const components = members[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;    
      const cityComponent = components.find((component:any) => component.kind === 'locality');
      
      return cityComponent ? cityComponent.name : 'Город не определен';
    }
    
    return 'Город не определен';
  } catch (error) {
    console.error('Ошибка при запросе к Яндекс:', error);
    return 'Ошибка';
  }
}

export async function cityByYandex() {
  city.value = await getCityByYandex(lon.value, lat.value, YANDEX_API_KEY).then(city => city);
  return city.value
}

export function geoFindMe() {
  async function success(position: any) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    lat.value = latitude
    lon.value = longitude
    status.value = "";

    href.value = await `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.value = `Широта: ${latitude} °, Долгота: ${longitude} °`;
  }

  function error() {
    status.value = "Невозможно получить ваше местоположение";
  }
  
  if (!navigator.geolocation) {
    status.value = "Geolocation не поддерживается вашим браузером";
  } else {
    status.value = "Определение местоположения…";
    navigator.geolocation.getCurrentPosition(success, error);
  }
}

