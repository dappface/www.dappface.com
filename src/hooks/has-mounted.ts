import {useEffect, useState} from 'react'

export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasMounted(true)
    })
  }, [])

  return hasMounted
}
