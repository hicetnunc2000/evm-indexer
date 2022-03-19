import { log, ipfs, json, JSONValue, Bytes } from "@graphprotocol/graph-ts"
import { TransferSingle, URI } from "../generated/erc1155/erc1155"
import { swapLog } from "../generated/wuweiswapv1/wuweiswapv1"
import { Transfer, Asset, V1, UngrundID } from "../generated/schema"
import { ungrundid, idLog } from "../generated/ungrundid/ungrundid"

export function handleTransferSingle(event: TransferSingle): void {

  let entity = Transfer.load(event.transaction.hash.toHex())

  if (entity == null) entity = new Transfer(event.transaction.hash.toHex())

  if (event.params._to.toHexString() == '0x84398272c77a35e765eff8fcb95af3bf941581a5') {
    let asset = Asset.load(event.params._id.toString())
    if (asset == null) asset = new Asset(event.params._id.toString())
    asset.available -= event.params._value
    asset.save()
  }

  if (event.params._from.toHexString() == '0x0000000000000000000000000000000000000000') {
    let asset = Asset.load(event.params._id.toString())
    if (asset == null) asset = new Asset(event.params._id.toString())
    asset.available = event.params._value
    asset.save()
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

  let entity = Asset.load(event.params._tokenId.toString())

  if (entity == null) entity = new Asset(event.params._tokenId.toString())

  entity.hash = event.transaction.hash
  entity.metadata = event.params._value
  entity.tokenId = event.params._tokenId
  entity.timestamp = event.block.timestamp
  entity.from = event.transaction.from

  let metadata = ipfs.cat(event.params._value.toString().split('//')[1]);

  if (metadata) {

    let value = json.fromBytes(metadata as Bytes).toObject();

    if (value) {
      let image = value.get("image");
      let title = value.get("name");
      let mimeType = value.get("mimeType");
      let animation = value.get("animation_url");
      let description = value.get("description");
      if (image) entity.image = image.toString();
      if (mimeType) entity.mimeType = mimeType.toString();
      if (animation) entity.animation = animation.toString();
      if (title) entity.title = title.toString();
      if (description) entity.description = description.toString();
    }
  }

  entity.save()

}

export function handleswapLog(event: swapLog): void {

  let entity = V1.load(event.transaction.hash.toHex())

  if (entity == null) entity = new V1(event.transaction.hash.toHex())

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

export function handleidLog(event: idLog): void {

  let entity = UngrundID.load(event.transaction.from.toHex())

  if (entity == null) entity = new UngrundID(event.transaction.from.toHex())

  entity.metadata = event.params._metadata
  entity.ungrundId = event.params._subjkt

  entity.save()
}
