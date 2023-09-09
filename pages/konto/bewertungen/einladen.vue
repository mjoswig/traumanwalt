<template>
  <div>
    <h1 class="mb-6">Zu Bewertung einladen</h1>
    <AccountSection heading="Bewertungslink teilen" class="mb-4">
      <form @submit.prevent>
        <fieldset>
          <input class="border px-2 py-1 rounded-md w-full" :value="inviteUrl" readonly />
        </fieldset>
      </form>
    </AccountSection>
    <AccountSection heading="Einladung per E-Mail versenden" class="mb-4">
      <p>Laden Sie Ihre Mandanten ganz einfach per E-Mail ein. Bitte stellen Sie sicher, dass Sie das Einverständnis Ihres Mandanten eingeholt haben.</p>
      <form @submit.prevent>
        <fieldset>
          <no-ssr>
            <vue-tags-input class="w-full" placeholder="E-Mail eingeben und mit Enter bestätigen" v-model="email" :tags="emails" @tags-changed="newEmails => emails = newEmails" />
          </no-ssr>
        </fieldset>
        <div class="flex justify-end mt-5">
          <Btn :is-disabled="!emails.length" :is-loading="isLoading" @click="inviteClients">Jetzt einladen</Btn>
        </div>
      </form>
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoBewertungenEinladungPage',
  head() {
    return {
      title: 'Zu Bewertung einladen - Traumanwalt'
    }
  },
  data() {
    return {
      email: '',
      emails: [],
      isLoading: false
    }
  },
  computed: {
    inviteUrl() {
      return `https://traumanwalt.com/anwalt/${this.$store.state.userData.slug}/bewerten`
    }
  },
  methods: {
    async inviteClients() {
      this.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/reviews/invite`, {
        emails: this.emails.map(email => email.text)
      })
      this.$toast.success('Ihre Einladungen wurden erfolgreich verschickt!')
      this.isLoading = false
    }
  }
}
</script>
