import { useEffect, useState } from 'react'
import { cadence, query } from '@onflow/fcl'
import { CHECK_COLLECTION } from '../flow/check-collection.script'

export default function useCollection() {
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState(false)

  useEffect(() => {
    if(!user?.addr) return // If no user address, return
    const checkCollection = async () => {
      try {
        let res = await query({
        cadence: CHECK_COLLECTION,
        args: (arg, t) => [arg(user?.addr, t.Address)] // t = type
        })
        setCollection(res)
        console.log(res); // If the user has a collection enabled
        setLoading(false)
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
