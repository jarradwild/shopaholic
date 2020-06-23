export default function isAdmin ({ next, store}){
  if(store.state.auth.user.role !== 2){
      return next({
         name: 'my-orders'
      })
  }
 
  return next()
 }