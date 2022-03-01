import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class TransferSingle extends ethereum.Event {
  get params(): TransferSingle__Params {
    return new TransferSingle__Params(this);
  }
}

export class TransferSingle__Params {
  _event: TransferSingle;

  constructor(event: TransferSingle) {
    this._event = event;
  }

  get _operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _from(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _id(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _value(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class URI extends ethereum.Event {
  get params(): URI__Params {
    return new URI__Params(this);
  }
}

export class URI__Params {
  _event: URI;

  constructor(event: URI) {
    this._event = event;
  }

  get _value(): string {
    return this._event.parameters[0].value.toString();
  }

  get _tokenId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class erc1155 extends ethereum.SmartContract {
  static bind(address: Address): erc1155 {
    return new erc1155("erc1155", address);
  }
}
