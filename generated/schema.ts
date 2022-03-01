import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Asset extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Asset entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Asset entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Asset", id.toString(), this);
  }

  static load(id: string): Asset | null {
    return store.get("Asset", id) as Asset | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  // _value

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get metadata(): String {
    let value = this.get("metadata");
    return value.toString();
  }

  set metadata(value: String) {
    this.set("metadata", Value.fromString(value));
  }

  // timestamp

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

}

export class Transfer extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get operator(): Bytes {
    let value = this.get("operator");
    return value.toBytes();
  }

  set operator(value: Bytes) {
    this.set("operator", Value.fromBytes(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }
}


export class V1 extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ExampleEntity entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ExampleEntity entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("V1", id.toString(), this);
  }

  static load(id: string): V1 | null {
    return store.get("V1", id) as V1 | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get count(): BigInt {
    let value = this.get("count");
    return value.toBigInt();
  }

  set count(value: BigInt) {
    this.set("count", Value.fromBigInt(value));
  }

  set issuer(value: Bytes) {
    this.set("issuer", Value.fromBytes(value));
  }

  get issuer(): Bytes {
    let value = this.get("issuer");
    return value.toBytes();   
  }

  get erc1155(): Bytes {
    let value = this.get("erc1155");
    return value.toBytes();
  }

  set erc1155(value: Bytes) {
    this.set("erc1155", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get op(): BigInt {
    let value = this.get("op");
    return value.toBigInt();
  }

  set op(value: BigInt) {
    this.set("op", Value.fromBigInt(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }

  get swapId(): BigInt {
    let value = this.get("swapId");
    return value.toBigInt();
  }

  set swapId(value: BigInt) {
    this.set("swapId", Value.fromBigInt(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }
}
