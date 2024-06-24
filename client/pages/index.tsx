import {
	ConnectWallet,
	Web3Button,
	useContract,
	useSDK,
} from "@thirdweb-dev/react"
import type { NextPage } from "next"
import styles from "../styles/Calculator.module.css"
import { useEffect, useState } from "react"
import { createWallet } from "thirdweb/wallets";

const Calculator: NextPage = () => {
	const [counter, setCounter] = useState("0")
	const [firstNum,setFirstNum] = useState("0");
	const [secondNum,setSecondNum] = useState("0");
	const contractAddress = "0x6795F2FdE4ED377bC38414b3B1Cfa9bb2c06eE5e"
	const { contract } = useContract(contractAddress)
	const sdk = useSDK()

	const address = sdk?.wallet.isConnected()

	async function getCounter() {
		if (!contract) return

		const counter = await contract?.call("getResult")
		setCounter(counter.toString())
	}

	getCounter()

	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<div className={styles.title}>
					Crypto Calculator
				</div>
				<div className={styles.wallet}>
				<ConnectWallet modalTitle="Please Connect Your Wallet" modalSize="compact"/>
			</div>
			</main>
			<div className={styles.content}>
			{contract && address?(<>
					<p>Please Enter Your Operands : </p>
					
					<p className={styles.result}> RESULT :  </p>
					<p className={styles.resultNumber}> {counter} </p>
					<br/>
					<p>Num 1 :</p>
					<input type="number" id="num1" name="number1" className={styles.firstNum} placeholder="Enter First Number" onChange={event=> setFirstNum(event.target.value)}/>	
					<br/>
					<p>Num 2 :</p>
					<input type="number" id="num2" name="number2" className={styles.secondNum} placeholder="Enter Second Number" onChange={event => setSecondNum(event.target.value)}/>
					
					<div className={styles.operationGroup}>
					<Web3Button
					contractAddress={contractAddress}
					className={styles.add}
					action={(contract) => contract?.call("add",[firstNum,secondNum])}>
						Add
					</Web3Button>
					<Web3Button
					contractAddress={contractAddress}
					className={styles.subtract}
					action={(contract) => contract?.call("sub",[firstNum,secondNum])}>
						Subtract
					</Web3Button>
					<Web3Button
					contractAddress={contractAddress}
					className={styles.multiply}
					action={(contract) => contract?.call("mul",[firstNum,secondNum])}>
						Multiply
					</Web3Button>
					<Web3Button
					contractAddress={contractAddress}
					className={styles.divide}
					action={(contract) => contract?.call("div",[firstNum,secondNum])}>
						Divide
					</Web3Button>
					</div>

					</>):<p>Loading contract... Please Ensure Wallet Is Connected</p>}
			</div>
		</div>
	)
}

export default Calculator