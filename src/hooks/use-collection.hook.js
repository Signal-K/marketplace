import { useEffect, useState } from 'react'
import { cadence, query } from '@onflow/fcl'

export default function useCollection() {
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState(false)

  useEffect(() => {
    if(!user?.addr) return // If no user address, return
    const checkCollection = async () => {
      try {
        let res = await query({
        cadence: `
          import DappyContract from 0xDappy

          pub fun main(addr: Address): Bool {
            let ref = getAccount(addr).getCapability<
          }
        `
        })
      } catch (err) { // Simple error catching scaffolding. Should probably implement something more sophisticated
        console.log(err)
        setLoading(false)
      }
    }
    checkCollection()
  }, [])

  const createCollection = async () => {
    setCollection(true)
  }

  const deleteCollection = async () => {
    setCollection(false)
    window.location.reload()
  }

  return {
    loading,
    collection,
    createCollection,
    deleteCollection
  }
}
