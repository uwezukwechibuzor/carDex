/* eslint-disable */
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
}

export interface MsgInitiateAuctionResponse {
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

/** Msg defines the Msg service. */
export interface Msg {
  InitiateAuction(request: MsgInitiateAuction): Promise<MsgInitiateAuctionResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.InitiateAuction = this.InitiateAuction.bind(this);
  }
  InitiateAuction(request: MsgInitiateAuction): Promise<MsgInitiateAuctionResponse> {
    const data = MsgInitiateAuction.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Msg", "InitiateAuction", data);
    return promise.then((data) => MsgInitiateAuctionResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
