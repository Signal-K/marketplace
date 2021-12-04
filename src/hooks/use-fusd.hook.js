import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'
import { mutate, query } from '@onflow/fcl'
import { GET_FUSD_BALANCE } from '../flow/get-fusd-balance.script'

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
        cadence: GET_FUSD_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      });
      dispatch({ type: 'SUCCESS', payload: response }); // Display's the user's FUSD balance on the frontend (variable response)
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  const createFUSDVault = async () => {
    dispatch({ type: 'PROCESSING' });
    try {
      let transaction = await mutate({
        cadence: `
          import FungibleToken from 0xFungibleToken
          import FUSD from 0xFUSD

          transaction {
            prepare(signer: AuthAccount) {
              if(signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
                return
              }

              signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

              signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
                /public/fusdReceiver,
                target: /storage/fusdVault
              )

              signer.link<&FUSD.Vault{FungibleToken.Balance}>(
                /public/fusdBalance,
                target: /storage/fusdVault
              )
            }
          }
        `
      })
    } catch (err) {
      dispatch({ type: 'ERROR' })
      console.log(err)
    }
  }

  return {
    ...state,
    createFUSDVault,
    getFUSDBalance,
  }
}
