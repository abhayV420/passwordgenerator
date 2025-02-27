import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  

  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let nums = "0123456789";
    let chars = "~!@#$%^&*(){}[]?/\|:;";
    
    if(numbersAllowed) str += nums;
    if(charAllowed) str += chars;

    for(let i=0; i<=length; i++){
      let random = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(random)
    }

    setPassword(pass)
  }, [length, numbersAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length, numbersAllowed, charAllowed, passwordGenerator]);

  const passRef = useRef(null);
  const savePassToClipBoard = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopy(true);
  }, [password]);

  useEffect(()=>{
    setCopy(false);
  }, [password, length, numbersAllowed, charAllowed])

  return (
  <div className='bg-black w-full h-screen flex justify-center py-11 text-orange-400'>
     <div className='bg-gray-800 h-[17%] w-[90%] sm:w-[35%] rounded-lg flex flex-col py-4 px-5 gap-8 min-w-[550px] '>

                        {/* upper scetion */}
            <div className='flex gap-3'>
              <input className='w-[87%] h-11 rounded-lg pl-2' value={password} type="text" readOnly ref={passRef} />
              <button className={` text-white rounded-lg w-[100px] ${copy ? 'bg-white text-purple-700' : 'bg-blue-600 hover:bg-blue-800'} `} onClick={savePassToClipBoard} > {copy ? 'Copied ✔️' : 'Copy'} </button>
            </div>

                         {/* Lower Section */}

               <div className='flex gap-3 mx-6 '>
                
                 <div className='flex text-lg gap-1'>
                  <input className='cursor-pointer' id='range' type="range" min={6} max={30} value={length} onChange={(e)=>{setLength(e.target.value)}} />
                  <label htmlFor='range' >Length:{length}</label>
                 </div>

                 <div className='flex text-xl gap-2'>
                  <input className='cursor-pointer' id='numbers' type="checkbox" defaultChecked={numbersAllowed} onChange={()=>{
                    setNumbersAllowed((prev)=>!prev);
                  }} />
                  <label htmlFor='numbers'>Numbers</label>
                 </div>
                 
                 <div className='flex text-xl gap-2'>
                  <input className='cursor-pointer' id='characters' type="checkbox" defaultChecked={charAllowed} onChange={()=>{
                    setCharAllowed((prev)=>!prev)
                  }} />
                  <label htmlFor='characters'>Characters</label>
                 </div>

               </div>
       </div>

   </div>
  )
}

export default App
