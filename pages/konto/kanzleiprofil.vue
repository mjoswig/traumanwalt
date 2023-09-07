<template>
  <div>
    <h1 class="mb-6">Kanzleiprofil</h1>
    <AccountSection v-if="!updateForm.lawFirm" heading="Neues Kanzleiprofil" class="mb-4">
      <fieldset>
        <input class="border px-2 py-1 rounded-md w-full" placeholder="Kanzleiname eingeben" />
      </fieldset>
    </AccountSection>
    <AccountSection v-if="updateForm.lawFirm" :heading="updateForm.lawFirm.name">
      <form @submit.prevent>
        <fieldset>
          <label class="font-bold">Kanzleiname</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Kanzleiname" v-model="updateForm.lawFirm.name" />
        </fieldset>
        <div class="flex justify-end mt-3">
          <Btn>Speichern</Btn>
        </div>
      </form>
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoKanzleiprofilPage',
  async asyncData({ app, store }) {
    const lawFirm = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/law-firm`)
    return {
      createForm: {
      },
      updateForm: {
        lawFirm,
        isLoading: false
      }
    }
  },
  computed: {
    isLawFirmAdmin() {
      if (!this.lawFirm) return false
      return this.lawFirm.admin_id === this.$store.state.userData.id
    }
  }
}
</script>
