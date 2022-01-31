const clients = []
const port = 9000
const messages = [
  {
    id: 0,
    userName: 'Первосвященник администратор',
    userColor: '#eeccff',
    message: 'System Call! Generate chat room!'
  }
]

const sendMessagesToAllClients = () => {
  try {
    clients.forEach(client => client.send(JSON.stringify(messages)))
  } catch (error) {
    console.error('Ошибка', error)
  }
}

const onConnect = currentClient => {
  clients.push(currentClient)

  sendMessagesToAllClients()

  currentClient.on('message', msg => {
    const message = JSON.parse(msg)
    messages.push({
      id: messages.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1,
      userName: 'Первосвященник администратор',
      userColor: '#eeccff',
      message: message.message
    })
    sendMessagesToAllClients()
  })

  currentClient.on('close', () => {
    console.log('Пользователь отключился')
  })
}

const WebSocket = require('ws')

const wsServer = new WebSocket.Server({ port })

wsServer.on('connection', onConnect)

console.log(`Сервер запущен на ${port} порту`)
