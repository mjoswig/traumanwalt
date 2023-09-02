<template>
  <div>
    <section class="bg-gray-100 flex flex-col-reverse md:flex-row items-center rounded-md shadow-md mb-12">
      <div class="px-4 py-6 md:p-8 w-full">
        <h1 class="mb-2">Finden Sie Ihren Traumanwalt</h1>
        <p class="text-xl mb-4 md:mb-8">Unser Ziel ist es, Ihnen mit nur wenigen Mausklicks den perfekten Fachanwalt für Ihre individuellen Bedürfnisse zu präsentieren.</p>
        <form @submit.prevent>
          <fieldset class="flex flex-col sm:flex-row mb-4 md:mb-6">
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
      <div class="bg-cover h-56 sm:h-72 md:h-96 rounded-t-md md:rounded-none xl:rounded-r-md w-full" :style="`background-image: url(${require('@/assets/images/traumanwalt-home-1.jpeg')}); background-position: center 0; min-width: 40vw;`">
      </div>
    </section>
    <section class="mb-12">
      <h2>Anwälte nach Rechtsgebiet</h2>
    </section>
    <section class="grid md:grid-cols-2 gap-8 xl:items-center">
      <div>
        <img class="rounded-md shadow-sm" src="@/assets/images/traumanwalt-home-2.jpeg" />
      </div>
      <div>
        <h2 class="mb-4">Spezialisierte Anwälte lösen Ihr rechtliches Problem</h2>
        <p class="mb-4">Traumanwalt erleichtert ihnen die Suche nach einem passenden Anwalt. Hier finden Sie schnell und bequem spezialisierte & geprüfte Rechtexperten für Ihr individuelles Rechtsproblem.</p>
        <p>Traumanwalt arbeitet ausschließlich mit erfahrenen Anwälten zusammen, um Ihr rechtliches Anliegen schnellstmöglich und kompetent zu lösen.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
