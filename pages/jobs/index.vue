<template>
  <div class="-mt-4">
    <section class="bg-gray-100 flex flex-col-reverse md:flex-row items-center rounded-md shadow-sm mb-12">
      <div class="px-4 py-6 md:p-8 w-full">
        <h1 class="mb-2">Stellenmarkt und Jobbörse für Rechtsanwälte und Juristen</h1>
        <p class="text-xl mb-5">Sie suchen einen neuen Job? Bei uns finden Sie aktuelle Stellenangebote für Anwälte, Referendare und Praktikanten in ganz Deutschland.</p>
        <Btn @click="$router.push('/jobs/inserieren')">Stellenanzeige erstellen</Btn>
      </div>
      <div class="jobs-hero-image bg-cover h-56 sm:h-72 md:h-96 rounded-t-md md:rounded-none bg-left-top xl:rounded-r-md w-full" :style="`background-image: url(${require('@/assets/images/traumanwalt-jobs.jpeg')}); min-width: 40vw;`">
      </div>
    </section>
    <section>
      <h2 class="mb-4">Aktuelle Stellenanzeigen</h2>
      <p>Aktuell haben wir keine offenen Stellenanzeigen in unserer Jobbörse. Bitte besuchen Sie uns zu einem späteren Zeitpunkt wieder!</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'JobsPage',
  head() {
    return {
      title: 'Jobbörse für Rechtsanwälte und Juristen - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  }
}
</script>

<style scoped>
@media (min-width: 768px) and (max-width: 1280px) {
  .jobs-hero-image {
    background-position: 25% 0;
  }
}
</style>