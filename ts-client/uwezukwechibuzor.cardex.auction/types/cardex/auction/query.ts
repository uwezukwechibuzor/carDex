/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../cosmos/base/query/v1beta1/pagination";
import { Auction } from "./auction";
import { Params } from "./params";

export const protobufPackage = "uwezukwechibuzor.cardex.auction";

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined;
}

export interface QueryGetAuctionRequest {
  auctionID: string;
}

export interface QueryGetAuctionResponse {
  Auction: Auction | undefined;
}

export interface QueryAllAuctionRequest {
  pagination: PageRequest | undefined;
}

export interface QueryAllAuctionResponse {
  Auction: Auction[];
  pagination: PageResponse | undefined;
}

function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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

  fromJSON(_: any): QueryParamsRequest {
    return {};
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsRequest>, I>>(_: I): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
};

function createBaseQueryParamsResponse(): QueryParamsResponse {
  return { params: undefined };
}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryParamsResponse {
    return { params: isSet(object.params) ? Params.fromJSON(object.params) : undefined };
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryParamsResponse>, I>>(object: I): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    return message;
  },
};

function createBaseQueryGetAuctionRequest(): QueryGetAuctionRequest {
  return { auctionID: "" };
}

export const QueryGetAuctionRequest = {
  encode(message: QueryGetAuctionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.auctionID !== "") {
      writer.uint32(10).string(message.auctionID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAuctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAuctionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.auctionID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAuctionRequest {
    return { auctionID: isSet(object.auctionID) ? String(object.auctionID) : "" };
  },

  toJSON(message: QueryGetAuctionRequest): unknown {
    const obj: any = {};
    message.auctionID !== undefined && (obj.auctionID = message.auctionID);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAuctionRequest>, I>>(object: I): QueryGetAuctionRequest {
    const message = createBaseQueryGetAuctionRequest();
    message.auctionID = object.auctionID ?? "";
    return message;
  },
};

function createBaseQueryGetAuctionResponse(): QueryGetAuctionResponse {
  return { Auction: undefined };
}

export const QueryGetAuctionResponse = {
  encode(message: QueryGetAuctionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.Auction !== undefined) {
      Auction.encode(message.Auction, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetAuctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetAuctionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Auction = Auction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetAuctionResponse {
    return { Auction: isSet(object.Auction) ? Auction.fromJSON(object.Auction) : undefined };
  },

  toJSON(message: QueryGetAuctionResponse): unknown {
    const obj: any = {};
    message.Auction !== undefined && (obj.Auction = message.Auction ? Auction.toJSON(message.Auction) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryGetAuctionResponse>, I>>(object: I): QueryGetAuctionResponse {
    const message = createBaseQueryGetAuctionResponse();
    message.Auction = (object.Auction !== undefined && object.Auction !== null)
      ? Auction.fromPartial(object.Auction)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAuctionRequest(): QueryAllAuctionRequest {
  return { pagination: undefined };
}

export const QueryAllAuctionRequest = {
  encode(message: QueryAllAuctionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAuctionRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAuctionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAuctionRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryAllAuctionRequest): unknown {
    const obj: any = {};
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAuctionRequest>, I>>(object: I): QueryAllAuctionRequest {
    const message = createBaseQueryAllAuctionRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryAllAuctionResponse(): QueryAllAuctionResponse {
  return { Auction: [], pagination: undefined };
}

export const QueryAllAuctionResponse = {
  encode(message: QueryAllAuctionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.Auction) {
      Auction.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryAllAuctionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAllAuctionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Auction.push(Auction.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAllAuctionResponse {
    return {
      Auction: Array.isArray(object?.Auction) ? object.Auction.map((e: any) => Auction.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryAllAuctionResponse): unknown {
    const obj: any = {};
    if (message.Auction) {
      obj.Auction = message.Auction.map((e) => e ? Auction.toJSON(e) : undefined);
    } else {
      obj.Auction = [];
    }
    message.pagination !== undefined
      && (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryAllAuctionResponse>, I>>(object: I): QueryAllAuctionResponse {
    const message = createBaseQueryAllAuctionResponse();
    message.Auction = object.Auction?.map((e) => Auction.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
  /** Queries a list of Auction items. */
  Auction(request: QueryGetAuctionRequest): Promise<QueryGetAuctionResponse>;
  AuctionAll(request: QueryAllAuctionRequest): Promise<QueryAllAuctionResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.Auction = this.Auction.bind(this);
    this.AuctionAll = this.AuctionAll.bind(this);
  }
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Query", "Params", data);
    return promise.then((data) => QueryParamsResponse.decode(new _m0.Reader(data)));
  }

  Auction(request: QueryGetAuctionRequest): Promise<QueryGetAuctionResponse> {
    const data = QueryGetAuctionRequest.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Query", "Auction", data);
    return promise.then((data) => QueryGetAuctionResponse.decode(new _m0.Reader(data)));
  }

  AuctionAll(request: QueryAllAuctionRequest): Promise<QueryAllAuctionResponse> {
    const data = QueryAllAuctionRequest.encode(request).finish();
    const promise = this.rpc.request("uwezukwechibuzor.cardex.auction.Query", "AuctionAll", data);
    return promise.then((data) => QueryAllAuctionResponse.decode(new _m0.Reader(data)));
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
