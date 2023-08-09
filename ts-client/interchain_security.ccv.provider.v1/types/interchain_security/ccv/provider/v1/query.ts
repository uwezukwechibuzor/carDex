/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { GenesisState } from "../../consumer/v1/genesis";
import { SlashPacketData, VSCMaturedPacketData } from "../../v1/ccv";
import { ConsumerAdditionProposals, ConsumerRemovalProposals, GlobalSlashEntry } from "./provider";

export const protobufPackage = "interchain_security.ccv.provider.v1";

export interface QueryConsumerGenesisRequest {
  chainId: string;
}

export interface QueryConsumerGenesisResponse {
  genesisState: GenesisState | undefined;
}

export interface QueryConsumerChainsRequest {
}

export interface QueryConsumerChainsResponse {
  chains: Chain[];
}

export interface QueryConsumerChainStartProposalsRequest {
}

export interface QueryConsumerChainStartProposalsResponse {
  proposals: ConsumerAdditionProposals | undefined;
}

export interface QueryConsumerChainStopProposalsRequest {
}

export interface QueryConsumerChainStopProposalsResponse {
  proposals: ConsumerRemovalProposals | undefined;
}

export interface Chain {
  chainId: string;
  clientId: string;
}

export interface QueryValidatorConsumerAddrRequest {
  /** The id of the consumer chain */
  chainId: string;
  /** The consensus address of the validator on the provider chain */
  providerAddress: string;
}

export interface QueryValidatorConsumerAddrResponse {
  /** The address of the validator on the consumer chain */
  consumerAddress: string;
}

export interface QueryValidatorProviderAddrRequest {
  /** The id of the provider chain */
  chainId: string;
  /** The consensus address of the validator on the consumer chain */
  consumerAddress: string;
}

export interface QueryValidatorProviderAddrResponse {
  /** The address of the validator on the provider chain */
  providerAddress: string;
}

export interface QueryThrottleStateRequest {
}

export interface QueryThrottleStateResponse {
  /** current slash_meter state */
  slashMeter: number;
  /**
   * allowance of voting power units (int) that the slash meter is given per replenish period
   * this also serves as the max value for the meter.
   */
  slashMeterAllowance: number;
  /** next time the slash meter could potentially be replenished, iff it's not full */
  nextReplenishCandidate:
    | Date
    | undefined;
  /** data relevant to currently throttled slash packets */
  packets: ThrottledSlashPacket[];
}

export interface QueryThrottledConsumerPacketDataRequest {
  chainId: string;
}

export interface QueryThrottledConsumerPacketDataResponse {
  chainId: string;
  size: number;
  packetDataInstances: ThrottledPacketDataWrapper[];
}

/** A query wrapper type for the global entry and data relevant to a throttled slash packet. */
export interface ThrottledSlashPacket {
  globalEntry: GlobalSlashEntry | undefined;
  data: SlashPacketData | undefined;
}

/** ThrottledPacketDataWrapper contains either SlashPacketData or VSCMaturedPacketData */
export interface ThrottledPacketDataWrapper {
  slashPacket: SlashPacketData | undefined;
  vscMaturedPacket: VSCMaturedPacketData | undefined;
}

function createBaseQueryConsumerGenesisRequest(): QueryConsumerGenesisRequest {
  return { chainId: "" };
}

