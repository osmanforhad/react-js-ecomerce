import axios from 'axios';
import React, { useState } from 'react'
import swal from 'sweetalert';

const Category = () => {

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: [],
    });

    const handleInput = (event) => {
        event.persist();
        setCategory({...categoryInput, [event.target.name]: event.target.value});
    }

    const submitCategory = (event) => {
        event.preventDefault();

        const data = ({
            slug: categoryInput.slug,
            name: categoryInput.name, 
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,
        });
        axios.post(`/api/store_category`, data).then(response => {
            if(response.data.status === 200){
                swal("Success", response.data.message, "success");
                document.getElementById('CATEGORY_FORM').reset();
            }
            else if(response.data.status === 400){
                setCategory({...categoryInput, error_list: response.data.errors});
            }
        });
    }

    var display_errors = [];
    if(categoryInput.error_list){
        display_errors = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ];
    }

  return (
    <div className="container-fluid px-4">
    <h1 className="mt-4">Create New Category</h1>
    {
        display_errors.map( (item, index) => {
            return(<p className="text-danger mb-1" key={index}>{item}</p>)
        })
    }
    <form onSubmit={submitCategory} id="CATEGORY_FORM">
    <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
  
  <div className="form-group mb-3">
  <label>Slug</label>
  <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
  </div>
  <div className="form-group mb-3">
  <label>Name</label>
  <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
  </div>
  <div className="form-group mb-3">
  <label>Description</label>
  <textarea name="description" onChange={handleInput} value={categoryInput.description} className="form-control"></textarea>
  </div>
  <div className="form-group mb-3">
  <label>Status &nbsp;</label>
  <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}  /> Status 0 = shown / 1 = hidden
  </div>

  </div>
  <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">

  <div className="form-group mb-3">
  <label>Meta Title</label>
  <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
  </div>
  <div className="form-group mb-3">
  <label>Meta Keywords</label>
  <textarea name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control"></textarea>
  </div>
  <div className="form-group mb-3">
  <label>Meta Description</label>
  <textarea name="meta_description" onChange={handleInput} value={categoryInput.meta_description} className="form-control"></textarea>
  </div>

  </div>
</div>

<button type="submit" className="btn btn-primary px-4 mt-2 float-end">Submit</button>
</form>
    </div>
  )
}

export default Category;