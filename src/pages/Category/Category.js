import React, { useEffect, useState } from "react";
import { Button, CategorySticky, Input, Modal } from "../../components";
import { apiCategory } from "../../service/api";

import "./styles.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleModal = () => setCreateModal(!createModal);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await apiCategory.get();

      setCategories(response.data);
    } catch (error) {}
  };

  const createCategory = async () => {
    try {
      const response = await apiCategory.post("/", {
        name: form.title,
        color: form.color,
      });
      handleModal();
      getCategories();
    } catch (error) {}
  };

  const editCategory = async () => {
    try {
      const response = await apiCategory.put(`/${selectedCategory.id}`, {
        name: form?.title || selectedCategory.name,
        color: form?.color || selectedCategory.color,
      });
      handleModal();
      getCategories();
    } catch (error) {
    } finally {
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    if (!!selectedCategory) {
      handleModal();
    }
  }, [selectedCategory]);

  console.log(selectedCategory);
  return (
    <main className="Category">
      <Modal
        show={createModal}
        onHide={() => {
          if (selectedCategory) setSelectedCategory(null);
          handleModal();
        }}
      >
        <Modal.Header title="Create Todo" closeButton />
        <Modal.Body>
          <div>
            <Input
              label="Title"
              onChange={(el) =>
                setForm((old) => ({ ...old, title: el.target.value }))
              }
              defaultValue={selectedCategory?.name}
            />
            <Input
              label="Color"
              type="color"
              onChange={(el) =>
                setForm((old) => ({ ...old, color: el.target.value }))
              }
              defaultValue={selectedCategory?.color}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            label="Confirm"
            onClick={() => {
              if (!!selectedCategory) editCategory();
              else createCategory();
            }}
          />
        </Modal.Footer>
      </Modal>
      <Button type="include" onClick={handleModal} />
      <div className="Content">
        {categories.map((item, index) => (
          <CategorySticky
            key={index}
            title={item.name}
            color={item.color}
            onClick={() => setSelectedCategory(item)}
          />
        ))}
      </div>
    </main>
  );
};

export default Category;
