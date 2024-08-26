const Block=require('./block')
const cryptoHash = require('./crypto-hash')

class BlockChain{
    constructor(){
        this.chain=[Block.genesis()]
    }

    addBlock({blockData}){
        const newBlock=Block.mineBlock({
            prevBlock:this.chain[this.chain.length-1],
            data:blockData
        })
        this.chain.push(newBlock)
    }

    replaceChain(chain){
        if(chain.length<=this.chain.length){
            console.log('Incoming chain is not longer')
            return
        }
        if(!BlockChain.isValidChain(chain)){
            console.log('Invalid incoming chain')
            return
        }
        this.chain.chain
    }

    static isValidChain(chain){
        if(JSON.stringify(chain[0])!=JSON.stringify(Block.genesis())){
            return false
        }
        for(let i=1;i<chain.length;i++){
            const{timestamp,prevHash,hash,nonce,difficulty,data}=chain[i]
            if(prevHash!=chain[i-1].hash) return false

            const validatedHash=cryptoHash(timestamp,prevHash,nonce,difficulty,data)
            if(hash!=validatedHash) return false
        }
        return true
    }


} 

module.exports=BlockChain

/* const objBlockChain=new BlockChain()
objBlockChain.addBlock({blockData:'Block 1 data'})
objBlockChain.addBlock({blockData:'Block 2 data'})
objBlockChain.addBlock({blockData:'Block 3 data'})
console.log(objBlockChain.chain) */
//console.log(BlockChain.isValidChain(objBlockChain.chain))