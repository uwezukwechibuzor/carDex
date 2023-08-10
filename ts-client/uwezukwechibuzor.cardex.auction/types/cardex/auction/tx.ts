/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "uwezukwechibuzor.cardex.auction";

export interface MsgInitiateAuction {
  creator: string;
  auctionID: string;
  minimumBid: string;
  bid: string;
  auctionDuration: string;
  carDescription: string;
  carPictureUrl: string;
  status: string;
  createdAt: number;
}

export interface MsgInitiateAuctionResponse {
}

export interface MsgSubmitBid {
  creator: string;
  bidID: string;
  auctionID: string;
  bidHash: string;
  createdAt: number;
}

export interface MsgSubmitBidResponse {
}

export interface MsgUpdateBid {
  creator: string;
  bidID: string;
  auctionID: string;
  bidHash: string;
  createdAt: number;
}

export interface MsgUpdateBidResponse {
}

export interface MsgCancelBid {
  creator: string;
  bidID: string;
}

export interface MsgCancelBidResponse {
}

export interface MsgFinalizeBid {
  creator: string;
  bidID: string;
  auctionID: string;
  bidValue: string;
}

export interface MsgFinalizeBidResponse {
}

function createBaseMsgInitiateAuction(): MsgInitiateAuction {
  return {
    creator: "",
    auctionID: "",
    minimumBid: "",
    bid: "",
    auctionDuration: "",
    carDescription: "",
    carPictureUrl: "",
    status: "",
    createdAt: 0,
  };
}

