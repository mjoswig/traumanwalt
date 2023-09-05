<template>
  <div>
    <div>
      <h1 v-if="category.type === 'legal_fields'">Anwälte für {{ category.value.name }}</h1>
      <h1 v-if="category.type === 'cities'">Anwälte in {{ category.value.name }}</h1>
    </div>
    <section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AnwaelteCategoryPage',
  head() {
    return {
      title: `Anwälte ${this.category.value.name} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    let category = null

    const legalFields = await app.$axios.$get(`/api/legal-fields/${params.category}`)
    if (legalFields.length) {
      category = {
        value: legalFields[0],
        type: 'legal_fields'
      }
    }

    const cities = await app.$axios.$get(`/api/cities/${params.category}`)
    if (cities.length) {
      category = {
        value: cities[0],
        type: 'cities'
      }
    }

    if (!category) redirect('/anwaelte')

    return {
      category
    }
  }
}
</script>
