/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { ClientState, ConsensusState } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { ValidatorUpdate } from "../../../../tendermint/abci/types";
import { ConsumerPacketDataList } from "../../v1/ccv";
import { LastTransmissionBlockHeight, MaturingVSCPacket, Params } from "./consumer";

export const protobufPackage = "interchain_security.ccv.consumer.v1";

/** GenesisState defines the CCV consumer chain genesis state */
export interface GenesisState {
  params:
    | Params
    | undefined;
  /** empty for a new chain, filled in on restart. */
  providerClientId: string;
  /** empty for a new chain, filled in on restart. */
  providerChannelId: string;
  /** true for new chain GenesisState, false for chain restart. */
  newChain: boolean;
  /** ProviderClientState filled in on new chain, nil on restart. */
  providerClientState:
    | ClientState
    | undefined;
  /** ProviderConsensusState filled in on new chain, nil on restart. */
  providerConsensusState:
    | ConsensusState
    | undefined;
  /** MaturingPackets nil on new chain, filled in on restart. */
  maturingPackets: MaturingVSCPacket[];
  /** InitialValset filled in on new chain and on restart. */
  initialValSet: ValidatorUpdate[];
  /** HeightToValsetUpdateId nil on new chain, filled in on restart. */
  heightToValsetUpdateId: HeightToValsetUpdateID[];
  /** OutstandingDowntimes nil on new chain, filled  in on restart. */
  outstandingDowntimeSlashing: OutstandingDowntime[];
  /** PendingConsumerPackets nil on new chain, filled in on restart. */
  pendingConsumerPackets:
    | ConsumerPacketDataList
    | undefined;
  /** LastTransmissionBlockHeight nil on new chain, filled in on restart. */
  lastTransmissionBlockHeight:
    | LastTransmissionBlockHeight
    | undefined;
  /** flag indicating whether the consumer CCV module starts in pre-CCV state */
  preCCV: boolean;
}

/**
 * HeightValsetUpdateID defines the genesis information for the mapping
 * of each block height to a valset update id
 */
export interface HeightToValsetUpdateID {
  height: number;
  valsetUpdateId: number;
}

/**
 * OutstandingDowntime defines the genesis information for each validator
 * flagged with an outstanding downtime slashing.
 */
export interface OutstandingDowntime {
  validatorConsensusAddress: string;
}

