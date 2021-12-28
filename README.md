# `ethereum-boilerplate` 

> React components and hooks for fast building dApps without running own backend

🚀DEMO: https://ethereum-boilerplate.github.io/ethereum-boilerplate

This boilerplate is built on [react-moralis](https://github.com/MoralisWeb3/react-moralis) and [Moralis](https://moralis.io?utm_source=github&utm_medium=readme&utm_campaign=ethereum-boilerplate). Also has its own context provider for quick access to `chainId` or `ethAddress`

There are many components in this boilerplate that do not require an active web3 provider, they use Moralis Web3 API. Moralis supports the most popular blockchains and their test networks. You can find a list of all available networks in [Moralis Supported Chains](https://docs.moralis.io/moralis-server/web3-sdk/intro#supported-chains)

Please check the [official documentation of Moralis](https://docs.moralis.io/#user) for all the functionalities of Moralis.

![Dapp](https://user-images.githubusercontent.com/78314301/140835102-0f3b2549-e199-47aa-bc60-f6b601bd79e9.gif)


# 🚀 Quick Start

📄 Clone or fork `ethereum-boilerplate`:
```sh
git clone https://github.com/ethereum-boilerplate/ethereum-boilerplate.git
```
💿 Install all dependencies:
```sh
cd ethereum-boilerplate
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```
🚴‍♂️ Run your App:
```sh
yarn start
```
🌎 `.env.example`:
```
# Mandatory info for starting the app
REACT_APP_MORALIS_APPLICATION_ID = appId
REACT_APP_MORALIS_SERVER_URL = serverUrl

# Optional info for connecting your localChain and Moralis Database
moralisApiKey = xxxxx
moralisApiSecret = xxxxxxx
frpcPath = F:\frpc\frpc.exe
chain = ganache
moralisSubdomain = xxxxxxx.usemoralis.com
abiPath = "F:\ethereum-boilerplate\Truffle\build\contracts\Contract.json"
```

# 🧭 Table of contents

- [`ethereum-boilerplate`](#ethereum-boilerplate)
- [🚀 Quick Start](#-quick-start)
- [🧭 Table of contents](#-table-of-contents)
- [🏗 Ethereum Components](#-ethereum-components)
- - [`<Account />`](#account-)
  - [`<AddressInput />`](#addressinput-)
  - [`<Chains />`](#chains-)
  - [`<CoinPrice />`](#coinprice-)
  - [`<ERC20Balance />`](#erc20balance-)
  - [`<ERC20Transfers />`](#erc20transfers-)
  - [`<DEX />`](#dex-)
  - [`<Wallet />`](#wallet-)
  - [`<Blockie />`](#blockie-)
  - [`<NativeBalance />`](#nativebalance-)
  - [`/<NFTBalance />`](#nftbalance)
  - [`<Contract />`](#contract-)
- [🧰 Ethereum Hooks](#-ethereum-hooks)
  - [`useAPIContract()`](#useapicontract)  
  - [`useWeb3Contract()`](#useweb3contract)  
  - [`useERC20Balance()`](#useerc20balance)
  - [`useERC20Transfers()`](#useerc20transfers)
  - [`useNativeBalance()`](#usenativebalance)
  - [`useNativeTransactions()`](#usenativetransactions)
  - [`useNFTBalances()`](#usenftbalances)
  - [`useNFTTransfers()`](#usenfttransfers)
  - [`useIPFS()`](#useipfs)
  - [`useChain()`](#usechain)
  - [`useTokenPrice()`](#usetokenprice)
  - [`DEX Hooks`](#dexhooks)
    - [`useOneInchQuote()`](#useoneinchquote)
    - [`useInchDex()`](#useinchdex)
  

# 🏗 Ethereum Components

🛠 The ready for use react-components are located in `src/components`. They are designed to be used anywhere in your dApp. 

> ⚡ Note that many components may get params like `chain`, `address`, `size` and etc.


### `<Account />`

![Account](https://user-images.githubusercontent.com/78314301/141354253-4a040fbc-bf80-4665-af54-98b2f2d8ce7d.gif)

📒 `<Account />` : Easy web3 authentication via MetaMask. 

```jsx
<Account />
```


### `<Address />`

![address](https://user-images.githubusercontent.com/78314301/138753150-aefb426c-9481-4f41-91a3-d4e4fd424b8f.gif)

📨 `<Address />` : Displays an Ethereum address with [Blockie](https://www.npmjs.com/package/react-blockies) avatar. 

**Options**:
- copyable (optional): display icon for copying. 
- avatar (optional): display blockie avatar. 
- size (optional): text size.

```jsx
<Address />
<Address avatar />
<Address avatar copyable />
<Address avatar copyable size="4"  />
```

# Contributing
## Bugs & Issues
Here's a list of known issues we've had or found.
* [#6: NPM Package Build not working](https://keybase.io/team/signalkinetics)
