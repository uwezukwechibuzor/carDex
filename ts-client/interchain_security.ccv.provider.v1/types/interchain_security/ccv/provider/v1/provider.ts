/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Equivocation } from "../../../../cosmos/evidence/v1beta1/evidence";
import { Duration } from "../../../../google/protobuf/duration";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Height } from "../../../../ibc/core/client/v1/client";
import { ClientState } from "../../../../ibc/lightclients/tendermint/v1/tendermint";
import { PublicKey } from "../../../../tendermint/crypto/keys";

export const protobufPackage = "interchain_security.ccv.provider.v1";

/**
 * ConsumerAdditionProposal is a governance proposal on the provider chain to spawn a new consumer chain.
 * If it passes, then all validators on the provider chain are expected to validate the consumer chain at spawn time
 * or get slashed. It is recommended that spawn time occurs after the proposal end time.
 */
export interface ConsumerAdditionProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /**
   * the proposed chain-id of the new consumer chain, must be different from all other consumer chain ids of the executing
   * provider chain.
   */
  chainId: string;
  /**
   * the proposed initial height of new consumer chain.
   * For a completely new chain, this will be {0,1}. However, it may be different if this is a chain that is converting to a consumer chain.
   */
  initialHeight:
    | Height
    | undefined;
  /**
   * The hash of the consumer chain genesis state without the consumer CCV module genesis params.
   * It is used for off-chain confirmation of genesis.json validity by validators and other parties.
   */
  genesisHash: Uint8Array;
  /**
   * The hash of the consumer chain binary that should be run by validators on chain initialization.
   * It is used for off-chain confirmation of binary validity by validators and other parties.
   */
  binaryHash: Uint8Array;
  /**
   * spawn time is the time on the provider chain at which the consumer chain genesis is finalized and all validators
   * will be responsible for starting their consumer chain validator node.
   */
  spawnTime:
    | Date
    | undefined;
  /**
   * Unbonding period for the consumer,
   * which should be smaller than that of the provider in general.
   */
  unbondingPeriod:
    | Duration
    | undefined;
  /** Sent CCV related IBC packets will timeout after this duration */
  ccvTimeoutPeriod:
    | Duration
    | undefined;
  /** Sent transfer related IBC packets will timeout after this duration */
  transferTimeoutPeriod:
    | Duration
    | undefined;
  /**
   * The fraction of tokens allocated to the consumer redistribution address
   * during distribution events. The fraction is a string representing a
   * decimal number. For example "0.75" would represent 75%.
   */
  consumerRedistributionFraction: string;
  /**
   * BlocksPerDistributionTransmission is the number of blocks between ibc-token-transfers from the consumer chain to the provider chain.
   * On sending transmission event, `consumer_redistribution_fraction` of the accumulated tokens are sent to the consumer redistribution address.
   */
  blocksPerDistributionTransmission: number;
  /**
   * The number of historical info entries to persist in store.
   * This param is a part of the cosmos sdk staking module. In the case of
   * a ccv enabled consumer chain, the ccv module acts as the staking module.
   */
  historicalEntries: number;
}

/**
 * ConsumerRemovalProposal is a governance proposal on the provider chain to remove (and stop) a consumer chain.
 * If it passes, all the consumer chain's state is removed from the provider chain. The outstanding unbonding
 * operation funds are released.
 */
export interface ConsumerRemovalProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the chain-id of the consumer chain to be stopped */
  chainId: string;
  /** the time on the provider chain at which all validators are responsible to stop their consumer chain validator node */
  stopTime: Date | undefined;
}

export interface EquivocationProposal {
  /** the title of the proposal */
  title: string;
  /** the description of the proposal */
  description: string;
  /** the list of equivocations that will be processed */
  equivocations: Equivocation[];
}

/**
 * A persisted queue entry indicating that a slash packet data instance needs to be handled.
 * This type belongs in the "global" queue, to coordinate slash packet handling times between consumers.
 */
export interface GlobalSlashEntry {
  /**
   * Block time that slash packet was received by provider chain.
   * This field is used for store key iteration ordering.
   */
  recvTime:
    | Date
    | undefined;
  /** The consumer that sent a slash packet. */
  consumerChainId: string;
  /**
   * The IBC sequence number of the recv packet.
   * This field is used in the store key to ensure uniqueness.
   */
  ibcSeqNum: number;
  /**
   * The provider's consensus address of the validator being slashed.
   * This field is used to obtain validator power in HandleThrottleQueues.
   *
   * This field is not used in the store key, but is persisted in value bytes, see QueueGlobalSlashEntry.
   */
  providerValConsAddr: ProviderConsAddress | undefined;
}

/** Params defines the parameters for CCV Provider module */
export interface Params {
  templateClient:
    | ClientState
    | undefined;
  /** TrustingPeriodFraction is used to compute the consumer and provider IBC client's TrustingPeriod from the chain defined UnbondingPeriod */
  trustingPeriodFraction: string;
  /** Sent IBC packets will timeout after this duration */
  ccvTimeoutPeriod:
    | Duration
    | undefined;
  /** The channel initialization (IBC channel opening handshake) will timeout after this duration */
  initTimeoutPeriod:
    | Duration
    | undefined;
  /**
   * The VSC packets sent by the provider will timeout after this duration.
   * Note that unlike ccv_timeout_period which is an IBC param,
   * the vsc_timeout_period is a provider-side param that enables the provider
   * to timeout VSC packets even when a consumer chain is not live.
   */
  vscTimeoutPeriod:
    | Duration
    | undefined;
  /** The period for which the slash meter is replenished */
  slashMeterReplenishPeriod:
    | Duration
    | undefined;
  /**
   * The fraction of total voting power that is replenished to the slash meter every replenish period.
   * This param also serves as a maximum fraction of total voting power that the slash meter can hold.
   */
  slashMeterReplenishFraction: string;
  /**
   * The maximum amount of throttled slash or vsc matured packets
   * that can be queued for a single consumer before the provider chain halts.
   */
  maxThrottledPackets: number;
}

