import React, { useCallback, useEffect, useState } from "react";
import Input from "../../components/Input";
import { apiAuth } from "../../service/api";

import { makeLogin } from "../../store/auth";
import "./styles.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="Login">
      <section>
        <Input label="email" onChange={(ref) => setName(ref.target.value)} />
        <Input
          label="senha"
          onChange={(ref) => setPassword(ref.target.value)}
        />
        <div>
          <button onClick={() => makeLogin(name, password)}>Login</button>
        </div>
      </section>
    </main>
  );
};

export default Login;
