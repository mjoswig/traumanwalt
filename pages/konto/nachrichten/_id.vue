<template>
  <div>
    <h1 class="mb-6">{{ conversationMessages[0].subject }}</h1>
    <div ref="chatBox" class="border p-4 flex flex-col space-y-4 overflow-y-scroll mb-3" style="height: 500px;">
      <div class="flex w-full" :class="{ 'justify-start': !message.sent, 'justify-end': message.sent }" v-for="(message, index) in conversationMessages" :key="index">
        <div class="w-full" style="max-width: 600px;">
          <span class="block text-xs mb-1">{{ message.sent ? `Sie schrieben ` : `${message.from} schrieb ` }} am {{ $moment(message.created_at).format('DD.MM.YYYY, HH:mm') }}</span>
          <div class="px-4 py-2 rounded-xl text-sm lg:text-base" :class="{ 'bg-blue-100': message.sent, 'bg-gray-100': !message.sent }">
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent>
      <fieldset>
        <wysiwyg class="w-full" placeholder="Ihre Nachricht" v-model="reply" />
      </fieldset>
      <div class="flex justify-end mt-3">
        <Btn :is-loading="isSending" @click="sendReply">Absenden</Btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'KontoNachrichtenverlaufPage',
  head() {
    return {
      title: `${this.conversationMessages[0].subject} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect, store }) {
    const conversationMessages = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/conversations/${params.id}`)
    if (!conversationMessages || !conversationMessages.length) redirect('/konto/nachrichten')
    return {
      conversationId: params.id,
      conversationMessages,
      isSending: false,
      reply: ''
    }
  },
  methods: {
    async sendReply() {
      this.isSending = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/conversations/${this.conversationId}/reply`, {
        text: this.reply
      })
      this.reply = ''
      this.conversationMessages = await this.$axios.$get(`/api/users/${this.$store.state.userData.firebase_uid}/conversations/${this.conversationId}`)
      this.isSending = false
    }
  },
  async mounted() {
    //scroll to end of chat box
    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight

    // mark conversation as read
    await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/conversations/${this.conversationId}/read`)
  }
}
</script>
