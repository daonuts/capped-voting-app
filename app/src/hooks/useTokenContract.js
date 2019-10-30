import { useEffect, useState } from 'react'
import { useAragonApi } from '@aragon/api-react'
import tokenBalanceOfAbi from '../abi/token-balanceOf.json'
// import tokenBalanceOfAtAbi from '../abi/token-balanceOfAt.json'

// const TOKEN_ABI = [].concat(tokenBalanceOfAbi, tokenBalanceOfAtAbi)
const TOKEN_ABI = tokenBalanceOfAbi

// Load and returns the token contract, or null if not loaded yet.
export default function useTokenContract() {
  const { api, appState } = useAragonApi()
  const { token0Address } = appState
  const [contract, setContract] = useState(
    api && token0Address ? api.external(token0Address, TOKEN_ABI) : null
  )

  useEffect(() => {
    // We assume there is never any reason to set the contract back to null.
    if (api && token0Address && !contract) {
      setContract(api.external(token0Address, TOKEN_ABI))
    }
  }, [api, token0Address, contract])

  return contract
}