export const MsgInitiateAuction = {
  encode(message: MsgInitiateAuction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.auctionID !== "") {
      writer.uint32(18).string(message.auctionID);
    }
    if (message.minimumBid !== "") {
      writer.uint32(26).string(message.minimumBid);
    }
    if (message.bid !== "") {
      writer.uint32(34).string(message.bid);
    }
    if (message.auctionDuration !== "") {
      writer.uint32(42).string(message.auctionDuration);
    }
    if (message.carDescription !== "") {
      writer.uint32(50).string(message.carDescription);
    }
    if (message.carPictureUrl !== "") {
      writer.uint32(58).string(message.carPictureUrl);
    }
    if (message.status !== "") {
      writer.uint32(66).string(message.status);
    }
    if (message.createdAt !== 0) {
      writer.uint32(72).int64(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitiateAuction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitiateAuction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.auctionID = reader.string();
          break;
        case 3:
          message.minimumBid = reader.string();
          break;
        case 4:
          message.bid = reader.string();
          break;
        case 5:
          message.auctionDuration = reader.string();
          break;
        case 6:
          message.carDescription = reader.string();
          break;
        case 7:
          message.carPictureUrl = reader.string();
          break;
        case 8:
          message.status = reader.string();
          break;
        case 9:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitiateAuction {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      auctionID: isSet(object.auctionID) ? String(object.auctionID) : "",
      minimumBid: isSet(object.minimumBid) ? String(object.minimumBid) : "",
      bid: isSet(object.bid) ? String(object.bid) : "",
      auctionDuration: isSet(object.auctionDuration) ? String(object.auctionDuration) : "",
      carDescription: isSet(object.carDescription) ? String(object.carDescription) : "",
      carPictureUrl: isSet(object.carPictureUrl) ? String(object.carPictureUrl) : "",
      status: isSet(object.status) ? String(object.status) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
    };
  },

  toJSON(message: MsgInitiateAuction): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.auctionID !== undefined && (obj.auctionID = message.auctionID);
    message.minimumBid !== undefined && (obj.minimumBid = message.minimumBid);
    message.bid !== undefined && (obj.bid = message.bid);
    message.auctionDuration !== undefined && (obj.auctionDuration = message.auctionDuration);
    message.carDescription !== undefined && (obj.carDescription = message.carDescription);
    message.carPictureUrl !== undefined && (obj.carPictureUrl = message.carPictureUrl);
    message.status !== undefined && (obj.status = message.status);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInitiateAuction>, I>>(object: I): MsgInitiateAuction {
    const message = createBaseMsgInitiateAuction();
    message.creator = object.creator ?? "";
    message.auctionID = object.auctionID ?? "";
    message.minimumBid = object.minimumBid ?? "";
    message.bid = object.bid ?? "";
    message.auctionDuration = object.auctionDuration ?? "";
    message.carDescription = object.carDescription ?? "";
    message.carPictureUrl = object.carPictureUrl ?? "";
    message.status = object.status ?? "";
    message.createdAt = object.createdAt ?? 0;
    return message;
  },
};

function createBaseMsgInitiateAuctionResponse(): MsgInitiateAuctionResponse {
  return {};
}

export const MsgInitiateAuctionResponse = {
  encode(_: MsgInitiateAuctionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgInitiateAuctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgInitiateAuctionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgInitiateAuctionResponse {
    return {};
  },

  toJSON(_: MsgInitiateAuctionResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgInitiateAuctionResponse>, I>>(_: I): MsgInitiateAuctionResponse {
    const message = createBaseMsgInitiateAuctionResponse();
    return message;
  },
};

function createBaseMsgSubmitBid(): MsgSubmitBid {
  return { creator: "", bidID: "", auctionID: "", bidHash: "", createdAt: 0 };
}

export const MsgSubmitBid = {
  encode(message: MsgSubmitBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bidID !== "") {
      writer.uint32(18).string(message.bidID);
    }
    if (message.auctionID !== "") {
      writer.uint32(26).string(message.auctionID);
    }
    if (message.bidHash !== "") {
      writer.uint32(34).string(message.bidHash);
    }
    if (message.createdAt !== 0) {
      writer.uint32(40).int64(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bidID = reader.string();
          break;
        case 3:
          message.auctionID = reader.string();
          break;
        case 4:
          message.bidHash = reader.string();
          break;
        case 5:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSubmitBid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bidID: isSet(object.bidID) ? String(object.bidID) : "",
      auctionID: isSet(object.auctionID) ? String(object.auctionID) : "",
      bidHash: isSet(object.bidHash) ? String(object.bidHash) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
    };
  },

  toJSON(message: MsgSubmitBid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bidID !== undefined && (obj.bidID = message.bidID);
    message.auctionID !== undefined && (obj.auctionID = message.auctionID);
    message.bidHash !== undefined && (obj.bidHash = message.bidHash);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitBid>, I>>(object: I): MsgSubmitBid {
    const message = createBaseMsgSubmitBid();
    message.creator = object.creator ?? "";
    message.bidID = object.bidID ?? "";
    message.auctionID = object.auctionID ?? "";
    message.bidHash = object.bidHash ?? "";
    message.createdAt = object.createdAt ?? 0;
    return message;
  },
};

function createBaseMsgSubmitBidResponse(): MsgSubmitBidResponse {
  return {};
}

export const MsgSubmitBidResponse = {
  encode(_: MsgSubmitBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSubmitBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSubmitBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgSubmitBidResponse {
    return {};
  },

  toJSON(_: MsgSubmitBidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSubmitBidResponse>, I>>(_: I): MsgSubmitBidResponse {
    const message = createBaseMsgSubmitBidResponse();
    return message;
  },
};

function createBaseMsgUpdateBid(): MsgUpdateBid {
  return { creator: "", bidID: "", auctionID: "", bidHash: "", createdAt: 0 };
}

export const MsgUpdateBid = {
  encode(message: MsgUpdateBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bidID !== "") {
      writer.uint32(18).string(message.bidID);
    }
    if (message.auctionID !== "") {
      writer.uint32(26).string(message.auctionID);
    }
    if (message.bidHash !== "") {
      writer.uint32(34).string(message.bidHash);
    }
    if (message.createdAt !== 0) {
      writer.uint32(40).int64(message.createdAt);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bidID = reader.string();
          break;
        case 3:
          message.auctionID = reader.string();
          break;
        case 4:
          message.bidHash = reader.string();
          break;
        case 5:
          message.createdAt = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateBid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bidID: isSet(object.bidID) ? String(object.bidID) : "",
      auctionID: isSet(object.auctionID) ? String(object.auctionID) : "",
      bidHash: isSet(object.bidHash) ? String(object.bidHash) : "",
      createdAt: isSet(object.createdAt) ? Number(object.createdAt) : 0,
    };
  },

  toJSON(message: MsgUpdateBid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bidID !== undefined && (obj.bidID = message.bidID);
    message.auctionID !== undefined && (obj.auctionID = message.auctionID);
    message.bidHash !== undefined && (obj.bidHash = message.bidHash);
    message.createdAt !== undefined && (obj.createdAt = Math.round(message.createdAt));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateBid>, I>>(object: I): MsgUpdateBid {
    const message = createBaseMsgUpdateBid();
    message.creator = object.creator ?? "";
    message.bidID = object.bidID ?? "";
    message.auctionID = object.auctionID ?? "";
    message.bidHash = object.bidHash ?? "";
    message.createdAt = object.createdAt ?? 0;
    return message;
  },
};

function createBaseMsgUpdateBidResponse(): MsgUpdateBidResponse {
  return {};
}

export const MsgUpdateBidResponse = {
  encode(_: MsgUpdateBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateBidResponse {
    return {};
  },

  toJSON(_: MsgUpdateBidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateBidResponse>, I>>(_: I): MsgUpdateBidResponse {
    const message = createBaseMsgUpdateBidResponse();
    return message;
  },
};

function createBaseMsgCancelBid(): MsgCancelBid {
  return { creator: "", bidID: "" };
}

export const MsgCancelBid = {
  encode(message: MsgCancelBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bidID !== "") {
      writer.uint32(18).string(message.bidID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bidID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCancelBid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bidID: isSet(object.bidID) ? String(object.bidID) : "",
    };
  },

  toJSON(message: MsgCancelBid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bidID !== undefined && (obj.bidID = message.bidID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBid>, I>>(object: I): MsgCancelBid {
    const message = createBaseMsgCancelBid();
    message.creator = object.creator ?? "";
    message.bidID = object.bidID ?? "";
    return message;
  },
};

function createBaseMsgCancelBidResponse(): MsgCancelBidResponse {
  return {};
}

export const MsgCancelBidResponse = {
  encode(_: MsgCancelBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCancelBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCancelBidResponse {
    return {};
  },

  toJSON(_: MsgCancelBidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCancelBidResponse>, I>>(_: I): MsgCancelBidResponse {
    const message = createBaseMsgCancelBidResponse();
    return message;
  },
};

function createBaseMsgFinalizeBid(): MsgFinalizeBid {
  return { creator: "", bidID: "", auctionID: "", bidValue: "" };
}

export const MsgFinalizeBid = {
  encode(message: MsgFinalizeBid, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bidID !== "") {
      writer.uint32(18).string(message.bidID);
    }
    if (message.auctionID !== "") {
      writer.uint32(26).string(message.auctionID);
    }
    if (message.bidValue !== "") {
      writer.uint32(34).string(message.bidValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFinalizeBid {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFinalizeBid();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bidID = reader.string();
          break;
        case 3:
          message.auctionID = reader.string();
          break;
        case 4:
          message.bidValue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgFinalizeBid {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bidID: isSet(object.bidID) ? String(object.bidID) : "",
      auctionID: isSet(object.auctionID) ? String(object.auctionID) : "",
      bidValue: isSet(object.bidValue) ? String(object.bidValue) : "",
    };
  },

  toJSON(message: MsgFinalizeBid): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bidID !== undefined && (obj.bidID = message.bidID);
    message.auctionID !== undefined && (obj.auctionID = message.auctionID);
    message.bidValue !== undefined && (obj.bidValue = message.bidValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFinalizeBid>, I>>(object: I): MsgFinalizeBid {
    const message = createBaseMsgFinalizeBid();
    message.creator = object.creator ?? "";
    message.bidID = object.bidID ?? "";
    message.auctionID = object.auctionID ?? "";
    message.bidValue = object.bidValue ?? "";
    return message;
  },
};

function createBaseMsgFinalizeBidResponse(): MsgFinalizeBidResponse {
  return {};
}

export const MsgFinalizeBidResponse = {
  encode(_: MsgFinalizeBidResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgFinalizeBidResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgFinalizeBidResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgFinalizeBidResponse {
    return {};
  },

  toJSON(_: MsgFinalizeBidResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgFinalizeBidResponse>, I>>(_: I): MsgFinalizeBidResponse {
    const message = createBaseMsgFinalizeBidResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  InitiateAuction(request: MsgInitiateAuction): Promise<MsgInitiateAuctionResponse>;
  SubmitBid(request: MsgSubmitBid): Promise<MsgSubmitBidResponse>;
  UpdateBid(request: MsgUpdateBid): Promise<MsgUpdateBidResponse>;
  CancelBid(request: MsgCancelBid): Promise<MsgCancelBidResponse>;
  FinalizeBid(request: MsgFinalizeBid): Promise<MsgFinalizeBidResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InitiateAuction = this.InitiateAuction.bind(this);
    this.SubmitBid = this.SubmitBid.bind(this);
    this.UpdateBid = this.UpdateBid.bind(this);
    this.CancelBid = this.CancelBid.bind(this);
    this.FinalizeBid = this.FinalizeBid.bind(this);
  }
  InitiateAuction(request: MsgInitiateAuction): Promise<MsgInitiateAuctionResponse> {
    const data = MsgInitiateAuction.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "InitiateAuction", data);
    return promise.then((data) => MsgInitiateAuctionResponse.decode(new _m0.Reader(data)));
  }

  SubmitBid(request: MsgSubmitBid): Promise<MsgSubmitBidResponse> {
    const data = MsgSubmitBid.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "SubmitBid", data);
    return promise.then((data) => MsgSubmitBidResponse.decode(new _m0.Reader(data)));
  }

  UpdateBid(request: MsgUpdateBid): Promise<MsgUpdateBidResponse> {
    const data = MsgUpdateBid.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "UpdateBid", data);
    return promise.then((data) => MsgUpdateBidResponse.decode(new _m0.Reader(data)));
  }

  CancelBid(request: MsgCancelBid): Promise<MsgCancelBidResponse> {
    const data = MsgCancelBid.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "CancelBid", data);
    return promise.then((data) => MsgCancelBidResponse.decode(new _m0.Reader(data)));
  }

  FinalizeBid(request: MsgFinalizeBid): Promise<MsgFinalizeBidResponse> {
    const data = MsgFinalizeBid.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "FinalizeBid", data);
    return promise.then((data) => MsgFinalizeBidResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
