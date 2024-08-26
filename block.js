const {GENESIS_DATA,MINE_RATE}=require('./config')
const cryptoHash=require('./crypto-hash')
const hexToBinary=require('hex-to-binary')


class Block{
    constructor({timestamp,prevHash,hash,data,nonce,difficulty}){
        this.timestamp=timestamp
        this.prevHash=prevHash
        this.hash=hash
        this.data=data
        this.nonce=nonce
        this.difficulty=difficulty
    }

    static genesis(){
        return new this(GENESIS_DATA)
    }

    static mineBlock({prevBlock,data}){
        const prevHash=prevBlock.hash

        let {difficulty}=prevBlock
        let hash,timestamp
        let nonce=0
        do{
            nonce++
            timestamp=Date.now()
            difficulty=Block.adjustDifficulty({
                previousBlock:prevBlock,
                currentTimestamp:timestamp
            })
            hash=cryptoHash(timestamp,prevHash,data,nonce,difficulty)
        }while(hexToBinary(hash).substring(0,difficulty)!='0'.repeat(difficulty))       
        return new this({
            timestamp:timestamp,
            prevHash:prevHash,
            hash:hash,
            nonce:nonce,
            difficulty:difficulty,
            data:data
        })
    }

    static adjustDifficulty({previousBlock,currentTimestamp}){
        const {difficulty}=previousBlock
        if(difficulty<1) return 1
        const difference=currentTimestamp-previousBlock.timestamp
        if(difference>MINE_RATE){
            return difficulty-1
        }else{
            difficulty+1
        }
    }

}

module.exports=Block

//const block1=new Block({timestamp:'2/12/2023',hash:'0x333',prevHash:'sas',data:'hello'})
//const block2=Block.genesis();
//console.log(block2)
//console.log(Block.mineBlock({prevBlock:block1,data:'Block 2'}))