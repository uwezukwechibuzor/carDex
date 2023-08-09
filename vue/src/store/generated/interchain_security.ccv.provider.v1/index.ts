import { Client, registry, MissingWalletError } from 'uwezukwechibuzor-carDex-client-ts'

import { ConsumerState } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ValsetUpdateIdToHeight } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerAdditionProposal } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerRemovalProposal } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { EquivocationProposal } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { GlobalSlashEntry } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { Params } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { HandshakeMetadata } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { SlashAcks } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerAdditionProposals } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerRemovalProposals } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ChannelToChain } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { VscUnbondingOps } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { UnbondingOp } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { InitTimeoutTimestamp } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { VscSendTimestamp } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerConsAddress } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ProviderConsAddress } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerAddressList } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { KeyAssignmentReplacement } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ValidatorConsumerPubKey } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ValidatorByConsumerAddr } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ConsumerAddrsToPrune } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { Chain } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ThrottledSlashPacket } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"
import { ThrottledPacketDataWrapper } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.provider.v1/types"


export { ConsumerState, ValsetUpdateIdToHeight, ConsumerAdditionProposal, ConsumerRemovalProposal, EquivocationProposal, GlobalSlashEntry, Params, HandshakeMetadata, SlashAcks, ConsumerAdditionProposals, ConsumerRemovalProposals, ChannelToChain, VscUnbondingOps, UnbondingOp, InitTimeoutTimestamp, VscSendTimestamp, ConsumerConsAddress, ProviderConsAddress, ConsumerAddressList, KeyAssignmentReplacement, ValidatorConsumerPubKey, ValidatorByConsumerAddr, ConsumerAddrsToPrune, Chain, ThrottledSlashPacket, ThrottledPacketDataWrapper };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				QueryConsumerGenesis: {},
				QueryConsumerChains: {},
				QueryConsumerChainStarts: {},
				QueryConsumerChainStops: {},
				QueryValidatorConsumerAddr: {},
				QueryValidatorProviderAddr: {},
				QueryThrottleState: {},
				QueryThrottledConsumerPacketData: {},
				
				_Structure: {
						ConsumerState: getStructure(ConsumerState.fromPartial({})),
						ValsetUpdateIdToHeight: getStructure(ValsetUpdateIdToHeight.fromPartial({})),
						ConsumerAdditionProposal: getStructure(ConsumerAdditionProposal.fromPartial({})),
						ConsumerRemovalProposal: getStructure(ConsumerRemovalProposal.fromPartial({})),
						EquivocationProposal: getStructure(EquivocationProposal.fromPartial({})),
						GlobalSlashEntry: getStructure(GlobalSlashEntry.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						HandshakeMetadata: getStructure(HandshakeMetadata.fromPartial({})),
						SlashAcks: getStructure(SlashAcks.fromPartial({})),
						ConsumerAdditionProposals: getStructure(ConsumerAdditionProposals.fromPartial({})),
						ConsumerRemovalProposals: getStructure(ConsumerRemovalProposals.fromPartial({})),
						ChannelToChain: getStructure(ChannelToChain.fromPartial({})),
						VscUnbondingOps: getStructure(VscUnbondingOps.fromPartial({})),
						UnbondingOp: getStructure(UnbondingOp.fromPartial({})),
						InitTimeoutTimestamp: getStructure(InitTimeoutTimestamp.fromPartial({})),
						VscSendTimestamp: getStructure(VscSendTimestamp.fromPartial({})),
						ConsumerConsAddress: getStructure(ConsumerConsAddress.fromPartial({})),
						ProviderConsAddress: getStructure(ProviderConsAddress.fromPartial({})),
						ConsumerAddressList: getStructure(ConsumerAddressList.fromPartial({})),
						KeyAssignmentReplacement: getStructure(KeyAssignmentReplacement.fromPartial({})),
						ValidatorConsumerPubKey: getStructure(ValidatorConsumerPubKey.fromPartial({})),
						ValidatorByConsumerAddr: getStructure(ValidatorByConsumerAddr.fromPartial({})),
						ConsumerAddrsToPrune: getStructure(ConsumerAddrsToPrune.fromPartial({})),
						Chain: getStructure(Chain.fromPartial({})),
						ThrottledSlashPacket: getStructure(ThrottledSlashPacket.fromPartial({})),
						ThrottledPacketDataWrapper: getStructure(ThrottledPacketDataWrapper.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getQueryConsumerGenesis: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryConsumerGenesis[JSON.stringify(params)] ?? {}
		},
				getQueryConsumerChains: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryConsumerChains[JSON.stringify(params)] ?? {}
		},
				getQueryConsumerChainStarts: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryConsumerChainStarts[JSON.stringify(params)] ?? {}
		},
				getQueryConsumerChainStops: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryConsumerChainStops[JSON.stringify(params)] ?? {}
		},
				getQueryValidatorConsumerAddr: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryValidatorConsumerAddr[JSON.stringify(params)] ?? {}
		},
				getQueryValidatorProviderAddr: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryValidatorProviderAddr[JSON.stringify(params)] ?? {}
		},
				getQueryThrottleState: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryThrottleState[JSON.stringify(params)] ?? {}
		},
				getQueryThrottledConsumerPacketData: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryThrottledConsumerPacketData[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: interchain_security.ccv.provider.v1 initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryQueryConsumerGenesis({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryConsumerGenesis( key.chain_id)).data
				
					
				commit('QUERY', { query: 'QueryConsumerGenesis', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryConsumerGenesis', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryConsumerGenesis']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryConsumerGenesis API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryConsumerChains({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryConsumerChains()).data
				
					
				commit('QUERY', { query: 'QueryConsumerChains', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryConsumerChains', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryConsumerChains']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryConsumerChains API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryConsumerChainStarts({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryConsumerChainStarts()).data
				
					
				commit('QUERY', { query: 'QueryConsumerChainStarts', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryConsumerChainStarts', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryConsumerChainStarts']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryConsumerChainStarts API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryConsumerChainStops({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryConsumerChainStops()).data
				
					
				commit('QUERY', { query: 'QueryConsumerChainStops', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryConsumerChainStops', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryConsumerChainStops']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryConsumerChainStops API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryValidatorConsumerAddr({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryValidatorConsumerAddr(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.InterchainSecurityCcvProviderV1.query.queryQueryValidatorConsumerAddr({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QueryValidatorConsumerAddr', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryValidatorConsumerAddr', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryValidatorConsumerAddr']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryValidatorConsumerAddr API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryValidatorProviderAddr({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryValidatorProviderAddr(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.InterchainSecurityCcvProviderV1.query.queryQueryValidatorProviderAddr({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QueryValidatorProviderAddr', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryValidatorProviderAddr', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryValidatorProviderAddr']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryValidatorProviderAddr API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryThrottleState({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryThrottleState()).data
				
					
				commit('QUERY', { query: 'QueryThrottleState', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryThrottleState', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryThrottleState']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryThrottleState API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryThrottledConsumerPacketData({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvProviderV1.query.queryQueryThrottledConsumerPacketData(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.InterchainSecurityCcvProviderV1.query.queryQueryThrottledConsumerPacketData({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'QueryThrottledConsumerPacketData', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryThrottledConsumerPacketData', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryThrottledConsumerPacketData']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryThrottledConsumerPacketData API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgAssignConsumerKey({ rootGetters }, { value, fee = {amount: [], gas: "200000"}, memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const fullFee = Array.isArray(fee)  ? {amount: fee, gas: "200000"} :fee;
				const result = await client.InterchainSecurityCcvProviderV1.tx.sendMsgAssignConsumerKey({ value, fee: fullFee, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAssignConsumerKey:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgAssignConsumerKey:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgAssignConsumerKey({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.InterchainSecurityCcvProviderV1.tx.msgAssignConsumerKey({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgAssignConsumerKey:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgAssignConsumerKey:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}