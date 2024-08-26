const express=require('express')
const bodyParser=require('body-parser')
const BlockChain=require('./blockchain')
const PublishSubscribe=require('./publish-subscribe')
const request=require('request')

const app=express();
const blockchain=new BlockChain()
const pubSub=new PublishSubscribe({blockchain})

const DEFAULT_PORT = 3000
const ROOT_NODE_ADDRESS=`http://localhost:${DEFAULT_PORT}`

setTimeout(() => {
    pubSub.broadcastChain()
}, 1000)

app.use(bodyParser.json())

app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})

app.post('/api/mine',(req,res)=>{
    const {data}=req.body
    blockchain.addBlock({blockData:data})
    pubSub.broadcastChain()
    res.redirect('/api/blocks')   
})

const synChains = () => {
    request(
      { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
      (error, reposnse, body) => {
        if (!error && reposnse.statusCode === 200) {
          const rootChain = JSON.parse(body);
          console.log("Replace chain on sync with", rootChain);
          blockchain.replaceChain(rootChain);
        }
      }
    );
  };

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}
const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`listening to PORT:${PORT}`);
  synChains()
});