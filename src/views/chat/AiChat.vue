<template>
  <SocialChat>
    <p slot="header">TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST</p>
    <template v-slot:body>
      <div></div>
    </template>
    <template v-slot:button="{ open }">
      <img
        v-show="!open"
        src="https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons/chat.svg"
        alt="chat icon"
        aria-hidden="true"
        title=""
      >
      <img
        v-show="open"
        src="https://raw.githubusercontent.com/ktquez/vue-social-chat/master/src/icons/close.svg"
        alt="close icon"
        aria-hidden="true"
        title=""
      >
    </template>
  </SocialChat>
</template>

<script>
import { SocialChat } from 'vue-social-chat'

export default {
  name: "AiChat",
  components: {
    SocialChat
  },
  data: () => ({
  }),
  methods: {
    send () {
      // send data
    }
  }
}
</script>

<style scoped>

</style>
