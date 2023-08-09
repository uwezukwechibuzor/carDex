import { Client, registry, MissingWalletError } from 'uwezukwechibuzor-carDex-client-ts'

import { Params } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { LastTransmissionBlockHeight } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { CrossChainValidator } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { MaturingVSCPacket } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { HeightToValsetUpdateID } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { OutstandingDowntime } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"
import { NextFeeDistributionEstimate } from "uwezukwechibuzor-carDex-client-ts/interchain_security.ccv.consumer.v1/types"


export { Params, LastTransmissionBlockHeight, CrossChainValidator, MaturingVSCPacket, HeightToValsetUpdateID, OutstandingDowntime, NextFeeDistributionEstimate };

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
				QueryNextFeeDistribution: {},
				QueryParams: {},
				
				_Structure: {
						Params: getStructure(Params.fromPartial({})),
						LastTransmissionBlockHeight: getStructure(LastTransmissionBlockHeight.fromPartial({})),
						CrossChainValidator: getStructure(CrossChainValidator.fromPartial({})),
						MaturingVSCPacket: getStructure(MaturingVSCPacket.fromPartial({})),
						HeightToValsetUpdateID: getStructure(HeightToValsetUpdateID.fromPartial({})),
						OutstandingDowntime: getStructure(OutstandingDowntime.fromPartial({})),
						NextFeeDistributionEstimate: getStructure(NextFeeDistributionEstimate.fromPartial({})),
						
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
				getQueryNextFeeDistribution: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryNextFeeDistribution[JSON.stringify(params)] ?? {}
		},
				getQueryParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.QueryParams[JSON.stringify(params)] ?? {}
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
			console.log('Vuex module: interchain_security.ccv.consumer.v1 initialized!')
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
		
		
		
		 		
		
		
		async QueryQueryNextFeeDistribution({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvConsumerV1.query.queryQueryNextFeeDistribution()).data
				
					
				commit('QUERY', { query: 'QueryNextFeeDistribution', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryNextFeeDistribution', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryNextFeeDistribution']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryNextFeeDistribution API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryQueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.InterchainSecurityCcvConsumerV1.query.queryQueryParams()).data
				
					
				commit('QUERY', { query: 'QueryParams', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryQueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getQueryParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryQueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
	}
}