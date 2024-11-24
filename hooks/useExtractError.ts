export const useExtractError = (errorMessage: string) =>{
    const regex = /TransactionExecutionError:(.*?\.)/;
    const match = errorMessage.match(regex);
    if (match) {
      return match[1];  // Return the part after "ContractFunctionExecutionError:" and before the first period.
    } else {
      return null;  // Return null if no match is found
    }
}