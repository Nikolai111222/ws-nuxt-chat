<template>
  <div class="container">
    <div id="chat">
      <div class="chat_heading">
        <span>Выйти</span>
        <span>chat v{{ appData.version }}</span>
      </div>
      <div v-chat-scroll="{ smooth: true, notSmoothOnInit: true }" class="messages">
        <div v-for="m in messages" :key="m.id" :ref="`message${m.id}`" class="message_container">
          <div :style="{ backgroundColor: m.userColor }" class="user_profile" />
          <div class="message">
            <span>{{ m.userName }}</span>
            <p>{{ m.message }}</p>
          </div>
        </div>
      </div>
      <input @keypress.enter="sendMessage" v-model.trim="message" placeholder="Введите сообщение" type="text">
    </div>
  </div>
</template>

<script>
import appData from '~/package.json'

export default {
  data: () => {
    return {
      appData,

      messages: [],
      message: '',
      test: 20,
      firstTime: true
    }
  },

  mounted () {
    this.myWs = new WebSocket('ws://192.168.0.104:9000')
  
    this.myWs.onopen = () => {
      console.log('Установлено подключение к websocket серверу')
    }
  
    this.myWs.onmessage = messages => {
      this.messages = JSON.parse(messages.data)
    }
  },

  methods: {
    sendMessage () {
      if (this.message && this.message !== '') {
        this.myWs.send(JSON.stringify({ message: this.message }))
        this.message = ''
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  width: 100%
  height: 100vh
  display: flex
  justify-content: center
  padding: 15px
  align-items: center

  #chat
    width: 100%
    max-width: 600px
    max-height: 100vh
    height: 800px
    border: 1px solid #1a1a1c
    box-shadow: 0 4px 20px rgb(0, 0, 0, .03)
    border-radius: 10px
    display: flex
    flex-direction: column
    justify-content: flex-end

    .chat_heading
      display: flex
      justify-content: space-between
      align-items: center
      color: white
      padding: 10px 15px
      border-bottom: 1px solid #1a1a1c

      span:nth-child(2)
        font-size: 12px
        opacity: .5

    .messages
      overflow: hidden
      overflow-y: auto
      gap: 20px
      height: 100%
      padding: 15px

      .message_container
        display: flex
        align-items: flex-start
        width: 100%
        gap: 10px

        .user_profile
          min-width: 30px
          min-height: 30px
          border-radius: 100px

        .message
          display: flex
          flex-direction: column
          margin-bottom: 15px
          gap: 5px
          padding: 10px
          border-radius: 5px
          background-color: #1a1a1c
          width: 100%
          span
            font-size: 12px
            line-height: 12px
            font-weight: bold
            color: rgba(255, 255, 255, .5)
          p
            color: white
            font-size: 14px
            line-height: 14px

    input
      border: 0
      color: white
      padding: 10px 15px
      font-size: 18px
      border-radius: 0 0 10px 10px
      background-color: #1a1a1c
</style>
