<template>
  <div class="flex flex-col items-center justify-center">
    <div class="lg:w-2/3">
      <h1 class="text-center mb-2">Kostenlos registrieren</h1>
      <p class="text-center text-lg lg:text-xl">Sind Sie Anwalt oder benötigen Sie Hilfe von einem Anwalt?</p>
      <form class="mt-4 md:mt-8" @submit.prevent>
        <div class="grid md:grid-cols-2 gap-4 mb-4 md:mb-8">
          <fieldset class="border cursor-pointer p-4 rounded-md" :class="{ 'selected': !isClient }" @click="isClient = false">
            <div class="mb-1">
              <img class="h-24 w-auto mb-4" src="@/assets/images/signup-attorney.png" />
              <input class="h-4 w-4 mr-1" type="radio" :value="false" v-model="isClient" />
              <label class="font-bold text-2xl">Ich bin Anwalt</label>
            </div>
            <p class="text-gray-500 text-lg">Ich möchte ein Anwaltsprofil erstellen und meine Rechtsdienstleistungen auf Traumanwalt anbieten.</p>
          </fieldset>
          <fieldset class="border cursor-pointer p-4 rounded-md" :class="{ 'selected': isClient }" @click="isClient = true">
            <div class="mb-1">
              <img class="h-24 w-auto mb-4" src="@/assets/images/signup-client.png" />
              <input class="h-4 w-4 mr-1" type="radio" :value="true" v-model="isClient" />
              <label class="font-bold text-2xl">Ich bin Mandant</label>
            </div>
            <p class="text-gray-500 text-lg">Ich möchte mich von Anwälten beraten lassen und Rechtsdienstleistungen in Anspruch nehmen.</p>
          </fieldset>
        </div>
        <fieldset class="flex justify-end">
          <Btn class="w-full sm:w-fit" @click="continueToSignUpForm">Weiter</Btn>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistrierenPage',
  head() {
    return {
      title: 'Registrieren - Traumanwalt'
    }
  },
  data() {
    return {
      isClient: false
    }
  },
  methods: {
    continueToSignUpForm() {
      if (!this.isClient) {
        this.$router.push('/traumanwalt-werden')
      } else {
        this.$router.push('/mandant-werden')
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.selected {
  border-color: #008abd;

  & label {
    color: #008abd;
  }
}
</style>
