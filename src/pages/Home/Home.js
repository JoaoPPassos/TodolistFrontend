import React, { useEffect, useState } from "react";
import {
  Button,
  CategoryArea,
  Input,
  Modal,
  Sticky,
  Loading,
} from "../../components";
import { apiCategory, apiTodo } from "../../service/api";
import { getUser } from "../../store/auth";
import { Capitalize } from "../../Util/String";

import "./styles.css";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({});
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = getUser();
  const getTodoList = async () => {
    try {
      const response = await apiTodo.get();

      return response;
    } catch (error) {}
  };

  useEffect(() => {
    executeRequests();
  }, []);

  const executeRequests = async () => {
    setIsLoading(true);
    await Promise.all([getTodoList(), getCategories()]).then((result) => {
      let categories = result[1].data;
      let todos = result[0].data;
      let obj = [];
      categories?.forEach((cat) => {
        let newObj = {
          nm_category: cat.name,
          category_color: cat.color,
          id: cat.id,
          todos: todos
            ?.filter((el) => el.category_id === cat.id)
            .map((item) => ({
              id: item.id,
              name: item.name,
              description: item.description,
              priority_status: item.priority_status,
              priority_id: item.priority_id,
            })),
        };

        obj.push(newObj);
      });

      setTodos(obj);
    });
    setIsLoading(false);
  };

  const getCategories = async () => {
    try {
      const response = apiCategory.get();
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    if (!!selectedTodo) {
      setShowCreateModal(true);
    }
  }, [selectedTodo]);

  const createTodo = async () => {
    setIsLoading(true);

    try {
      const response = await apiTodo.post("/", {
        name: form.title,
        description: form.description,
        // deadline: form.date,
        category_id: selectedCategory,
        priority_id: form.priority,
      });
      setShowCreateModal(false);
      executeRequests();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const editTodo = async () => {
    setIsLoading(true);

    try {
      const response = await apiTodo.put(`/${selectedTodo.id}`, {
        name: form?.title || selectedTodo.title,
        description: form?.description || selectedTodo.description,
        category_id: selectedTodo.category_id,
        priority_id: form?.priority || selectedTodo.priority_id,
      });
      setShowCreateModal(false);
      executeRequests();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
      setSelectedTodo(null);
    }
  };

  const deleteTodo = async () => {
    setIsLoading(true);

    try {
      const response = await apiTodo.delete(`/${selectedTodo.id}`);
      setShowCreateModal(false);
      executeRequests();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
      setSelectedTodo(null);
    }
  };

  return (
    <main className="Home">
      {isLoading && <Loading />}

      <span>
        Welcome to your Todolist,{" "}
        <strong>{Capitalize(user?.user, true)}</strong>{" "}
      </span>

      {showCreateModal && (
        <Modal
          show={showCreateModal}
          onHide={() => {
            if (selectedTodo) setSelectedTodo(null);
            setShowCreateModal(false);
          }}
        >
          <Modal.Header
            title={!!selectedTodo ? "Edit Todo" : "Create Todo"}
            closeButton
          />
          <Modal.Body>
            <div>
              <Input
                label="Title"
                onChange={(el) =>
                  setForm((old) => ({ ...old, title: el.target.value }))
                }
                defaultValue={selectedTodo?.name}
              />
              <Input
                label="Description"
                onChange={(el) =>
                  setForm((old) => ({ ...old, description: el.target.value }))
                }
                defaultValue={selectedTodo?.description}
              />
              {/* <Input
              label="deadline"
              type="date"
              onChange={(el) =>
                setForm((old) => ({ ...old, date: el.target.value }))
              }
              defaultValue={selectedTodo?.deadline}
            /> */}
              <Input
                label="Priority"
                type="range"
                minRange="1"
                maxRange="4"
                defaultValue={selectedTodo?.priority_id}
                onChange={(el) =>
                  setForm((old) => ({
                    ...old,
                    priority: Number(el.target.value),
                  }))
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="ButtonDiv">
              <Button
                label="Confirm"
                variant="secondary"
                onClick={() => {
                  if (!!selectedTodo) editTodo();
                  else createTodo();
                }}
              />
              {!!selectedTodo && (
                <Button
                  type="remove"
                  label="Delete"
                  onClick={() => {
                    deleteTodo();
                  }}
                />
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}

      <div className="Home_Content">
        {todos.map((item) => (
          <CategoryArea
            name={item.nm_category}
            includeTodo={() => {
              setSelectedCategory(item.id);
              setShowCreateModal(true);
            }}
          >
            {item.todos.map((todo, index) => (
              <Sticky
                id={index}
                baseColor={item.category_color}
                title={todo.name}
                priority={{
                  status: todo.priority_status,
                  id: todo.priority_id,
                }}
                description={todo.description}
                // deadline={todo.deadline}
                onClick={() => setSelectedTodo(todo)}
              />
            ))}
          </CategoryArea>
        ))}
      </div>
    </main>
  );
};

export default Home;
