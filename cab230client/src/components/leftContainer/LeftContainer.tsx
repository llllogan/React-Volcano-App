import CountriesPanel from "./countries/CountriesPanel";
import UserInfoContainer from "./userPanel/UserContainer";

export default function LeftPanelContainer() {
  return (
    <>
      <UserInfoContainer />
      <CountriesPanel />
    </>
  );
}
