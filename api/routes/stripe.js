const express = require('express')
const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// process membership subscription
router.post('/membership/subscribe', async (req, res) => {
  // check if a customer with the same email already exists within stripe
  let customer = await stripe.customers.search({
    query: `email:\'${req.body.email}\'`,
  })

  // create checkout session
  let sessionParams = {
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Traumanwalt Mitgliedschaft'
          },
          recurring: {}
        },
        quantity: 1
      }
    ],
    metadata: {
      membership: true,
      user_id: req.body.uid
    },
    mode: 'subscription',
    subscription_data: {
      metadata: {
        membership: true,
        user_id: req.body.uid
      }
    },
    automatic_tax: {
      enabled: true,
    },
    billing_address_collection: 'required',
    success_url: 'https://traumanwalt.com/konto/einstellungen?subscribed=1',
    cancel_url: 'https://traumanwalt.com/konto/einstellungen'
  }

  const subscriptionInterval = req.body.subscription_interval
  if (subscriptionInterval === 'year') {
    sessionParams.line_items[0].price_data.unit_amount = 49900
    sessionParams.line_items[0].price_data.recurring.interval = 'year'
  } else {
    sessionParams.line_items[0].price_data.unit_amount = 4999
    sessionParams.line_items[0].price_data.recurring.interval = 'month'
  }

  // attach customer or customer email to session
  if (customer && customer.data.length) {
    sessionParams.customer = customer.data[0].id
  } else {
    sessionParams.customer_email = req.body.email
  }

  let session = await stripe.checkout.sessions.create(sessionParams)

  return res.status(200).send(session)
})

// webhook for stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  // local env: run "stripe listen --forward-to localhost:3000/api/stripe/webhook/eu" and paste secret here
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

  const payload = req.body
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // checkout session completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    if (session.metadata.membership && session.metadata.user_id) {
      const userId = parseInt(session.metadata.user_id)
      await users.subscribeToMembership(userId)
    }
  // customer subscription deleted (= subscription cancelled)
  } else if (event.type === 'customer.subscription.deleted') {
    const session = event.data.object
    if (session.metadata.membership && session.metadata.user_id) {
      const userId = parseInt(session.metadata.user_id)
      await users.unsubscribeFromMembership(userId)
    }
  }

  res.status(200).end()
})

module.exports = router