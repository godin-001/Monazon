export { monadTestnet } from "viem/chains"

export const USDC_ADDRESS = "0x754704Bc059F8C67012fEd69BC8A327a5aafb603" as const
export const USDC_DECIMALS = 6

export const ERC20_ABI = [
{
inputs: [{ name: "account", type: "address" }],
name: "balanceOf",
outputs: [{ name: "", type: "uint256" }],
stateMutability: "view",

  type: "function",
},
{
inputs: [
{ name: "to", type: "address" },
{ name: "amount", type: "uint256" },
],
name: "transfer",
outputs: [{ name: "", type: "bool" }],
stateMutability: "nonpayable",
type: "function",
},
] as const
