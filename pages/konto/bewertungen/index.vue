<template>
  <div>
    <div class="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-6">
      <h1>Bewertungen</h1>
      <div class="flex justify-end">
        <Btn @click="$router.push('/konto/bewertungen/einladung')">Mandanten einladen</Btn>
      </div>
    </div>
    <AccountSection>
      Sie haben noch keine Bewertungen erhalten.
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoBewertungenIndexPage'
}
</script>
