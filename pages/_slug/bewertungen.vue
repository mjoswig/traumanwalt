<template>
  <div>
    <section class="mb-4 md:mb-8">
      <h1>Bewertungen für {{ fullName }}</h1>
    </section>
    <div class="flex justify-between">
      <div class="flex flex-col space-y-1 sm:flex-row sm:space-x-2 sm:space-y-0">
        <span class="text-3xl lg:text-4xl">{{ (Math.round(averageRating * 100) / 100).toFixed(1).replace('.', ',') }}</span>
        <div>
          <star-rating class="mb-1" :increment="0.1" :read-only="true" :show-rating="false" :star-size="30" v-model="averageRating" />
          <span class="block" style="margin-left: 4px;">{{ reviewCount }} Bewertung{{ reviewCount !== 1 ? 'en' : '' }}</span>
        </div>
      </div>
      <div>
        <Btn class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg>
          <span>Bewerten</span>
        </Btn>
      </div>
    </div>
    <p class="text-xl mt-4 md:mt-8" v-if="!reviews.length">{{ fullName }} hat noch keine Bewertungen erhalten.</p>
    <section v-if="reviews.length" class="flex flex-col space-y-4 md:space-y-8 mt-4 md:mt-8">
      <div class="border border-transparent rounded-md shadow-md p-4" v-for="(review, index) in reviews" :key="index">
        <div class="flex flex-col space-y-1 xl:flex-row xl:items-center xl:space-x-2 xl:space-y-0 mb-2">
          <star-rating :read-only="true" :show-rating="false" :star-size="30" v-model="review.rating" />
          <h3 class="text-lg" style="margin-top: 4px;">{{ review.title }}</h3>
        </div>
        <span class="block text-gray-500 mb-2">von <b>{{ review.author || 'Anonym' }}</b> am {{ $moment(review.created_at).format('DD.MM.YYYY') }}</span>
        <p>„{{ review.description }}“</p>
        <div v-if="review.comment" class="mt-4">
          <h4 class="text-base mb-1">Kommentar von {{ fullName }}</h4>
          <p v-show="review.comment" class="border-l-4 pl-2">{{ review.comment }}</p>
        </div>
      </div>
      <InfiniteScroll :enough="page >= totalPages" @load-more="loadMore" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfileBewertungenPage',
  head() {
    return {
      title: `Bewertungen für ${this.fullName} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const page = 1
    const pageLength = 10

    const reviews = await app.$axios.$get(`/api/profiles/${params.slug}/reviews?page=${page}&page_length=${pageLength}`)
    const user = reviews.user
    if (!user) redirect('/anwaelte')

    return {
      page,
      pageLength,
      user: reviews.user,
      reviews: reviews.reviews
    }
  },
  computed: {
    totalPages() {
      if (!this.reviews.length) return 0
      return Math.ceil(this.reviews[0].total_count / this.pageLength)
    },
    fullName() {
      return `${this.user.first_name} ${this.user.last_name}`
    },
    reviewCount() {
      return this.reviews[0] ? parseInt(this.reviews[0].total_count) : 0
    },
    averageRating() {
      return this.reviews[0] ? (parseInt(this.reviews[0].total_sum) / parseInt(this.reviews[0].total_count)) : 0
    }
  },
  methods: {
    async loadMore() {
      this.page++
      const reviews = await this.$axios.$get(`/api/profiles/${this.user.slug}/reviews?page=${this.page}&page_length=${this.pageLength}`)
      this.reviews.push(...reviews.reviews)

      // filter out duplicates
      this.reviews = this.reviews.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
    }
  }
}
</script>
