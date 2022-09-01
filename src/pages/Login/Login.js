import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal } from "../../components";
import Input from "../../components/Input";
import { apiAuth } from "../../service/api";

import { makeLogin } from "../../store/auth";
import "./styles.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({});

  const [signupModal, setSignupModal] = useState(false);

  const handleModal = () => setSignupModal(!signupModal);

  const createAccount = () => {
    try {
      const response = apiAuth.post("", form);
    } catch (error) {}
  };

  return (
    <main className="Login">
      {signupModal && (
        <Modal show={signupModal} onHide={handleModal}>
          <Modal.Header closeButton title="Sign up" />
          <Modal.Body>
            <>
              <Input
                label="Email"
                onChange={(ref) =>
                  setForm((old) => ({ ...old, email: ref.target.value }))
                }
              />
              <Input
                label="Username"
                onChange={(ref) =>
                  setForm((old) => ({ ...old, username: ref.target.value }))
                }
              />
              <Input
                label="Password"
                type="password"
                onChange={(ref) =>
                  setForm((old) => ({ ...old, password: ref.target.value }))
                }
              />
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Confirm"
              variant="secondary"
              onClick={() => createAccount()}
            />
          </Modal.Footer>
        </Modal>
      )}
      <section>
        <Input
          label="Email"
          outlined
          onChange={(ref) => setName(ref.target.value)}
        />
        <Input
          label="Password"
          outlined
          type="password"
          onChange={(ref) => setPassword(ref.target.value)}
        />
        <div>
          {/* <button onClick={() => makeLogin(name, password)}>Login</button> */}
          <Button onClick={() => makeLogin(name, password)} label="Login" />
        </div>

        <div className="Login_Signup">
          Don't have an account? <span onClick={handleModal}>Sign up</span>
        </div>
      </section>
    </main>
  );
};

export default Login;
