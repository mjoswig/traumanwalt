export default ({ app }, inject) => {
  inject('firebaseStorage', {
    async write(ref, file) {
      const storageRef = app.$fire.storage.ref(ref)

      try {
        let fileUrl = null

        await storageRef.put(file).then(async (snapshot) => {
          fileUrl = await snapshot.ref.getDownloadURL()
        })

        return fileUrl
      } catch (e) {
        console.log(e)
        return
      }
    },
    async remove(fileUrl) {
      const storageRef = app.$fire.storage.refFromURL(fileUrl)

      try {
        await storageRef.delete()
      } catch (e) {
        console.log(e)
        return
      }
    }
  })
}