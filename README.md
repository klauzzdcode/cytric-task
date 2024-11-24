Loom video link --- https://www.loom.com/share/f4c3ca1182e24e1eb27ab84765529ea1?sid=d751a070-687b-48f4-86ef-7c26a03cef3d

Vercel link --- https://cytric-task.vercel.app/

How i completed task: 
1. UI just copied from previous project (+2 additional pages, Error, NotFound).
2. Switched entire project to Next.js  13.5 version, because only in this version my provider worked properly. In previous project the problem was with React DOM version, that was experimental, so i had some errors, but switching to the latest stable version solved them.
3. Instead of ethers I used wagmi and viem that made my work go faster and more easily due to useful documentation.
4. Got some problems with w3m-button and w3m-account-button. Solved by declaring their types and using React.createElement().
5. Used Etherscan API for Sepolia network to check transaction status.
6. Used custom hook to get "User rejected transaction" error.
7. Used Next.js Auth to solve problems with SIWE.

Thats all ^_^
