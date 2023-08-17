export const isCheckingEmail = (stringEmail) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(stringEmail))}
export const isCheckingPass = (stringPass) => {
  return(
    stringPass.length >=6
  )
  }