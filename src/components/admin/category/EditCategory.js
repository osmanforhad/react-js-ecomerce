import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const EditCategory = (props) => {

    const history = useHistory();
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const category_id = props.match.params.id;
        axios.get(`/api/edit_category/${category_id}`).then(response => {
            if(response.data.status === 200){
                setCategory(response.data.category);
            }
            else if(response.data.status === 404){
                swal("Error", response.data.message, "error");
                history.pushState("/admin/view_category");
            }
            setLoading(false);
        });
    }, [props.match.params.id]);

    const handleInput = (event) => {
        event.persist();
        setCategory({...categoryInput, [event.target.name] : event.target.value});
    }

    const updateCategory = (event) => {
        event.preventDefault();
        const category_id = props.match.params.id;
        const data = categoryInput;
        axios.put(`/api/update_category/${category_id}`, data).then(response => {
            if(response.data.status === 200){
                swal("Success", response.data.message, "success");
                setError([]);
            }
            else if(response.data.status === 422){
                swal("All fields are mandatory", "", "warning");
                setError(response.data.errors);
            }
            else if(response.data.status === 404){
                swal("Error", response.data.message, "error");
                history.push("/admin/view_category");
            }
        });
    }

    if(loading){
        return <h1 className="text-center">Loading Edit Category...</h1>
    }

  return (
    <div className="container px-4">
        <div className="card mt-4">
     <div className="card-header">
       <h4>Edit Category
       <Link to="/admin/view_category" className="btn btn-primary btn-sm float-end">Back</Link>
       </h4>
     </div>
     <div className="card-body">
     <form onSubmit={updateCategory}>
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
  <small className="text-danger">{error.slug}</small>
  </div>
  <div className="form-group mb-3">
  <label>Name</label>
  <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
  <small className="text-danger">{error.name}</small>
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
  <small className="text-danger">{error.meta_title}</small>
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

<button type="submit" className="btn btn-primary px-4 mt-2 float-end">Update</button>
</form>
     </div>
   </div>
    </div>
  )
}

export default EditCategory;