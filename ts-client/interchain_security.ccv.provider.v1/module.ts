// Generated by Ignite ignite.com/cli

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient, DeliverTxResponse } from "@cosmjs/stargate";
import { EncodeObject, GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { msgTypes } from './registry';
import { IgniteClient } from "../client"
import { MissingWalletError } from "../helpers"
import { Api } from "./rest";
import { MsgAssignConsumerKey } from "./types/interchain_security/ccv/provider/v1/tx";

import { ConsumerState as typeConsumerState} from "./types"
import { ValsetUpdateIdToHeight as typeValsetUpdateIdToHeight} from "./types"
import { ConsumerAdditionProposal as typeConsumerAdditionProposal} from "./types"
import { ConsumerRemovalProposal as typeConsumerRemovalProposal} from "./types"
import { EquivocationProposal as typeEquivocationProposal} from "./types"
import { GlobalSlashEntry as typeGlobalSlashEntry} from "./types"
import { Params as typeParams} from "./types"
import { HandshakeMetadata as typeHandshakeMetadata} from "./types"
import { SlashAcks as typeSlashAcks} from "./types"
import { ConsumerAdditionProposals as typeConsumerAdditionProposals} from "./types"
import { ConsumerRemovalProposals as typeConsumerRemovalProposals} from "./types"
import { ChannelToChain as typeChannelToChain} from "./types"
import { VscUnbondingOps as typeVscUnbondingOps} from "./types"
import { UnbondingOp as typeUnbondingOp} from "./types"
import { InitTimeoutTimestamp as typeInitTimeoutTimestamp} from "./types"
import { VscSendTimestamp as typeVscSendTimestamp} from "./types"
import { ConsumerConsAddress as typeConsumerConsAddress} from "./types"
import { ProviderConsAddress as typeProviderConsAddress} from "./types"
import { ConsumerAddressList as typeConsumerAddressList} from "./types"
import { KeyAssignmentReplacement as typeKeyAssignmentReplacement} from "./types"
import { ValidatorConsumerPubKey as typeValidatorConsumerPubKey} from "./types"
import { ValidatorByConsumerAddr as typeValidatorByConsumerAddr} from "./types"
import { ConsumerAddrsToPrune as typeConsumerAddrsToPrune} from "./types"
import { Chain as typeChain} from "./types"
import { ThrottledSlashPacket as typeThrottledSlashPacket} from "./types"
import { ThrottledPacketDataWrapper as typeThrottledPacketDataWrapper} from "./types"

export { MsgAssignConsumerKey };

type sendMsgAssignConsumerKeyParams = {
  value: MsgAssignConsumerKey,
  fee?: StdFee,
  memo?: string
};


type msgAssignConsumerKeyParams = {
  value: MsgAssignConsumerKey,
};


export const registry = new Registry(msgTypes);

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	const structure: {fields: Field[]} = { fields: [] }
	for (let [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
	prefix: string
	signer?: OfflineSigner
}

export const txClient = ({ signer, prefix, addr }: TxClientOptions = { addr: "http://localhost:26657", prefix: "cosmos" }) => {

  return {
		
		async sendMsgAssignConsumerKey({ value, fee, memo }: sendMsgAssignConsumerKeyParams): Promise<DeliverTxResponse> {
			if (!signer) {
					throw new Error('TxClient:sendMsgAssignConsumerKey: Unable to sign Tx. Signer is not present.')
			}
			try {			
				const { address } = (await signer.getAccounts())[0]; 
				const signingClient = await SigningStargateClient.connectWithSigner(addr,signer,{registry, prefix});
				let msg = this.msgAssignConsumerKey({ value: MsgAssignConsumerKey.fromPartial(value) })
				return await signingClient.signAndBroadcast(address, [msg], fee ? fee : defaultFee, memo)
			} catch (e: any) {
				throw new Error('TxClient:sendMsgAssignConsumerKey: Could not broadcast Tx: '+ e.message)
			}
		},
		
		
		msgAssignConsumerKey({ value }: msgAssignConsumerKeyParams): EncodeObject {
			try {
				return { typeUrl: "/interchain_security.ccv.provider.v1.MsgAssignConsumerKey", value: MsgAssignConsumerKey.fromPartial( value ) }  
			} catch (e: any) {
				throw new Error('TxClient:MsgAssignConsumerKey: Could not create message: ' + e.message)
			}
		},
		
	}
};

interface QueryClientOptions {
  addr: string
}

export const queryClient = ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseURL: addr });
};

class SDKModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;
	public structure: Record<string,unknown>;
	public registry: Array<[string, GeneratedType]> = [];

	constructor(client: IgniteClient) {		
	
		this.query = queryClient({ addr: client.env.apiURL });		
		this.updateTX(client);
		this.structure =  {
						ConsumerState: getStructure(typeConsumerState.fromPartial({})),
						ValsetUpdateIdToHeight: getStructure(typeValsetUpdateIdToHeight.fromPartial({})),
						ConsumerAdditionProposal: getStructure(typeConsumerAdditionProposal.fromPartial({})),
						ConsumerRemovalProposal: getStructure(typeConsumerRemovalProposal.fromPartial({})),
						EquivocationProposal: getStructure(typeEquivocationProposal.fromPartial({})),
						GlobalSlashEntry: getStructure(typeGlobalSlashEntry.fromPartial({})),
						Params: getStructure(typeParams.fromPartial({})),
						HandshakeMetadata: getStructure(typeHandshakeMetadata.fromPartial({})),
						SlashAcks: getStructure(typeSlashAcks.fromPartial({})),
						ConsumerAdditionProposals: getStructure(typeConsumerAdditionProposals.fromPartial({})),
						ConsumerRemovalProposals: getStructure(typeConsumerRemovalProposals.fromPartial({})),
						ChannelToChain: getStructure(typeChannelToChain.fromPartial({})),
						VscUnbondingOps: getStructure(typeVscUnbondingOps.fromPartial({})),
						UnbondingOp: getStructure(typeUnbondingOp.fromPartial({})),
						InitTimeoutTimestamp: getStructure(typeInitTimeoutTimestamp.fromPartial({})),
						VscSendTimestamp: getStructure(typeVscSendTimestamp.fromPartial({})),
						ConsumerConsAddress: getStructure(typeConsumerConsAddress.fromPartial({})),
						ProviderConsAddress: getStructure(typeProviderConsAddress.fromPartial({})),
						ConsumerAddressList: getStructure(typeConsumerAddressList.fromPartial({})),
						KeyAssignmentReplacement: getStructure(typeKeyAssignmentReplacement.fromPartial({})),
						ValidatorConsumerPubKey: getStructure(typeValidatorConsumerPubKey.fromPartial({})),
						ValidatorByConsumerAddr: getStructure(typeValidatorByConsumerAddr.fromPartial({})),
						ConsumerAddrsToPrune: getStructure(typeConsumerAddrsToPrune.fromPartial({})),
						Chain: getStructure(typeChain.fromPartial({})),
						ThrottledSlashPacket: getStructure(typeThrottledSlashPacket.fromPartial({})),
						ThrottledPacketDataWrapper: getStructure(typeThrottledPacketDataWrapper.fromPartial({})),
						
		};
		client.on('signer-changed',(signer) => {			
		 this.updateTX(client);
		})
	}
	updateTX(client: IgniteClient) {
    const methods = txClient({
        signer: client.signer,
        addr: client.env.rpcURL,
        prefix: client.env.prefix ?? "cosmos",
    })
	
    this.tx = methods;
    for (let m in methods) {
        this.tx[m] = methods[m].bind(this.tx);
    }
	}
};

const Module = (test: IgniteClient) => {
	return {
		module: {
			InterchainSecurityCcvProviderV1: new SDKModule(test)
		},
		registry: msgTypes
  }
}
export default Module;