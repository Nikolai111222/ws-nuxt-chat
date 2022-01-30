const clients = []
const messages = [
  {
    id: 0,
    userName: 'admin',
    message: 'Системное сообщение'
  }
]

const sendMessagesToAllClients = () => {
  try {
    currentClient.send(clients.forEach(client => client.send(JSON.stringify(messages))))
  } catch (error) {
    console.log('Ошибка', error);
  }  
}

const onConnect = currentClient => {
  clients.push(currentClient)

  sendMessagesToAllClients()

  currentClient.on('message', message => {
    sendMessagesToAllClients()
  })

  currentClient.on('close', () => {
    console.log('Пользователь отключился')
  })
}

const WebSocket = require('ws')

const wsServer = new WebSocket.Server({ port: 9000 })

wsServer.on('connection', onConnect)

console.log('Сервер запущен на 9000 порту')
