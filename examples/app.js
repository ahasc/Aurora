const Shine = require("shinets")

const server = new Shine.Server({ port: 8080 })

const usersRouter = new Shine.Router()
  .route('get', (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify({
      firstname: "John",
      lastname:  "Doe"
    }))
    res.end()
  })
  .route('get/all', (req, res) => {
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify(
      [
        {
          firstname: "John",
          lastname:  "Doe"
        },
        {
          firstname: "Jane",
          lastname:  "Doe"
        }
      ]
    ))
    res.end()
  })

const authRouter = new Shine.Router()
  .route('signin', (req, res) => {
    res.statusCode = 401;
    res.write("UNAUTHORIZED")
    res.end()
  })

server.attach('user', usersRouter)
usersRouter.attach('auth', authRouter)

server.start()