export interface HandshakeMetadata {
  providerFeePoolAddr: string;
  version: string;
}

/**
 * SlashAcks contains cons addresses of consumer chain validators
 * successfully slashed on the provider chain
 */
export interface SlashAcks {
  addresses: string[];
}

/** ConsumerAdditionProposals holds pending governance proposals on the provider chain to spawn a new chain. */
export interface ConsumerAdditionProposals {
  /** proposals waiting for spawn_time to pass */
  pending: ConsumerAdditionProposal[];
}

/** ConsumerRemovalProposals holds pending governance proposals on the provider chain to remove (and stop) a consumer chain. */
export interface ConsumerRemovalProposals {
  /** proposals waiting for stop_time to pass */
  pending: ConsumerRemovalProposal[];
}

export interface ChannelToChain {
  channelId: string;
  chainId: string;
}

/**
 * VscUnbondingOps contains the IDs of unbonding operations that are waiting for
 * at least one VSCMaturedPacket with vscID from a consumer chain
 */
export interface VscUnbondingOps {
  vscId: number;
  unbondingOpIds: number[];
}

/**
 * UnbondingOp contains the ids of consumer chains that need to unbond before
 * the unbonding operation with the given ID can unbond
 */
export interface UnbondingOp {
  id: number;
  /** consumer chains that are still unbonding */
  unbondingConsumerChains: string[];
}

export interface InitTimeoutTimestamp {
  chainId: string;
  timestamp: number;
}

export interface VscSendTimestamp {
  vscId: number;
  timestamp: Date | undefined;
}

/**
 * A validator's assigned consensus address for a consumer chain.
 * Note this type is for type safety within provider code, consumer code uses normal sdk.ConsAddress,
 * since there's no notion of provider vs consumer address.
 */
export interface ConsumerConsAddress {
  address: Uint8Array;
}

/** A validator's consensus address on the provider chain */
export interface ProviderConsAddress {
  address: Uint8Array;
}

/** ConsumerAddressList contains a list of consumer consensus addresses */
export interface ConsumerAddressList {
  addresses: ConsumerConsAddress[];
}

export interface KeyAssignmentReplacement {
  providerAddr: ProviderConsAddress | undefined;
  prevCKey: PublicKey | undefined;
  power: number;
}

/**
 * Used to serialize the ValidatorConsumerPubKey index from key assignment
 * ValidatorConsumerPubKey: (chainID, providerAddr consAddr) -> consumerKey tmprotocrypto.PublicKey
 */
export interface ValidatorConsumerPubKey {
  chainId: string;
  providerAddr: ProviderConsAddress | undefined;
  consumerKey: PublicKey | undefined;
}

/**
 * Used to serialize the ValidatorConsumerAddr index from key assignment
 * ValidatorByConsumerAddr: (chainID, consumerAddr consAddr) -> providerAddr consAddr
 */
export interface ValidatorByConsumerAddr {
  chainId: string;
  consumerAddr: ConsumerConsAddress | undefined;
  providerAddr: ProviderConsAddress | undefined;
}

/**
 * Used to serialize the ConsumerAddrsToPrune index from key assignment
 * ConsumerAddrsToPrune: (chainID, vscID uint64) -> consumerAddrs AddressList
 */
export interface ConsumerAddrsToPrune {
  chainId: string;
  vscId: number;
  consumerAddrs: ConsumerAddressList | undefined;
}

function createBaseConsumerAdditionProposal(): ConsumerAdditionProposal {
  return {
    title: "",
    description: "",
    chainId: "",
    initialHeight: undefined,
    genesisHash: new Uint8Array(),
    binaryHash: new Uint8Array(),
    spawnTime: undefined,
    unbondingPeriod: undefined,
    ccvTimeoutPeriod: undefined,
    transferTimeoutPeriod: undefined,
    consumerRedistributionFraction: "",
    blocksPerDistributionTransmission: 0,
    historicalEntries: 0,
  };
}

