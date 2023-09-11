<template>
  <div>
    <h1 class="mb-6">Meine Nachrichten</h1>
    <AccountSection v-if="!conversations.length">
      Sie haben noch keine Nachrichten erhalten.
    </AccountSection>
    <div v-if="conversations.length" class="flex flex-col space-y-4">
      <nuxt-link :to="`/konto/nachrichten/${conversation.id}`" class="text-gray-700 hover:text-gray-700 hover:no-underline" :class="{ 'font-bold': conversation.unread_messages }" v-for="(conversation, index) in conversations" :key="index">
        <AccountSection class="hover:bg-blue-100 flex flex-col space-y-2 lg:flex-row lg:space-y-0 w-full">
          <div class="text-sm flex items-center justify-between space-x-4 w-full lg:hidden">
            <svg v-if="conversation.unread_messages" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
            <svg v-if="!conversation.unread_messages" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">
              <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>
            </svg>
            {{ $moment(conversation.created_at).format('DD.MM.YYYY, HH:mm') }}
          </div>
          <div class="flex items-center w-full lg:w-1/3">
            <svg v-if="conversation.unread_messages" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-envelope hidden lg:block lg:mr-4" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
            <svg v-if="!conversation.unread_messages" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-envelope-open hidden lg:block lg:mr-4" viewBox="0 0 16 16">
              <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>
            </svg>
            <span><span class="lg:hidden">„{{ conversation.subject }}“ von </span>{{ conversation.from }}</span>
          </div>
          <div class="hidden lg:block lg:w-full lg:w-1/2">{{ conversation.subject }}</div>
          <div class="hidden lg:block lg:w-56 lg:text-right">{{ $moment(conversation.last_message_created_at || conversation.created_at).format('DD.MM.YYYY, HH:mm') }}</div>
        </AccountSection>
      </nuxt-link>
      <a class="cursor-pointer flex items-center space-x-2" v-show="conversations.length > 0 && conversations.length < conversations[0].total_count" @click="loadMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <span>Ältere Nachrichten laden</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoNachrichtenPage',
  head() {
    return {
      title: 'Meine Nachrichten - Traumanwalt'
    }
  },
  async asyncData({ app, store }) {
    const page = 1
    const pageLength = 10
    const conversations = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/conversations?page=${page}&page_length=${pageLength}`)
    return {
      page,
      pageLength,
      conversations
    }
  },
  methods: {
    async loadMore() {
      this.page++
      const conversations = await this.$axios.$get(`/api/users/${this.$store.state.userData.firebase_uid}/conversations?page=${this.page}&page_length=${this.pageLength}`)
      this.conversations.push(...conversations)
    }
  }
}
</script>
