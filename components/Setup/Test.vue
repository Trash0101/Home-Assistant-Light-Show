<script setup lang="ts">
import SetupCard from "~/components/Base/SetupCard.vue";
import {setStoreLights} from "#imports";
const setupStore = useHalsSetupStore()
const criticalError = ref(false)
const {data: dataAddress, pending, execute: executeAddress} = await useLazyAsyncData('address',
    () => $fetch('/api/checkAddress', {
      method: 'POST',
      body: {
        address: setupStore.address
      }
    }), {
      immediate: false
    }
)
const {data: dataKey, pending: pendingKey, execute: executeKey} = await useLazyAsyncData('key',
    () => $fetch('/api/checkKey', {
      method: 'POST',
      body: {
        key: setupStore.key
      }
    }), {
  immediate: false
    }
)
onMounted(async()=> {
  await executeAddress()
})
watch(dataAddress, async ()=> {
  console.log(dataAddress.value)
  if(dataAddress.value?.res === "success") {
    await executeKey()
  }
})
watch(dataKey, async ()=> {
  console.log(dataKey.value)
  if(dataKey.value?.res === "success") {
    const result = await setStoreLights()
    if(!result) {
      criticalError.value = result
    } else {
      navigateTo({
        path: '/dashboard'
      })
    }
  }
})
</script>

<template>
  <setup-card>
    <div class="testing">
      <div class="testing__text">
        <span class="testing__text--label">Checking connection to the server</span> <ph-spinner-gap class="testing__text--spinner" :size="32" />
      </div>
      <div class="testing__text">
        <span class="testing__text--label">Checking authorization</span> <ph-spinner-gap class="testing__text--spinner" :size="32" />
      </div>
      <div class="testing__text">
        <span class="testing__text--label">Loading required information</span> <ph-spinner-gap class="testing__text--spinner" :size="32" />
      </div>
    </div>
  </setup-card>

</template>

<style scoped lang="scss">
 @keyframes rotate {
   0%{
     transform: rotate(0);
   }
   100%{
     transform: rotate(360deg);
   }
 }
 .testing {
   display: flex;
   height: 60%;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   &__text {
     font-size: 1.6rem;
     display: flex;
     align-items: center;
     justify-content: space-between;
     margin-bottom: 3rem;
     &--label {
       margin-right: 1rem;
     }
     &--spinner{
       animation: 1s infinite steps(8) rotate;
       color: $highlight_alt;
     }
   }
 }
</style>