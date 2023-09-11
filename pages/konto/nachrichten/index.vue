<template>
  <div>
    <h1 class="mb-6">Meine Nachrichten</h1>
    <AccountSection v-if="!conversations.length">
      Sie haben noch keine Nachrichten erhalten.
    </AccountSection>
    <div v-if="conversations.length" class="flex flex-col space-y-4">
      <AccountSection class="flex flex-col space-y-2 lg:flex-row lg:space-y-0 w-full" v-for="(conversation, index) in conversations" :key="index">
        <div class="flex items-center space-x-4 w-full lg:w-1/3">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
          </svg>
          <span>{{ conversation.from }}</span>
        </div>
        <div class="w-full lg:w-1/3">{{ conversation.subject }}</div>
      </AccountSection>
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
    const conversations = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/conversations?page=1&page_length=10`)
    console.log(conversations)
    return {
      conversations
    }
  }
}
</script>
