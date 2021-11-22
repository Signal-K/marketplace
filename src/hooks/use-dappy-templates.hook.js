import { useEffect, useReducer } from 'react'
import {query} from '@onflow/fcl'
import { defaultReducer } from '../reducer/defaultReducer'
import DappyClass from '../utils/DappyClass'

export default function useDappyTemplates() {
  const [state, dispatch] = useReducer(defaultReducer, { loading: false, error: false, data: [] })

  useEffect(() => {
    const fetchDappyTemplates = async () => {
      dispatch({ type: 'PROCESSING' })
      try {
        let res = await query({
          cadence: 
        })
        let mappedDappies = Object.values(res).map(d => {
          return new DappyClass(d?.templateID, d?.dna, d?.name, d?.price)
        })
        dispatch({ type: 'SUCCESS', payload: mappedDappies })
      } catch (err) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetchDappyTemplates()
  }, [])

  return state
}
