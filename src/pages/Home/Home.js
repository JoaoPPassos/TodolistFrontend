import React, { useEffect, useState } from "react";
import { Button, CategoryArea, Input, Modal, Sticky } from "../../components";
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

  const executeRequests = () => {
    Promise.all([getTodoList(), getCategories()]).then((result) => {
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
    } catch (error) {}
  };

  const editTodo = async () => {
    try {
      const response = await apiTodo.put(`/update/${selectedTodo.id}`, {
        title: form?.title,
        description: form?.description,
        category: selectedTodo.category.id,
        // deadline: form?.date,
        priority: form?.priority || selectedCategory.priority.todo,
      });
      setShowCreateModal(false);
      executeRequests();
    } catch (error) {
    } finally {
      setSelectedTodo(null);
    }
  };

  return (
    <main className="Home">
      <span>
        Bem vindo ao seu Todolist,{" "}
        <strong>{Capitalize(user?.user, true)}</strong>{" "}
      </span>

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header title="Create Todo" closeButton />
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
              label="priority"
              type="range"
              minRange="1"
              maxRange="4"
              defaultValue={String(selectedTodo?.priority_id)}
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
          <Button
            label="Confirm"
            onClick={() => {
              if (!!selectedTodo) editTodo();
              else createTodo();
            }}
          />
        </Modal.Footer>
      </Modal>

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
