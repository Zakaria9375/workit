import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSameStore = defineStore('same', () => {
  const shippingAddress = reactive({
    sCountry: "",
    sCity:"",
    sZipCode: "",
    sStreet: "",
    sAdditionalInfo: ""
  })
  const billingAddress = reactive({
    bCountry: "",
    bCity:"",
    bZipCode: "",
    bStreet: "",
    bAdditionalInfo: ""
  })
  return { shippingAddress, billingAddress }
})
