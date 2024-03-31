export default function UserInfoInput() {
  return (
    <>
      <div className="px-auto">
        <div className="row g-2">
          <div className="col-md">
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder=" "
              />
              <label htmlFor="emailInput">Email address</label>
            </div>
          </div>
          <div className="col-md">
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder=" "
              />
              <label htmlFor="passwordInput">Password</label>
            </div>
          </div>
        </div>
      </div>
      <div className="d-grid gap-2 mt-2">
        <button className="btn btn-primary" type="button">
          Login / Signup
        </button>
      </div>
    </>
  );
}
