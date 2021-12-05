export const MINT_DAPPY = `
import DappyContract from 0xDappy
import FUSD from 0xFUSD
import FungibleToken from 0xFungibleToken

transaction(templateID: UInt32, amount: UFix64) { 
  let receiverReference: &DappyContract.Collection{DappyContract.Receiver} 
  let sentVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
    self.receiverRefence == acct.borrow<&DappyContract.Collection>(from: DappyContract.CollectionStoragePath)
      ?? panic("Cannot borrow")
    let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD vault")
    self.sentVault <- vaultRef.withdraw(amount: amount) 
  }

  execute {
    let newDappy <- DappyContract.mintDappy(templateID: templateID, paymentVault <-self.sentVault)
    self.receiverReference.deposit(token: <-newDappy)
  }
}
`

// templateID: id of nft, amount: price of nft,  (LINE 6)
// Receiver of the NFT (LINE 7)
// Borrowing from CollectionStoragePath (LINE 11)
// withdraw specified amount (LINE 14)