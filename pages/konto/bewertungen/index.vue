<template>
  <div>
    <div class="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
      <h1>Meine Bewertungen</h1>
      <div class="flex justify-end mb-6 lg:mb-0">
        <Btn @click="$router.push('/konto/bewertungen/einladen')">Mandanten einladen</Btn>
      </div>
    </div>
    <AccountSection v-if="!reviews.length">
      Sie haben noch keine Bewertungen erhalten.
    </AccountSection>
    <div v-if="reviews.length" class="flex flex-col space-y-4">
      <AccountSection v-for="(review, index) in reviews" :key="index">
        <div class="flex flex-col space-y-2 xl:flex-row xl:items-center xl:space-x-2 xl:space-y-0 mb-2">
          <star-rating :read-only="true" :show-rating="false" :star-size="30" v-model="review.rating" />
          <h2 class="text-lg" style="margin-top: 4px;">{{ review.title }}</h2>
        </div>
        <span class="block text-gray-500 text-sm mb-2">von <b>{{ review.author || 'Anonym' }}</b> am {{ $moment(review.created_at).format('DD.MM.YYYY') }}</span>
        <p class="mb-4">„{{ review.description }}“</p>
        <div>
          <h3 class="text-base mb-1">Ihr Kommentar</h3>
          <p v-show="review.comment" class="border-l-4 pl-2">{{ review.comment }}</p>
          <textarea v-show="!review.comment" class="border px-2 py-1 rounded-md w-full" placeholder="Bedanken Sie sich für die Bewertung oder äußern Sie sich zu Kritik..." v-model="reviewComments['review-' + review.id]" />
        </div>
        <div v-show="!review.comment" class="flex justify-end mt-1">
          <Btn type="light" :is-loading="isSendingComment['review-' + review.id]" @click="sendComment(review)">Kommentar absenden</Btn>
        </div>
      </AccountSection>
      <a class="cursor-pointer flex items-center space-x-2" v-show="reviews.length > 0 && reviews.length < reviews[0].total_count" @click="loadMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <span>Ältere Bewertungen laden</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoBewertungenIndexPage',
  head() {
    return {
      title: 'Meine Bewertungen - Traumanwalt'
    }
  },
  async asyncData({ app, store }) {
    const page = 1
    const pageLength = 10
    const reviews = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/reviews?page=${page}&page_length=${pageLength}`)

    let reviewComments = {}
    let isSendingComment = {}
    reviews.forEach(r => {
      reviewComments['review-' + r.id] = null
      isSendingComment['review-' + r.id] = false
    })

    return {
      page,
      pageLength,
      reviews,
      reviewComments,
      isSendingComment
    }
  },
  methods: {
    async sendComment(review) {
      this.isSendingComment['review-' + review.id] = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/reviews/update`, {
        ...review,
        comment: this.reviewComments['review-' + review.id]
      })
      this.$toast.success('Ihre Kommentar wurde erfolgreich gesendet!')
      this.isSendingComment['review-' + review.id] = false
      window.location.href = '/konto/bewertungen'
    },
    async loadMore() {
      this.page++
      const reviews = await this.$axios.$get(`/api/users/${this.$store.state.userData.firebase_uid}/reviews?page=${this.page}&page_length=${this.pageLength}`)
      this.reviews.push(...reviews)
    }
  }
}
</script>
