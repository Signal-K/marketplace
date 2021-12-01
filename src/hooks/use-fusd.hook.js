import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'

export default function useFUSD(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  })

  useEffect(() => {
    getFUSDBalance();
    //eslint-disable-next-line 
  }, [])

  const getFUSDBalance = async () => {
    dispatch({ type: 'PROCESSING' })
    try {
      let response = await query({
        cadence: `
        import FungibileToken from 0xFungibleToken
        import FUSD from 0xFUSD

        pub fun main(address: Address): UFix64? {
          
        }
        `
      })
      dispatch({ type: 'SUCCESS', payload: "100." })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  return {
    ...state,
    getFUSDBalance
  }
}
