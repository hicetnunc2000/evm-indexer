import { BigInt } from "@graphprotocol/graph-ts"
import { TransferSingle, URI } from "../generated/erc1155/erc1155"
import { swapLog } from "../generated/wuweiswapv1/wuweiswapv1"
import { Transfer, Asset, V1 } from "../generated/schema"

export function handleTransferSingle(event: TransferSingle): void {

  let entity = Transfer.load(event.transaction.hash.toHex())

  if (entity == null) {
    entity = new Transfer(event.transaction.hash.toHex())
  }

  entity.operator = event.params._operator
  entity.from = event.params._from
  entity.to = event.params._to
  entity.tokenId = event.params._id
  entity.value = event.params._value
  entity.timestamp = event.block.timestamp

  entity.save()

}

export function handleURI(event: URI): void {
  
  let entity = Asset.load(event.transaction.hash.toHex())

  if (entity == null) {
    entity = new Asset(event.transaction.hash.toHex())
  }

  entity.metadata = event.params._value
  entity.tokenId = event.params._tokenId
  entity.timestamp = event.block.timestamp
  entity.from = event.transaction.from

  entity.save()

}

export function handleswapLog(event: swapLog): void {

  let entity = V1.load(event.transaction.hash.toHex())

  if (entity == null) {
    entity = new V1(event.transaction.hash.toHex())

    entity.count = BigInt.fromI32(0)
  }

  entity.erc1155 = event.params.erc1155
  entity.tokenId = event.params.tokenId
  entity.amount = event.params.amount
  entity.value = event.params.value
  entity.timestamp = event.block.timestamp
  entity.op = event.params.op
  entity.swapId = event.params.swapId
  entity.issuer = event.transaction.from

  entity.save()

}