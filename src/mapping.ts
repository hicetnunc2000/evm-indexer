import { log, ipfs, json, JSONValue, Bytes } from "@graphprotocol/graph-ts"
import { TransferSingle, URI } from "../generated/erc1155/erc1155"
import { swapLog } from "../generated/wuweiswapv1/wuweiswapv1"
import { Transfer, Asset, V1, UngrundID, Balance } from "../generated/schema"
import { idLog } from "../generated/ungrundid/ungrundid"

export function handleTransferSingle(event: TransferSingle): void {

  let transfer = Transfer.load(event.transaction.hash.toHex())
  if (transfer == null) transfer = new Transfer(event.transaction.hash.toHex())

  let asset = Asset.load(event.params._id.toString())
  if (asset == null) asset = new Asset(event.params._id.toString())

  if (event.params._to.toHexString() == '0x84398272c77a35e765eff8fcb95af3bf941581a5') {
    asset.available -= event.params._value
    asset.save()
  }

  if (event.params._from.toHexString() == '0x0000000000000000000000000000000000000000') {
    asset.available = event.params._value
    asset.save()
  }

  let balanceFrom = Balance.load(event.params._from.toHex())
  if (balanceFrom == null) balanceFrom = new Balance(event.params._from.toHex())
  if (event.params._from.toHexString() == '0x0000000000000000000000000000000000000000') {
    balanceFrom.amount = event.params._value 
  } else {
    balanceFrom.amount += event.params._value
  }
  balanceFrom.save() 

  let balanceTo = Balance.load(event.params._to.toHex())
  if (balanceTo == null) balanceTo = new Balance(event.params._to.toHex())
  if (event.params._from.toHexString() == '0x0000000000000000000000000000000000000000') {
    balanceTo.amount = event.params._value 
  } else {
    balanceTo.amount += event.params._value
  }
  balanceTo.save()

  transfer.operator = event.params._operator
  
  transfer.from = event.params._from
  transfer.to = event.params._to
  transfer.tokenId = event.params._id
  transfer.value = event.params._value
  transfer.timestamp = event.block.timestamp

  transfer.save()

}

export function handleURI(event: URI): void {

  let asset = Asset.load(event.params._tokenId.toString())

  if (asset == null) asset = new Asset(event.params._tokenId.toString())

  asset.hash = event.transaction.hash
  asset.metadata = event.params._value
  asset.timestamp = event.block.timestamp
  asset.from = event.transaction.from

  let metadata = ipfs.cat(event.params._value.toString().split("//")[1]);

  if (metadata) {

    let value = json.fromBytes(metadata as Bytes).toObject();

    if (value) {
      let image = value.get("image");
      let title = value.get("name");
      let mimeType = value.get("mimeType");
      let animation = value.get("animation_url");
      let description = value.get("description");
      if (image) asset.image = image.toString();
      if (mimeType) asset.mimeType = mimeType.toString();
      if (animation) asset.animation = animation.toString();
      if (title) asset.title = title.toString();
      if (description) asset.description = description.toString();
    }
  }

  asset.save()

}

export function handleswapLog(event: swapLog): void {

  let swap = V1.load(event.transaction.hash.toHex())

  if (swap == null) swap = new V1(event.transaction.hash.toHex())

  swap.erc1155 = event.params.erc1155
  swap.tokenId = event.params.tokenId
  swap.amount = event.params.amount
  swap.value = event.params.value
  swap.timestamp = event.block.timestamp
  swap.op = event.params.op
  swap.swapId = event.params.swapId
  swap.issuer = event.transaction.from

  swap.save()

}

export function handleidLog(event: idLog): void {

  let ungrundId = UngrundID.load(event.transaction.from.toHex());
  if (ungrundId == null) ungrundId = new UngrundID(event.transaction.from.toHex());

  ungrundId.metadata = event.params._metadata;
  ungrundId.ungrundId = event.params._subjkt;

  let metadata = ipfs.cat(event.params._metadata.toString().split("//")[1]);

  if (metadata) {

    let value = json.fromBytes(metadata as Bytes).toObject();

    if (value) {

      let description = value.get("description");
      if (description) ungrundId.description = description.toString();

    }
  }

  ungrundId.save();
}
