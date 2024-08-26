const BlockChain=require('./blockchain')

const blockchain=new BlockChain()
blockchain.addBlock({blockData:'new data'})

//console.log(blockchain.chain[blockchain.chain.length-1])
let prevTimestamp,nextTimestamp,nextBlock,timeDiff,avgTime
const times=[]

for (let i=0;i<100;i++){
    prevTimestamp=blockchain.chain[blockchain.chain.length-1].timestamp
    blockchain.addBlock({blockData:`Block ${i}`})
    nextBlock=blockchain.chain[blockchain.chain.length-1]
    nextTimestamp=nextBlock.timestamp

    timeDiff=nextTimestamp-prevTimestamp
    times.push(timeDiff)
    avgTime=times.reduce((prev,next)=>prev+next)/times.length

    console.log(`Time Difference ${timeDiff} ms, Difficulty ${nextBlock.difficulty}, Average Time ${avgTime}`)
}
console.log(blockchain)
//console.log(timeDiff)