import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ViewCategory = () => {

    const [loading, setLoading] = useState(true);
    const [categorylist, setCategorylist] = useState([]);

    useEffect(() => {
      axios.get(`/api/category_list`).then(response => {
          if(response.status === 200){
              setCategorylist(response.data.category);
          }
          setLoading(false);
      });
    }, []);

    var viewcategory_HTMLTABLE = "";
    if(loading){
        return <h4 className="text-center">Loading Category...</h4>
    }
    else {
        viewcategory_HTMLTABLE = categorylist.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link to={`edit_category/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            )
        });
    }

  return (
    <div className="container px-4">
        <div className="card mt-4">
    <div className="card-header">
        <h4>Category List
        <Link to="/admin/add_category" className="btn btn-primary btn-sm float-end">Add New Category</Link>
        </h4>
    </div>
    <div className="card-body">
    <table className="table table-bordered table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {viewcategory_HTMLTABLE}
        </tbody>
    </table>
    </div>
    </div>
    </div>
  )
}

export default ViewCategory;