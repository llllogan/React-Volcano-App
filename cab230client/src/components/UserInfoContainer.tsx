import UserImage from "./UserImage";

function UserInfoContainer() {
  
  return (
    <div className="d-flex justify-content-center pt-4">
        <UserImage loggedIn={false} />
    </div>
  );
}

export default UserInfoContainer;