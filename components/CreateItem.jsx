import React, { useState } from 'react';
import Router from 'next/router';
import { gql, useMutation } from '@apollo/client';

import Error from './ErrorMessage';
import { formatMoney } from '../utils';

import * as S from './styles';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

const CreateItem = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [largeImage, setLargeImage] = useState('');
  const [price, setPrice] = useState(0);

  const [createItem, { loading, error }] = useMutation(CREATE_ITEM_MUTATION);

  const uploadFile = async (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'stitchfits');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dshudo16m/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await res.json();

    setImage(file.secure_url);
    setLargeImage(file.eager[0].secure_url);
  };

  return (
    <S.Form
      onSubmit={async (e) => {
        e.preventDefault();

        const res = await createItem({
          variables: { title, description, image, largeImage, price },
        });

        Router.push({
          pathname: '/item',
          query: { id: res.data.createItem.id },
        });
      }}
    >
      <Error error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">Image</label>
        <input
          type="file"
          id="file"
          name="file"
          placeholder="Upload an image"
          // value={file}
          onChange={uploadFile}
        />
        {image && <S.PreviewImage src={image} alt="Image preview" />}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          type="number"
          id="description"
          name="description"
          placeholder="Enter A Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Submit</button>
      </fieldset>
    </S.Form>
  );
};

export default CreateItem;
export { CREATE_ITEM_MUTATION };
