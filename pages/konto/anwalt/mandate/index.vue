<template>
  <div>
    <h1 class="mb-6">Mandatsbörse</h1>
    <AccountSection>
      Derzeit sind keine offenen Mandate verfügbar.
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoAnwaltMandatePage',
  head() {
    return {
      title: 'Mandatsbörse - Traumanwalt'
    }
  }
}
</script>