export const ConsumerAdditionProposal = {
  encode(message: ConsumerAdditionProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.initialHeight !== undefined) {
      Height.encode(message.initialHeight, writer.uint32(34).fork()).ldelim();
    }
    if (message.genesisHash.length !== 0) {
      writer.uint32(42).bytes(message.genesisHash);
    }
    if (message.binaryHash.length !== 0) {
      writer.uint32(50).bytes(message.binaryHash);
    }
    if (message.spawnTime !== undefined) {
      Timestamp.encode(toTimestamp(message.spawnTime), writer.uint32(58).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(66).fork()).ldelim();
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(74).fork()).ldelim();
    }
    if (message.transferTimeoutPeriod !== undefined) {
      Duration.encode(message.transferTimeoutPeriod, writer.uint32(82).fork()).ldelim();
    }
    if (message.consumerRedistributionFraction !== "") {
      writer.uint32(90).string(message.consumerRedistributionFraction);
    }
    if (message.blocksPerDistributionTransmission !== 0) {
      writer.uint32(96).int64(message.blocksPerDistributionTransmission);
    }
    if (message.historicalEntries !== 0) {
      writer.uint32(104).int64(message.historicalEntries);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerAdditionProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.initialHeight = Height.decode(reader, reader.uint32());
          break;
        case 5:
          message.genesisHash = reader.bytes();
          break;
        case 6:
          message.binaryHash = reader.bytes();
          break;
        case 7:
          message.spawnTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 9:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 10:
          message.transferTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 11:
          message.consumerRedistributionFraction = reader.string();
          break;
        case 12:
          message.blocksPerDistributionTransmission = longToNumber(reader.int64() as Long);
          break;
        case 13:
          message.historicalEntries = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerAdditionProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      initialHeight: isSet(object.initialHeight) ? Height.fromJSON(object.initialHeight) : undefined,
      genesisHash: isSet(object.genesisHash) ? bytesFromBase64(object.genesisHash) : new Uint8Array(),
      binaryHash: isSet(object.binaryHash) ? bytesFromBase64(object.binaryHash) : new Uint8Array(),
      spawnTime: isSet(object.spawnTime) ? fromJsonTimestamp(object.spawnTime) : undefined,
      unbondingPeriod: isSet(object.unbondingPeriod) ? Duration.fromJSON(object.unbondingPeriod) : undefined,
      ccvTimeoutPeriod: isSet(object.ccvTimeoutPeriod) ? Duration.fromJSON(object.ccvTimeoutPeriod) : undefined,
      transferTimeoutPeriod: isSet(object.transferTimeoutPeriod)
        ? Duration.fromJSON(object.transferTimeoutPeriod)
        : undefined,
      consumerRedistributionFraction: isSet(object.consumerRedistributionFraction)
        ? String(object.consumerRedistributionFraction)
        : "",
      blocksPerDistributionTransmission: isSet(object.blocksPerDistributionTransmission)
        ? Number(object.blocksPerDistributionTransmission)
        : 0,
      historicalEntries: isSet(object.historicalEntries) ? Number(object.historicalEntries) : 0,
    };
  },

  toJSON(message: ConsumerAdditionProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.initialHeight !== undefined
      && (obj.initialHeight = message.initialHeight ? Height.toJSON(message.initialHeight) : undefined);
    message.genesisHash !== undefined
      && (obj.genesisHash = base64FromBytes(
        message.genesisHash !== undefined ? message.genesisHash : new Uint8Array(),
      ));
    message.binaryHash !== undefined
      && (obj.binaryHash = base64FromBytes(message.binaryHash !== undefined ? message.binaryHash : new Uint8Array()));
    message.spawnTime !== undefined && (obj.spawnTime = message.spawnTime.toISOString());
    message.unbondingPeriod !== undefined
      && (obj.unbondingPeriod = message.unbondingPeriod ? Duration.toJSON(message.unbondingPeriod) : undefined);
    message.ccvTimeoutPeriod !== undefined
      && (obj.ccvTimeoutPeriod = message.ccvTimeoutPeriod ? Duration.toJSON(message.ccvTimeoutPeriod) : undefined);
    message.transferTimeoutPeriod !== undefined && (obj.transferTimeoutPeriod = message.transferTimeoutPeriod
      ? Duration.toJSON(message.transferTimeoutPeriod)
      : undefined);
    message.consumerRedistributionFraction !== undefined
      && (obj.consumerRedistributionFraction = message.consumerRedistributionFraction);
    message.blocksPerDistributionTransmission !== undefined
      && (obj.blocksPerDistributionTransmission = Math.round(message.blocksPerDistributionTransmission));
    message.historicalEntries !== undefined && (obj.historicalEntries = Math.round(message.historicalEntries));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerAdditionProposal>, I>>(object: I): ConsumerAdditionProposal {
    const message = createBaseConsumerAdditionProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.initialHeight = (object.initialHeight !== undefined && object.initialHeight !== null)
      ? Height.fromPartial(object.initialHeight)
      : undefined;
    message.genesisHash = object.genesisHash ?? new Uint8Array();
    message.binaryHash = object.binaryHash ?? new Uint8Array();
    message.spawnTime = object.spawnTime ?? undefined;
    message.unbondingPeriod = (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null)
      ? Duration.fromPartial(object.unbondingPeriod)
      : undefined;
    message.ccvTimeoutPeriod = (object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null)
      ? Duration.fromPartial(object.ccvTimeoutPeriod)
      : undefined;
    message.transferTimeoutPeriod =
      (object.transferTimeoutPeriod !== undefined && object.transferTimeoutPeriod !== null)
        ? Duration.fromPartial(object.transferTimeoutPeriod)
        : undefined;
    message.consumerRedistributionFraction = object.consumerRedistributionFraction ?? "";
    message.blocksPerDistributionTransmission = object.blocksPerDistributionTransmission ?? 0;
    message.historicalEntries = object.historicalEntries ?? 0;
    return message;
  },
};

function createBaseConsumerRemovalProposal(): ConsumerRemovalProposal {
  return { title: "", description: "", chainId: "", stopTime: undefined };
}

