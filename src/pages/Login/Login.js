import React, { useCallback, useEffect, useState } from "react";
import { Button, Loading, Modal } from "../../components";
import Input from "../../components/Input";
import { apiAuth } from "../../service/api";

import { makeLogin } from "../../store/auth";
import "./styles.css";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState({});

  const [signupModal, setSignupModal] = useState(false);
  const [successSignup, setSuccessSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => setSignupModal(!signupModal);

  const createAccount = async () => {
    setIsLoading(true);
    try {
      const response = await apiAuth.post("", form);
      setSuccessSignup(true);
      // handleModal();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {signupModal && (
        <Modal show={signupModal} onHide={handleModal}>
          <Modal.Header closeButton title="Sign up" />
          <Modal.Body>
            {!successSignup ? (
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
            ) : (
              <h2>Conta criada com sucesso</h2>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              label="Confirm"
              variant="secondary"
              onClick={() => {
                if (successSignup) {
                  handleModal();
                } else {
                  createAccount();
                }
              }}
            />
          </Modal.Footer>
        </Modal>
      )}
      <main className="Login">
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
    </>
  );
};

export default Login;
