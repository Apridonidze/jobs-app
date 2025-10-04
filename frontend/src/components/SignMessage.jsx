const SignMessage = ( {isSuccessful , signMessage,messageRef } ) => {
    return(
        <div className="sign-message-container position-absolute bg-bright border border-1 w-50 " ref={messageRef}>
            SignMessage.jsx
            {/* add succes or fail image here and redirec user to main page after 3 seconds */}
            {signMessage}
        </div>
    )
}


export default SignMessage