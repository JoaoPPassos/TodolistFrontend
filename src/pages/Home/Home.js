import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, CategoryArea, Input, Modal, Sticky } from "../../components";
import { apiTodo } from "../../service/api";

import "./styles.css";
const Home = () => {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState({});
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
      categories?.data?.forEach((cat) => {
        let newObj = {
          nm_category: cat.name,
          category_color: cat.color,
          id: cat.id,
          todos: todos?.data?.filter((el) => el.category.id === cat.id),
        };

        obj.push(newObj);
      });
      setTodos(obj);
    });
  };
  const getCategories = async () => {
    try {
      const response = apiTodo.get("/category");
      return response;
    } catch (error) {}
  };

  const createTodo = async () => {
    try {
      const response = await apiTodo.post("/create/", {
        title: form.title,
        description: form.description,
        deadline: form.date,
        category: selectedCategory,
        priority: form.priority,
      });
      setShowCreateModal(false);
      executeRequests();
    } catch (error) {}
  };

  return (
    <main className="Home">
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header title="header aqui" closeButton />
        <Modal.Body>
          <div>
            <Input
              label="Title"
              onChange={(el) =>
                setForm((old) => ({ ...old, title: el.target.value }))
              }
            />
            <Input
              label="Description"
              onChange={(el) =>
                setForm((old) => ({ ...old, description: el.target.value }))
              }
            />
            <Input
              label="deadline"
              type="date"
              onChange={(el) =>
                setForm((old) => ({ ...old, date: el.target.value }))
              }
            />
            <Input
              label="priority"
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
          <Button label="confirmar" onClick={createTodo} />
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
                baseColor={todo.category.color}
                title={todo.title}
                priority={todo.priority}
                description={todo.description}
                deadline={todo.deadline}
              />
            ))}
          </CategoryArea>
        ))}
      </div>
    </main>
  );
};

export default Home;
