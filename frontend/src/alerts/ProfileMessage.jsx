import '../main.css'; //importing css file

const ProfileMessage = () => {
    return (
        <div className="is-profile-finished-container border border-1 bg-white p-2 rounded-2 position-fixed top-50 end-0" style={{zIndex : 1999}}>
            <h5>Profile Is Not Finished!</h5>
            <h6>Finish Your Profile To Explore Easier.</h6>
        </div>
    );
};


export default ProfileMessage; //exporting component