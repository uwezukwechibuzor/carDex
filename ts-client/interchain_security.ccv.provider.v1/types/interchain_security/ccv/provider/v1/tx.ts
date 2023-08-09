/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { Any } from "../../../../google/protobuf/any";

export const protobufPackage = "interchain_security.ccv.provider.v1";

export interface MsgAssignConsumerKey {
  /** The chain id of the consumer chain to assign a consensus public key to */
  chainId: string;
  /** The validator address on the provider */
  providerAddr: string;
  /** The consensus public key to use on the consumer */
  consumerKey: Any | undefined;
}

export interface MsgAssignConsumerKeyResponse {
}

function createBaseMsgAssignConsumerKey(): MsgAssignConsumerKey {
  return { chainId: "", providerAddr: "", consumerKey: undefined };
}

export const MsgAssignConsumerKey = {
  encode(message: MsgAssignConsumerKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== "") {
      writer.uint32(18).string(message.providerAddr);
    }
    if (message.consumerKey !== undefined) {
      Any.encode(message.consumerKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAssignConsumerKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = reader.string();
          break;
        case 3:
          message.consumerKey = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAssignConsumerKey {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      providerAddr: isSet(object.providerAddr) ? String(object.providerAddr) : "",
      consumerKey: isSet(object.consumerKey) ? Any.fromJSON(object.consumerKey) : undefined,
    };
  },

  toJSON(message: MsgAssignConsumerKey): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.providerAddr !== undefined && (obj.providerAddr = message.providerAddr);
    message.consumerKey !== undefined
      && (obj.consumerKey = message.consumerKey ? Any.toJSON(message.consumerKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAssignConsumerKey>, I>>(object: I): MsgAssignConsumerKey {
    const message = createBaseMsgAssignConsumerKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = object.providerAddr ?? "";
    message.consumerKey = (object.consumerKey !== undefined && object.consumerKey !== null)
      ? Any.fromPartial(object.consumerKey)
      : undefined;
    return message;
  },
};

function createBaseMsgAssignConsumerKeyResponse(): MsgAssignConsumerKeyResponse {
  return {};
}

export const MsgAssignConsumerKeyResponse = {
  encode(_: MsgAssignConsumerKeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAssignConsumerKeyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAssignConsumerKeyResponse();
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

  fromJSON(_: any): MsgAssignConsumerKeyResponse {
    return {};
  },

  toJSON(_: MsgAssignConsumerKeyResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgAssignConsumerKeyResponse>, I>>(_: I): MsgAssignConsumerKeyResponse {
    const message = createBaseMsgAssignConsumerKeyResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  AssignConsumerKey(request: MsgAssignConsumerKey): Promise<MsgAssignConsumerKeyResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.AssignConsumerKey = this.AssignConsumerKey.bind(this);
  }
  AssignConsumerKey(request: MsgAssignConsumerKey): Promise<MsgAssignConsumerKeyResponse> {
    const data = MsgAssignConsumerKey.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Msg", "AssignConsumerKey", data);
    return promise.then((data) => MsgAssignConsumerKeyResponse.decode(new _m0.Reader(data)));
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