export const QueryConsumerGenesisRequest = {
  encode(message: QueryConsumerGenesisRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerGenesisRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConsumerGenesisRequest {
    return { chainId: isSet(object.chainId) ? String(object.chainId) : "" };
  },

  toJSON(message: QueryConsumerGenesisRequest): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerGenesisRequest>, I>>(object: I): QueryConsumerGenesisRequest {
    const message = createBaseQueryConsumerGenesisRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseQueryConsumerGenesisResponse(): QueryConsumerGenesisResponse {
  return { genesisState: undefined };
}

export const QueryConsumerGenesisResponse = {
  encode(message: QueryConsumerGenesisResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.genesisState !== undefined) {
      GenesisState.encode(message.genesisState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerGenesisResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerGenesisResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.genesisState = GenesisState.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConsumerGenesisResponse {
    return { genesisState: isSet(object.genesisState) ? GenesisState.fromJSON(object.genesisState) : undefined };
  },

  toJSON(message: QueryConsumerGenesisResponse): unknown {
    const obj: any = {};
    message.genesisState !== undefined
      && (obj.genesisState = message.genesisState ? GenesisState.toJSON(message.genesisState) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerGenesisResponse>, I>>(object: I): QueryConsumerGenesisResponse {
    const message = createBaseQueryConsumerGenesisResponse();
    message.genesisState = (object.genesisState !== undefined && object.genesisState !== null)
      ? GenesisState.fromPartial(object.genesisState)
      : undefined;
    return message;
  },
};

function createBaseQueryConsumerChainsRequest(): QueryConsumerChainsRequest {
  return {};
}

export const QueryConsumerChainsRequest = {
  encode(_: QueryConsumerChainsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsRequest();
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

  fromJSON(_: any): QueryConsumerChainsRequest {
    return {};
  },

  toJSON(_: QueryConsumerChainsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainsRequest>, I>>(_: I): QueryConsumerChainsRequest {
    const message = createBaseQueryConsumerChainsRequest();
    return message;
  },
};

function createBaseQueryConsumerChainsResponse(): QueryConsumerChainsResponse {
  return { chains: [] };
}

export const QueryConsumerChainsResponse = {
  encode(message: QueryConsumerChainsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.chains) {
      Chain.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chains.push(Chain.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConsumerChainsResponse {
    return { chains: Array.isArray(object?.chains) ? object.chains.map((e: any) => Chain.fromJSON(e)) : [] };
  },

  toJSON(message: QueryConsumerChainsResponse): unknown {
    const obj: any = {};
    if (message.chains) {
      obj.chains = message.chains.map((e) => e ? Chain.toJSON(e) : undefined);
    } else {
      obj.chains = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainsResponse>, I>>(object: I): QueryConsumerChainsResponse {
    const message = createBaseQueryConsumerChainsResponse();
    message.chains = object.chains?.map((e) => Chain.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryConsumerChainStartProposalsRequest(): QueryConsumerChainStartProposalsRequest {
  return {};
}

export const QueryConsumerChainStartProposalsRequest = {
  encode(_: QueryConsumerChainStartProposalsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainStartProposalsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStartProposalsRequest();
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

  fromJSON(_: any): QueryConsumerChainStartProposalsRequest {
    return {};
  },

  toJSON(_: QueryConsumerChainStartProposalsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainStartProposalsRequest>, I>>(
    _: I,
  ): QueryConsumerChainStartProposalsRequest {
    const message = createBaseQueryConsumerChainStartProposalsRequest();
    return message;
  },
};

function createBaseQueryConsumerChainStartProposalsResponse(): QueryConsumerChainStartProposalsResponse {
  return { proposals: undefined };
}

export const QueryConsumerChainStartProposalsResponse = {
  encode(message: QueryConsumerChainStartProposalsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposals !== undefined) {
      ConsumerAdditionProposals.encode(message.proposals, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainStartProposalsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStartProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals = ConsumerAdditionProposals.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConsumerChainStartProposalsResponse {
    return { proposals: isSet(object.proposals) ? ConsumerAdditionProposals.fromJSON(object.proposals) : undefined };
  },

  toJSON(message: QueryConsumerChainStartProposalsResponse): unknown {
    const obj: any = {};
    message.proposals !== undefined
      && (obj.proposals = message.proposals ? ConsumerAdditionProposals.toJSON(message.proposals) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainStartProposalsResponse>, I>>(
    object: I,
  ): QueryConsumerChainStartProposalsResponse {
    const message = createBaseQueryConsumerChainStartProposalsResponse();
    message.proposals = (object.proposals !== undefined && object.proposals !== null)
      ? ConsumerAdditionProposals.fromPartial(object.proposals)
      : undefined;
    return message;
  },
};

function createBaseQueryConsumerChainStopProposalsRequest(): QueryConsumerChainStopProposalsRequest {
  return {};
}

export const QueryConsumerChainStopProposalsRequest = {
  encode(_: QueryConsumerChainStopProposalsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainStopProposalsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStopProposalsRequest();
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

  fromJSON(_: any): QueryConsumerChainStopProposalsRequest {
    return {};
  },

  toJSON(_: QueryConsumerChainStopProposalsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainStopProposalsRequest>, I>>(
    _: I,
  ): QueryConsumerChainStopProposalsRequest {
    const message = createBaseQueryConsumerChainStopProposalsRequest();
    return message;
  },
};

function createBaseQueryConsumerChainStopProposalsResponse(): QueryConsumerChainStopProposalsResponse {
  return { proposals: undefined };
}

export const QueryConsumerChainStopProposalsResponse = {
  encode(message: QueryConsumerChainStopProposalsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.proposals !== undefined) {
      ConsumerRemovalProposals.encode(message.proposals, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryConsumerChainStopProposalsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsumerChainStopProposalsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.proposals = ConsumerRemovalProposals.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryConsumerChainStopProposalsResponse {
    return { proposals: isSet(object.proposals) ? ConsumerRemovalProposals.fromJSON(object.proposals) : undefined };
  },

  toJSON(message: QueryConsumerChainStopProposalsResponse): unknown {
    const obj: any = {};
    message.proposals !== undefined
      && (obj.proposals = message.proposals ? ConsumerRemovalProposals.toJSON(message.proposals) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryConsumerChainStopProposalsResponse>, I>>(
    object: I,
  ): QueryConsumerChainStopProposalsResponse {
    const message = createBaseQueryConsumerChainStopProposalsResponse();
    message.proposals = (object.proposals !== undefined && object.proposals !== null)
      ? ConsumerRemovalProposals.fromPartial(object.proposals)
      : undefined;
    return message;
  },
};

function createBaseChain(): Chain {
  return { chainId: "", clientId: "" };
}

export const Chain = {
  encode(message: Chain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.clientId !== "") {
      writer.uint32(18).string(message.clientId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Chain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Chain {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      clientId: isSet(object.clientId) ? String(object.clientId) : "",
    };
  },

  toJSON(message: Chain): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.clientId !== undefined && (obj.clientId = message.clientId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Chain>, I>>(object: I): Chain {
    const message = createBaseChain();
    message.chainId = object.chainId ?? "";
    message.clientId = object.clientId ?? "";
    return message;
  },
};

function createBaseQueryValidatorConsumerAddrRequest(): QueryValidatorConsumerAddrRequest {
  return { chainId: "", providerAddress: "" };
}

export const QueryValidatorConsumerAddrRequest = {
  encode(message: QueryValidatorConsumerAddrRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddress !== "") {
      writer.uint32(18).string(message.providerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorConsumerAddrRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorConsumerAddrRequest {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      providerAddress: isSet(object.providerAddress) ? String(object.providerAddress) : "",
    };
  },

  toJSON(message: QueryValidatorConsumerAddrRequest): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.providerAddress !== undefined && (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorConsumerAddrRequest>, I>>(
    object: I,
  ): QueryValidatorConsumerAddrRequest {
    const message = createBaseQueryValidatorConsumerAddrRequest();
    message.chainId = object.chainId ?? "";
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
};

function createBaseQueryValidatorConsumerAddrResponse(): QueryValidatorConsumerAddrResponse {
  return { consumerAddress: "" };
}

export const QueryValidatorConsumerAddrResponse = {
  encode(message: QueryValidatorConsumerAddrResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.consumerAddress !== "") {
      writer.uint32(10).string(message.consumerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorConsumerAddrResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorConsumerAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consumerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorConsumerAddrResponse {
    return { consumerAddress: isSet(object.consumerAddress) ? String(object.consumerAddress) : "" };
  },

  toJSON(message: QueryValidatorConsumerAddrResponse): unknown {
    const obj: any = {};
    message.consumerAddress !== undefined && (obj.consumerAddress = message.consumerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorConsumerAddrResponse>, I>>(
    object: I,
  ): QueryValidatorConsumerAddrResponse {
    const message = createBaseQueryValidatorConsumerAddrResponse();
    message.consumerAddress = object.consumerAddress ?? "";
    return message;
  },
};

function createBaseQueryValidatorProviderAddrRequest(): QueryValidatorProviderAddrRequest {
  return { chainId: "", consumerAddress: "" };
}

export const QueryValidatorProviderAddrRequest = {
  encode(message: QueryValidatorProviderAddrRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.consumerAddress !== "") {
      writer.uint32(18).string(message.consumerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorProviderAddrRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.consumerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorProviderAddrRequest {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      consumerAddress: isSet(object.consumerAddress) ? String(object.consumerAddress) : "",
    };
  },

  toJSON(message: QueryValidatorProviderAddrRequest): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.consumerAddress !== undefined && (obj.consumerAddress = message.consumerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorProviderAddrRequest>, I>>(
    object: I,
  ): QueryValidatorProviderAddrRequest {
    const message = createBaseQueryValidatorProviderAddrRequest();
    message.chainId = object.chainId ?? "";
    message.consumerAddress = object.consumerAddress ?? "";
    return message;
  },
};

function createBaseQueryValidatorProviderAddrResponse(): QueryValidatorProviderAddrResponse {
  return { providerAddress: "" };
}

export const QueryValidatorProviderAddrResponse = {
  encode(message: QueryValidatorProviderAddrResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.providerAddress !== "") {
      writer.uint32(10).string(message.providerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryValidatorProviderAddrResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorProviderAddrResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorProviderAddrResponse {
    return { providerAddress: isSet(object.providerAddress) ? String(object.providerAddress) : "" };
  },

  toJSON(message: QueryValidatorProviderAddrResponse): unknown {
    const obj: any = {};
    message.providerAddress !== undefined && (obj.providerAddress = message.providerAddress);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorProviderAddrResponse>, I>>(
    object: I,
  ): QueryValidatorProviderAddrResponse {
    const message = createBaseQueryValidatorProviderAddrResponse();
    message.providerAddress = object.providerAddress ?? "";
    return message;
  },
};

function createBaseQueryThrottleStateRequest(): QueryThrottleStateRequest {
  return {};
}

export const QueryThrottleStateRequest = {
  encode(_: QueryThrottleStateRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryThrottleStateRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateRequest();
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

  fromJSON(_: any): QueryThrottleStateRequest {
    return {};
  },

  toJSON(_: QueryThrottleStateRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryThrottleStateRequest>, I>>(_: I): QueryThrottleStateRequest {
    const message = createBaseQueryThrottleStateRequest();
    return message;
  },
};

function createBaseQueryThrottleStateResponse(): QueryThrottleStateResponse {
  return { slashMeter: 0, slashMeterAllowance: 0, nextReplenishCandidate: undefined, packets: [] };
}

export const QueryThrottleStateResponse = {
  encode(message: QueryThrottleStateResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slashMeter !== 0) {
      writer.uint32(8).int64(message.slashMeter);
    }
    if (message.slashMeterAllowance !== 0) {
      writer.uint32(16).int64(message.slashMeterAllowance);
    }
    if (message.nextReplenishCandidate !== undefined) {
      Timestamp.encode(toTimestamp(message.nextReplenishCandidate), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.packets) {
      ThrottledSlashPacket.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryThrottleStateResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottleStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashMeter = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.slashMeterAllowance = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.nextReplenishCandidate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.packets.push(ThrottledSlashPacket.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryThrottleStateResponse {
    return {
      slashMeter: isSet(object.slashMeter) ? Number(object.slashMeter) : 0,
      slashMeterAllowance: isSet(object.slashMeterAllowance) ? Number(object.slashMeterAllowance) : 0,
      nextReplenishCandidate: isSet(object.nextReplenishCandidate)
        ? fromJsonTimestamp(object.nextReplenishCandidate)
        : undefined,
      packets: Array.isArray(object?.packets) ? object.packets.map((e: any) => ThrottledSlashPacket.fromJSON(e)) : [],
    };
  },

  toJSON(message: QueryThrottleStateResponse): unknown {
    const obj: any = {};
    message.slashMeter !== undefined && (obj.slashMeter = Math.round(message.slashMeter));
    message.slashMeterAllowance !== undefined && (obj.slashMeterAllowance = Math.round(message.slashMeterAllowance));
    message.nextReplenishCandidate !== undefined
      && (obj.nextReplenishCandidate = message.nextReplenishCandidate.toISOString());
    if (message.packets) {
      obj.packets = message.packets.map((e) => e ? ThrottledSlashPacket.toJSON(e) : undefined);
    } else {
      obj.packets = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryThrottleStateResponse>, I>>(object: I): QueryThrottleStateResponse {
    const message = createBaseQueryThrottleStateResponse();
    message.slashMeter = object.slashMeter ?? 0;
    message.slashMeterAllowance = object.slashMeterAllowance ?? 0;
    message.nextReplenishCandidate = object.nextReplenishCandidate ?? undefined;
    message.packets = object.packets?.map((e) => ThrottledSlashPacket.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryThrottledConsumerPacketDataRequest(): QueryThrottledConsumerPacketDataRequest {
  return { chainId: "" };
}

export const QueryThrottledConsumerPacketDataRequest = {
  encode(message: QueryThrottledConsumerPacketDataRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryThrottledConsumerPacketDataRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottledConsumerPacketDataRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryThrottledConsumerPacketDataRequest {
    return { chainId: isSet(object.chainId) ? String(object.chainId) : "" };
  },

  toJSON(message: QueryThrottledConsumerPacketDataRequest): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryThrottledConsumerPacketDataRequest>, I>>(
    object: I,
  ): QueryThrottledConsumerPacketDataRequest {
    const message = createBaseQueryThrottledConsumerPacketDataRequest();
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseQueryThrottledConsumerPacketDataResponse(): QueryThrottledConsumerPacketDataResponse {
  return { chainId: "", size: 0, packetDataInstances: [] };
}

export const QueryThrottledConsumerPacketDataResponse = {
  encode(message: QueryThrottledConsumerPacketDataResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.size !== 0) {
      writer.uint32(16).uint64(message.size);
    }
    for (const v of message.packetDataInstances) {
      ThrottledPacketDataWrapper.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryThrottledConsumerPacketDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryThrottledConsumerPacketDataResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.size = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.packetDataInstances.push(ThrottledPacketDataWrapper.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryThrottledConsumerPacketDataResponse {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      size: isSet(object.size) ? Number(object.size) : 0,
      packetDataInstances: Array.isArray(object?.packetDataInstances)
        ? object.packetDataInstances.map((e: any) => ThrottledPacketDataWrapper.fromJSON(e))
        : [],
    };
  },

  toJSON(message: QueryThrottledConsumerPacketDataResponse): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.size !== undefined && (obj.size = Math.round(message.size));
    if (message.packetDataInstances) {
      obj.packetDataInstances = message.packetDataInstances.map((e) =>
        e ? ThrottledPacketDataWrapper.toJSON(e) : undefined
      );
    } else {
      obj.packetDataInstances = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryThrottledConsumerPacketDataResponse>, I>>(
    object: I,
  ): QueryThrottledConsumerPacketDataResponse {
    const message = createBaseQueryThrottledConsumerPacketDataResponse();
    message.chainId = object.chainId ?? "";
    message.size = object.size ?? 0;
    message.packetDataInstances = object.packetDataInstances?.map((e) => ThrottledPacketDataWrapper.fromPartial(e))
      || [];
    return message;
  },
};

function createBaseThrottledSlashPacket(): ThrottledSlashPacket {
  return { globalEntry: undefined, data: undefined };
}

export const ThrottledSlashPacket = {
  encode(message: ThrottledSlashPacket, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.globalEntry !== undefined) {
      GlobalSlashEntry.encode(message.globalEntry, writer.uint32(10).fork()).ldelim();
    }
    if (message.data !== undefined) {
      SlashPacketData.encode(message.data, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThrottledSlashPacket {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThrottledSlashPacket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.globalEntry = GlobalSlashEntry.decode(reader, reader.uint32());
          break;
        case 2:
          message.data = SlashPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ThrottledSlashPacket {
    return {
      globalEntry: isSet(object.globalEntry) ? GlobalSlashEntry.fromJSON(object.globalEntry) : undefined,
      data: isSet(object.data) ? SlashPacketData.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: ThrottledSlashPacket): unknown {
    const obj: any = {};
    message.globalEntry !== undefined
      && (obj.globalEntry = message.globalEntry ? GlobalSlashEntry.toJSON(message.globalEntry) : undefined);
    message.data !== undefined && (obj.data = message.data ? SlashPacketData.toJSON(message.data) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ThrottledSlashPacket>, I>>(object: I): ThrottledSlashPacket {
    const message = createBaseThrottledSlashPacket();
    message.globalEntry = (object.globalEntry !== undefined && object.globalEntry !== null)
      ? GlobalSlashEntry.fromPartial(object.globalEntry)
      : undefined;
    message.data = (object.data !== undefined && object.data !== null)
      ? SlashPacketData.fromPartial(object.data)
      : undefined;
    return message;
  },
};

function createBaseThrottledPacketDataWrapper(): ThrottledPacketDataWrapper {
  return { slashPacket: undefined, vscMaturedPacket: undefined };
}

export const ThrottledPacketDataWrapper = {
  encode(message: ThrottledPacketDataWrapper, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slashPacket !== undefined) {
      SlashPacketData.encode(message.slashPacket, writer.uint32(10).fork()).ldelim();
    }
    if (message.vscMaturedPacket !== undefined) {
      VSCMaturedPacketData.encode(message.vscMaturedPacket, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ThrottledPacketDataWrapper {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseThrottledPacketDataWrapper();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.slashPacket = SlashPacketData.decode(reader, reader.uint32());
          break;
        case 2:
          message.vscMaturedPacket = VSCMaturedPacketData.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ThrottledPacketDataWrapper {
    return {
      slashPacket: isSet(object.slashPacket) ? SlashPacketData.fromJSON(object.slashPacket) : undefined,
      vscMaturedPacket: isSet(object.vscMaturedPacket)
        ? VSCMaturedPacketData.fromJSON(object.vscMaturedPacket)
        : undefined,
    };
  },

  toJSON(message: ThrottledPacketDataWrapper): unknown {
    const obj: any = {};
    message.slashPacket !== undefined
      && (obj.slashPacket = message.slashPacket ? SlashPacketData.toJSON(message.slashPacket) : undefined);
    message.vscMaturedPacket !== undefined && (obj.vscMaturedPacket = message.vscMaturedPacket
      ? VSCMaturedPacketData.toJSON(message.vscMaturedPacket)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ThrottledPacketDataWrapper>, I>>(object: I): ThrottledPacketDataWrapper {
    const message = createBaseThrottledPacketDataWrapper();
    message.slashPacket = (object.slashPacket !== undefined && object.slashPacket !== null)
      ? SlashPacketData.fromPartial(object.slashPacket)
      : undefined;
    message.vscMaturedPacket = (object.vscMaturedPacket !== undefined && object.vscMaturedPacket !== null)
      ? VSCMaturedPacketData.fromPartial(object.vscMaturedPacket)
      : undefined;
    return message;
  },
};

export interface Query {
  /**
   * ConsumerGenesis queries the genesis state needed to start a consumer chain
   * whose proposal has been accepted
   */
  QueryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse>;
  /**
   * ConsumerChains queries active consumer chains supported by the provider
   * chain
   */
  QueryConsumerChains(request: QueryConsumerChainsRequest): Promise<QueryConsumerChainsResponse>;
  /** QueryConsumerChainStarts queries consumer chain start proposals. */
  QueryConsumerChainStarts(
    request: QueryConsumerChainStartProposalsRequest,
  ): Promise<QueryConsumerChainStartProposalsResponse>;
  /** QueryConsumerChainStops queries consumer chain stop proposals. */
  QueryConsumerChainStops(
    request: QueryConsumerChainStopProposalsRequest,
  ): Promise<QueryConsumerChainStopProposalsResponse>;
  /**
   * QueryValidatorConsumerAddr queries the address
   * assigned by a validator for a consumer chain.
   */
  QueryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse>;
  /**
   * QueryProviderAddr returns the provider chain validator
   * given a consumer chain validator address
   */
  QueryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse>;
  /** QueryThrottleState returns the main on-chain state relevant to currently throttled slash packets */
  QueryThrottleState(request: QueryThrottleStateRequest): Promise<QueryThrottleStateResponse>;
  /**
   * QueryThrottledConsumerPacketData returns a list of pending packet data instances
   * (slash packet and vsc matured) for a single consumer chain
   */
  QueryThrottledConsumerPacketData(
    request: QueryThrottledConsumerPacketDataRequest,
  ): Promise<QueryThrottledConsumerPacketDataResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.QueryConsumerGenesis = this.QueryConsumerGenesis.bind(this);
    this.QueryConsumerChains = this.QueryConsumerChains.bind(this);
    this.QueryConsumerChainStarts = this.QueryConsumerChainStarts.bind(this);
    this.QueryConsumerChainStops = this.QueryConsumerChainStops.bind(this);
    this.QueryValidatorConsumerAddr = this.QueryValidatorConsumerAddr.bind(this);
    this.QueryValidatorProviderAddr = this.QueryValidatorProviderAddr.bind(this);
    this.QueryThrottleState = this.QueryThrottleState.bind(this);
    this.QueryThrottledConsumerPacketData = this.QueryThrottledConsumerPacketData.bind(this);
  }
  QueryConsumerGenesis(request: QueryConsumerGenesisRequest): Promise<QueryConsumerGenesisResponse> {
    const data = QueryConsumerGenesisRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerGenesis", data);
    return promise.then((data) => QueryConsumerGenesisResponse.decode(new _m0.Reader(data)));
  }

  QueryConsumerChains(request: QueryConsumerChainsRequest): Promise<QueryConsumerChainsResponse> {
    const data = QueryConsumerChainsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChains", data);
    return promise.then((data) => QueryConsumerChainsResponse.decode(new _m0.Reader(data)));
  }

  QueryConsumerChainStarts(
    request: QueryConsumerChainStartProposalsRequest,
  ): Promise<QueryConsumerChainStartProposalsResponse> {
    const data = QueryConsumerChainStartProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainStarts", data);
    return promise.then((data) => QueryConsumerChainStartProposalsResponse.decode(new _m0.Reader(data)));
  }

  QueryConsumerChainStops(
    request: QueryConsumerChainStopProposalsRequest,
  ): Promise<QueryConsumerChainStopProposalsResponse> {
    const data = QueryConsumerChainStopProposalsRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryConsumerChainStops", data);
    return promise.then((data) => QueryConsumerChainStopProposalsResponse.decode(new _m0.Reader(data)));
  }

  QueryValidatorConsumerAddr(request: QueryValidatorConsumerAddrRequest): Promise<QueryValidatorConsumerAddrResponse> {
    const data = QueryValidatorConsumerAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorConsumerAddr", data);
    return promise.then((data) => QueryValidatorConsumerAddrResponse.decode(new _m0.Reader(data)));
  }

  QueryValidatorProviderAddr(request: QueryValidatorProviderAddrRequest): Promise<QueryValidatorProviderAddrResponse> {
    const data = QueryValidatorProviderAddrRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryValidatorProviderAddr", data);
    return promise.then((data) => QueryValidatorProviderAddrResponse.decode(new _m0.Reader(data)));
  }

  QueryThrottleState(request: QueryThrottleStateRequest): Promise<QueryThrottleStateResponse> {
    const data = QueryThrottleStateRequest.encode(request).finish();
    const promise = this.rpc.request("interchain_security.ccv.provider.v1.Query", "QueryThrottleState", data);
    return promise.then((data) => QueryThrottleStateResponse.decode(new _m0.Reader(data)));
  }

  QueryThrottledConsumerPacketData(
    request: QueryThrottledConsumerPacketDataRequest,
  ): Promise<QueryThrottledConsumerPacketDataResponse> {
    const data = QueryThrottledConsumerPacketDataRequest.encode(request).finish();
    const promise = this.rpc.request(
      "interchain_security.ccv.provider.v1.Query",
      "QueryThrottledConsumerPacketData",
      data,
    );
    return promise.then((data) => QueryThrottledConsumerPacketDataResponse.decode(new _m0.Reader(data)));
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

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
