// BookForm.jsx - Add/Edit book form using Formik + Yup
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../utils/apiClient';
import { addBook } from '../flux/actions';
import dispatcherInstance from '../flux/di'; // DI singleton

const BookSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    price: Yup.number().typeError('Price must be a number').required('Price is required'),
    description: Yup.string(),
});

const BookForm = ({ mode = 'add' }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues = { title: '', author: '', price: '', description: '' };

    // If edit mode, load current book data
    const [initial, setInitial] = React.useState(initialValues);

    React.useEffect(() => {
        if (mode === 'edit' && id) {
            apiClient.get(`/books/${id}`).then((data) => {
                setInitial({
                    title: data.title || '',
                    author: data.author || '',
                    price: data.price || '',
                    description: data.description || '',
                });
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [mode, id]);

    return (
        <div className="container mt-4">
            <h3>{mode === 'add' ? 'Add New Book' : 'Edit Book'}</h3>
            <Formik
                enableReinitialize
                initialValues={initial}
                validationSchema={BookSchema}
                onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
                    try {
                        if (mode === 'add') {
                            // send to backend and dispatch action
                            const created = await addBook(dispatcherInstance, values);
                            setSubmitting(false);
                            resetForm();
                            navigate('/home');
                        } else {
                            // edit book using API
                            const updated = await apiClient.put(`/books/${id}`, { ...values, id: Number(id) });
                            // Optionally you could dispatch an UPDATE action - skipping for brevity
                            setSubmitting(false);
                            navigate('/book/' + id);
                        }
                    } catch (err) {
                        console.error(err);
                        setSubmitting(false);
                        setErrors({ submit: 'Failed to save book' });
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="mb-3">
                            <label>Title</label>
                            <Field name="title" className="form-control" />
                            <div className="text-danger"><ErrorMessage name="title" /></div>
                        </div>
                        <div className="mb-3">
                            <label>Author</label>
                            <Field name="author" className="form-control" />
                            <div className="text-danger"><ErrorMessage name="author" /></div>
                        </div>
                        <div className="mb-3">
                            <label>Price</label>
                            <Field name="price" className="form-control" />
                            <div className="text-danger"><ErrorMessage name="price" /></div>
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <Field as="textarea" name="description" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {mode === 'add' ? 'Add Book' : 'Save Changes'}
                        </button>
                        <div className="text-danger mt-2"><ErrorMessage name="submit" component="div" /></div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default BookForm;
