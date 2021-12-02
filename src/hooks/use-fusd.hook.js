import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'
import { query } from '@onflow/fcl'

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
    dispatch({ type: 'PROCESSING' });
    try {
      let response = await query({
        cadence: `
        import FungibileToken from 0xFungibleToken
        import FUSD from 0xFUSD

        pub fun main(address: Address): UFix64? {
          let account = getAccount(address)
          if let vaultRef = account.getCapability(/public/fusdBalance).borrow<&FUSD.Vault>{FungibleToken.Balance}> {
            return vaultRef.balance
          }
          return nil
        }
        `,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      });
      dispatch({ type: 'SUCCESS', payload: response }); // Display's the user's FUSD balance on the frontend (variable response)
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
