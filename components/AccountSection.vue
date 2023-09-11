<template>
  <section class="border border-transparent rounded-md shadow-md p-4" :class="{ 'flex flex-col space-y-4': heading }">
    <h2 class="text-gray-500">{{ heading }}</h2>
    <slot class="flex flex-col space-y-4" />
  </section>
</template>

<script>
export default {
  name: 'AccountSection',
  props: ['heading']
}
</script>