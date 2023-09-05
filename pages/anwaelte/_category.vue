<template>
  <div>
    <h1 v-if="category.type === 'legal_fields'">Anwälte für {{ category.value.name }}</h1>
    <h1 v-if="category.type === 'cities'">Anwälte in {{ category.value.name }}</h1>
    <div>
      <p v-if="!category.attorneys.length" class="mt-4">Wir haben keine Anwälte in dieser Kategorie gefunden. Sie sind Anwalt und möchten mehr Mandanten gewinnen? <nuxt-link to="/mitgliedschaft">Werden Sie jetzt Traumanwalt</nuxt-link>.</p>
      <AttorneySearch v-if="category.attorneys.length" :attorneys="category.attorneys" class="mt-8" />
    </div>
  </div>
</template>

<script>
import AttorneySearch from '../../components/AttorneySearch.vue'

export default {
    name: 'AnwaelteCategoryPage',
    head() {
        return {
            title: `Anwälte ${this.category.value.name} - Traumanwalt`
        };
    },
    async asyncData({ app, params, redirect }) {
        let category = null;
        const legalFields = await app.$axios.$get(`/api/legal-fields/${params.category}`);
        if (legalFields.length) {
            const attorneys = await app.$axios.$get(`/api/legal-fields/${params.category}/attorneys`);
            category = {
                value: legalFields[0],
                type: 'legal_fields',
                attorneys
            };
        }
        if (!legalFields.length) {
            const cities = await app.$axios.$get(`/api/cities/${params.category}`);
            if (cities.length) {
                const attorneys = [];
                category = {
                    value: cities[0],
                    type: 'cities',
                    attorneys
                };
            }
        }
        if (!category)
            redirect('/anwaelte');
        return {
            category
        };
    },
    components: { AttorneySearch }
}
</script>
