export default function isLoggedIn ({ next, store}){
  if(!store.state.auth.status.loggedIn){
      return next({
         name: 'login'
      })
  }
 
  return next()
 }