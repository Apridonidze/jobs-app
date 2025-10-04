const SignMessage = ( {isSuccessful , signMessage} ) => {
    return(
        <div className="sign-message-container position-absolute bg-bright border border-1 w-50 d-block" >
            SignMessage.jsx
            {/* add succes or fail image here based on if isSuccesful is true || false and redirec user to main page after 3 seconds */}
            <span>{signMessage}</span>
        </div>
    )
}


export default SignMessage