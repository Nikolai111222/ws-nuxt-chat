<template>
  <div class="container">
    <div id="chat">
      <div class="messages">
        <div v-for="m in messages" :key="m.id" class="message_container">
          <div :style="{ backgroundColor: m.userColor }" class="user_profile" />
          <div class="message">
            <span>{{ m.userName }}</span>
            <p>{{ m.message }}</p>
          </div>
        </div>
      </div>
      <input placeholder="Введите сообщение" type="text">
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      messages: []
    }
  },

  mounted () {
    this.myWs = new WebSocket('ws://192.168.0.104:9000')
    // обработчик проинформирует в консоль когда соединение установится
    this.myWs.onopen = () => {
      console.log('подключился')
    }
    // обработчик сообщений от сервера
    this.myWs.onmessage = (messages) => {
      console.log('messages.data', JSON.parse(messages.data))
      this.messages = JSON.parse(messages.data)
    }
  },

  methods: {
    // функция для отправки echo-сообщений на сервер
    wsSendEcho () {
      // console.log('wsSendEcho')
      this.myWs.send(JSON.stringify({ action: 'ECHO' }));
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

    .messages
      display: flex
      flex-direction: column
      gap: 20px
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
