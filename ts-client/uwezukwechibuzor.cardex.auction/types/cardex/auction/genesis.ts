/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Auction } from "./auction";
import { Bid } from "./bid";
import { Params } from "./params";

export const protobufPackage = "uwezukwechibuzor.cardex.auction";

/** GenesisState defines the auction module's genesis state. */
export interface GenesisState {
  params: Params | undefined;
  auctionList: Auction[];
  auctionCount: number;
  bidList: Bid[];
  bidCount: number;
}

function createBaseGenesisState(): GenesisState {
  return { params: undefined, auctionList: [], auctionCount: 0, bidList: [], bidCount: 0 };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.auctionList) {
      Auction.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.auctionCount !== 0) {
      writer.uint32(24).uint64(message.auctionCount);
    }
    for (const v of message.bidList) {
      Bid.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.bidCount !== 0) {
      writer.uint32(40).uint64(message.bidCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.auctionList.push(Auction.decode(reader, reader.uint32()));
          break;
        case 3:
          message.auctionCount = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.bidList.push(Bid.decode(reader, reader.uint32()));
          break;
        case 5:
          message.bidCount = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
      auctionList: Array.isArray(object?.auctionList) ? object.auctionList.map((e: any) => Auction.fromJSON(e)) : [],
      auctionCount: isSet(object.auctionCount) ? Number(object.auctionCount) : 0,
      bidList: Array.isArray(object?.bidList) ? object.bidList.map((e: any) => Bid.fromJSON(e)) : [],
      bidCount: isSet(object.bidCount) ? Number(object.bidCount) : 0,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    if (message.auctionList) {
      obj.auctionList = message.auctionList.map((e) => e ? Auction.toJSON(e) : undefined);
    } else {
      obj.auctionList = [];
    }
    message.auctionCount !== undefined && (obj.auctionCount = Math.round(message.auctionCount));
    if (message.bidList) {
      obj.bidList = message.bidList.map((e) => e ? Bid.toJSON(e) : undefined);
    } else {
      obj.bidList = [];
    }
    message.bidCount !== undefined && (obj.bidCount = Math.round(message.bidCount));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.auctionList = object.auctionList?.map((e) => Auction.fromPartial(e)) || [];
    message.auctionCount = object.auctionCount ?? 0;
    message.bidList = object.bidList?.map((e) => Bid.fromPartial(e)) || [];
    message.bidCount = object.bidCount ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
