/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { InfractionType, infractionTypeFromJSON, infractionTypeToJSON } from "../../../cosmos/staking/v1beta1/staking";
import { Validator, ValidatorUpdate } from "../../../tendermint/abci/types";

export const protobufPackage = "interchain_security.ccv.v1";

/** ConsumerPacketType indicates interchain security specific packet types. */
export enum ConsumerPacketDataType {
  /** CONSUMER_PACKET_TYPE_UNSPECIFIED - UNSPECIFIED packet type */
  CONSUMER_PACKET_TYPE_UNSPECIFIED = 0,
  /** CONSUMER_PACKET_TYPE_SLASH - Slash packet */
  CONSUMER_PACKET_TYPE_SLASH = 1,
  /** CONSUMER_PACKET_TYPE_VSCM - VSCMatured packet */
  CONSUMER_PACKET_TYPE_VSCM = 2,
  UNRECOGNIZED = -1,
}

export function consumerPacketDataTypeFromJSON(object: any): ConsumerPacketDataType {
  switch (object) {
    case 0:
    case "CONSUMER_PACKET_TYPE_UNSPECIFIED":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_UNSPECIFIED;
    case 1:
    case "CONSUMER_PACKET_TYPE_SLASH":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_SLASH;
    case 2:
    case "CONSUMER_PACKET_TYPE_VSCM":
      return ConsumerPacketDataType.CONSUMER_PACKET_TYPE_VSCM;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ConsumerPacketDataType.UNRECOGNIZED;
  }
}