function createBaseGenesisState(): GenesisState {
  return {
    params: undefined,
    providerClientId: "",
    providerChannelId: "",
    newChain: false,
    providerClientState: undefined,
    providerConsensusState: undefined,
    maturingPackets: [],
    initialValSet: [],
    heightToValsetUpdateId: [],
    outstandingDowntimeSlashing: [],
    pendingConsumerPackets: undefined,
    lastTransmissionBlockHeight: undefined,
    preCCV: false,
  };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    if (message.providerClientId !== "") {
      writer.uint32(18).string(message.providerClientId);
    }
    if (message.providerChannelId !== "") {
      writer.uint32(26).string(message.providerChannelId);
    }
    if (message.newChain === true) {
      writer.uint32(32).bool(message.newChain);
    }
    if (message.providerClientState !== undefined) {
      ClientState.encode(message.providerClientState, writer.uint32(42).fork()).ldelim();
    }
    if (message.providerConsensusState !== undefined) {
      ConsensusState.encode(message.providerConsensusState, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.maturingPackets) {
      MaturingVSCPacket.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.initialValSet) {
      ValidatorUpdate.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.heightToValsetUpdateId) {
      HeightToValsetUpdateID.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.outstandingDowntimeSlashing) {
      OutstandingDowntime.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    if (message.pendingConsumerPackets !== undefined) {
      ConsumerPacketDataList.encode(message.pendingConsumerPackets, writer.uint32(90).fork()).ldelim();
    }
    if (message.lastTransmissionBlockHeight !== undefined) {
      LastTransmissionBlockHeight.encode(message.lastTransmissionBlockHeight, writer.uint32(98).fork()).ldelim();
    }
    if (message.preCCV === true) {
      writer.uint32(104).bool(message.preCCV);
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
          message.providerClientId = reader.string();
          break;
        case 3:
          message.providerChannelId = reader.string();
          break;
        case 4:
          message.newChain = reader.bool();
          break;
        case 5:
          message.providerClientState = ClientState.decode(reader, reader.uint32());
          break;
        case 6:
          message.providerConsensusState = ConsensusState.decode(reader, reader.uint32());
          break;
        case 7:
          message.maturingPackets.push(MaturingVSCPacket.decode(reader, reader.uint32()));
          break;
        case 8:
          message.initialValSet.push(ValidatorUpdate.decode(reader, reader.uint32()));
          break;
        case 9:
          message.heightToValsetUpdateId.push(HeightToValsetUpdateID.decode(reader, reader.uint32()));
          break;
        case 10:
          message.outstandingDowntimeSlashing.push(OutstandingDowntime.decode(reader, reader.uint32()));
          break;
        case 11:
          message.pendingConsumerPackets = ConsumerPacketDataList.decode(reader, reader.uint32());
          break;
        case 12:
          message.lastTransmissionBlockHeight = LastTransmissionBlockHeight.decode(reader, reader.uint32());
          break;
        case 13:
          message.preCCV = reader.bool();
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
      providerClientId: isSet(object.providerClientId) ? String(object.providerClientId) : "",
      providerChannelId: isSet(object.providerChannelId) ? String(object.providerChannelId) : "",
      newChain: isSet(object.newChain) ? Boolean(object.newChain) : false,
      providerClientState: isSet(object.providerClientState)
        ? ClientState.fromJSON(object.providerClientState)
        : undefined,
      providerConsensusState: isSet(object.providerConsensusState)
        ? ConsensusState.fromJSON(object.providerConsensusState)
        : undefined,
      maturingPackets: Array.isArray(object?.maturingPackets)
        ? object.maturingPackets.map((e: any) => MaturingVSCPacket.fromJSON(e))
        : [],
      initialValSet: Array.isArray(object?.initialValSet)
        ? object.initialValSet.map((e: any) => ValidatorUpdate.fromJSON(e))
        : [],
      heightToValsetUpdateId: Array.isArray(object?.heightToValsetUpdateId)
        ? object.heightToValsetUpdateId.map((e: any) => HeightToValsetUpdateID.fromJSON(e))
        : [],
      outstandingDowntimeSlashing: Array.isArray(object?.outstandingDowntimeSlashing)
        ? object.outstandingDowntimeSlashing.map((e: any) => OutstandingDowntime.fromJSON(e))
        : [],
      pendingConsumerPackets: isSet(object.pendingConsumerPackets)
        ? ConsumerPacketDataList.fromJSON(object.pendingConsumerPackets)
        : undefined,
      lastTransmissionBlockHeight: isSet(object.lastTransmissionBlockHeight)
        ? LastTransmissionBlockHeight.fromJSON(object.lastTransmissionBlockHeight)
        : undefined,
      preCCV: isSet(object.preCCV) ? Boolean(object.preCCV) : false,
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.params !== undefined && (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    message.providerClientId !== undefined && (obj.providerClientId = message.providerClientId);
    message.providerChannelId !== undefined && (obj.providerChannelId = message.providerChannelId);
    message.newChain !== undefined && (obj.newChain = message.newChain);
    message.providerClientState !== undefined && (obj.providerClientState = message.providerClientState
      ? ClientState.toJSON(message.providerClientState)
      : undefined);
    message.providerConsensusState !== undefined && (obj.providerConsensusState = message.providerConsensusState
      ? ConsensusState.toJSON(message.providerConsensusState)
      : undefined);
    if (message.maturingPackets) {
      obj.maturingPackets = message.maturingPackets.map((e) => e ? MaturingVSCPacket.toJSON(e) : undefined);
    } else {
      obj.maturingPackets = [];
    }
    if (message.initialValSet) {
      obj.initialValSet = message.initialValSet.map((e) => e ? ValidatorUpdate.toJSON(e) : undefined);
    } else {
      obj.initialValSet = [];
    }
    if (message.heightToValsetUpdateId) {
      obj.heightToValsetUpdateId = message.heightToValsetUpdateId.map((e) =>
        e ? HeightToValsetUpdateID.toJSON(e) : undefined
      );
    } else {
      obj.heightToValsetUpdateId = [];
    }
    if (message.outstandingDowntimeSlashing) {
      obj.outstandingDowntimeSlashing = message.outstandingDowntimeSlashing.map((e) =>
        e ? OutstandingDowntime.toJSON(e) : undefined
      );
    } else {
      obj.outstandingDowntimeSlashing = [];
    }
    message.pendingConsumerPackets !== undefined && (obj.pendingConsumerPackets = message.pendingConsumerPackets
      ? ConsumerPacketDataList.toJSON(message.pendingConsumerPackets)
      : undefined);
    message.lastTransmissionBlockHeight !== undefined
      && (obj.lastTransmissionBlockHeight = message.lastTransmissionBlockHeight
        ? LastTransmissionBlockHeight.toJSON(message.lastTransmissionBlockHeight)
        : undefined);
    message.preCCV !== undefined && (obj.preCCV = message.preCCV);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.params = (object.params !== undefined && object.params !== null)
      ? Params.fromPartial(object.params)
      : undefined;
    message.providerClientId = object.providerClientId ?? "";
    message.providerChannelId = object.providerChannelId ?? "";
    message.newChain = object.newChain ?? false;
    message.providerClientState = (object.providerClientState !== undefined && object.providerClientState !== null)
      ? ClientState.fromPartial(object.providerClientState)
      : undefined;
    message.providerConsensusState =
      (object.providerConsensusState !== undefined && object.providerConsensusState !== null)
        ? ConsensusState.fromPartial(object.providerConsensusState)
        : undefined;
    message.maturingPackets = object.maturingPackets?.map((e) => MaturingVSCPacket.fromPartial(e)) || [];
    message.initialValSet = object.initialValSet?.map((e) => ValidatorUpdate.fromPartial(e)) || [];
    message.heightToValsetUpdateId = object.heightToValsetUpdateId?.map((e) => HeightToValsetUpdateID.fromPartial(e))
      || [];
    message.outstandingDowntimeSlashing =
      object.outstandingDowntimeSlashing?.map((e) => OutstandingDowntime.fromPartial(e)) || [];
    message.pendingConsumerPackets =
      (object.pendingConsumerPackets !== undefined && object.pendingConsumerPackets !== null)
        ? ConsumerPacketDataList.fromPartial(object.pendingConsumerPackets)
        : undefined;
    message.lastTransmissionBlockHeight =
      (object.lastTransmissionBlockHeight !== undefined && object.lastTransmissionBlockHeight !== null)
        ? LastTransmissionBlockHeight.fromPartial(object.lastTransmissionBlockHeight)
        : undefined;
    message.preCCV = object.preCCV ?? false;
    return message;
  },
};

function createBaseHeightToValsetUpdateID(): HeightToValsetUpdateID {
  return { height: 0, valsetUpdateId: 0 };
}

export const HeightToValsetUpdateID = {
  encode(message: HeightToValsetUpdateID, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.height !== 0) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.valsetUpdateId !== 0) {
      writer.uint32(16).uint64(message.valsetUpdateId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HeightToValsetUpdateID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHeightToValsetUpdateID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.valsetUpdateId = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HeightToValsetUpdateID {
    return {
      height: isSet(object.height) ? Number(object.height) : 0,
      valsetUpdateId: isSet(object.valsetUpdateId) ? Number(object.valsetUpdateId) : 0,
    };
  },

  toJSON(message: HeightToValsetUpdateID): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = Math.round(message.height));
    message.valsetUpdateId !== undefined && (obj.valsetUpdateId = Math.round(message.valsetUpdateId));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HeightToValsetUpdateID>, I>>(object: I): HeightToValsetUpdateID {
    const message = createBaseHeightToValsetUpdateID();
    message.height = object.height ?? 0;
    message.valsetUpdateId = object.valsetUpdateId ?? 0;
    return message;
  },
};

function createBaseOutstandingDowntime(): OutstandingDowntime {
  return { validatorConsensusAddress: "" };
}

export const OutstandingDowntime = {
  encode(message: OutstandingDowntime, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorConsensusAddress !== "") {
      writer.uint32(10).string(message.validatorConsensusAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OutstandingDowntime {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOutstandingDowntime();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorConsensusAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OutstandingDowntime {
    return {
      validatorConsensusAddress: isSet(object.validatorConsensusAddress)
        ? String(object.validatorConsensusAddress)
        : "",
    };
  },

  toJSON(message: OutstandingDowntime): unknown {
    const obj: any = {};
    message.validatorConsensusAddress !== undefined
      && (obj.validatorConsensusAddress = message.validatorConsensusAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OutstandingDowntime>, I>>(object: I): OutstandingDowntime {
    const message = createBaseOutstandingDowntime();
    message.validatorConsensusAddress = object.validatorConsensusAddress ?? "";
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