export const ConsumerRemovalProposal = {
  encode(message: ConsumerRemovalProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.chainId !== "") {
      writer.uint32(26).string(message.chainId);
    }
    if (message.stopTime !== undefined) {
      Timestamp.encode(toTimestamp(message.stopTime), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerRemovalProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.chainId = reader.string();
          break;
        case 4:
          message.stopTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerRemovalProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      stopTime: isSet(object.stopTime) ? fromJsonTimestamp(object.stopTime) : undefined,
    };
  },

  toJSON(message: ConsumerRemovalProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.stopTime !== undefined && (obj.stopTime = message.stopTime.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerRemovalProposal>, I>>(object: I): ConsumerRemovalProposal {
    const message = createBaseConsumerRemovalProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.chainId = object.chainId ?? "";
    message.stopTime = object.stopTime ?? undefined;
    return message;
  },
};

function createBaseEquivocationProposal(): EquivocationProposal {
  return { title: "", description: "", equivocations: [] };
}

export const EquivocationProposal = {
  encode(message: EquivocationProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    for (const v of message.equivocations) {
      Equivocation.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EquivocationProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEquivocationProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.equivocations.push(Equivocation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): EquivocationProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      equivocations: Array.isArray(object?.equivocations)
        ? object.equivocations.map((e: any) => Equivocation.fromJSON(e))
        : [],
    };
  },

  toJSON(message: EquivocationProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined && (obj.description = message.description);
    if (message.equivocations) {
      obj.equivocations = message.equivocations.map((e) => e ? Equivocation.toJSON(e) : undefined);
    } else {
      obj.equivocations = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<EquivocationProposal>, I>>(object: I): EquivocationProposal {
    const message = createBaseEquivocationProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.equivocations = object.equivocations?.map((e) => Equivocation.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGlobalSlashEntry(): GlobalSlashEntry {
  return { recvTime: undefined, consumerChainId: "", ibcSeqNum: 0, providerValConsAddr: undefined };
}

export const GlobalSlashEntry = {
  encode(message: GlobalSlashEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recvTime !== undefined) {
      Timestamp.encode(toTimestamp(message.recvTime), writer.uint32(10).fork()).ldelim();
    }
    if (message.consumerChainId !== "") {
      writer.uint32(18).string(message.consumerChainId);
    }
    if (message.ibcSeqNum !== 0) {
      writer.uint32(24).uint64(message.ibcSeqNum);
    }
    if (message.providerValConsAddr !== undefined) {
      ProviderConsAddress.encode(message.providerValConsAddr, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GlobalSlashEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGlobalSlashEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recvTime = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.consumerChainId = reader.string();
          break;
        case 3:
          message.ibcSeqNum = longToNumber(reader.uint64() as Long);
          break;
        case 4:
          message.providerValConsAddr = ProviderConsAddress.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GlobalSlashEntry {
    return {
      recvTime: isSet(object.recvTime) ? fromJsonTimestamp(object.recvTime) : undefined,
      consumerChainId: isSet(object.consumerChainId) ? String(object.consumerChainId) : "",
      ibcSeqNum: isSet(object.ibcSeqNum) ? Number(object.ibcSeqNum) : 0,
      providerValConsAddr: isSet(object.providerValConsAddr)
        ? ProviderConsAddress.fromJSON(object.providerValConsAddr)
        : undefined,
    };
  },

  toJSON(message: GlobalSlashEntry): unknown {
    const obj: any = {};
    message.recvTime !== undefined && (obj.recvTime = message.recvTime.toISOString());
    message.consumerChainId !== undefined && (obj.consumerChainId = message.consumerChainId);
    message.ibcSeqNum !== undefined && (obj.ibcSeqNum = Math.round(message.ibcSeqNum));
    message.providerValConsAddr !== undefined && (obj.providerValConsAddr = message.providerValConsAddr
      ? ProviderConsAddress.toJSON(message.providerValConsAddr)
      : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GlobalSlashEntry>, I>>(object: I): GlobalSlashEntry {
    const message = createBaseGlobalSlashEntry();
    message.recvTime = object.recvTime ?? undefined;
    message.consumerChainId = object.consumerChainId ?? "";
    message.ibcSeqNum = object.ibcSeqNum ?? 0;
    message.providerValConsAddr = (object.providerValConsAddr !== undefined && object.providerValConsAddr !== null)
      ? ProviderConsAddress.fromPartial(object.providerValConsAddr)
      : undefined;
    return message;
  },
};

function createBaseParams(): Params {
  return {
    templateClient: undefined,
    trustingPeriodFraction: "",
    ccvTimeoutPeriod: undefined,
    initTimeoutPeriod: undefined,
    vscTimeoutPeriod: undefined,
    slashMeterReplenishPeriod: undefined,
    slashMeterReplenishFraction: "",
    maxThrottledPackets: 0,
  };
}

export const Params = {
  encode(message: Params, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.templateClient !== undefined) {
      ClientState.encode(message.templateClient, writer.uint32(10).fork()).ldelim();
    }
    if (message.trustingPeriodFraction !== "") {
      writer.uint32(18).string(message.trustingPeriodFraction);
    }
    if (message.ccvTimeoutPeriod !== undefined) {
      Duration.encode(message.ccvTimeoutPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.initTimeoutPeriod !== undefined) {
      Duration.encode(message.initTimeoutPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.vscTimeoutPeriod !== undefined) {
      Duration.encode(message.vscTimeoutPeriod, writer.uint32(42).fork()).ldelim();
    }
    if (message.slashMeterReplenishPeriod !== undefined) {
      Duration.encode(message.slashMeterReplenishPeriod, writer.uint32(50).fork()).ldelim();
    }
    if (message.slashMeterReplenishFraction !== "") {
      writer.uint32(58).string(message.slashMeterReplenishFraction);
    }
    if (message.maxThrottledPackets !== 0) {
      writer.uint32(64).int64(message.maxThrottledPackets);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateClient = ClientState.decode(reader, reader.uint32());
          break;
        case 2:
          message.trustingPeriodFraction = reader.string();
          break;
        case 3:
          message.ccvTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.initTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.vscTimeoutPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.slashMeterReplenishPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 7:
          message.slashMeterReplenishFraction = reader.string();
          break;
        case 8:
          message.maxThrottledPackets = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    return {
      templateClient: isSet(object.templateClient) ? ClientState.fromJSON(object.templateClient) : undefined,
      trustingPeriodFraction: isSet(object.trustingPeriodFraction) ? String(object.trustingPeriodFraction) : "",
      ccvTimeoutPeriod: isSet(object.ccvTimeoutPeriod) ? Duration.fromJSON(object.ccvTimeoutPeriod) : undefined,
      initTimeoutPeriod: isSet(object.initTimeoutPeriod) ? Duration.fromJSON(object.initTimeoutPeriod) : undefined,
      vscTimeoutPeriod: isSet(object.vscTimeoutPeriod) ? Duration.fromJSON(object.vscTimeoutPeriod) : undefined,
      slashMeterReplenishPeriod: isSet(object.slashMeterReplenishPeriod)
        ? Duration.fromJSON(object.slashMeterReplenishPeriod)
        : undefined,
      slashMeterReplenishFraction: isSet(object.slashMeterReplenishFraction)
        ? String(object.slashMeterReplenishFraction)
        : "",
      maxThrottledPackets: isSet(object.maxThrottledPackets) ? Number(object.maxThrottledPackets) : 0,
    };
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    message.templateClient !== undefined
      && (obj.templateClient = message.templateClient ? ClientState.toJSON(message.templateClient) : undefined);
    message.trustingPeriodFraction !== undefined && (obj.trustingPeriodFraction = message.trustingPeriodFraction);
    message.ccvTimeoutPeriod !== undefined
      && (obj.ccvTimeoutPeriod = message.ccvTimeoutPeriod ? Duration.toJSON(message.ccvTimeoutPeriod) : undefined);
    message.initTimeoutPeriod !== undefined
      && (obj.initTimeoutPeriod = message.initTimeoutPeriod ? Duration.toJSON(message.initTimeoutPeriod) : undefined);
    message.vscTimeoutPeriod !== undefined
      && (obj.vscTimeoutPeriod = message.vscTimeoutPeriod ? Duration.toJSON(message.vscTimeoutPeriod) : undefined);
    message.slashMeterReplenishPeriod !== undefined
      && (obj.slashMeterReplenishPeriod = message.slashMeterReplenishPeriod
        ? Duration.toJSON(message.slashMeterReplenishPeriod)
        : undefined);
    message.slashMeterReplenishFraction !== undefined
      && (obj.slashMeterReplenishFraction = message.slashMeterReplenishFraction);
    message.maxThrottledPackets !== undefined && (obj.maxThrottledPackets = Math.round(message.maxThrottledPackets));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Params>, I>>(object: I): Params {
    const message = createBaseParams();
    message.templateClient = (object.templateClient !== undefined && object.templateClient !== null)
      ? ClientState.fromPartial(object.templateClient)
      : undefined;
    message.trustingPeriodFraction = object.trustingPeriodFraction ?? "";
    message.ccvTimeoutPeriod = (object.ccvTimeoutPeriod !== undefined && object.ccvTimeoutPeriod !== null)
      ? Duration.fromPartial(object.ccvTimeoutPeriod)
      : undefined;
    message.initTimeoutPeriod = (object.initTimeoutPeriod !== undefined && object.initTimeoutPeriod !== null)
      ? Duration.fromPartial(object.initTimeoutPeriod)
      : undefined;
    message.vscTimeoutPeriod = (object.vscTimeoutPeriod !== undefined && object.vscTimeoutPeriod !== null)
      ? Duration.fromPartial(object.vscTimeoutPeriod)
      : undefined;
    message.slashMeterReplenishPeriod =
      (object.slashMeterReplenishPeriod !== undefined && object.slashMeterReplenishPeriod !== null)
        ? Duration.fromPartial(object.slashMeterReplenishPeriod)
        : undefined;
    message.slashMeterReplenishFraction = object.slashMeterReplenishFraction ?? "";
    message.maxThrottledPackets = object.maxThrottledPackets ?? 0;
    return message;
  },
};

function createBaseHandshakeMetadata(): HandshakeMetadata {
  return { providerFeePoolAddr: "", version: "" };
}

export const HandshakeMetadata = {
  encode(message: HandshakeMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.providerFeePoolAddr !== "") {
      writer.uint32(10).string(message.providerFeePoolAddr);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HandshakeMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHandshakeMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerFeePoolAddr = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): HandshakeMetadata {
    return {
      providerFeePoolAddr: isSet(object.providerFeePoolAddr) ? String(object.providerFeePoolAddr) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: HandshakeMetadata): unknown {
    const obj: any = {};
    message.providerFeePoolAddr !== undefined && (obj.providerFeePoolAddr = message.providerFeePoolAddr);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<HandshakeMetadata>, I>>(object: I): HandshakeMetadata {
    const message = createBaseHandshakeMetadata();
    message.providerFeePoolAddr = object.providerFeePoolAddr ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseSlashAcks(): SlashAcks {
  return { addresses: [] };
}

export const SlashAcks = {
  encode(message: SlashAcks, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SlashAcks {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlashAcks();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SlashAcks {
    return { addresses: Array.isArray(object?.addresses) ? object.addresses.map((e: any) => String(e)) : [] };
  },

  toJSON(message: SlashAcks): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SlashAcks>, I>>(object: I): SlashAcks {
    const message = createBaseSlashAcks();
    message.addresses = object.addresses?.map((e) => e) || [];
    return message;
  },
};

function createBaseConsumerAdditionProposals(): ConsumerAdditionProposals {
  return { pending: [] };
}

export const ConsumerAdditionProposals = {
  encode(message: ConsumerAdditionProposals, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pending) {
      ConsumerAdditionProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerAdditionProposals {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAdditionProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerAdditionProposal.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerAdditionProposals {
    return {
      pending: Array.isArray(object?.pending)
        ? object.pending.map((e: any) => ConsumerAdditionProposal.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConsumerAdditionProposals): unknown {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map((e) => e ? ConsumerAdditionProposal.toJSON(e) : undefined);
    } else {
      obj.pending = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerAdditionProposals>, I>>(object: I): ConsumerAdditionProposals {
    const message = createBaseConsumerAdditionProposals();
    message.pending = object.pending?.map((e) => ConsumerAdditionProposal.fromPartial(e)) || [];
    return message;
  },
};

function createBaseConsumerRemovalProposals(): ConsumerRemovalProposals {
  return { pending: [] };
}

export const ConsumerRemovalProposals = {
  encode(message: ConsumerRemovalProposals, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pending) {
      ConsumerRemovalProposal.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerRemovalProposals {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerRemovalProposals();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pending.push(ConsumerRemovalProposal.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerRemovalProposals {
    return {
      pending: Array.isArray(object?.pending)
        ? object.pending.map((e: any) => ConsumerRemovalProposal.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConsumerRemovalProposals): unknown {
    const obj: any = {};
    if (message.pending) {
      obj.pending = message.pending.map((e) => e ? ConsumerRemovalProposal.toJSON(e) : undefined);
    } else {
      obj.pending = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerRemovalProposals>, I>>(object: I): ConsumerRemovalProposals {
    const message = createBaseConsumerRemovalProposals();
    message.pending = object.pending?.map((e) => ConsumerRemovalProposal.fromPartial(e)) || [];
    return message;
  },
};

function createBaseChannelToChain(): ChannelToChain {
  return { channelId: "", chainId: "" };
}

export const ChannelToChain = {
  encode(message: ChannelToChain, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.channelId !== "") {
      writer.uint32(10).string(message.channelId);
    }
    if (message.chainId !== "") {
      writer.uint32(18).string(message.chainId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChannelToChain {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChannelToChain();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.channelId = reader.string();
          break;
        case 2:
          message.chainId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ChannelToChain {
    return {
      channelId: isSet(object.channelId) ? String(object.channelId) : "",
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
    };
  },

  toJSON(message: ChannelToChain): unknown {
    const obj: any = {};
    message.channelId !== undefined && (obj.channelId = message.channelId);
    message.chainId !== undefined && (obj.chainId = message.chainId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ChannelToChain>, I>>(object: I): ChannelToChain {
    const message = createBaseChannelToChain();
    message.channelId = object.channelId ?? "";
    message.chainId = object.chainId ?? "";
    return message;
  },
};

function createBaseVscUnbondingOps(): VscUnbondingOps {
  return { vscId: 0, unbondingOpIds: [] };
}

export const VscUnbondingOps = {
  encode(message: VscUnbondingOps, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vscId !== 0) {
      writer.uint32(8).uint64(message.vscId);
    }
    writer.uint32(18).fork();
    for (const v of message.unbondingOpIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VscUnbondingOps {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVscUnbondingOps();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.unbondingOpIds.push(longToNumber(reader.uint64() as Long));
            }
          } else {
            message.unbondingOpIds.push(longToNumber(reader.uint64() as Long));
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VscUnbondingOps {
    return {
      vscId: isSet(object.vscId) ? Number(object.vscId) : 0,
      unbondingOpIds: Array.isArray(object?.unbondingOpIds) ? object.unbondingOpIds.map((e: any) => Number(e)) : [],
    };
  },

  toJSON(message: VscUnbondingOps): unknown {
    const obj: any = {};
    message.vscId !== undefined && (obj.vscId = Math.round(message.vscId));
    if (message.unbondingOpIds) {
      obj.unbondingOpIds = message.unbondingOpIds.map((e) => Math.round(e));
    } else {
      obj.unbondingOpIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VscUnbondingOps>, I>>(object: I): VscUnbondingOps {
    const message = createBaseVscUnbondingOps();
    message.vscId = object.vscId ?? 0;
    message.unbondingOpIds = object.unbondingOpIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseUnbondingOp(): UnbondingOp {
  return { id: 0, unbondingConsumerChains: [] };
}

export const UnbondingOp = {
  encode(message: UnbondingOp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).uint64(message.id);
    }
    for (const v of message.unbondingConsumerChains) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UnbondingOp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUnbondingOp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.unbondingConsumerChains.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnbondingOp {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      unbondingConsumerChains: Array.isArray(object?.unbondingConsumerChains)
        ? object.unbondingConsumerChains.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: UnbondingOp): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    if (message.unbondingConsumerChains) {
      obj.unbondingConsumerChains = message.unbondingConsumerChains.map((e) => e);
    } else {
      obj.unbondingConsumerChains = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<UnbondingOp>, I>>(object: I): UnbondingOp {
    const message = createBaseUnbondingOp();
    message.id = object.id ?? 0;
    message.unbondingConsumerChains = object.unbondingConsumerChains?.map((e) => e) || [];
    return message;
  },
};

function createBaseInitTimeoutTimestamp(): InitTimeoutTimestamp {
  return { chainId: "", timestamp: 0 };
}

export const InitTimeoutTimestamp = {
  encode(message: InitTimeoutTimestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.timestamp !== 0) {
      writer.uint32(16).uint64(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InitTimeoutTimestamp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitTimeoutTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.timestamp = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InitTimeoutTimestamp {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : 0,
    };
  },

  toJSON(message: InitTimeoutTimestamp): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.timestamp !== undefined && (obj.timestamp = Math.round(message.timestamp));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InitTimeoutTimestamp>, I>>(object: I): InitTimeoutTimestamp {
    const message = createBaseInitTimeoutTimestamp();
    message.chainId = object.chainId ?? "";
    message.timestamp = object.timestamp ?? 0;
    return message;
  },
};

function createBaseVscSendTimestamp(): VscSendTimestamp {
  return { vscId: 0, timestamp: undefined };
}

export const VscSendTimestamp = {
  encode(message: VscSendTimestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.vscId !== 0) {
      writer.uint32(8).uint64(message.vscId);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VscSendTimestamp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVscSendTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vscId = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VscSendTimestamp {
    return {
      vscId: isSet(object.vscId) ? Number(object.vscId) : 0,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
    };
  },

  toJSON(message: VscSendTimestamp): unknown {
    const obj: any = {};
    message.vscId !== undefined && (obj.vscId = Math.round(message.vscId));
    message.timestamp !== undefined && (obj.timestamp = message.timestamp.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<VscSendTimestamp>, I>>(object: I): VscSendTimestamp {
    const message = createBaseVscSendTimestamp();
    message.vscId = object.vscId ?? 0;
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseConsumerConsAddress(): ConsumerConsAddress {
  return { address: new Uint8Array() };
}

export const ConsumerConsAddress = {
  encode(message: ConsumerConsAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerConsAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerConsAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerConsAddress {
    return { address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array() };
  },

  toJSON(message: ConsumerConsAddress): unknown {
    const obj: any = {};
    message.address !== undefined
      && (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerConsAddress>, I>>(object: I): ConsumerConsAddress {
    const message = createBaseConsumerConsAddress();
    message.address = object.address ?? new Uint8Array();
    return message;
  },
};

function createBaseProviderConsAddress(): ProviderConsAddress {
  return { address: new Uint8Array() };
}

export const ProviderConsAddress = {
  encode(message: ProviderConsAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address.length !== 0) {
      writer.uint32(10).bytes(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProviderConsAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProviderConsAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ProviderConsAddress {
    return { address: isSet(object.address) ? bytesFromBase64(object.address) : new Uint8Array() };
  },

  toJSON(message: ProviderConsAddress): unknown {
    const obj: any = {};
    message.address !== undefined
      && (obj.address = base64FromBytes(message.address !== undefined ? message.address : new Uint8Array()));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ProviderConsAddress>, I>>(object: I): ProviderConsAddress {
    const message = createBaseProviderConsAddress();
    message.address = object.address ?? new Uint8Array();
    return message;
  },
};

function createBaseConsumerAddressList(): ConsumerAddressList {
  return { addresses: [] };
}

export const ConsumerAddressList = {
  encode(message: ConsumerAddressList, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.addresses) {
      ConsumerConsAddress.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerAddressList {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAddressList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addresses.push(ConsumerConsAddress.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerAddressList {
    return {
      addresses: Array.isArray(object?.addresses)
        ? object.addresses.map((e: any) => ConsumerConsAddress.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ConsumerAddressList): unknown {
    const obj: any = {};
    if (message.addresses) {
      obj.addresses = message.addresses.map((e) => e ? ConsumerConsAddress.toJSON(e) : undefined);
    } else {
      obj.addresses = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerAddressList>, I>>(object: I): ConsumerAddressList {
    const message = createBaseConsumerAddressList();
    message.addresses = object.addresses?.map((e) => ConsumerConsAddress.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKeyAssignmentReplacement(): KeyAssignmentReplacement {
  return { providerAddr: undefined, prevCKey: undefined, power: 0 };
}

export const KeyAssignmentReplacement = {
  encode(message: KeyAssignmentReplacement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.providerAddr !== undefined) {
      ProviderConsAddress.encode(message.providerAddr, writer.uint32(10).fork()).ldelim();
    }
    if (message.prevCKey !== undefined) {
      PublicKey.encode(message.prevCKey, writer.uint32(18).fork()).ldelim();
    }
    if (message.power !== 0) {
      writer.uint32(24).int64(message.power);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): KeyAssignmentReplacement {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyAssignmentReplacement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.providerAddr = ProviderConsAddress.decode(reader, reader.uint32());
          break;
        case 2:
          message.prevCKey = PublicKey.decode(reader, reader.uint32());
          break;
        case 3:
          message.power = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): KeyAssignmentReplacement {
    return {
      providerAddr: isSet(object.providerAddr) ? ProviderConsAddress.fromJSON(object.providerAddr) : undefined,
      prevCKey: isSet(object.prevCKey) ? PublicKey.fromJSON(object.prevCKey) : undefined,
      power: isSet(object.power) ? Number(object.power) : 0,
    };
  },

  toJSON(message: KeyAssignmentReplacement): unknown {
    const obj: any = {};
    message.providerAddr !== undefined
      && (obj.providerAddr = message.providerAddr ? ProviderConsAddress.toJSON(message.providerAddr) : undefined);
    message.prevCKey !== undefined
      && (obj.prevCKey = message.prevCKey ? PublicKey.toJSON(message.prevCKey) : undefined);
    message.power !== undefined && (obj.power = Math.round(message.power));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<KeyAssignmentReplacement>, I>>(object: I): KeyAssignmentReplacement {
    const message = createBaseKeyAssignmentReplacement();
    message.providerAddr = (object.providerAddr !== undefined && object.providerAddr !== null)
      ? ProviderConsAddress.fromPartial(object.providerAddr)
      : undefined;
    message.prevCKey = (object.prevCKey !== undefined && object.prevCKey !== null)
      ? PublicKey.fromPartial(object.prevCKey)
      : undefined;
    message.power = object.power ?? 0;
    return message;
  },
};

function createBaseValidatorConsumerPubKey(): ValidatorConsumerPubKey {
  return { chainId: "", providerAddr: undefined, consumerKey: undefined };
}

export const ValidatorConsumerPubKey = {
  encode(message: ValidatorConsumerPubKey, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.providerAddr !== undefined) {
      ProviderConsAddress.encode(message.providerAddr, writer.uint32(18).fork()).ldelim();
    }
    if (message.consumerKey !== undefined) {
      PublicKey.encode(message.consumerKey, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorConsumerPubKey {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorConsumerPubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.providerAddr = ProviderConsAddress.decode(reader, reader.uint32());
          break;
        case 3:
          message.consumerKey = PublicKey.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorConsumerPubKey {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      providerAddr: isSet(object.providerAddr) ? ProviderConsAddress.fromJSON(object.providerAddr) : undefined,
      consumerKey: isSet(object.consumerKey) ? PublicKey.fromJSON(object.consumerKey) : undefined,
    };
  },

  toJSON(message: ValidatorConsumerPubKey): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.providerAddr !== undefined
      && (obj.providerAddr = message.providerAddr ? ProviderConsAddress.toJSON(message.providerAddr) : undefined);
    message.consumerKey !== undefined
      && (obj.consumerKey = message.consumerKey ? PublicKey.toJSON(message.consumerKey) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorConsumerPubKey>, I>>(object: I): ValidatorConsumerPubKey {
    const message = createBaseValidatorConsumerPubKey();
    message.chainId = object.chainId ?? "";
    message.providerAddr = (object.providerAddr !== undefined && object.providerAddr !== null)
      ? ProviderConsAddress.fromPartial(object.providerAddr)
      : undefined;
    message.consumerKey = (object.consumerKey !== undefined && object.consumerKey !== null)
      ? PublicKey.fromPartial(object.consumerKey)
      : undefined;
    return message;
  },
};

function createBaseValidatorByConsumerAddr(): ValidatorByConsumerAddr {
  return { chainId: "", consumerAddr: undefined, providerAddr: undefined };
}

export const ValidatorByConsumerAddr = {
  encode(message: ValidatorByConsumerAddr, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.consumerAddr !== undefined) {
      ConsumerConsAddress.encode(message.consumerAddr, writer.uint32(18).fork()).ldelim();
    }
    if (message.providerAddr !== undefined) {
      ProviderConsAddress.encode(message.providerAddr, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorByConsumerAddr {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorByConsumerAddr();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.consumerAddr = ConsumerConsAddress.decode(reader, reader.uint32());
          break;
        case 3:
          message.providerAddr = ProviderConsAddress.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValidatorByConsumerAddr {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      consumerAddr: isSet(object.consumerAddr) ? ConsumerConsAddress.fromJSON(object.consumerAddr) : undefined,
      providerAddr: isSet(object.providerAddr) ? ProviderConsAddress.fromJSON(object.providerAddr) : undefined,
    };
  },

  toJSON(message: ValidatorByConsumerAddr): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.consumerAddr !== undefined
      && (obj.consumerAddr = message.consumerAddr ? ConsumerConsAddress.toJSON(message.consumerAddr) : undefined);
    message.providerAddr !== undefined
      && (obj.providerAddr = message.providerAddr ? ProviderConsAddress.toJSON(message.providerAddr) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValidatorByConsumerAddr>, I>>(object: I): ValidatorByConsumerAddr {
    const message = createBaseValidatorByConsumerAddr();
    message.chainId = object.chainId ?? "";
    message.consumerAddr = (object.consumerAddr !== undefined && object.consumerAddr !== null)
      ? ConsumerConsAddress.fromPartial(object.consumerAddr)
      : undefined;
    message.providerAddr = (object.providerAddr !== undefined && object.providerAddr !== null)
      ? ProviderConsAddress.fromPartial(object.providerAddr)
      : undefined;
    return message;
  },
};

function createBaseConsumerAddrsToPrune(): ConsumerAddrsToPrune {
  return { chainId: "", vscId: 0, consumerAddrs: undefined };
}

export const ConsumerAddrsToPrune = {
  encode(message: ConsumerAddrsToPrune, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.vscId !== 0) {
      writer.uint32(16).uint64(message.vscId);
    }
    if (message.consumerAddrs !== undefined) {
      ConsumerAddressList.encode(message.consumerAddrs, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsumerAddrsToPrune {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseConsumerAddrsToPrune();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.vscId = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.consumerAddrs = ConsumerAddressList.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsumerAddrsToPrune {
    return {
      chainId: isSet(object.chainId) ? String(object.chainId) : "",
      vscId: isSet(object.vscId) ? Number(object.vscId) : 0,
      consumerAddrs: isSet(object.consumerAddrs) ? ConsumerAddressList.fromJSON(object.consumerAddrs) : undefined,
    };
  },

  toJSON(message: ConsumerAddrsToPrune): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.vscId !== undefined && (obj.vscId = Math.round(message.vscId));
    message.consumerAddrs !== undefined
      && (obj.consumerAddrs = message.consumerAddrs ? ConsumerAddressList.toJSON(message.consumerAddrs) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ConsumerAddrsToPrune>, I>>(object: I): ConsumerAddrsToPrune {
    const message = createBaseConsumerAddrsToPrune();
    message.chainId = object.chainId ?? "";
    message.vscId = object.vscId ?? 0;
    message.consumerAddrs = (object.consumerAddrs !== undefined && object.consumerAddrs !== null)
      ? ConsumerAddressList.fromPartial(object.consumerAddrs)
      : undefined;
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

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

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
