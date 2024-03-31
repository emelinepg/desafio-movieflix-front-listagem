import Button from 'components/Button';
import './styles.css';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BASE_URL } from 'utils/requests';
import { useReviewContext } from 'ReviewContext';
import { useForm } from 'react-hook-form';

type FormData = {
  review: string;
};

type UrlParams = {
  movieId: string;
};

const ReviewCard = () => {
  const { movieId } = useParams<UrlParams>();

  const [formData, setFormData] = useState<FormData>({
    review: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { updateList } = useReviewContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (data: FormData) => {
    axios
      .post(`${BASE_URL}/reviews`, {
        text: data.review,
        movieId: movieId,
      })
      .then((response) => {
        console.log(response.data);
        updateList();
        setFormData({ review: '' });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="base-card review-card">
      <form onSubmit={handleSubmit(onSubmit)} className="review-form">
        <div className="mb-4">
          <input
            {...register('review', {
              required: 'Campo obrigatório',
            })}
            type="text"
            className={`form-control base-input ${
              errors.review ? 'is-invalid' : ''
            }`}
            placeholder="Deixe sua avaliação aqui"
            name="review"
            onChange={handleChange}
            value={formData.review}
          />
          <div className="invalid-feedback d-block">
            {errors.review?.message}
          </div>
        </div>
        <div className="review-submit">
          <Button text="Salvar avaliação" />
        </div>
      </form>
    </div>
  );
};

export default ReviewCard;
