const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

var db = admin.firestore()

exports.onNewUser = functions.firestore
  .document('/users/{userId}')
  .onCreate(snap => {
    console.log('33')
    const statRef = db.collection('stats').doc('2018')
    return snap.ref.set({ roles: 'r' }, { merge: true }).then(() => {
      console.log('4')
      return statRef.get().then(result => {
        const newStat = result.data()
        newStat.users++
        console.log('SAVING STAT FOR LOG')
        console.log(newStat)
        return statRef.set(newStat, { merge: true })
      })
    })
  })

exports.onNewLog = functions.firestore
  .document('/logs/{log}')
  .onCreate(snap => {
    const log = snap.data()
    console.log(Date.now())
    console.log(log)
    const statRef = db.collection('stats').doc('2018')
    return statRef.get().then(result => {
      const newStat = result.data()
      const diff = Math.abs(log.balanceBefore - log.balanceAfter)
      switch (log.type) {
        case 'c':
          newStat.incoming += diff
          newStat.cards++
        case 'u':
          newStat.incoming += diff
          break
        case 'v':
          newStat.outcoming += diff
          break
        case 'f':
          newStat.outcoming += diff
        default:
          break
      }
      return statRef.set(newStat, { merge: true })
    })
  })

exports.initialState = functions.https.onRequest((req, res) => {
  const statRef = db.collection('stats').doc('2018')
  return db
    .collection('logs')
    .get()
    .then(result => {
      const newStat = { cards: 0, incoming: 0, outcoming: 0, users: 0 }
      console.log('analysing ', result.size, ' logs')
      result.forEach(logRef => {
        const log = logRef.data()
        const diff = Math.abs(log.balanceBefore - log.balanceAfter)
        switch (log.type) {
          case 'c':
            newStat.cards++
            newStat.incoming += diff
            break
          case 'u':
            newStat.incoming += diff
            break
          case 'v':
            newStat.outcoming += diff
            break
          case 'f':
            newStat.outcoming += diff
          default:
            break
        }
      })
      console.log('newStat is ')
      console.log(newStat)
      return db
          .collection('users')
          .get()
          .then(result => {
            newStat.users = result.size
            return statRef.set(newStat)
          })
    }).then(()=>res.json('Ok'))
})
