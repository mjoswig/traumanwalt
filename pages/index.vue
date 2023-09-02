<template>
  <div>
    <div class="bg-gray-100 flex flex-col-reverse md:flex-row items-center shadow-md">
      <div class="px-4 py-6 md:p-8 w-full">
        <h1 class="mb-2">Finden Sie Ihren Traumanwalt</h1>
        <p class="text-xl mb-4">Unser Ziel ist es, Ihnen mit nur wenigen Mausklicks den perfekten Fachanwalt für Ihre individuellen Bedürfnisse zu präsentieren.</p>
        <form @submit.prevent>
          <fieldset class="flex flex-col sm:flex-row mb-4">
            <select class="border rounded-t-md sm:rounded-none sm:rounded-l-md p-2 w-full">
              <option value="">Rechtsgebiet auswählen</option>
            </select>
            <input class="border rounded-b-md border-t-0 sm:border-t sm:border-l-0 sm:rounded-none sm:rounded-r-md p-2 w-full" placeholder="Ort eingeben" />
          </fieldset>
          <div class="flex justify-end">
            <Btn class="w-full sm:w-fit">Anwälte suchen</Btn>
          </div>
        </form>
      </div>
      <div class="bg-cover h-56 sm:h-72 md:h-96 w-full" :style="`background-image: url(${require('@/assets/images/traumanwalt-home.jpeg')}); background-position: center 0; min-width: 40vw;`">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
