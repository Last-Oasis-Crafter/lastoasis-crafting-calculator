import { useState, useEffect } from 'react'
import Axios from 'axios'

export default function useItems(defaultValue = []) {
  const [items, setItems] = useState(defaultValue)
  const [fetch, setFetch] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if(fetch) {
      const fetchItems = async () => {
        setIsError(false)
        setIsLoading(true)

        try {
          const result = await Axios('/items.json')
          setItems(result.data)
        } catch (error) {
          setIsError(true)
        }

        setIsLoading(false)
        setFetch(false)
      }

      fetchItems()
    }
  }, [fetch])

  return [{ items, isLoading, isError}, () => setFetch(true)]
}
