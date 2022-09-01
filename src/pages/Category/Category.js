import React, { useEffect, useState } from "react";
import {
  Button,
  CategorySticky,
  Input,
  Loading,
  Modal,
} from "../../components";
import { apiCategory } from "../../service/api";

import "./styles.css";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [form, setForm] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => setCreateModal(!createModal);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    setIsLoading(true);

    try {
      const response = await apiCategory.get();

      setCategories(response.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async () => {
    setIsLoading(true);

    try {
      const response = await apiCategory.post("/", {
        name: form.title,
        color: form.color,
      });
      handleModal();
      getCategories();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const editCategory = async () => {
    setIsLoading(true);

    try {
      const response = await apiCategory.put(`/${selectedCategory.id}`, {
        name: form?.title || selectedCategory.name,
        color: form?.color || selectedCategory.color,
      });
      handleModal();
      getCategories();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
      setSelectedCategory(null);
    }
  };

  const deleteCategory = async () => {
    setIsLoading(true);

    try {
      const response = await apiCategory.delete(`/${selectedCategory.id}`);
      handleModal();
      getCategories();
      setForm({});
    } catch (error) {
    } finally {
      setIsLoading(false);
      setSelectedCategory(null);
    }
  };

  useEffect(() => {
    if (!!selectedCategory) {
      handleModal();
    }
  }, [selectedCategory]);

  return (
    <main className="Category">
      {isLoading && <Loading />}
      {createModal && (
        <Modal
          show={createModal}
          onHide={() => {
            if (!!selectedCategory) setSelectedCategory(null);
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
                // defaultValue={selectedCategory?.color}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="ButtonDiv">
              <Button
                label="Confirm"
                variant="secondary"
                onClick={() => {
                  if (!!selectedCategory) editCategory();
                  else createCategory();
                }}
              />
              {!!selectedCategory && (
                <Button
                  type="remove"
                  label="Delete"
                  onClick={() => {
                    deleteCategory();
                  }}
                />
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}
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