export function consumerPacketDataTypeToJSON(object: ConsumerPacketDataType): string {
  switch (object) {
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_UNSPECIFIED:
      return "CONSUMER_PACKET_TYPE_UNSPECIFIED";
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_SLASH:
      return "CONSUMER_PACKET_TYPE_SLASH";
    case ConsumerPacketDataType.CONSUMER_PACKET_TYPE_VSCM:
      return "CONSUMER_PACKET_TYPE_VSCM";
    case ConsumerPacketDataType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * This packet is sent from provider chain to consumer chain if the validator
 * set for consumer chain changes (due to new bonding/unbonding messages or
 * slashing events) A VSCMatured packet from consumer chain will be sent
 * asynchronously once unbonding period is over, and this will function as
 * `UnbondingOver` message for this packet.
 */
export interface ValidatorSetChangePacketData {
  validatorUpdates: ValidatorUpdate[];
  valsetUpdateId: number;
  /**
   * consensus address of consumer chain validators
   * successfully slashed on the provider chain
   */
  slashAcks: string[];
}

/** List of ccv.ValidatorSetChangePacketData. */
export interface ValidatorSetChangePackets {
  list: ValidatorSetChangePacketData[];
}

/**
 * This packet is sent from the consumer chain to the provider chain
 * to notify that a VSC packet reached maturity on the consumer chain.
 */
export interface VSCMaturedPacketData {
  /** the id of the VSC packet that reached maturity */
  valsetUpdateId: number;
}

/**
 * This packet is sent from the consumer chain to the provider chain
 * to request the slashing of a validator as a result of an infraction
 * committed on the consumer chain.
 */
export interface SlashPacketData {
  validator:
    | Validator
    | undefined;
  /** map to the infraction block height on the provider */
  valsetUpdateId: number;
  /** tell if the slashing is for a downtime or a double-signing infraction */
  infraction: InfractionType;
}

/** MaturedUnbondingOps defines a list of ids corresponding to ids of matured unbonding operations. */
export interface MaturedUnbondingOps {
  ids: number[];
}

/** ConsumerPacketData contains a consumer packet data and a type tag */
export interface ConsumerPacketData {
  type: ConsumerPacketDataType;
  slashPacketData: SlashPacketData | undefined;
  vscMaturedPacketData: VSCMaturedPacketData | undefined;
}

/** ConsumerPacketDataList is a list of consumer packet data packets. */
export interface ConsumerPacketDataList {
  list: ConsumerPacketData[];
}

function createBaseValidatorSetChangePacketData(): ValidatorSetChangePacketData {
  return { validatorUpdates: [], valsetUpdateId: 0, slashAcks: [] };
}

export const ValidatorSetChangePacketData = {
  encode(message: ValidatorSetChangePacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validatorUpdates) {
      ValidatorUpdate.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.valsetUpdateId !== 0) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    for (const v of message.slashAcks) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSetChangePacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetChangePacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorUpdates.push(ValidatorUpdate.decode(reader, reader.uint32()));
          break;
        case 2:
          message.valsetUpdateId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.slashAcks.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSetChangePacketData {
    return {
      validatorUpdates: Array.isArray(object?.validatorUpdates)
        ? object.validatorUpdates.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      valsetUpdateId: isSet(object.valsetUpdateId) ? Number(object.valsetUpdateId) : 0,
      slashAcks: Array.isArray(object?.slashAcks) ? object.slashAcks.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: ValidatorSetChangePacketData): unknown {
    const obj: any = {};
    if (message.validatorUpdates) {
      obj.validatorUpdates = message.validatorUpdates.map((e) => e ? ValidatorUpdate.toJSON(e) : undefined);
    } else {
      obj.validatorUpdates = [];
    }
    message.valsetUpdateId !== undefined && (obj.valsetUpdateId = Math.round(message.valsetUpdateId));
    if (message.slashAcks) {
      obj.slashAcks = message.slashAcks.map((e) => e);
    } else {
      obj.slashAcks = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorSetChangePacketData>, I>>(object: I): ValidatorSetChangePacketData {
    const message = createBaseValidatorSetChangePacketData();
    message.validatorUpdates = object.validatorUpdates?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.valsetUpdateId = object.valsetUpdateId ?? 0;
    message.slashAcks = object.slashAcks?.map((e) => e) || [];
    return message;
  },
};

function createBaseValidatorSetChangePackets(): ValidatorSetChangePackets {
  return { list: [] };
}

export const ValidatorSetChangePackets = {
  encode(message: ValidatorSetChangePackets, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.list) {
      ValidatorSetChangePacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorSetChangePackets {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorSetChangePackets();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ValidatorSetChangePacketData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorSetChangePackets {
    return {
      list: Array.isArray(object?.list) ? object.list.map((e: any) => ValidatorSetChangePacketData.fromJSON(e)) : [],
    };
  },

  toJSON(message: ValidatorSetChangePackets): unknown {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map((e) => e ? ValidatorSetChangePacketData.toJSON(e) : undefined);
    } else {
      obj.list = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorSetChangePackets>, I>>(object: I): ValidatorSetChangePackets {
    const message = createBaseValidatorSetChangePackets();
    message.list = object.list?.map((e) => ValidatorSetChangePacketData.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVSCMaturedPacketData(): VSCMaturedPacketData {
  return { valsetUpdateId: 0 };
}

export const VSCMaturedPacketData = {
  encode(message: VSCMaturedPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valsetUpdateId !== 0) {
      writer.uint32(8).uint64(message.valsetUpdateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VSCMaturedPacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVSCMaturedPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.valsetUpdateId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VSCMaturedPacketData {
    return { valsetUpdateId: isSet(object.valsetUpdateId) ? Number(object.valsetUpdateId) : 0 };
  },

  toJSON(message: VSCMaturedPacketData): unknown {
    const obj: any = {};
    message.valsetUpdateId !== undefined && (obj.valsetUpdateId = Math.round(message.valsetUpdateId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VSCMaturedPacketData>, I>>(object: I): VSCMaturedPacketData {
    const message = createBaseVSCMaturedPacketData();
    message.valsetUpdateId = object.valsetUpdateId ?? 0;
    return message;
  },
};

function createBaseSlashPacketData(): SlashPacketData {
  return { validator: undefined, valsetUpdateId: 0, infraction: 0 };
}

export const SlashPacketData = {
  encode(message: SlashPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    if (message.valsetUpdateId !== 0) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    if (message.infraction !== 0) {
      writer.uint32(24).int32(message.infraction);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SlashPacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        case 2:
          message.valsetUpdateId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.infraction = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SlashPacketData {
    return {
      validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined,
      valsetUpdateId: isSet(object.valsetUpdateId) ? Number(object.valsetUpdateId) : 0,
      infraction: isSet(object.infraction) ? infractionTypeFromJSON(object.infraction) : 0,
    };
  },

  toJSON(message: SlashPacketData): unknown {
    const obj: any = {};
    message.validator !== undefined
      && (obj.validator = message.validator ? Validator.toJSON(message.validator) : undefined);
    message.valsetUpdateId !== undefined && (obj.valsetUpdateId = Math.round(message.valsetUpdateId));
    message.infraction !== undefined && (obj.infraction = infractionTypeToJSON(message.infraction));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SlashPacketData>, I>>(object: I): SlashPacketData {
    const message = createBaseSlashPacketData();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    message.valsetUpdateId = object.valsetUpdateId ?? 0;
    message.infraction = object.infraction ?? 0;
    return message;
  },
};

function createBaseMaturedUnbondingOps(): MaturedUnbondingOps {
  return { ids: [] };
}

export const MaturedUnbondingOps = {
  encode(message: MaturedUnbondingOps, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.ids) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MaturedUnbondingOps {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMaturedUnbondingOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.ids.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.ids.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MaturedUnbondingOps {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => Number(e)) : [] };
  },

  toJSON(message: MaturedUnbondingOps): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => Math.round(e));
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MaturedUnbondingOps>, I>>(object: I): MaturedUnbondingOps {
    const message = createBaseMaturedUnbondingOps();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseConsumerPacketData(): ConsumerPacketData {
  return { type: 0, slashPacketData: undefined, vscMaturedPacketData: undefined };
}

export const ConsumerPacketData = {
  encode(message: ConsumerPacketData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.slashPacketData !== undefined) {
      SlashPacketData.encode(message.slashPacketData, writer.uint32(18).fork()).ldelim();
    }
    if (message.vscMaturedPacketData !== undefined) {
      VSCMaturedPacketData.encode(message.vscMaturedPacketData, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerPacketData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.type = reader.int32() as any;
          break;
        case 2:
          message.slashPacketData = SlashPacketData.decode(reader, reader.uint32());
          break;
        case 3:
          message.vscMaturedPacketData = VSCMaturedPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerPacketData {
    return {
      type: isSet(object.type) ? consumerPacketDataTypeFromJSON(object.type) : 0,
      slashPacketData: isSet(object.slashPacketData) ? SlashPacketData.fromJSON(object.slashPacketData) : undefined,
      vscMaturedPacketData: isSet(object.vscMaturedPacketData)
        ? VSCMaturedPacketData.fromJSON(object.vscMaturedPacketData)
        : undefined,
    };
  },

  toJSON(message: ConsumerPacketData): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = consumerPacketDataTypeToJSON(message.type));
    message.slashPacketData !== undefined
      && (obj.slashPacketData = message.slashPacketData ? SlashPacketData.toJSON(message.slashPacketData) : undefined);
    message.vscMaturedPacketData !== undefined && (obj.vscMaturedPacketData = message.vscMaturedPacketData
      ? VSCMaturedPacketData.toJSON(message.vscMaturedPacketData)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerPacketData>, I>>(object: I): ConsumerPacketData {
    const message = createBaseConsumerPacketData();
    message.type = object.type ?? 0;
    message.slashPacketData = (object.slashPacketData !== undefined && object.slashPacketData !== null)
      ? SlashPacketData.fromPartial(object.slashPacketData)
      : undefined;
    message.vscMaturedPacketData = (object.vscMaturedPacketData !== undefined && object.vscMaturedPacketData !== null)
      ? VSCMaturedPacketData.fromPartial(object.vscMaturedPacketData)
      : undefined;
    return message;
  },
};

function createBaseConsumerPacketDataList(): ConsumerPacketDataList {
  return { list: [] };
}

export const ConsumerPacketDataList = {
  encode(message: ConsumerPacketDataList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.list) {
      ConsumerPacketData.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerPacketDataList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerPacketDataList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.list.push(ConsumerPacketData.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerPacketDataList {
    return { list: Array.isArray(object?.list) ? object.list.map((e: any) => ConsumerPacketData.fromJSON(e)) : [] };
  },

  toJSON(message: ConsumerPacketDataList): unknown {
    const obj: any = {};
    if (message.list) {
      obj.list = message.list.map((e) => e ? ConsumerPacketData.toJSON(e) : undefined);
    } else {
      obj.list = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerPacketDataList>, I>>(object: I): ConsumerPacketDataList {
    const message = createBaseConsumerPacketDataList();
    message.list = object.list?.map((e) => ConsumerPacketData.fromPartial(e)) || [];
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
