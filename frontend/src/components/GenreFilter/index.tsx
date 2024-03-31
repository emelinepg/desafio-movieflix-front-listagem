import './styles.css';
import { Controller, useForm } from 'react-hook-form';
import { requestBackend } from 'utils/requests';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Genre } from 'types/genre';

export type GenreFilterData = {
  genre: Genre | null;
};

type Props = {
  onSubmitFilter: (data: GenreFilterData) => void;
};

const GenreFilter = ({ onSubmitFilter }: Props) => {
  const [selectGenres, setSelectGenres] = useState<Genre[]>([]);

  useEffect(() => {
    requestBackend({ url: '/genres' }).then((response) => {
      setSelectGenres(response.data);
      console.log(response.data)
    });
  }, []);

  const { handleSubmit, setValue, getValues, control } =
    useForm<GenreFilterData>();

  const onSubmit = (formData: GenreFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenre = (value: Genre) => {
    setValue('genre', value);

    const obj = {
      genre: getValues('genre'),
    };
    onSubmitFilter(obj);
  };

  return (
    <div className="base-card genre-filter-container">
      <form onSubmit={handleSubmit(onSubmit)} className="genre-filter-form">
        <div className="genre-filter-options-container">
          <Controller
            name="genre"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenres}
                isClearable
                placeholder="Selecione o gênero"
                classNamePrefix="genre-filter-select"
                onChange={value => handleChangeGenre(value as Genre)}
                getOptionLabel={(genre: Genre) => genre.name}
                getOptionValue={(genre: Genre) => String(genre.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
};

export default GenreFilter;
