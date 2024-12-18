import express from "express"
import { PayloadRequest } from 'payload/types'
import { getPayloadClient } from "./get-payload"
import { nextApp, nextHandler } from "./next-utils"
import * as trpcExpress from "@trpc/server/adapters/express"
import { appRouter } from "./trpc"
import { inferAsyncReturnType } from "@trpc/server"
import nextBuild from "next/dist/build"
import path from 'path'
import { parse } from 'url'
import cors from 'cors';


const app = express()
const PORT = Number(process.env.PORT) || 3000

const createContext = ({
  req, 
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
})

export type ExpressContext = inferAsyncReturnType<typeof createContext>


const start = async () => {

  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, async () => {
      payload.logger.info(
        'Next.js is building for production'
      )

      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))

      process.exit()
    })

    return
  }

  const allowedOrigins = ['http://localhost:3000', 'https://www.asya.uy', 'https://asya.uy', 'https://cdn.asya.uy', 'https://asya-production.up.railway.app'];
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

  const cartRouter = express.Router()

  cartRouter.use(payload.authenticate)

  cartRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (!request.user)
      return res.redirect('/sign-in?origin=cart')

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, '/cart', query)
  })


  app.use('/cart', cartRouter)

  const signinRouter = express.Router()

  signinRouter.use(payload.authenticate)

  signinRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (request.user)
      return res.redirect('/')

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, '/sign-in', query)
  })

  app.use('/sign-in', signinRouter)

  const signupRouter = express.Router()

  signupRouter.use(payload.authenticate)

  signupRouter.get('/', (req, res) => {
    const request = req as PayloadRequest

    if (request.user)
      return res.redirect('/')

    const parsedUrl = parse(req.url, true)
    const { query } = parsedUrl

    return nextApp.render(req, res, '/sign-up', query)
  })

  app.use('/sign-up', signupRouter)

  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Next.js started')

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js App URL: ${process.env.NEXT_PUBLIC_SERVER_URL}`
      )
    })
  })
}

start()