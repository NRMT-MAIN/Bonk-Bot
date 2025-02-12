import React, { useRef } from 'react'
import { Transaction , Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js"
import axios from 'axios';

function Transaction() {
  const pbkRef = useRef() ;
  const amountRef = useRef() ; 

  const connection = new Connection("https://api.devnet.solana.com") ; 

  const handleSendSol = async () => {
    const recieverPublicKey = new PublicKey(pbkRef.current.value) ; 
    const amount = parseInt(amountRef.current.value) ;

    const response = await axios.post("http://localhost:3000/api/v1/user" , {
      headers : {
          token : localStorage.getItem("token") 
      }
    })

    const senderPublicKey = new PublicKey(response.data.publicKey) ; 
    
    const instruction = SystemProgram.transfer({
          fromPubkey : senderPublicKey ,
          toPubkey : recieverPublicKey ,
          lamports : amount * LAMPORTS_PER_SOL
    })

    const transactions = new Transaction().add(instruction) ; 

    const { blockhash } = await connection.getLatestBlockhash() ; 
    transactions.feePayer = senderPublicKey ;
    transactions.recentBlockhash = blockhash ;

    const serializeTransactions = transactions.serialize({
      requireAllSignatures: false,
      verifySignatures: false
    })

    await axios.post("http://localhost:3000/api/v1/txn/sign", {
      message: serializedTx,
      retry : false 
    })

  }



  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center gap-2'>
      <input ref={pbkRef} className='bg-slate-300 rounded-md p-2' type="text" placeholder='Public Address' />
      <input ref={amountRef} className='bg-slate-300 rounded-md p-2' type="text" placeholder='Amount' />
      <button onClick={ handleSendSol } className='px-10 py-2 text-white rounded-md bg-blue-600 hover:bg-blue-800'>Send Sol</button>
    </div>
  )
}

export default Transaction