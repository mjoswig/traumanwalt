<template>
  <div>
    <h1 class="mb-6">Rechtstipps</h1>
    <div>
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :line-numbers="true"
        :sort-options="{ enabled: false }"
      >
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoRechtstippsPage',
  head() {
    return {
      title: 'Rechtstipps - Traumanwalt'
    }
  },
  asyncData() {
    return {
      columns: [
        {
          label: 'Titel',
          field: 'title'
        }
      ],
      rows: []
    }
  }
}
</script>
