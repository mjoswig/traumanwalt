<template>
  <div>
    <h1 class="mb-6">{{ conversationSubject }}</h1>
    <div class="border-t border-l border-r flex space-x-4 px-4 py-2">
      <div>
        <img class="bg-cover border h-10 w-10 md:h-12 md:w-12 rounded-full" :style="`background-image: url(${require('@/assets/images/photo-default.jpeg')});`" />
      </div>
      <div>
        <b class="block">{{ conversationRecipientFullName }}</b>
        <div class="flex flex-col space-y-1 lg:flex-row lg:space-x-2 lg:space-y-0 text-sm">
          <span class="flex space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-at mt-1" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z"/>
              <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z"/>
            </svg>
            <span>{{ conversationRecipientEmail }}</span>
          </span>
          <span class="flex space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone mt-1" viewBox="0 0 16 16">
              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
            <span>{{ conversationRecipientPhone }}</span>
          </span>
        </div>
      </div>
    </div>
    <div ref="chatBox" class="border p-4 flex flex-col space-y-4 overflow-y-scroll mb-3" style="height: 500px;">
      <div class="flex w-full" :class="{ 'justify-start': !message.sent, 'justify-end': message.sent }" v-for="(message, index) in conversationMessages" :key="index">
        <div class="w-full" style="max-width: 600px;">
          <span class="block text-xs mb-1">{{ message.sent ? `Sie schrieben ` : `${message.from_first_name} ${message.from_last_name} schrieb ` }} am {{ $moment(message.created_at).format('DD.MM.YYYY, HH:mm') }}</span>
          <div class="px-4 py-2 rounded-2xl text-sm lg:text-base" :class="{ 'bg-blue-100': message.sent, 'bg-gray-100': !message.sent }" v-html="message.text">
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent>
      <div v-if="!isClient" class="flex flex-wrap mb-1">
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Rückruf')">Rückruf</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Kanzleitermin')">Kanzleitermin</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Unterlagen')">Unterlagen</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Unterwegs')">Unterwegs</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Urlaub')">Urlaub</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Bewertung')">Bewertung</span>
        <span class="tag hover:bg-gray-100 cursor-pointer border px-3 py-1 rounded-2xl text-sm mr-1 mb-1" @click="generateReply('Anfrage ablehnen')">Anfrage ablehnen</span>
      </div>
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
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    },
    conversationSubject() {
      return this.conversationMessages[0].subject
    },
    conversationRecipientFullName() {
      return `${this.conversationMessages[0].from_first_name} ${this.conversationMessages[0].from_last_name}`
    },
    conversationRecipientEmail() {
      return this.conversationMessages[0].from_email
    },
    conversationRecipientPhone() {
      return this.conversationMessages[0].from_phone
    }
  },
  methods: {
    generateReply(replyType) {
      this.reply = ''
      if (replyType === 'Rückruf') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank für Ihre Anfrage. Ich habe mir Ihr Anliegen angesehen und möchte mit Ihnen persönlich über Ihren Fall sprechen.<br />
          Sie erreichen mich unter der Telefonnummer ${this.$store.state.userData.mobile_number || ''}. Ich freue mich auf Ihren Anruf.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Kanzleitermin') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank für Ihre Anfrage. Ich habe mir Ihr Anliegen angesehen und möchte mit Ihnen persönlich über Ihren Fall sprechen.<br />
          Haben Sie an folgenden Tagen Zeit für einen Besuch in meiner Kanzlei?<br /><br />
          <ul>
            <li>${this.$moment().add(1, 'day').format('DD.MM.YYYY')}, 09:00 Uhr</li>
            <li>${this.$moment().add(2, 'day').format('DD.MM.YYYY')}, 09:00 Uhr</li>
            <li>${this.$moment().add(3, 'day').format('DD.MM.YYYY')}, 09:00 Uhr</li>
          </ul><br />
          Ich freue mich auf Ihre Rückmeldung.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Unterlagen') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank für Ihre Anfrage. Um Ihre Anfrage bearbeiten zu können, benötige ich bitte folgende Unterlagen von Ihnen:<br /><br />
          <ul>
            <li>Unterlage 1</li>
            <li>Unterlage 2</li>
            <li>Unterlage 3</li>
          </ul><br />
          Bitte senden Sie mir die Unterlagen in einer separaten E-Mail an ${this.$store.state.userData.contact_email}.<br /><br />
          Ich freue mich auf Ihre Rückmeldung.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Unterwegs') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank für Ihre Anfrage. Ich bin momentan nicht im Büro, werde mich aber zeitnah bei Ihnen melden.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Urlaub') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank für Ihre Anfrage. Ich bin momentan im Urlaub und kann Ihre Anfrage derzeit nicht entgegennehmen. Ab dem tt.mm.jjjj bin ich wieder für Sie erreichbar und werde mich umgehend bei Ihnen melden.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Bewertung') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vor kurzem haben Sie sich von mir juristisch beraten lassen. Hiermit lade ich Sie herzlich ein, mich auf traumanwalt.com zu bewerten:<br /><br />
          https://traumanwalt.com/anwalt/${this.$store.state.userData.slug}/bewerten<br /><br />
          Ich freue mich auf Ihre Rückmeldung.<br /><br />
          Mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      } else if (replyType === 'Anfrage ablehnen') {
        this.reply = `
          Sehr geehrte${this.conversationMessages[0].from_salutation === 'Herr' ? 'r' : ''} ${this.conversationMessages[0].from_salutation} ${this.conversationMessages[0].from_last_name},<br /><br />
          vielen Dank, dass Sie sich mit Ihrem Anliegen an mich gewendet haben. Leider kann ich aus zeitlichen Gründen Ihre Anfrage derzeit nicht bearbeiten. Das Team von Traumanwalt empfiehlt Ihnen auch gerne einen Anwalt über die E-Mail support@traumanwalt.com.<br /><br />
          Ich bitte um Ihr Verständnis und verbleibe mit freundlichen Grüßen,<br /><br />
          ${this.$store.state.userData.job_title} ${this.$store.state.userData.first_name} ${this.$store.state.userData.last_name}
        `
      }
    },
    async sendReply() {
      this.isSending = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/conversations/${this.conversationId}/reply`, {
        text: this.reply.trim()
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
