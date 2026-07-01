import { reactive } from "vue"
 
// для билда, исправлю)
interface GetData {
  city: any,
  info: any
}

export const data: GetData = reactive({
  city: null,
  info: null
})