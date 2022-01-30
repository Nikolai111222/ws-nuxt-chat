<template>
  <div id="chat">
    <div v-for="m in messages" :key="m.id" class="message">
      <span>{{ m.userName }}</span>
      <p>{{ m.message }}</p>
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
    this.myWs = new WebSocket('ws://localhost:9000')
    // обработчик проинформирует в консоль когда соединение установится
    this.myWs.onopen = () => {
      console.log('подключился')
    }
    // обработчик сообщений от сервера
    this.myWs.onmessage = (messages) => {
      console.log('messages.data', messages.data)
      this.messages = messages.data
    }
  },

  methods: {
    // функция для отправки echo-сообщений на сервер
    wsSendEcho () {
      console.log('wsSendEcho')
      this.myWs.send(JSON.stringify({ action: 'ECHO' }));
    },
    // функция для отправки команды ping на сервер
    wsSendPing () {
      this.myWs.send(JSON.stringify({action: 'PING'}));
    }
  }
}
</script>
