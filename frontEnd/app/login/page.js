import Image from "next/image";

export default function Login() {
  return (
    <div className="">
      <div>
        <h1>LOGIN</h1>
      </div>
      <div>
        <label>
          {" "}
          Email
          <input type="email" className="rounded-2xl border-blue-500"></input>
        </label>
      </div>
      <div>
        <label>
          {" "}
          Password
          <input
            type="password"
            className="rounded-2xl border-blue-500"
          ></input>
        </label>
      </div>
    </div>
  );
}
